"use server";

import { eq, count, sql } from "drizzle-orm";
import { db } from "@/db";
import { formSubmissions, pages, siteMembers, sites } from "@/db/schema";
import { requireUser } from "@/lib/guards";

export async function getDashboardData(locale: any) {
    const user = await requireUser(locale);

    const memberships = await db
        .select({ site: sites, role: siteMembers.role })
        .from(siteMembers)
        .innerJoin(sites, eq(siteMembers.siteId, sites.id))
        .where(eq(siteMembers.userId, user.id));

    const stats = await Promise.all(
        memberships.map(async ({ site }) => {
            const [pageResult] = await db
                .select({ value: count() })
                .from(pages)
                .where(eq(pages.siteId, site.id));

            const [unreadResult] = await db
                .select({
                    value: sql<number>`sum(case when ${formSubmissions.status} = 'new' then 1 else 0 end)`,
                })
                .from(formSubmissions)
                .where(eq(formSubmissions.siteId, site.id));

            return {
                siteId: site.id,
                pages: pageResult?.value ?? 0,
                unread: unreadResult?.value ?? 0,
            };
        })
    );

    return {
        user,
        memberships,
        stats,
    };
}