import Link from "next/link";
import { requireSiteAccess } from "@/lib/guards";
import { getMessages, normalizeLocale } from "@/i18n/messages";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  PageHeader,
  StatTile,
} from "@/components/ui";
import { formatDateTime } from "@/lib/utils";
import SiteStatusToggle from "@/components/dashboard/SiteStatusToggle";
import { getOverviewStats, getLatestSubmissions } from "./_actions/overview";

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ locale: string; siteId: string }>;
}) {
  const { locale: rawLocale, siteId } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = getMessages(locale);
  const { site, features } = await requireSiteAccess(siteId, locale);

  const [{ pageCount, productCount, postCount, unreadCount }, latest] =
    await Promise.all([
      getOverviewStats(siteId),
      getLatestSubmissions(siteId),
    ]);

  const base = `/${locale}/dashboard/${siteId}`;

  return (
    <div>
      <PageHeader
        title={site.name}
        description={`${site.subdomain}.batiste.app`}
        action={<SiteStatusToggle siteId={siteId} status={site.status} />}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label={t.dashboard.statPages} value={pageCount} />
        {features.catalog && (
          <StatTile label={t.dashboard.statProducts} value={productCount} />
        )}
        {features.blog && (
          <StatTile label={t.dashboard.statPosts} value={postCount} />
        )}
        <StatTile label={t.dashboard.statMessages} value={unreadCount} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader title={t.dashboard.recentActivity} />
          <CardBody>
            {latest.length === 0 ? (
              <p className="py-6 text-center text-[13px] text-zinc-400">
                {t.dashboard.noActivity}
              </p>
            ) : (
              <ul className="divide-y divide-zinc-100">
                {latest.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <Badge tone={item.status === "new" ? "warning" : "neutral"}>
                      {item.formType}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] text-zinc-700">
                        {Object.values(
                          (item.data as Record<string, string>) ?? {},
                        )
                          .slice(0, 2)
                          .join(" · ")}
                      </p>
                      <p className="text-[11.5px] text-zinc-400">
                        {formatDateTime(item.createdAt, `${locale}-FR`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`${base}/inbox`}
              className="mt-4 inline-block text-[13px] font-medium text-zinc-900 underline underline-offset-4"
            >
              {t.nav.inbox} →
            </Link>
          </CardBody>
        </Card>

        <Card className="h-fit">
          <CardHeader title={t.dashboard.quickActions} />
          <CardBody className="space-y-2">
            {[
              { href: `${base}/pages`, label: t.pages.title },
              features.catalog
                ? { href: `${base}/catalog`, label: t.catalog.title }
                : null,
              features.blog
                ? { href: `${base}/blog`, label: t.blog.title }
                : null,
              { href: `${base}/settings`, label: t.settings.title },
            ]
              .filter(Boolean)
              .map((item) => (
                <Link
                  key={(item as { href: string }).href}
                  href={(item as { href: string }).href}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {(item as { label: string }).label}
                  <span className="text-zinc-300">→</span>
                </Link>
              ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}