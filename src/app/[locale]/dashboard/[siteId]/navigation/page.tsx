import { notFound } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { sites, pages } from "@/db/schema";
import { requireUser } from "@/lib/guards";
import NavigationEditor from "@/components/dashboard/navigation/NavigationEditor";
import type { NavbarConfig } from "@/actions/navigation";

export default async function NavigationPage({
  params,
}: {
  params: Promise<{ siteId: string; locale: string }>;
}) {
  const { siteId } = await params;
  const user = await requireUser();

  const siteRows = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
  const site = siteRows[0];
  if (!site || site.ownerId !== user.id) notFound();

  const sitePages = await db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
    })
    .from(pages)
    .where(and(eq(pages.siteId, siteId), eq(pages.status, "published")));

  const initialConfig = (site.navbarConfig as NavbarConfig | null) ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Menu & Navigation
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Gérez l'ordre des liens, ajoutez des liens externes ou des ancres et activez un bouton d'action pour votre en-tête.
        </p>
      </div>

      <NavigationEditor
        siteId={siteId}
        initialConfig={initialConfig}
        pages={sitePages}
      />
    </div>
  );
}
