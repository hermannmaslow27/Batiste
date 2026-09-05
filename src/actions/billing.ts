"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptions, plans, users } from "@/db/schema";
import { getUser } from "@/lib/guards";
import {
  STRIPE_PLANS,
  type StripePlanKey,
  getOrCreateStripeCustomer,
  createCheckoutSession,
  createBillingPortalSession,
} from "@/lib/stripe";
import type { ActionResult } from "./sites";

/** Get the current user's active subscription */
export async function getUserSubscriptionAction(): Promise<
  ActionResult<{
    planId: string | null;
    status: string | null;
    stripeCustomerId: string | null;
    cancelAtPeriodEnd: boolean;
    currentPeriodEnd: Date | null;
    trialEnd: Date | null;
  }>
> {
  try {
    const user = await getUser();
    if (!user) return { ok: false, error: "unauthorized" };

    const rows = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .limit(1);

    const sub = rows[0] ?? null;
    return {
      ok: true,
      data: {
        planId: sub?.planId ?? null,
        status: sub?.status ?? null,
        stripeCustomerId: sub?.stripeCustomerId ?? null,
        cancelAtPeriodEnd: sub?.cancelAtPeriodEnd ?? false,
        currentPeriodEnd: sub?.currentPeriodEnd ?? null,
        trialEnd: sub?.trialEnd ?? null,
      },
    };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

/** Redirect to Stripe Checkout to subscribe to a plan */
export async function createCheckoutSessionAction(
  planKey: StripePlanKey,
  yearly: boolean,
): Promise<ActionResult<{ url: string }>> {
  try {
    const user = await getUser();
    if (!user) return { ok: false, error: "unauthorized" };

    const plan = STRIPE_PLANS[planKey];
    const priceId = yearly ? plan.priceYearlyId : plan.priceMonthlyId;

    if (!priceId) {
      return { ok: false, error: "price_not_configured" };
    }

    const userRow = await db
      .select({ email: users.email, name: users.name })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    const userRecord = userRow[0];
    if (!userRecord) return { ok: false, error: "user_not_found" };

    const customerId = await getOrCreateStripeCustomer(
      user.id,
      userRecord.email,
      userRecord.name,
    );

    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const url = await createCheckoutSession({
      customerId,
      priceId,
      successUrl: `${baseUrl}/fr/dashboard?upgrade=success`,
      cancelUrl: `${baseUrl}/fr/billing?canceled=1`,
      userId: user.id,
      isYearly: yearly,
    });

    return { ok: true, data: { url } };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

/** Open the Stripe Customer Portal for managing subscriptions */
export async function openBillingPortalAction(): Promise<
  ActionResult<{ url: string }>
> {
  try {
    const user = await getUser();
    if (!user) return { ok: false, error: "unauthorized" };

    const rows = await db
      .select({ stripeCustomerId: subscriptions.stripeCustomerId })
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .limit(1);

    const customerId = rows[0]?.stripeCustomerId;
    if (!customerId) return { ok: false, error: "no_subscription" };

    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const returnUrl = `${protocol}://${host}/fr/billing`;

    const url = await createBillingPortalSession(customerId, returnUrl);
    return { ok: true, data: { url } };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}
