"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { and, asc, eq, max } from "drizzle-orm";
import { db } from "@/db";
import { blocks, pages } from "@/db/schema";
import { assertSiteAccess } from "@/lib/guards";
import { getBlockDef, BLOCK_TYPES } from "@/lib/blocks";
import { slugify } from "@/lib/utils";
import { LOCALES } from "@/i18n/messages";
import type { ActionResult } from "./sites";

function fail(error: string): { ok: false; error: string } {
  return { ok: false, error };
}

function revalidateAll(subdomain: string) {
  revalidatePath(`/s/${subdomain}`, "layout");
  revalidatePath("/", "layout");
}

async function pageContext(pageId: string) {
  const rows = await db
    .select()
    .from(pages)
    .where(eq(pages.id, pageId))
    .limit(1);
  const page = rows[0];
  if (!page) throw new Error("NOT_FOUND");
  const { site } = await assertSiteAccess(page.siteId);
  return { page, site };
}

/* --------------------------------------------------------------- Pages */

const createPageSchema = z.object({
  siteId: z.string().uuid(),
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().max(200).optional(),
  language: z.enum(LOCALES),
});

export async function createPageAction(
  input: z.infer<typeof createPageSchema>,
): Promise<ActionResult<{ pageId: string }>> {
  const parsed = createPageSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  try {
    const { site } = await assertSiteAccess(parsed.data.siteId);
    const slug = slugify(parsed.data.slug || parsed.data.title, 120);

    const duplicate = await db
      .select({ id: pages.id })
      .from(pages)
      .where(
        and(
          eq(pages.siteId, parsed.data.siteId),
          eq(pages.slug, slug),
          eq(pages.language, parsed.data.language),
        ),
      )
      .limit(1);
    if (duplicate.length) return fail("slug_taken");

    const [maxOrder] = await db
      .select({ value: max(pages.sortOrder) })
      .from(pages)
      .where(eq(pages.siteId, parsed.data.siteId));

    const [page] = await db
      .insert(pages)
      .values({
        siteId: parsed.data.siteId,
        title: parsed.data.title,
        slug,
        language: parsed.data.language,
        status: "draft",
        seoTitle: parsed.data.title,
        sortOrder: (maxOrder?.value ?? 0) + 1,
      })
      .returning();

    revalidateAll(site.subdomain);
    return { ok: true, data: { pageId: page.id } };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

const updatePageSchema = z.object({
  pageId: z.string().uuid(),
  title: z.string().trim().min(1).max(200).optional(),
  slug: z.string().trim().max(200).optional(),
  status: z.enum(["draft", "published"]).optional(),
  seoTitle: z.string().trim().max(200).nullable().optional(),
  seoDescription: z.string().trim().max(500).nullable().optional(),
});

export async function updatePageAction(
  input: z.infer<typeof updatePageSchema>,
): Promise<ActionResult> {
  const parsed = updatePageSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  try {
    const { page, site } = await pageContext(parsed.data.pageId);
    const data = parsed.data;

    await db
      .update(pages)
      .set({
        title: data.title ?? page.title,
        slug: page.isHomepage
          ? ""
          : data.slug !== undefined
            ? slugify(data.slug, 120)
            : page.slug,
        status: data.status ?? page.status,
        seoTitle: data.seoTitle !== undefined ? data.seoTitle : page.seoTitle,
        seoDescription:
          data.seoDescription !== undefined
            ? data.seoDescription
            : page.seoDescription,
        updatedAt: new Date(),
      })
      .where(eq(pages.id, page.id));

    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function deletePageAction(pageId: string): Promise<ActionResult> {
  try {
    const { page, site } = await pageContext(pageId);
    if (page.isHomepage) return fail("cannot_delete_homepage");
    await db.delete(pages).where(eq(pages.id, pageId));
    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

/* --------------------------------------------------------------- Blocks */

const addBlockSchema = z.object({
  pageId: z.string().uuid(),
  type: z.enum(BLOCK_TYPES),
});

export async function addBlockAction(
  input: z.infer<typeof addBlockSchema>,
): Promise<ActionResult<{ blockId: string }>> {
  const parsed = addBlockSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  try {
    const { page, site } = await pageContext(parsed.data.pageId);
    const def = getBlockDef(parsed.data.type);
    if (!def) return fail("unknown_block");

    const [maxPos] = await db
      .select({ value: max(blocks.position) })
      .from(blocks)
      .where(eq(blocks.pageId, page.id));

    const [block] = await db
      .insert(blocks)
      .values({
        pageId: page.id,
        type: def.type,
        content: def.defaults,
        position: (maxPos?.value ?? -1) + 1,
        isVisible: true,
      })
      .returning();

    revalidateAll(site.subdomain);
    return { ok: true, data: { blockId: block.id } };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

async function blockContext(blockId: string) {
  const rows = await db
    .select()
    .from(blocks)
    .where(eq(blocks.id, blockId))
    .limit(1);
  const block = rows[0];
  if (!block) throw new Error("NOT_FOUND");
  const { site } = await pageContext(block.pageId);
  return { block, site };
}

export async function updateBlockContentAction(
  blockId: string,
  content: Record<string, unknown>,
): Promise<ActionResult> {
  try {
    const { site } = await blockContext(blockId);
    await db
      .update(blocks)
      .set({ content, updatedAt: new Date() })
      .where(eq(blocks.id, blockId));
    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function toggleBlockVisibilityAction(
  blockId: string,
): Promise<ActionResult> {
  try {
    const { block, site } = await blockContext(blockId);
    await db
      .update(blocks)
      .set({ isVisible: !block.isVisible, updatedAt: new Date() })
      .where(eq(blocks.id, blockId));
    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function duplicateBlockAction(
  blockId: string,
): Promise<ActionResult> {
  try {
    const { block, site } = await blockContext(blockId);
    const [maxPos] = await db
      .select({ value: max(blocks.position) })
      .from(blocks)
      .where(eq(blocks.pageId, block.pageId));

    await db.insert(blocks).values({
      pageId: block.pageId,
      type: block.type,
      content: block.content,
      position: (maxPos?.value ?? -1) + 1,
      isVisible: block.isVisible,
    });

    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function deleteBlockAction(
  blockId: string,
): Promise<ActionResult> {
  try {
    const { site } = await blockContext(blockId);
    await db.delete(blocks).where(eq(blocks.id, blockId));
    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function reorderBlocksAction(
  pageId: string,
  orderedIds: string[],
): Promise<ActionResult> {
  try {
    const { page, site } = await pageContext(pageId);
    const owned = await db
      .select({ id: blocks.id })
      .from(blocks)
      .where(eq(blocks.pageId, page.id))
      .orderBy(asc(blocks.position));
    const ownedIds = new Set(owned.map((row) => row.id));

    // Never trust ids coming from the client.
    const safeOrder = orderedIds.filter((id) => ownedIds.has(id));
    await Promise.all(
      safeOrder.map((id, index) =>
        db
          .update(blocks)
          .set({ position: index, updatedAt: new Date() })
          .where(eq(blocks.id, id)),
      ),
    );

    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}
