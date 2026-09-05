import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { getStripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function upsertSubscription(
  sub: Stripe.Subscription,
  userId?: string,
) {
  const stripe = getStripe();
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  const planId =
    (sub.metadata?.planId as string | undefined) ??
    sub.items.data[0]?.price?.metadata?.planId ??
    "starter";

  const existing = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, sub.id))
    .limit(1);

  const subAny = sub as any;
  const data = {
    planId,
    status: sub.status,
    stripeCustomerId: customerId,
    stripeSubscriptionId: sub.id,
    currentPeriodStart: new Date(subAny.current_period_start * 1000),
    currentPeriodEnd: new Date(subAny.current_period_end * 1000),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
    updatedAt: new Date(),
  };

  if (existing.length > 0) {
    await db
      .update(subscriptions)
      .set(data)
      .where(eq(subscriptions.stripeSubscriptionId, sub.id));
  } else {
    const resolvedUserId =
      userId ??
      (await (async () => {
        const customer = await stripe.customers.retrieve(customerId);
        return (customer as Stripe.Customer).metadata?.userId ?? null;
      })());

    if (!resolvedUserId) {
      console.warn("No userId for subscription", sub.id);
      return;
    }

    await db.insert(subscriptions).values({
      userId: resolvedUserId,
      ...data,
    });
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );
          await upsertSubscription(sub, session.metadata?.userId);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(sub);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .update(subscriptions)
          .set({ status: "canceled", updatedAt: new Date() })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const subId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription?.id;
        if (subId) {
          await db
            .update(subscriptions)
            .set({ status: "past_due", updatedAt: new Date() })
            .where(eq(subscriptions.stripeSubscriptionId, subId));
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Error processing webhook event:", event.type, err);
    return NextResponse.json(
      { error: "Internal processing error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
