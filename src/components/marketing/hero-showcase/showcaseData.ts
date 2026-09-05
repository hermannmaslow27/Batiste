export type TemplateKey = "saas" | "studio" | "boutique" | "artisan";

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  surface: string;
  accent: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    primary: "#18181b",
    surface: "#f4f4f5",
    accent: "#6366f1",
  },
  {
    id: "indigo",
    name: "Indigo",
    primary: "#4f46e5",
    surface: "#eef2ff",
    accent: "#818cf8",
  },
  {
    id: "emerald",
    name: "Émeraude",
    primary: "#059669",
    surface: "#ecfdf5",
    accent: "#34d399",
  },
  {
    id: "coral",
    name: "Terre Cuite",
    primary: "#ea580c",
    surface: "#fff7ed",
    accent: "#fb923c",
  },
];
