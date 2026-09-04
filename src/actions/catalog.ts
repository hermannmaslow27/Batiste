"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import {
  blogPosts,
  featureFlags,
  formSubmissions,
  products,
  sites,
} from "@/db/schema";
import { assertSiteAccess } from "@/lib/guards";
import { rateLimit, slugify } from "@/lib/utils";
import { LOCALES } from "@/i18n/messages";
import type { ActionResult } from "./sites";

function fail(error: string): { ok: false; error: string } {
  return { ok: false, error };
}

function revalidateAll(subdomain: string) {
  revalidatePath(`/s/${subdomain}`, "layout");
  revalidatePath("/", "layout");
}

/* ------------------------------------------------------------ Products */

const productSchema = z.object({
  productId: z.string().uuid().optional(),
  siteId: z.string().uuid(),
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
  price: z.number().int().min(0).nullable().optional(),
  currency: z.string().length(3).default("EUR"),
  category: z.string().trim().max(100).optional(),
  imageUrl: z.string().trim().url().max(500).optional(),
  customAttributes: z.record(z.string(), z.string()).default({}),
  status: z.enum(["draft", "published"]).default("draft"),
});

export async function upsertProductAction(
  input: z.infer<typeof productSchema>,
): Promise<ActionResult> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  try {
    const { site } = await assertSiteAccess(parsed.data.siteId);
    const data = parsed.data;
    const values = {
      siteId: data.siteId,
      name: data.name,
      description: data.description || null,
      price: data.price ?? null,
      currency: data.currency,
      category: data.category || null,
      images: data.imageUrl ? [data.imageUrl] : [],
      customAttributes: data.customAttributes,
      status: data.status,
      updatedAt: new Date(),
    };

    if (data.productId) {
      const existing = await db
        .select({ id: products.id })
        .from(products)
        .where(
          and(
            eq(products.id, data.productId),
            eq(products.siteId, data.siteId),
          ),
        )
        .limit(1);
      if (!existing.length) return fail("not_found");
      await db
        .update(products)
        .set(values)
        .where(eq(products.id, data.productId));
    } else {
      await db.insert(products).values(values);
    }

    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function deleteProductAction(
  productId: string,
): Promise<ActionResult> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);
    if (!rows.length) return fail("not_found");
    const { site } = await assertSiteAccess(rows[0].siteId);
    await db.delete(products).where(eq(products.id, productId));
    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function toggleProductStatusAction(
  productId: string,
): Promise<ActionResult> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);
    if (!rows.length) return fail("not_found");
    const { site } = await assertSiteAccess(rows[0].siteId);
    await db
      .update(products)
      .set({
        status: rows[0].status === "published" ? "draft" : "published",
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId));
    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

/* ---------------------------------------------------------------- Blog */

const postSchema = z.object({
  postId: z.string().uuid().optional(),
  siteId: z.string().uuid(),
  title: z.string().trim().min(1).max(300),
  content: z.string().trim().max(50_000).default(""),
  excerpt: z.string().trim().max(500).optional(),
  category: z.string().trim().max(100).optional(),
  coverImage: z.string().trim().url().max(500).optional(),
  language: z.enum(LOCALES),
  status: z.enum(["draft", "published"]).default("draft"),
});

export async function upsertPostAction(
  input: z.infer<typeof postSchema>,
): Promise<ActionResult> {
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  try {
    const { user, site } = await assertSiteAccess(parsed.data.siteId);
    const data = parsed.data;
    const slug = slugify(data.title, 120) || `post-${Date.now()}`;

    const values = {
      siteId: data.siteId,
      title: data.title,
      slug,
      language: data.language,
      content: data.content,
      excerpt: data.excerpt || null,
      category: data.category || null,
      coverImage: data.coverImage || null,
      status: data.status,
      authorId: user.id,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedAt: new Date(),
    };

    if (data.postId) {
      const existing = await db
        .select({ id: blogPosts.id, publishedAt: blogPosts.publishedAt })
        .from(blogPosts)
        .where(
          and(eq(blogPosts.id, data.postId), eq(blogPosts.siteId, data.siteId)),
        )
        .limit(1);
      if (!existing.length) return fail("not_found");
      await db
        .update(blogPosts)
        .set({
          ...values,
          publishedAt:
            data.status === "published"
              ? (existing[0].publishedAt ?? new Date())
              : null,
        })
        .where(eq(blogPosts.id, data.postId));
    } else {
      await db.insert(blogPosts).values(values);
    }

    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

export async function deletePostAction(postId: string): Promise<ActionResult> {
  try {
    const rows = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, postId))
      .limit(1);
    if (!rows.length) return fail("not_found");
    const { site } = await assertSiteAccess(rows[0].siteId);
    await db.delete(blogPosts).where(eq(blogPosts.id, postId));
    revalidateAll(site.subdomain);
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

/* --------------------------------------------------------- Submissions */

export async function updateSubmissionStatusAction(
  submissionId: string,
  status: "new" | "read" | "archived",
): Promise<ActionResult> {
  try {
    const rows = await db
      .select()
      .from(formSubmissions)
      .where(eq(formSubmissions.id, submissionId))
      .limit(1);
    if (!rows.length) return fail("not_found");
    await assertSiteAccess(rows[0].siteId);
    await db
      .update(formSubmissions)
      .set({ status })
      .where(eq(formSubmissions.id, submissionId));
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return fail((error as Error).message.toLowerCase());
  }
}

/* ----------------------------------------------- Public form submission */

const publicSubmissionSchema = z.object({
  siteId: z.string().uuid(),
  formType: z.enum(["contact", "quote", "booking", "custom"]),
  pageId: z.string().uuid().nullable().optional(),
  data: z.record(z.string(), z.string().max(5000)),
});

export async function submitPublicFormAction(
  input: z.infer<typeof publicSubmissionSchema>,
): Promise<ActionResult> {
  const parsed = publicSubmissionSchema.safeParse(input);
  if (!parsed.success) return fail("validation");

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!(await rateLimit(`public-form:${ip}`, 5, 300_000))) return fail("rate_limited");

  // The site must exist and be published before accepting anything.
  const siteRows = await db
    .select({ id: sites.id, status: sites.status })
    .from(sites)
    .where(eq(sites.id, parsed.data.siteId))
    .limit(1);
  if (!siteRows.length || siteRows[0].status !== "published")
    return fail("not_found");

  if (parsed.data.formType === "quote" || parsed.data.formType === "booking") {
    const flag = await db
      .select({ isEnabled: featureFlags.isEnabled })
      .from(featureFlags)
      .where(
        and(
          eq(featureFlags.siteId, parsed.data.siteId),
          eq(featureFlags.feature, parsed.data.formType),
        ),
      )
      .limit(1);
    if (flag.length && !flag[0].isEnabled) return fail("feature_disabled");
  }

  await db.insert(formSubmissions).values({
    siteId: parsed.data.siteId,
    formType: parsed.data.formType,
    pageId: parsed.data.pageId ?? null,
    data: parsed.data.data,
    status: "new",
    ipAddress: ip.slice(0, 45),
    userAgent: h.get("user-agent")?.slice(0, 500) ?? null,
  });

  revalidatePath("/", "layout");
  return { ok: true };
}
