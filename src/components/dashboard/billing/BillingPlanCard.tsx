import { cn } from "@/lib/utils";
import type { StripePlanKey, STRIPE_PLANS } from "@/lib/stripe";

type StripePlanConfig = (typeof STRIPE_PLANS)[StripePlanKey];

interface BillingPlanCardProps {
  planKey: "starter" | "pro" | "agency";
  plan: StripePlanConfig;
  badge: string | null;
  yearly: boolean;
  isCurrentPlan: boolean;
  features: string[];
  pending: boolean;
  isLoadingPlan: boolean;
  onCheckout: (key: "starter" | "pro" | "agency") => void;
}

export default function BillingPlanCard({
  planKey,
  plan,
  badge,
  yearly,
  isCurrentPlan,
  features,
  pending,
  isLoadingPlan,
  onCheckout,
}: BillingPlanCardProps) {
  const price = yearly ? plan.priceYearly / 100 : plan.priceMonthly / 100;
  const monthlyEquivalent = yearly ? (plan.priceYearly / 12 / 100).toFixed(0) : null;
  const isPro = planKey === "pro";

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-all",
        isPro
          ? "border-zinc-900 bg-zinc-900 text-white shadow-xl shadow-zinc-900/20"
          : "border-zinc-200 bg-white shadow-sm",
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
            {badge}
          </span>
        </div>
      )}

      <div>
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wider",
            isPro ? "text-zinc-400" : "text-zinc-500",
          )}
        >
          {plan.name}
        </p>
        <div className="mt-3 flex items-baseline gap-1">
          <span
            className={cn(
              "text-4xl font-bold tracking-tight",
              isPro ? "text-white" : "text-zinc-900",
            )}
          >
            {price === 0 ? "Gratuit" : `${price}€`}
          </span>
          {price > 0 && (
            <span className={cn("text-sm", isPro ? "text-zinc-400" : "text-zinc-500")}>
              /{yearly ? "an" : "mois"}
            </span>
          )}
        </div>
        {monthlyEquivalent && (
          <p className={cn("mt-0.5 text-xs", isPro ? "text-zinc-400" : "text-zinc-500")}>
            soit {monthlyEquivalent}€/mois
          </p>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm">
            <span
              className={cn(
                "mt-0.5 shrink-0 text-base",
                isPro ? "text-emerald-400" : "text-emerald-600",
              )}
            >
              ✓
            </span>
            <span className={isPro ? "text-zinc-300" : "text-zinc-600"}>{feat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {isCurrentPlan ? (
          <button
            disabled
            className={cn(
              "w-full rounded-xl py-3 text-sm font-semibold opacity-60",
              isPro ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-600",
            )}
          >
            Formule actuelle
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onCheckout(planKey)}
            disabled={pending}
            className={cn(
              "w-full rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50",
              isPro
                ? "bg-white text-zinc-900 shadow-md"
                : "bg-zinc-900 text-white",
            )}
          >
            {isLoadingPlan ? "Chargement…" : "Commencer l'essai gratuit"}
          </button>
        )}
      </div>
    </div>
  );
}
