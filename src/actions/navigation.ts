"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { sites } from "@/db/schema";
import { getUser } from "@/lib/guards";
import type { ActionResult } from "./sites";

export interface NavItemConfig {
  id: string;
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface NavbarConfig {
  items: NavItemConfig[];
  ctaButton?: {
    label: string;
    url: string;
    enabled: boolean;
  };
}

export async function saveNavbarConfigAction(
  siteId: string,
  config: NavbarConfig,
): Promise<ActionResult<{ success: boolean }>> {
  try {
    const user = await getUser();
    if (!user) return { ok: false, error: "unauthorized" };

    const rows = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
    const site = rows[0];
    if (!site || site.ownerId !== user.id) {
      return { ok: false, error: "not_found" };
    }

    await db
      .update(sites)
      .set({
        navbarConfig: config,
        updatedAt: new Date(),
      })
      .where(eq(sites.id, siteId));

    revalidatePath(`/[locale]/dashboard/${siteId}`, "layout");
    revalidatePath(`/s/${site.subdomain}`, "layout");

    return { ok: true, data: { success: true } };
  } catch (error) {
    console.error("Failed to save navbar config:", error);
    return { ok: false, error: "internal_error" };
  }
}

export async function resetNavbarConfigAction(
  siteId: string,
): Promise<ActionResult<{ success: boolean }>> {
  try {
    const user = await getUser();
    if (!user) return { ok: false, error: "unauthorized" };

    await db
      .update(sites)
      .set({
        navbarConfig: null,
        updatedAt: new Date(),
      })
      .where(eq(sites.id, siteId));

    revalidatePath(`/[locale]/dashboard/${siteId}`, "layout");
    return { ok: true, data: { success: true } };
  } catch (error) {
    console.error("Failed to reset navbar config:", error);
    return { ok: false, error: "internal_error" };
  }
}
