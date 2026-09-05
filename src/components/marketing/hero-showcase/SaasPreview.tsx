import { ArrowRight, BarChart3, Check, Sparkles, Zap } from "lucide-react";
import type { ColorTheme } from "./showcaseData";

export default function SaasPreview({ activeTheme }: { activeTheme: ColorTheme }) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-xs"
          style={{ backgroundColor: activeTheme.primary }}
        >
          <Sparkles className="size-3" />
          SaaS V2.0 est disponible
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight">
          La plateforme analytique nouvelle génération
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Automatisez vos flux de travail et pilotez votre croissance avec des données temps réel.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer hover:opacity-90"
            style={{ backgroundColor: activeTheme.primary }}
          >
            Démarrer gratuitement
            <ArrowRight className="size-3.5" />
          </span>
          <span className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-800 shadow-xs">
            Voir la démo
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 pt-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold">Temps de réponse</span>
            <Zap className="size-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">18ms</div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Optimisé sur le réseau Edge mondial.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold">Score Lighthouse</span>
            <BarChart3 className="size-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">100 / 100</div>
          <p className="text-[11px] text-zinc-500 mt-1">
            SEO, accessibilité et performance max.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold">Conversion</span>
            <Check className="size-3.5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">+42%</div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Formulaires et tunnels optimisés.
          </p>
        </div>
      </div>
    </div>
  );
}
