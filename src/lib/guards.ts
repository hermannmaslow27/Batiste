import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  featureFlags,
  siteMembers,
  sites,
  themes,
  type Site,
  type User,
} from "@/db/schema";
import { auth } from "@/auth";
import type { FeatureId } from "@/lib/utils";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/messages";
import { users } from "@/db/schema";

export type Role = "owner" | "admin" | "editor";

export async function getUser(): Promise<User | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  return rows[0] ?? null;
}

export async function requireUser(
  locale: Locale = DEFAULT_LOCALE,
): Promise<User> {
  const user = await getUser();
  if (!user) redirect(`/${locale}/login`);
  return user;
}

export interface SiteContext {
  user: User;
  site: Site;
  role: Role;
  features: Record<FeatureId, boolean>;
  theme: typeof themes.$inferSelect;
}

/**
 * Loads a site only if the current user is a member of it.
 * Never trust a siteId coming from the client without this check.
 */
export async function requireSiteAccess(
  siteId: string,
  locale: Locale = DEFAULT_LOCALE,
  allowedRoles: Role[] = ["owner", "admin", "editor"],
): Promise<SiteContext> {
  const user = await requireUser(locale);

  const rows = await db
    .select({ site: sites, role: siteMembers.role, theme: themes })
    .from(siteMembers)
    .innerJoin(sites, eq(siteMembers.siteId, sites.id))
    .innerJoin(themes, eq(sites.themeId, themes.id))
    .where(and(eq(siteMembers.siteId, siteId), eq(siteMembers.userId, user.id)))
    .limit(1);

  const row = rows[0];
  if (!row) redirect(`/${locale}/dashboard`);
  if (!allowedRoles.includes(row.role as Role))
    redirect(`/${locale}/dashboard/${siteId}`);

  const flags = await db
    .select()
    .from(featureFlags)
    .where(eq(featureFlags.siteId, siteId));
  const features = {
    blog: false,
    catalog: false,
    quote: false,
    booking: false,
  } as Record<FeatureId, boolean>;
  for (const flag of flags) {
    features[flag.feature as FeatureId] = Boolean(flag.isEnabled);
  }

  return {
    user,
    site: row.site,
    role: row.role as Role,
    features,
    theme: row.theme,
  };
}

/** Same check but for server actions: throws instead of redirecting. */
export async function assertSiteAccess(
  siteId: string,
  allowedRoles: Role[] = ["owner", "admin", "editor"],
): Promise<{ user: User; site: Site; role: Role }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("UNAUTHORIZED");

  const rows = await db
    .select({ site: sites, role: siteMembers.role })
    .from(siteMembers)
    .innerJoin(sites, eq(siteMembers.siteId, sites.id))
    .where(
      and(
        eq(siteMembers.siteId, siteId),
        eq(siteMembers.userId, session.user.id),
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row || !allowedRoles.includes(row.role as Role))
    throw new Error("FORBIDDEN");

  const userRows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  return { user: userRows[0], site: row.site, role: row.role as Role };
}