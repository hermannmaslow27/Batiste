"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  saveSiteThemeOverridesAction,
  resetSiteThemeOverridesAction,
} from "@/actions/themes";
import { getThemeConfig } from "@/lib/themes";
import type { ThemeOverrideValues } from "./types";

export function useThemeOverrides(
  siteId: string,
  themeId: string,
  initialOverrides?: Partial<ThemeOverrideValues> | null,
) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const baseTheme = getThemeConfig(themeId);

  const [overrides, setOverrides] = useState<ThemeOverrideValues>({
    colorPrimary: initialOverrides?.colorPrimary ?? baseTheme.colors.primary,
    colorOnPrimary: initialOverrides?.colorOnPrimary ?? baseTheme.colors.onPrimary,
    colorBackground: initialOverrides?.colorBackground ?? baseTheme.colors.background,
    colorSurface: initialOverrides?.colorSurface ?? baseTheme.colors.surface,
    colorText: initialOverrides?.colorText ?? baseTheme.colors.text,
    colorMuted: initialOverrides?.colorMuted ?? baseTheme.colors.muted,
    colorBorder: initialOverrides?.colorBorder ?? baseTheme.colors.border,
    colorAccent: initialOverrides?.colorAccent ?? baseTheme.colors.accent,
    fontHeading: initialOverrides?.fontHeading ?? baseTheme.fonts.heading,
    fontBody: initialOverrides?.fontBody ?? baseTheme.fonts.body,
    borderRadius: initialOverrides?.borderRadius ?? baseTheme.borderRadius,
  });

  const set = (key: keyof ThemeOverrideValues) => (val: string) =>
    setOverrides((prev) => ({ ...prev, [key]: val }));

  const save = () => {
    startTransition(async () => {
      const result = await saveSiteThemeOverridesAction({
        siteId,
        colorPrimary: overrides.colorPrimary,
        colorOnPrimary: overrides.colorOnPrimary,
        colorBackground: overrides.colorBackground,
        colorSurface: overrides.colorSurface,
        colorText: overrides.colorText,
        colorMuted: overrides.colorMuted,
        colorBorder: overrides.colorBorder,
        colorAccent: overrides.colorAccent,
        fontHeading: overrides.fontHeading,
        fontBody: overrides.fontBody,
        borderRadius: overrides.borderRadius,
      });
      if (result.ok) {
        toast.success("Personnalisation enregistrée ✓");
        router.refresh();
      } else {
        toast.error("Erreur lors de l'enregistrement");
      }
    });
  };

  const reset = () => {
    startTransition(async () => {
      const result = await resetSiteThemeOverridesAction(siteId);
      if (result.ok) {
        const base = getThemeConfig(themeId);
        setOverrides({
          colorPrimary: base.colors.primary,
          colorOnPrimary: base.colors.onPrimary,
          colorBackground: base.colors.background,
          colorSurface: base.colors.surface,
          colorText: base.colors.text,
          colorMuted: base.colors.muted,
          colorBorder: base.colors.border,
          colorAccent: base.colors.accent,
          fontHeading: base.fonts.heading,
          fontBody: base.fonts.body,
          borderRadius: base.borderRadius,
        });
        toast.success("Personnalisation réinitialisée");
        router.refresh();
      }
    });
  };

  return {
    overrides,
    set,
    save,
    reset,
    pending,
  };
}
