"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { blocks, featureFlags, pages, siteMembers, sites } from "@/db/schema";
import { assertSiteAccess, getUser } from "@/lib/guards";
import { FEATURES, slugify } from "@/lib/utils";
import { LOCALES } from "@/i18n/messages";
import { ensureThemesSeeded } from "@/lib/theme-seed";
import { getTemplateById } from "@/lib/templates";
import { db } from "@/db";

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? { data?: undefined } : { data: T }))
  | { ok: false; error: string };

function fail(error: string): { ok: false; error: string } {
  return { ok: false, error };
}

function revalidateSite(subdomain: string) {
  revalidatePath(`/s/${subdomain}`, "layout");
  revalidatePath("/", "layout");
}

const createSiteSchema = z.object({
  name: z.string().trim().min(2).max(200),
  themeId: z.string().min(1),
  templateId: z.string().optional(),
  defaultLanguage: z.enum(LOCALES),
});

export async function createSiteAction(
  input: z.infer<typeof createSiteSchema>,
): Promise<ActionResult<{ siteId: string }>> {
  const user = await getUser();
  if (!user) return fail("unauthorized");

  const parsed = createSiteSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  await ensureThemesSeeded();

  const base = slugify(parsed.data.name) || "site";
  let subdomain = base;
  for (let attempt = 0; attempt < 25; attempt++) {
    const taken = await db
      .select({ id: sites.id })
      .from(sites)
      .where(eq(sites.subdomain, subdomain))
      .limit(1);
    if (!taken.length) break;
    subdomain = `${base}-${attempt + 2}`;
    if (attempt === 24) return fail("subdomain_taken");
  }

  const [site] = await db
    .insert(sites)
    .values({
      ownerId: user.id,
      name: parsed.data.name,
      subdomain,
      themeId: parsed.data.themeId,
      defaultLanguage: parsed.data.defaultLanguage,
      supportedLanguages: [parsed.data.defaultLanguage],
      status: "draft",
      seoTitle: parsed.data.name,
    })
    .returning();

  await db
    .insert(siteMembers)
    .values({ siteId: site.id, userId: user.id, role: "owner" });

  const template = parsed.data.templateId
    ? getTemplateById(parsed.data.templateId)
    : null;

  await db
    .insert(featureFlags)
    .values(
      FEATURES.map((feature) => ({
        siteId: site.id,
        feature,
        isEnabled:
          feature === "booking"
            ? Boolean(
              template?.pages.some((p) =>
                p.blocks.some((b) => b.type === "booking_form"),
              ),
            )
            : true,
      })),
    );

  if (template && template.pages.length > 0) {
    for (let pageIdx = 0; pageIdx < template.pages.length; pageIdx++) {
      const tPage = template.pages[pageIdx];
      const [insertedPage] = await db
        .insert(pages)
        .values({
          siteId: site.id,
          slug: tPage.slug,
          language: parsed.data.defaultLanguage,
          title: tPage.title,
          status: "published",
          isHomepage: tPage.isHomepage,
          sortOrder: pageIdx,
          seoTitle: `${parsed.data.name} · ${tPage.title}`,
        })
        .returning();

      if (tPage.blocks && tPage.blocks.length > 0) {
        for (let blockIdx = 0; blockIdx < tPage.blocks.length; blockIdx++) {
          const tBlock = tPage.blocks[blockIdx];
          await db.insert(blocks).values({
            pageId: insertedPage.id,
            type: tBlock.type,
            position: blockIdx,
            content: tBlock.content,
            isVisible: true,
          });
        }
      }
    }
  } else {
    await db.insert(pages).values({
      siteId: site.id,
      slug: "",
      language: parsed.data.defaultLanguage,
      title: parsed.data.defaultLanguage === "fr" ? "Accueil" : "Home",
      status: "draft",
      isHomepage: true,
      sortOrder: 0,
      seoTitle: parsed.data.name,
    });
  }

  revalidatePath("/", "layout");
  return { ok: true, data: { siteId: site.id } };
}

