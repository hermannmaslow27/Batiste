import type { ColorTheme } from "./showcaseData";

export default function ArtisanPreview({ activeTheme }: { activeTheme: ColorTheme }) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
          Savoir-faire d'excellence depuis 2014
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
          L'Atelier No17 — Créations sur-mesure
        </h2>
        <p className="text-xs text-zinc-600">
          Restauration de meubles anciens et aménagement d'intérieurs personnalisés.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">
            Prendre un rendez-vous à l'atelier
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Consultation de 45 minutes pour étudier votre projet et vos plans.
          </p>
        </div>
        <span
          className="rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-xs cursor-pointer"
          style={{ backgroundColor: activeTheme.primary }}
        >
          Choisir un créneau
        </span>
      </div>
    </div>
  );
}
