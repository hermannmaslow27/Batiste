import {
  Globe2,
  Inbox,
  Languages,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function MarketingFeatureBento() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-semibold text-zinc-700 shadow-2xs">
          <Sparkles className="size-3 text-indigo-600" />
          Ingénierie & Performance
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
          Les super-pouvoirs de la plateforme
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
          Pensé de zéro pour offrir une vélocité sans compromis, de la conception à la publication en ligne.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Multi-tenant (wide) */}
        <div className="sm:col-span-2 rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm transition hover:shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="pointer-events-none absolute -right-10 -bottom-10 size-60 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all" />
          <div>
            <span className="flex size-10 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
              <Globe2 className="size-5" />
            </span>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900">
              Multi-tenancy & Sous-domaines instantanés
            </h3>
            <p className="mt-2 text-sm text-zinc-600 max-w-xl leading-relaxed">
              Chaque site dispose instantanément de son sous-domaine sécurisé (ex: <code className="font-mono text-zinc-800 bg-zinc-100 px-1.5 py-0.5 rounded text-xs">boutique.batiste.app</code>) et est prêt à accueillir vos noms de domaine personnalisés avec SSL automatique.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 font-mono text-xs text-zinc-600 flex items-center justify-between">
            <span className="text-zinc-400">DNS Proxy Router</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Sub-millisecond resolution
            </span>
          </div>
        </div>

        {/* Card 2: Edge Speed */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm transition hover:shadow-lg flex flex-col justify-between">
          <div>
            <span className="flex size-10 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
              <Zap className="size-5 text-amber-400" />
            </span>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900">
              Vitesse Edge sub-300ms
            </h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Propulsé par Next.js 16 et servi au plus près de vos visiteurs. Vos pages s'affichent à la vitesse de l'éclair avec un score SEO 100/100.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Score Google Lighthouse</span>
            <span className="text-emerald-600 font-bold">100/100</span>
          </div>
        </div>

        {/* Card 3: Multilingual native */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm transition hover:shadow-lg flex flex-col justify-between">
          <div>
            <span className="flex size-10 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
              <Languages className="size-5 text-indigo-400" />
            </span>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900">
              Multilingue natif (FR & EN)
            </h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Vos pages, articles de blog et fiches produits existent en plusieurs langues sans plugin lourd. Un sélecteur fluide s'intègre automatiquement.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs">
            <span className="rounded bg-zinc-100 px-2 py-1 font-bold text-zinc-700">FR</span>
            <span className="rounded bg-zinc-100 px-2 py-1 font-bold text-zinc-700">EN</span>
            <span className="text-zinc-400 ml-auto">Traduction 1-clic</span>
          </div>
        </div>

        {/* Card 4: Unified Inbox */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm transition hover:shadow-lg flex flex-col justify-between">
          <div>
            <span className="flex size-10 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
              <Inbox className="size-5 text-emerald-400" />
            </span>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900">
              Boîte de réception unifiée
            </h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Chaque formulaire de contact, devis ou demande de réservation atterrit directement dans votre boîte de messages avec alertes et statut de traitement.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 text-xs text-zinc-400 font-medium">
            Zéro perte de prospect, notifications en temps réel
          </div>
        </div>

        {/* Card 5: Complete Theme engine */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm transition hover:shadow-lg flex flex-col justify-between">
          <div>
            <span className="flex size-10 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
              <Palette className="size-5 text-rose-400" />
            </span>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900">
              Moteur de thèmes universel
            </h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Harmonisez vos couleurs, polices Google Fonts et arrondis. Changez d'univers graphique en un clic sans jamais perdre votre contenu.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 text-xs text-zinc-400 font-medium">
            Cohérence graphique garantie sur 100% des pages
          </div>
        </div>
      </div>
    </div>
  );
}
