import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteThemeOverrides, subscriptions } from "@/db/schema";
import { requireSiteAccess, getUser } from "@/lib/guards";
import { normalizeLocale } from "@/i18n/messages";
import ThemeCustomizer from "@/components/dashboard/ThemeCustomizer";
import UpgradeGate from "@/components/dashboard/UpgradeGate";
import { getEffectivePlan, canUseThemeOverrides } from "@/lib/monetization";

export default async function ThemeRoute({
  params,
}: {
  params: Promise<{ locale: string; siteId: string }>;
}) {
  const { locale: rawLocale, siteId } = await params;
  const locale = normalizeLocale(rawLocale);
  const { site } = await requireSiteAccess(siteId, locale, ["owner", "admin"]);
  const user = await getUser();

  const subRows = user
    ? await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, user.id))
        .limit(1)
    : [];
  const plan = getEffectivePlan(subRows[0]);
  const hasAccess = canUseThemeOverrides(plan);

  const overrideRows = await db
    .select()
    .from(siteThemeOverrides)
    .where(eq(siteThemeOverrides.siteId, siteId))
    .limit(1);
  const overrideData = overrideRows[0] ?? null;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Thème & Style Visuel
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Personnalisez la palette chromatique, les typographies Google Fonts et les arrondis de votre site vitrine.
        </p>
      </div>

      <UpgradeGate
        title="Personnalisation avancée des couleurs & polices"
        description="Passez à la formule Pro pour définir vos propres codes couleurs hexadécimaux, polices Google Fonts et styles de bordure sur-mesure."
        locale={locale}
        locked={!hasAccess}
      >
        <ThemeCustomizer
          siteId={siteId}
          themeId={site.themeId}
          initialOverrides={
            overrideData
              ? {
                  colorPrimary: overrideData.colorPrimary ?? undefined,
                  colorOnPrimary: overrideData.colorOnPrimary ?? undefined,
                  colorBackground: overrideData.colorBackground ?? undefined,
                  colorSurface: overrideData.colorSurface ?? undefined,
                  colorText: overrideData.colorText ?? undefined,
                  colorMuted: overrideData.colorMuted ?? undefined,
                  colorBorder: overrideData.colorBorder ?? undefined,
                  colorAccent: overrideData.colorAccent ?? undefined,
                  fontHeading: overrideData.fontHeading ?? undefined,
                  fontBody: overrideData.fontBody ?? undefined,
                  borderRadius: overrideData.borderRadius ?? undefined,
                }
              : null
          }
        />
      </UpgradeGate>
    </div>
  );
}
