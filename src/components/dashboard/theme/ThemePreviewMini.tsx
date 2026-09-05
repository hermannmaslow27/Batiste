import type { ThemeOverrideValues } from "./types";

export default function ThemePreviewMini({
  overrides,
}: {
  overrides: ThemeOverrideValues;
}) {
  const previewStyle = {
    "--c-primary": overrides.colorPrimary,
    "--c-on-primary": overrides.colorOnPrimary,
    "--c-bg": overrides.colorBackground,
    "--c-surface": overrides.colorSurface,
    "--c-text": overrides.colorText,
    "--c-muted": overrides.colorMuted,
    "--c-border": overrides.colorBorder,
    "--c-accent": overrides.colorAccent,
    "--radius": overrides.borderRadius,
    backgroundColor: overrides.colorBackground,
    color: overrides.colorText,
    fontFamily: overrides.fontBody,
  } as React.CSSProperties;

  return (
    <div
      className="relative overflow-hidden rounded-xl border p-5 shadow-inner"
      style={previewStyle}
    >
      <div
        className="mb-3 inline-flex rounded-full px-3 py-0.5 text-[11px] font-medium"
        style={{
          background: overrides.colorSurface,
          color: overrides.colorMuted,
          border: `1px solid ${overrides.colorBorder}`,
        }}
      >
        ✨ Aperçu en direct
      </div>
      <h3
        className="text-xl font-bold leading-snug mb-2"
        style={{ fontFamily: overrides.fontHeading, color: overrides.colorText }}
      >
        Votre site vitrine
      </h3>
      <p className="text-sm mb-4" style={{ color: overrides.colorMuted }}>
        Une phrase d'accroche claire et percutante pour séduire vos visiteurs.
      </p>
      <span
        className="inline-block px-5 py-2.5 text-sm font-semibold shadow-sm"
        style={{
          background: overrides.colorPrimary,
          color: overrides.colorOnPrimary,
          borderRadius: overrides.borderRadius,
        }}
      >
        En savoir plus
      </span>
    </div>
  );
}
