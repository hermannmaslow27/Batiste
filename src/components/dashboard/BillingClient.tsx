"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { STRIPE_PLANS } from "@/lib/stripe";
import { useBillingActions } from "./billing/useBillingActions";
import BillingToggle from "./billing/BillingToggle";
import BillingPlanCard from "./billing/BillingPlanCard";

const PLAN_FEATURES: Record<string, string[]> = {
  starter: [
    "1 site web",
    "5 pages par site",
    "Tous les thèmes & templates",
    "Formulaires de contact & devis",
    "Blog intégré",
    "Catalogue produits (10 articles)",
    "Analyses de trafic de base",
    "Support par email",
  ],
  pro: [
    "5 sites web",
    "Pages illimitées",
    "Tous les thèmes & templates",
    "Formulaires avancés & réservation en ligne",
    "Blog illimité",
    "Catalogue produits illimité",
    "Analytics avancées",
    "Domaine personnalisé",
    "Sans branding Batiste",
    "Support prioritaire",
  ],
  agency: [
    "Sites illimités",
    "Pages illimitées",
    "Tous les thèmes & templates",
    "Tout ce qui est inclus dans Pro",
    "5 membres par site",
    "API accès développeur",
    "White-label complet",
    "Support dédié & onboarding",
  ],
};

const PLANS = [
  { key: "starter" as const, badge: null },
  { key: "pro" as const, badge: "Populaire" },
  { key: "agency" as const, badge: null },
];

interface BillingClientProps {
  currentPlanId: string | null;
  status: string | null;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date | null;
  hasSubscription: boolean;
}

export default function BillingClient({
  currentPlanId,
  cancelAtPeriodEnd,
  currentPeriodEnd,
  hasSubscription,
}: BillingClientProps) {
  const [yearly, setYearly] = useState(false);
  const { pending, loadingPlan, handleCheckout, handlePortal } =
    useBillingActions(yearly);

  return (
    <div className="space-y-8">
      {hasSubscription && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Abonnement actif ·{" "}
              <span className="capitalize text-zinc-600">
                {currentPlanId ?? "Gratuit"}
              </span>
            </p>
            {currentPeriodEnd && (
              <p className="mt-0.5 text-xs text-zinc-500">
                {cancelAtPeriodEnd
                  ? `Se termine le ${new Date(currentPeriodEnd).toLocaleDateString("fr-FR")}`
                  : `Renouvellement le ${new Date(currentPeriodEnd).toLocaleDateString("fr-FR")}`}
              </p>
            )}
          </div>
          <Button variant="outline" onClick={handlePortal} loading={pending}>
            Gérer l'abonnement
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          Choisissez votre formule
        </h2>
        <p className="text-sm text-zinc-500 max-w-md">
          Commencez gratuitement pendant 14 jours, aucune carte bancaire requise.
        </p>
        <BillingToggle yearly={yearly} onToggle={setYearly} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {PLANS.map(({ key, badge }) => (
          <BillingPlanCard
            key={key}
            planKey={key}
            plan={STRIPE_PLANS[key]}
            badge={badge}
            yearly={yearly}
            isCurrentPlan={currentPlanId === key}
            features={PLAN_FEATURES[key] ?? []}
            pending={pending}
            isLoadingPlan={loadingPlan === key}
            onCheckout={handleCheckout}
          />
        ))}
      </div>

      <p className="text-center text-xs text-zinc-400">
        Paiements sécurisés par Stripe · Résiliation à tout moment · Essai gratuit 14 jours
      </p>
    </div>
  );
}
