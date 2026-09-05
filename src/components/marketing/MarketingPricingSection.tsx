"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function MarketingPricingSection({ locale }: { locale: string }) {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Découverte",
      price: "0€",
      period: "gratuit pour toujours",
      desc: "Idéal pour explorer la plateforme et concevoir votre premier site.",
      features: [
        "1 site actif complet",
        "Sous-domaine .batiste.app sécurisé",
        "Jusqu'à 5 pages et articles",
        "Formulaires de contact intégrés",
        "Support communautaire",
      ],
      cta: "Commencer gratuitement",
      highlight: false,
    },
    {
      name: "Professionnel",
      price: annual ? "19€" : "24€",
      period: "/mois",
      desc: "Pour les entrepreneurs, créateurs et agences qui veulent performer.",
      features: [
        "Jusqu'à 5 sites personnalisés",
        "Nom de domaine propre (ex: votrenom.fr)",
        "Pages et articles illimités",
        "Module Catalogue & Prise de RDV",
        "Analytics d'audience en direct",
        "Suppression du badge Batiste",
        "Support prioritaire 7j/7",
      ],
      cta: "Essayer 14 jours gratuitement",
      highlight: true,
      popularBadge: "Recommandé",
    },
    {
      name: "Entreprise",
      price: annual ? "69€" : "79€",
      period: "/mois",
      desc: "Pour les équipes exigeantes avec plusieurs marques et collaborateurs.",
      features: [
        "Sites et pages illimités",
        "Gestion multi-utilisateurs & rôles",
        "Export de données & Webhooks",
        "Sécurité avancée & sauvegardes horaires",
        "Accompagnement & onboarding dédié",
      ],
      cta: "Contacter l'équipe",
      highlight: false,
    },
  ];

  return (
    <div id="tarifs" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Tarification simple
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
          Un prix transparent, sans coûts cachés
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600">
          Commencez gratuitement et faites évoluer votre formule au rythme de votre croissance.
        </p>

        {/* Toggle Mensuel / Annuel */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              !annual ? "bg-zinc-900 text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Mensuel
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              annual ? "bg-zinc-900 text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Annuel
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 transition-all relative flex flex-col justify-between ${
              p.highlight
                ? "border-2 border-zinc-900 bg-white shadow-xl scale-[1.02] z-10"
                : "border border-zinc-200 bg-white/80 shadow-xs hover:shadow-md"
            }`}
          >
            {p.popularBadge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-3.5 py-1 text-[11px] font-bold text-white tracking-wide shadow-sm">
                {p.popularBadge}
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-zinc-900">{p.name}</h3>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed min-h-[36px]">
                {p.desc}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900">
                  {p.price}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {p.period}
                </span>
              </div>

              <ul className="mt-8 space-y-3 border-t border-zinc-100 pt-6 text-xs text-zinc-700">
                {p.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                      <Check className="size-2.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href={`/${locale}/register`}
                className={`block w-full rounded-xl py-3 text-center text-xs font-bold transition shadow-xs ${
                  p.highlight
                    ? "bg-zinc-900 text-white hover:bg-zinc-800 shadow-md"
                    : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
