import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts, formSubmissions, pages, products } from "@/db/schema";

export async function getOverviewStats(siteId: string) {
  const [pageRows, productRows, postRows, unreadRows] = await Promise.all([
    db
      .select({ value: sql<number>`count(*)` })
      .from(pages)
      .where(eq(pages.siteId, siteId)),
    db
      .select({ value: sql<number>`count(*)` })
      .from(products)
      .where(eq(products.siteId, siteId)),
    db
      .select({ value: sql<number>`count(*)` })
      .from(blogPosts)
      .where(eq(blogPosts.siteId, siteId)),
    db
      .select({ value: sql<number>`count(*)` })
      .from(formSubmissions)
      .where(
        and(
          eq(formSubmissions.siteId, siteId),
          eq(formSubmissions.status, "new"),
        ),
      ),
  ]);

  return {
    pageCount: pageRows[0]?.value ?? 0,
    productCount: productRows[0]?.value ?? 0,
    postCount: postRows[0]?.value ?? 0,
    unreadCount: unreadRows[0]?.value ?? 0,
  };
}

export async function getLatestSubmissions(siteId: string, limit = 5) {
  return db
    .select()
    .from(formSubmissions)
    .where(eq(formSubmissions.siteId, siteId))
    .orderBy(desc(formSubmissions.createdAt))
    .limit(limit);
}