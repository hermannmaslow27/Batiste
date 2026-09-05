export interface ThemeColors {
  primary: string;
  onPrimary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: string;
  swatch: string[];
}

export const DEFAULT_THEMES: ThemeConfig[] = [
  {
    id: "minimal",
    name: "Minimal Chic",
    description: "Épuré, typographique, monochrome et moderne.",
    colors: {
      primary: "#111111",
      onPrimary: "#FFFFFF",
      background: "#FFFFFF",
      surface: "#F6F6F5",
      text: "#111111",
      muted: "#6B7280",
      border: "#E5E5E3",
      accent: "#111111",
    },
    fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
    borderRadius: "0.5rem",
    swatch: ["#111111", "#F6F6F5", "#FFFFFF"],
  },
  {
    id: "warm",
    name: "Chaleureux & Terre",
    description: "Tons terre cuite et serif élégante pour la gastronomie et l'artisanat.",
    colors: {
      primary: "#9A3412",
      onPrimary: "#FFF7ED",
      background: "#FFFBF5",
      surface: "#FDF0E2",
      text: "#3B1E10",
      muted: "#8A6A55",
      border: "#EEDCC8",
      accent: "#C2410C",
    },
    fonts: { heading: "'Playfair Display', serif", body: "'Lora', serif" },
    borderRadius: "1rem",
    swatch: ["#9A3412", "#FDF0E2", "#FFFBF5"],
  },
  {
    id: "corporate",
    name: "Corporate Pro",
    description: "Sérieux, lisible et rassurant pour cabinets et entreprises.",
    colors: {
      primary: "#1D4ED8",
      onPrimary: "#FFFFFF",
      background: "#FFFFFF",
      surface: "#F8FAFC",
      text: "#0F172A",
      muted: "#64748B",
      border: "#E2E8F0",
      accent: "#0EA5E9",
    },
    fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
    borderRadius: "0.375rem",
    swatch: ["#1D4ED8", "#F8FAFC", "#FFFFFF"],
  },
  {
    id: "bold",
    name: "Audacieux Violet",
    description: "Fond sombre contrasté avec reflets violets et accents ambre.",
    colors: {
      primary: "#8B5CF6",
      onPrimary: "#12101E",
      background: "#0E0D16",
      surface: "#1A1826",
      text: "#F5F3FF",
      muted: "#A5A0BC",
      border: "#2A2740",
      accent: "#FBBF24",
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'DM Sans', sans-serif",
    },
    borderRadius: "0.875rem",
    swatch: ["#8B5CF6", "#1A1826", "#0E0D16"],
  },
  {
    id: "midnight",
    name: "Midnight Luxury",
    description: "Noir d'ébène prestigieux avec touches d'or chaud et finitions haute couture.",
    colors: {
      primary: "#F59E0B",
      onPrimary: "#09090B",
      background: "#09090B",
      surface: "#141416",
      text: "#FAFAFA",
      muted: "#A1A1AA",
      border: "#27272A",
      accent: "#D97706",
    },
    fonts: {
      heading: "'Plus Jakarta Sans', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "0.75rem",
    swatch: ["#F59E0B", "#141416", "#09090B"],
  },
  {
    id: "nordic",
    name: "Nordic Clean",
    description: "Douceur scandinave, tons sauge, lin et lumière naturelle.",
    colors: {
      primary: "#0F766E",
      onPrimary: "#FFFFFF",
      background: "#F8FAFC",
      surface: "#F1F5F9",
      text: "#1E293B",
      muted: "#64748B",
      border: "#E2E8F0",
      accent: "#14B8A6",
    },
    fonts: {
      heading: "'Outfit', sans-serif",
      body: "'DM Sans', sans-serif",
    },
    borderRadius: "1rem",
    swatch: ["#0F766E", "#F1F5F9", "#F8FAFC"],
  },
  {
    id: "sunset",
    name: "Sunset Vibrant",
    description: "Énergie solaire, dégradés corail et pêche, atmosphère chaleureuse.",
    colors: {
      primary: "#E11D48",
      onPrimary: "#FFFFFF",
      background: "#FFFBFB",
      surface: "#FFF1F2",
      text: "#4C0519",
      muted: "#9F1239",
      border: "#FECDD3",
      accent: "#F43F5E",
    },
    fonts: {
      heading: "'Outfit', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "1.25rem",
    swatch: ["#E11D48", "#FFF1F2", "#FFFBFB"],
  },
  {
    id: "emerald",
    name: "Botanique Émeraude",
    description: "Fraîcheur végétale, vert forêt profond et sérénité organique.",
    colors: {
      primary: "#047857",
      onPrimary: "#FFFFFF",
      background: "#F0FDF4",
      surface: "#DCFCE7",
      text: "#064E3B",
      muted: "#059669",
      border: "#BBF7D0",
      accent: "#10B981",
    },
    fonts: {
      heading: "'Plus Jakarta Sans', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "0.875rem",
    swatch: ["#047857", "#DCFCE7", "#F0FDF4"],
  },
  {
    id: "cyber",
    name: "Cyber Neon",
    description: "Ambiance dark tech futuriste, accents cyan néon et interfaces ultra-modernes.",
    colors: {
      primary: "#06B6D4",
      onPrimary: "#080B11",
      background: "#080B11",
      surface: "#111726",
      text: "#E0F2FE",
      muted: "#7DD3FC",
      border: "#1E293B",
      accent: "#8B5CF6",
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'DM Sans', sans-serif",
    },
    borderRadius: "0.625rem",
    swatch: ["#06B6D4", "#111726", "#080B11"],
  },
  {
    id: "editorial",
    name: "Presse & Édition",
    description: "Élégance intemporelle de la typographie d'art, teintes ivoire et bordeaux.",
    colors: {
      primary: "#881337",
      onPrimary: "#FFF1F2",
      background: "#FAFAF9",
      surface: "#F5F5F4",
      text: "#1C1917",
      muted: "#78716C",
      border: "#E7E5E4",
      accent: "#BE123C",
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Lora', serif",
    },
    borderRadius: "0.25rem",
    swatch: ["#881337", "#F5F5F4", "#FAFAF9"],
  },
];

export function getThemeConfig(id: string): ThemeConfig {
  return DEFAULT_THEMES.find((t) => t.id === id) ?? DEFAULT_THEMES[0];
}

export interface ThemeOverridesInput {
  colorPrimary?: string | null;
  colorOnPrimary?: string | null;
  colorBackground?: string | null;
  colorSurface?: string | null;
  colorText?: string | null;
  colorMuted?: string | null;
  colorBorder?: string | null;
  colorAccent?: string | null;
  fontHeading?: string | null;
  fontBody?: string | null;
  borderRadius?: string | null;
  customCss?: string | null;
}

/** Turns a stored theme row and optional site overrides into inline CSS custom properties. */
export function themeStyle(
  theme: {
    colors: unknown;
    fonts: unknown;
    borderRadius: string | null;
  },
  overrides?: ThemeOverridesInput | null,
) {
  const colors = (typeof theme.colors === "string" ? JSON.parse(theme.colors) : theme.colors) as ThemeColors;
  const fonts = (typeof theme.fonts === "string" ? JSON.parse(theme.fonts) : theme.fonts) as ThemeFonts;

  const primary = overrides?.colorPrimary || colors.primary;
  const onPrimary = overrides?.colorOnPrimary || colors.onPrimary || "#fff";
  const bg = overrides?.colorBackground || colors.background;
  const surface = overrides?.colorSurface || colors.surface;
  const text = overrides?.colorText || colors.text;
  const muted = overrides?.colorMuted || colors.muted;
  const border = overrides?.colorBorder || colors.border;
  const accent = overrides?.colorAccent || colors.accent;
  const fontHeading = overrides?.fontHeading || fonts.heading;
  const fontBody = overrides?.fontBody || fonts.body;
  const radius = overrides?.borderRadius || theme.borderRadius || "0.5rem";

  return {
    "--c-primary": primary,
    "--c-on-primary": onPrimary,
    "--c-bg": bg,
    "--c-surface": surface,
    "--c-text": text,
    "--c-muted": muted,
    "--c-border": border,
    "--c-accent": accent,
    "--f-heading": fontHeading,
    "--f-body": fontBody,
    "--radius": radius,
    backgroundColor: bg,
    color: text,
    fontFamily: fontBody,
  } as React.CSSProperties;
}
