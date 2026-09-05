"use client";

import { Button, Card, CardBody, CardHeader, Field } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ThemeOverrideValues } from "./theme/types";
import { GOOGLE_FONTS, RADIUS_OPTIONS } from "./theme/types";
import { useThemeOverrides } from "./theme/useThemeOverrides";
import ColorSwatch from "./theme/ColorSwatch";
import ThemePreviewMini from "./theme/ThemePreviewMini";

export type { ThemeOverrideValues };

export interface ThemeCustomizerProps {
  siteId: string;
  themeId: string;
  initialOverrides?: Partial<ThemeOverrideValues> | null;
}

export default function ThemeCustomizer({
  siteId,
  themeId,
  initialOverrides,
}: ThemeCustomizerProps) {
  const { overrides, set, save, reset, pending } = useThemeOverrides(
    siteId,
    themeId,
    initialOverrides,
  );

  return (
    <Card>
      <CardHeader title="Personnaliser les couleurs & polices" />
      <CardBody className="space-y-6">
        <ThemePreviewMini overrides={overrides} />

        <div>
          <p className="text-[12px] uppercase tracking-wider text-zinc-400 font-semibold mb-3">
            Couleurs
          </p>
          <div className="space-y-3">
            <ColorSwatch label="Couleur principale" value={overrides.colorPrimary} onChange={set("colorPrimary")} />
            <ColorSwatch label="Texte sur principal" value={overrides.colorOnPrimary} onChange={set("colorOnPrimary")} />
            <ColorSwatch label="Arrière-plan" value={overrides.colorBackground} onChange={set("colorBackground")} />
            <ColorSwatch label="Surface / Carte" value={overrides.colorSurface} onChange={set("colorSurface")} />
            <ColorSwatch label="Texte" value={overrides.colorText} onChange={set("colorText")} />
            <ColorSwatch label="Texte discret" value={overrides.colorMuted} onChange={set("colorMuted")} />
            <ColorSwatch label="Bordure" value={overrides.colorBorder} onChange={set("colorBorder")} />
            <ColorSwatch label="Accent" value={overrides.colorAccent} onChange={set("colorAccent")} />
          </div>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-wider text-zinc-400 font-semibold mb-3">
            Typographies
          </p>
          <div className="space-y-3">
            <Field label="Police des titres">
              <select
                value={overrides.fontHeading}
                onChange={(e) => set("fontHeading")(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              >
                {GOOGLE_FONTS.map((f) => (
                  <option key={f} value={f} style={{ fontFamily: f }}>
                    {f.replace(/['"]/g, "").split(",")[0]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Police du corps">
              <select
                value={overrides.fontBody}
                onChange={(e) => set("fontBody")(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              >
                {GOOGLE_FONTS.map((f) => (
                  <option key={f} value={f} style={{ fontFamily: f }}>
                    {f.replace(/['"]/g, "").split(",")[0]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-wider text-zinc-400 font-semibold mb-3">
            Arrondi des coins
          </p>
          <div className="flex flex-wrap gap-2">
            {RADIUS_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => set("borderRadius")(value)}
                className={cn(
                  "border px-3 py-1.5 text-[12px] font-medium transition-all",
                  overrides.borderRadius === value
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-400",
                )}
                style={{ borderRadius: value }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-zinc-100">
          <Button variant="ghost" onClick={reset} disabled={pending}>
            Réinitialiser
          </Button>
          <Button onClick={save} loading={pending}>
            {pending ? "Enregistrement…" : "Enregistrer les changements"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
