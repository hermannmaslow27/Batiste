import {
  ArrowRight,
  Briefcase,
  Layers,
  Palette,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";

export default function MarketingUseCases() {
  const useCases = [
    {
      title: "Landing Pages SaaS & Tech",
      desc: "Présentez votre produit avec des grilles Bento, des tableaux de tarification réactifs, des démos interactives et des formulaires d'inscription.",
      icon: Zap,
      tags: ["Pricing Tables", "Bento Grid", "Waitlist", "Edge Fast"],
      bg: "bg-indigo-50/50",
    },
    {
      title: "Studios & Agences Créatives",
      desc: "Sublimez vos réalisations avec des grilles asymétriques, des études de cas immersives, des témoignages clients et des demandes de devis.",
      icon: Sparkles,
      tags: ["Showcase", "Devis en ligne", "Avis vérifiés", "Dark Mode"],
      bg: "bg-purple-50/50",
    },
    {
      title: "Boutiques & Commerces",
      desc: "Exposez vos produits avec fiches personnalisées, gestion de collections, badges de nouveautés et tunnel de contact immédiat.",
      icon: ShoppingBag,
      tags: ["Catalogue", "Attributs libres", "Catégories", "Mobile Ready"],
      bg: "bg-emerald-50/50",
    },
    {
      title: "Artisans, Consultants & Services",
      desc: "Mettez en avant votre savoir-faire d'excellence, vos horaires d'ouverture et permettez à vos clients de réserver un rendez-vous en ligne.",
      icon: Briefcase,
      tags: ["Prise de RDV", "Présentation équipe", "Avis clients", "Localisation"],
      bg: "bg-amber-50/50",
    },
  ];

  return (
    <div className="border-y border-zinc-200/80 bg-zinc-50/70 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Une flexibilité sans limite
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Conçu pour donner vie à n'importe quel projet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Que vous lanciez une startup logicielle, un studio d'architecture, une boutique de créateur ou un cabinet de conseil.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {useCases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xs transition hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 border-t border-zinc-100 pt-5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
