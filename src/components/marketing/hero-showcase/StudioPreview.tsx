import type { ColorTheme } from "./showcaseData";

export default function StudioPreview({ activeTheme }: { activeTheme: ColorTheme }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200/80 pb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Studio Design & Direction Artistique
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mt-1">
            Nous façonnons des marques inoubliables
          </h2>
        </div>
        <span
          className="rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs"
          style={{ backgroundColor: activeTheme.primary }}
        >
          Discuter d'un projet
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
            Branding & UI/UX
          </span>
          <h3 className="text-sm font-bold text-zinc-900">
            Refonte d'identité pour la FinTech Kora
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Stratégie de marque complète, design system et landing page à forte conversion.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
            Campagne Digitale
          </span>
          <h3 className="text-sm font-bold text-zinc-900">
            Lancement de collection pour Maison Noire
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Expérience immersive 3D, typographie de caractère et direction photo.
          </p>
        </div>
      </div>
    </div>
  );
}
