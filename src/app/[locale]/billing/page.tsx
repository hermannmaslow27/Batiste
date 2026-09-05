import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { requireUser } from "@/lib/guards";
import { normalizeLocale } from "@/i18n/messages";
import BillingClient from "@/components/dashboard/BillingClient";

export const metadata = {
  title: "Facturation & Abonnement · Batiste",
  description: "Gérez votre abonnement et vos informations de facturation.",
};

export default async function BillingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ upgrade?: string; canceled?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const { upgrade, canceled } = await searchParams;
  const locale = normalizeLocale(rawLocale);

  const user = await requireUser(locale);

  // Load subscription
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id))
    .limit(1);

  const sub = rows[0] ?? null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {upgrade === "success" && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800">
          🎉 Votre abonnement est activé ! Bienvenue dans votre nouvelle formule.
        </div>
      )}
      {canceled === "1" && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
          Paiement annulé — votre abonnement actuel reste inchangé.
        </div>
      )}
      <BillingClient
        currentPlanId={sub?.planId ?? null}
        status={sub?.status ?? null}
        cancelAtPeriodEnd={sub?.cancelAtPeriodEnd ?? false}
        currentPeriodEnd={sub?.currentPeriodEnd ?? null}
        hasSubscription={!!sub}
      />
    </div>
  );
}
