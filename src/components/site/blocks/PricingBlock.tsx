"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { type BlockProps, str, list, blockHref } from "./types";
import { Section, Heading } from "./wrappers";

interface PlanItem {
  name?: unknown;
  price?: unknown;
  period?: unknown;
  description?: unknown;
  buttonText?: unknown;
  buttonUrl?: unknown;
  isPopular?: unknown;
  popularBadge?: unknown;
  featuresList?: unknown;
}

export default function PricingBlock({ content, ctx }: BlockProps) {
  const [annual, setAnnual] = useState(false);
  const showToggle = content.billingPeriod !== "monthly_only";
  const plans = list<PlanItem>(content.plans);

  return (
    <Section surface>
      <div className="text-center">
        {str(content.title) && (
          <Heading data-anim="up">
            {str(content.title, "Des tarifs clairs et transparents")}
          </Heading>
        )}
        {str(content.subtitle) && (
          <p
            data-anim="up"
            data-delay="0.1"
            className="site-muted mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed"
          >
            {str(content.subtitle)}
          </p>
        )}

        {showToggle && (
          <div
            data-anim="up"
            data-delay="0.15"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-zinc-200/90 bg-white p-1 shadow-xs"
          >
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                !annual
                  ? "bg-zinc-900 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                annual
                  ? "bg-zinc-900 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Annuel
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                -20%
              </span>
            </button>
          </div>
        )}
      </div>

      <div
        className={`mt-12 grid gap-6 ${
          plans.length === 1
            ? "mx-auto max-w-md"
            : plans.length === 2
            ? "mx-auto max-w-3xl sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {plans.map((plan, index) => {
          const isPopular = Boolean(plan.isPopular);
          const rawPrice = str(plan.price, "29€");
          // Calculate annual discount if price is a number
          const numericPrice = parseInt(rawPrice.replace(/[^\d]/g, ""), 10);
          const displayPrice =
            annual && !isNaN(numericPrice)
              ? `${Math.round(numericPrice * 0.8)}€`
              : rawPrice;
          const displayPeriod = annual ? "/mois (facturé à l'année)" : str(plan.period, "/mois");

          const features = str(plan.featuresList)
            ? str(plan.featuresList)
                .split("\n")
                .map((f) => f.trim())
                .filter(Boolean)
            : [];

          return (
            <div
              key={index}
              data-anim="up"
              data-delay={String(index * 0.1)}
              className={`site-card relative flex flex-col justify-between overflow-hidden p-7 transition-all hover:shadow-xl ${
                isPopular
                  ? "ring-2 ring-zinc-900 shadow-md scale-[1.02] bg-white z-10"
                  : "bg-white/80"
              }`}
            >
              {isPopular && (
                <span className="absolute top-0 right-0 rounded-bl-xl bg-zinc-900 px-3.5 py-1 text-[11px] font-semibold text-white tracking-wide">
                  {str(plan.popularBadge, "Populaire")}
                </span>
              )}

              <div>
                <h3 className="site-heading text-[19px] font-bold">
                  {str(plan.name, "Formule")}
                </h3>
                {str(plan.description) && (
                  <p className="site-muted mt-2 text-[13px] leading-relaxed">
                    {str(plan.description)}
                  </p>
                )}

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="site-heading text-4xl font-extrabold tracking-tight">
                    {displayPrice}
                  </span>
                  <span className="site-muted text-xs font-medium">
                    {displayPeriod}
                  </span>
                </div>

                {features.length > 0 && (
                  <ul className="mt-7 space-y-3 border-t border-zinc-100 pt-6 text-[13.5px]">
                    {features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                          <Check className="size-2.5" />
                        </span>
                        <span className="text-zinc-700 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-8 pt-4">
                <a
                  href={blockHref(str(plan.buttonUrl, "/contact"), ctx.publicPrefix)}
                  className={`w-full rounded-xl py-3 text-center text-sm font-semibold transition-all inline-block ${
                    isPopular
                      ? "site-button shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                      : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 hover:border-zinc-400"
                  }`}
                >
                  {str(plan.buttonText, "Choisir cette formule")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
