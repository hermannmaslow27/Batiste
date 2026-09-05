export function getHeroVariantStyles(
  variant: string,
  hasImage: boolean,
): { background?: string; color?: string } {
  if (hasImage) return { color: "#ffffff" };

  switch (variant) {
    case "dark":
      return { background: "#09090b", color: "#fafafa" };
    case "gradient":
      return {
        background:
          "linear-gradient(135deg, var(--c-surface, #f4f4f5) 0%, var(--c-bg, #ffffff) 100%)",
      };
    case "surface":
      return { background: "var(--c-surface, #f4f4f5)" };
    default:
      return { background: "var(--c-bg, #ffffff)" };
  }
}
