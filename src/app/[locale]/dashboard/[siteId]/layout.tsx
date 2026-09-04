import { requireSiteAccess } from "@/lib/guards";
import { normalizeLocale } from "@/i18n/messages";
import SiteShell from "@/components/dashboard/SiteShell";
import { getUserSiteMemberships, getUnreadCount } from "./_actions/layout";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; siteId: string }>;
}) {
  const { locale: rawLocale, siteId } = await params;
  const locale = normalizeLocale(rawLocale);
  const { site, user, features } = await requireSiteAccess(siteId, locale);

  const [memberSites, unreadCount] = await Promise.all([
    getUserSiteMemberships(user.id),
    getUnreadCount(siteId),
  ]);

  return (
    <SiteShell
      site={{
        id: site.id,
        name: site.name,
        subdomain: site.subdomain,
        status: site.status,
      }}
      sites={memberSites.map((s) => ({
        id: s.id,
        name: s.name,
        subdomain: s.subdomain,
        status: s.status,
      }))}
      features={features}
      unreadCount={unreadCount}
    >
      {children}
    </SiteShell>
  );
}