export interface ThemeOverrideValues {
  colorPrimary: string;
  colorOnPrimary: string;
  colorBackground: string;
  colorSurface: string;
  colorText: string;
  colorMuted: string;
  colorBorder: string;
  colorAccent: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string;
}

export const GOOGLE_FONTS = [
  "'Inter', sans-serif",
  "'Outfit', sans-serif",
  "'Plus Jakarta Sans', sans-serif",
  "'DM Sans', sans-serif",
  "'Space Grotesk', sans-serif",
  "'Playfair Display', serif",
  "'Lora', serif",
  "'Cormorant Garamond', serif",
  "'Syne', sans-serif",
  "'Poppins', sans-serif",
];

export const RADIUS_OPTIONS = [
  { label: "Carré", value: "0px" },
  { label: "Doux", value: "0.375rem" },
  { label: "Moyen", value: "0.75rem" },
  { label: "Grand", value: "1rem" },
  { label: "Pilule", value: "9999px" },
];
