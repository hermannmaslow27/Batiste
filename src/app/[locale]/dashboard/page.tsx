import Link from "next/link";
import { getDashboardData } from "@/actions/dashboard";
import { Badge } from "@/components/ui";
import SignOutButton from "@/components/dashboard/SignOutButton";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import { getMessages, normalizeLocale } from "@/i18n/messages";
import { getThemeConfig } from "@/lib/themes";

export default async function SitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = getMessages(locale);

  const { user, memberships, stats } = await getDashboardData(locale);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            href={`/${locale}`}
            className="text-[15px] font-semibold tracking-tight"
          >
            {t.common.appName}
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-zinc-500 sm:inline">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              {t.dashboard.sitesTitle}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {t.dashboard.sitesSubtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/onboarding`}
            className="rounded-xl bg-zinc-900 px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-zinc-800"
          >
            {t.nav.newSite}
          </Link>
        </div>

        {memberships.length === 0 ? (
          <OnboardingWizard />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {memberships.map(({ site, role }) => {
              const theme = getThemeConfig(site.themeId);
              const stat = stats.find((entry) => entry.siteId === site.id);
              return (
                <Link
                  key={site.id}
                  href={`/${locale}/dashboard/${site.id}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-[0_12px_30px_-18px_rgba(24,24,27,0.4)]"
                >
                  <div
                    className="flex h-24 items-end gap-1.5 p-4"
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    {theme.swatch.map((color) => (
                      <span
                        key={color}
                        className="size-6 rounded-md ring-1 ring-black/5"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="truncate text-sm font-semibold tracking-tight text-zinc-900">
                        {site.name}
                      </h2>
                      <Badge
                        tone={
                          site.status === "published" ? "success" : "neutral"
                        }
                      >
                        {site.status === "published"
                          ? t.common.published
                          : t.common.draft}
                      </Badge>
                    </div>
                    <p className="mt-1 truncate font-mono text-[12px] text-zinc-500">
                      {site.subdomain}.batiste.app
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-[12px] text-zinc-500">
                      <span>
                        {stat?.pages ?? 0} {t.dashboard.statPages.toLowerCase()}
                      </span>
                      {(stat?.unread ?? 0) > 0 && (
                        <span className="font-medium text-zinc-900">
                          {stat?.unread}{" "}
                          {t.dashboard.statMessages.toLowerCase()}
                        </span>
                      )}
                      <span className="ml-auto uppercase tracking-wide text-zinc-400">
                        {role}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}