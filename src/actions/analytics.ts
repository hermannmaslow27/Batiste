"use server";

import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { analyticsEvents, sites } from "@/db/schema";
import { assertSiteAccess } from "@/lib/guards";

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  topPages: { path: string; views: number }[];
  dailyViews: { date: string; views: number }[];
}

export async function getAnalyticsSummary(
  siteId: string,
  days = 30,
): Promise<AnalyticsSummary> {
  await assertSiteAccess(siteId);

  const since = new Date();
  since.setDate(since.getDate() - days);

  const [totals] = await db
    .select({
      totalViews: sql<number>`count(*)`,
      uniqueVisitors: sql<number>`count(distinct ${analyticsEvents.visitorId})`,
    })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.siteId, siteId),
        gte(analyticsEvents.createdAt, since),
      ),
    );

  const topPages = await db
    .select({ path: analyticsEvents.path, views: sql<number>`count(*)` })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.siteId, siteId),
        gte(analyticsEvents.createdAt, since),
      ),
    )
    .groupBy(analyticsEvents.path)
    .orderBy(sql`count(*) desc`)
    .limit(10);

  const dailyRows = await db
    .select({
      date: sql<string>`strftime('%Y-%m-%d', ${analyticsEvents.createdAt}, 'unixepoch')`,
      views: sql<number>`count(*)`,
    })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.siteId, siteId),
        gte(analyticsEvents.createdAt, since),
      ),
    )
    .groupBy(sql`strftime('%Y-%m-%d', ${analyticsEvents.createdAt}, 'unixepoch')`)
    .orderBy(sql`strftime('%Y-%m-%d', ${analyticsEvents.createdAt}, 'unixepoch')`);

  return {
    totalViews: totals?.totalViews ?? 0,
    uniqueVisitors: totals?.uniqueVisitors ?? 0,
    topPages,
    dailyViews: dailyRows,
  };
}

export async function trackPageView(
  subdomain: string,
  path: string,
  visitorId: string,
) {
  const [site] = await db
    .select({ id: sites.id })
    .from(sites)
    .where(eq(sites.subdomain, subdomain))
    .limit(1);
  if (!site) return;

  await db.insert(analyticsEvents).values({ siteId: site.id, path, visitorId });
}