import { requireSiteAccess } from "@/lib/guards";
import { normalizeLocale } from "@/i18n/messages";
import SettingsForm from "@/components/dashboard/SettingsForm";

export default async function SettingsRoute({
  params,
}: {
  params: Promise<{ locale: string; siteId: string }>;
}) {
  const { locale: rawLocale, siteId } = await params;
  const locale = normalizeLocale(rawLocale);
  const { site, features, role } = await requireSiteAccess(siteId, locale, [
    "owner",
    "admin",
  ]);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Paramètres du site
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Gérez l'identité de votre site, les langues, le référencement SEO et les fonctionnalités actives.
        </p>
      </div>

      <SettingsForm
        site={{
          id: site.id,
          name: site.name,
          subdomain: site.subdomain,
          themeId: site.themeId,
          defaultLanguage: site.defaultLanguage,
          supportedLanguages: (site.supportedLanguages as string[]) ?? [
            site.defaultLanguage,
          ],
          seoTitle: site.seoTitle,
          seoDescription: site.seoDescription,
          status: site.status,
        }}
        features={features}
        canDelete={role === "owner"}
      />
    </div>
  );
}
