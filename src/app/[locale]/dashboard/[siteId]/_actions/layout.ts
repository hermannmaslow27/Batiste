import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { formSubmissions, siteMembers, sites } from "@/db/schema";

export async function getUserSiteMemberships(userId: string) {
  const rows = await db
    .select({ site: sites })
    .from(siteMembers)
    .innerJoin(sites, eq(siteMembers.siteId, sites.id))
    .where(eq(siteMembers.userId, userId));

  return rows.map((row) => row.site);
}

export async function getUnreadCount(siteId: string) {
  const [row] = await db
    .select({ value: sql<number>`count(*)` })
    .from(formSubmissions)
    .where(
      and(
        eq(formSubmissions.siteId, siteId),
        eq(formSubmissions.status, "new"),
      ),
    );

  return row?.value ?? 0;
}