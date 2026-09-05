import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(apiKey, {
      apiVersion: "2026-08-26.dahlia" as Stripe.LatestApiVersion,
      typescript: true,
    });
  }
  return stripeInstance;
}

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export const STRIPE_PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    priceMonthlyId: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? "",
    priceYearlyId: process.env.STRIPE_PRICE_STARTER_YEARLY ?? "",
    priceMonthly: 1900,
    priceYearly: 15000,
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceMonthlyId: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
    priceYearlyId: process.env.STRIPE_PRICE_PRO_YEARLY ?? "",
    priceMonthly: 4900,
    priceYearly: 39000,
  },
  agency: {
    id: "agency",
    name: "Agence",
    priceMonthlyId: process.env.STRIPE_PRICE_AGENCY_MONTHLY ?? "",
    priceYearlyId: process.env.STRIPE_PRICE_AGENCY_YEARLY ?? "",
    priceMonthly: 12900,
    priceYearly: 99000,
  },
} as const;

export type StripePlanKey = keyof typeof STRIPE_PLANS;

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name?: string | null,
): Promise<string> {
  const stripe = getStripe();
  const existing = await stripe.customers.list({ email, limit: 1 });
  if (existing.data.length > 0) return existing.data[0].id;

  const customer = await stripe.customers.create({
    email,
    name: name ?? undefined,
    metadata: { userId },
  });
  return customer.id;
}

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  userId,
  isYearly,
}: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  userId: string;
  isYearly: boolean;
}): Promise<string> {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      trial_period_days: 14,
      metadata: { userId },
    },
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    metadata: { userId, isYearly: String(isYearly) },
  });
  return session.url!;
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string,
): Promise<string> {
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
}