const settingsSchema = z.object({
  siteId: z.string().uuid(),
  name: z.string().trim().min(2).max(200),
  themeId: z.string().min(1),
  defaultLanguage: z.enum(LOCALES),
  supportedLanguages: z.array(z.enum(LOCALES)).min(1),
  seoTitle: z.string().trim().max(200).optional().nullable(),
  seoDescription: z.string().trim().max(500).optional().nullable(),
  status: z.enum(["draft", "published"]),
  features: z.record(z.string(), z.boolean()),
});

export async function updateSiteSettingsAction(
  input: z.infer<typeof settingsSchema>,
): Promise<ActionResult> {
  const parsed = settingsSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  try {
    const { site } = await assertSiteAccess(parsed.data.siteId, [
      "owner",
      "admin",
    ]);
    const data = parsed.data;

    const supported = Array.from(
      new Set([...data.supportedLanguages, data.defaultLanguage]),
    );

    await db
      .update(sites)
      .set({
        name: data.name,
        themeId: data.themeId,
        defaultLanguage: data.defaultLanguage,
        supportedLanguages: supported,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        status: data.status,
        updatedAt: new Date(),
      })
      .where(eq(sites.id, data.siteId));

    for (const feature of FEATURES) {
      const isEnabled = Boolean(data.features[feature]);
      const existing = await db
        .select({ id: featureFlags.id })
        .from(featureFlags)
        .where(
          and(
            eq(featureFlags.siteId, data.siteId),
            eq(featureFlags.feature, feature),
          ),
        )
        .limit(1);

      if (existing.length) {
        await db
          .update(featureFlags)
          .set({ isEnabled, updatedAt: new Date() })
          .where(eq(featureFlags.id, existing[0].id));
      } else {
        await db
          .insert(featureFlags)
          .values({ siteId: data.siteId, feature, isEnabled });
      }
    }

    revalidateSite(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail(
      (error as Error).message === "FORBIDDEN" ? "forbidden" : "unknown",
    );
  }
}

export async function deleteSiteAction(siteId: string): Promise<ActionResult> {
  try {
    const { site } = await assertSiteAccess(siteId, ["owner"]);
    await db.delete(sites).where(eq(sites.id, siteId));
    revalidateSite(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail(
      (error as Error).message === "FORBIDDEN" ? "forbidden" : "unknown",
    );
  }
}

export async function toggleSiteStatusAction(
  siteId: string,
): Promise<ActionResult<{ status: string }>> {
  try {
    const { site } = await assertSiteAccess(siteId, ["owner", "admin"]);
    const next = site.status === "published" ? "draft" : "published";
    await db
      .update(sites)
      .set({ status: next, updatedAt: new Date() })
      .where(eq(sites.id, siteId));
    revalidateSite(site.subdomain);
    return { ok: true, data: { status: next } };
  } catch {
    return fail("forbidden");
  }
}

/** Ensures every supported language has at least the homepage. */
export async function syncLanguagePagesAction(
  siteId: string,
): Promise<ActionResult> {
  try {
    const { site } = await assertSiteAccess(siteId, ["owner", "admin"]);
    const langs = (site.supportedLanguages as string[]) ?? [
      site.defaultLanguage,
    ];
    const existing = await db
      .select({ language: pages.language })
      .from(pages)
      .where(and(eq(pages.siteId, siteId), inArray(pages.language, langs)));
    const covered = new Set(existing.map((row) => row.language));

    for (const lang of langs) {
      if (covered.has(lang)) continue;
      await db.insert(pages).values({
        siteId,
        slug: "",
        language: lang,
        title: lang === "fr" ? "Accueil" : "Home",
        status: "draft",
        isHomepage: true,
        sortOrder: 0,
      });
    }
    revalidateSite(site.subdomain);
    return { ok: true };
  } catch {
    return fail("forbidden");
  }
}
