"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteThemeOverrides, sites } from "@/db/schema";
import { assertSiteAccess } from "@/lib/guards";
import type { ActionResult } from "./sites";

const themeOverridesSchema = z.object({
  siteId: z.string().uuid(),
  colorPrimary: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  colorOnPrimary: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  colorBackground: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  colorSurface: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  colorText: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  colorMuted: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  colorBorder: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  colorAccent: z.string().regex(/^#([0-9a-fA-F]{3,8})$/).nullable().optional(),
  fontHeading: z.string().max(100).nullable().optional(),
  fontBody: z.string().max(100).nullable().optional(),
  borderRadius: z.string().max(30).nullable().optional(),
  customCss: z.string().max(5000).nullable().optional(),
});

export async function getSiteThemeOverridesAction(siteId: string) {
  try {
    await assertSiteAccess(siteId, ["owner", "admin", "editor"]);
    const rows = await db
      .select()
      .from(siteThemeOverrides)
      .where(eq(siteThemeOverrides.siteId, siteId))
      .limit(1);
    return { ok: true, data: rows[0] ?? null } as const;
  } catch (error) {
    return { ok: false, error: (error as Error).message } as const;
  }
}

export async function saveSiteThemeOverridesAction(
  input: z.infer<typeof themeOverridesSchema>,
): Promise<ActionResult> {
  const parsed = themeOverridesSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };

  try {
    const { site } = await assertSiteAccess(parsed.data.siteId, ["owner", "admin"]);
    const data = parsed.data;

    const existing = await db
      .select({ id: siteThemeOverrides.id })
      .from(siteThemeOverrides)
      .where(eq(siteThemeOverrides.siteId, data.siteId))
      .limit(1);

    if (existing.length) {
      await db
        .update(siteThemeOverrides)
        .set({
          colorPrimary: data.colorPrimary,
          colorOnPrimary: data.colorOnPrimary,
          colorBackground: data.colorBackground,
          colorSurface: data.colorSurface,
          colorText: data.colorText,
          colorMuted: data.colorMuted,
          colorBorder: data.colorBorder,
          colorAccent: data.colorAccent,
          fontHeading: data.fontHeading,
          fontBody: data.fontBody,
          borderRadius: data.borderRadius,
          customCss: data.customCss,
          updatedAt: new Date(),
        })
        .where(eq(siteThemeOverrides.id, existing[0].id));
    } else {
      await db.insert(siteThemeOverrides).values({
        siteId: data.siteId,
        colorPrimary: data.colorPrimary,
        colorOnPrimary: data.colorOnPrimary,
        colorBackground: data.colorBackground,
        colorSurface: data.colorSurface,
        colorText: data.colorText,
        colorMuted: data.colorMuted,
        colorBorder: data.colorBorder,
        colorAccent: data.colorAccent,
        fontHeading: data.fontHeading,
        fontBody: data.fontBody,
        borderRadius: data.borderRadius,
        customCss: data.customCss,
      });
    }

    revalidatePath(`/s/${site.subdomain}`, "layout");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message.toLowerCase() };
  }
}

export async function resetSiteThemeOverridesAction(siteId: string): Promise<ActionResult> {
  try {
    const { site } = await assertSiteAccess(siteId, ["owner", "admin"]);
    await db.delete(siteThemeOverrides).where(eq(siteThemeOverrides.siteId, siteId));
    revalidatePath(`/s/${site.subdomain}`, "layout");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message.toLowerCase() };
  }
}
