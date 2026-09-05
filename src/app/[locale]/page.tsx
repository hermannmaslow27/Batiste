import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { getMessages } from "@/i18n/messages";
import { DEFAULT_THEMES } from "@/lib/themes";
import {
  AnimatedNav,
  AnimatedHero,
  AnimatedSection,
  AnimatedGrid,
} from "@/components/marketing/MarketingAnimations";
import MarketingHeroShowcase from "@/components/marketing/MarketingHeroShowcase";
import MarketingFeatureBento from "@/components/marketing/MarketingFeatureBento";
import MarketingUseCases from "@/components/marketing/MarketingUseCases";
import MarketingPricingSection from "@/components/marketing/MarketingPricingSection";
import MarketingFaqSection from "@/components/marketing/MarketingFaqSection";

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale);
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* ────────────────── Floating Glass Navbar ────────────────── */}
      <AnimatedNav>
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
            <span className="flex size-8 items-center justify-center rounded-xl bg-zinc-900 text-[13px] font-bold text-white shadow-sm transition-transform group-hover:scale-105 group-hover:rotate-3">
              B
            </span>
            <span className="text-[16px] font-bold tracking-tight text-zinc-950">
              Batiste
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-600">
            <a href="#demo" className="transition hover:text-zinc-950">
              Démo Studio
            </a>
            <a href="#usages" className="transition hover:text-zinc-950">
              Cas d'usage
            </a>
            <a href="#fonctionnalites" className="transition hover:text-zinc-950">
              Fonctionnalités
            </a>
            <a href="#themes" className="transition hover:text-zinc-950">
              Thèmes
            </a>
            <a href="#tarifs" className="transition hover:text-zinc-950">
              Tarifs
            </a>
            <a href="#faq" className="transition hover:text-zinc-950">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${otherLocale}`}
              className="rounded-full px-2.5 py-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/login`}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
            >
              Connexion
            </Link>
            <Link
              href={`/${locale}/register`}
              className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-zinc-800 hover:scale-102 active:scale-98"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </AnimatedNav>

      {/* ────────────────── Hero Section ────────────────── */}
      <AnimatedHero>
        {/* Subtle atmospheric ambient glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(55%_100%_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-linear-to-b from-indigo-100/40 via-purple-50/20 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-32 text-center sm:pb-24 sm:pt-40">
          <span
            data-hero-badge
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-4 py-1.5 text-xs font-semibold text-indigo-900 shadow-xs backdrop-blur-md"
          >
            <span className="size-2 rounded-full bg-indigo-500 animate-pulse" />
            La plateforme universelle de création de sites & apps
          </span>

          <h1
            data-hero-title
            className="mt-7 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08]"
          >
            Créez n'importe quel site ou web app.
            <br />
            <span className="bg-linear-to-r from-zinc-900 via-zinc-600 to-zinc-400 bg-clip-text text-transparent">
              En quelques minutes, sans agence.
            </span>
          </h1>

          <p
            data-hero-subtitle
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600"
          >
            Du SaaS tech à la vitrine d'artisan, de la boutique e-commerce au portfolio de studio créatif : concevez des expériences web percutantes, multilingues et ultra-rapides sans toucher une ligne de code.
          </p>

          <div
            data-hero-buttons
            className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800 hover:scale-103 active:scale-98"
            >
              Créer mon espace gratuitement
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-800 shadow-2xs transition hover:border-zinc-400 hover:bg-zinc-50 hover:scale-102 active:scale-98"
            >
              Tester le studio en direct
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Sans carte bancaire
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Sous-domaine instantané
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Score 100/100 Edge
            </span>
          </div>

          {/* Interactive Studio Sandbox */}
          <div id="demo" data-hero-preview className="pt-8">
            <MarketingHeroShowcase locale={locale} />
          </div>
        </div>
      </AnimatedHero>

      {/* ────────────────── Trust Bar / Social Proof ────────────────── */}
      <div className="border-y border-zinc-200/70 bg-zinc-50/70 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Adopté par plus de 1 200 créateurs, fondateurs et professionnels
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 font-semibold text-sm text-zinc-400">
            <span className="hover:text-zinc-700 transition">Atelier No17</span>
            <span className="hover:text-zinc-700 transition">NovaTech SaaS</span>
            <span className="hover:text-zinc-700 transition">Studio Pulse</span>
            <span className="hover:text-zinc-700 transition">Horizon Conseil</span>
            <span className="hover:text-zinc-700 transition">Maison Chloé</span>
          </div>
        </div>
      </div>

      {/* ────────────────── Use Cases Section ────────────────── */}
      <div id="usages">
        <MarketingUseCases />
      </div>

      {/* ────────────────── Superpowers Bento Section ────────────────── */}
      <div id="fonctionnalites">
        <MarketingFeatureBento />
      </div>

      {/* ────────────────── Themes Section ────────────────── */}
      <AnimatedSection id="themes" className="border-t border-zinc-200/80 bg-zinc-50/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14" data-anim="up">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Univers graphiques complets
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Un design system taillé pour votre personnalité
            </h2>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
              Passez d'un univers à l'autre en un clic. Vos contenus s'adaptent instantanément avec des polices et des contrastes parfaitement calibrés.
            </p>
          </div>

          <AnimatedGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEFAULT_THEMES.map((theme) => (
              <div
                key={theme.id}
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div
                  className="flex h-36 flex-col justify-end p-5 transition-transform group-hover:scale-102"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <div
                    className="h-3 w-3/4 rounded-full transition-all group-hover:w-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="mt-2 h-2.5 w-1/2 rounded-full opacity-40"
                    style={{ backgroundColor: theme.colors.text }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-zinc-900">{theme.name}</h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </div>
            ))}
          </AnimatedGrid>
        </div>
      </AnimatedSection>

      {/* ────────────────── Pricing Section ────────────────── */}
      <MarketingPricingSection locale={locale} />

      {/* ────────────────── FAQ Section ────────────────── */}
      <MarketingFaqSection />

      {/* ────────────────── Final CTA Section ────────────────── */}
      <AnimatedSection className="relative overflow-hidden bg-zinc-950 py-24 text-white">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.25),transparent_70%)] blur-2xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md mb-6">
            <Sparkles className="size-3.5 text-indigo-400" />
            Rejoignez la nouvelle génération de créateurs
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Prêt à lancer votre prochain grand projet ?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed">
            Créez votre espace en 30 secondes. Aucune carte bancaire requise, hébergement et sous-domaine inclus gratuitement.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-zinc-950 shadow-xl transition hover:bg-zinc-100 hover:scale-104 active:scale-98"
            >
              Démarrer gratuitement
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ────────────────── Footer ────────────────── */}
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-12 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-lg bg-zinc-900 text-[11px] font-bold text-white">
            B
          </span>
          <span className="font-bold text-zinc-900">Batiste</span>
          <span>— Plateforme universelle de conception de sites & applications.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#demo" className="hover:text-zinc-900 transition">
            Démo
          </a>
          <a href="#tarifs" className="hover:text-zinc-900 transition">
            Tarifs
          </a>
          <a href="#faq" className="hover:text-zinc-900 transition">
            FAQ
          </a>
          <span>© {new Date().getFullYear()} Batiste. Tous droits réservés.</span>
        </div>
      </footer>
    </div>
  );
}
