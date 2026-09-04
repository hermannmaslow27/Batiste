import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  blocks,
  blogPosts,
  featureFlags,
  pages,
  products,
  sites,
  themes,
} from "@/db/schema";
import BlockView, { type PublicProduct } from "@/components/site/BlockView";
import { themeStyle } from "@/lib/themes";
import { getMessages, normalizeLocale, type Locale } from "@/i18n/messages";
import { formatDate, formatPrice } from "@/lib/utils";
import {
  isSupportedLocale,
  publicLanguagePrefix,
  publicPath,
} from "@/lib/public-site";
import { trackPageView } from "@/actions/analytics";
import AnalyticsTracker from "@/components/site/AnalyticsTracker";
import CatalogClient from "@/components/site/CatalogClient";

const ROOT_DOMAINS = ["batiste.app", "lvh.me", "localhost"];

function safeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return url;
  } catch {
    return null;
  }
}

async function loadSite(subdomain: string) {
  const rows = await db
    .select({ site: sites, theme: themes })
    .from(sites)
    .innerJoin(themes, eq(sites.themeId, themes.id))
    .where(eq(sites.subdomain, subdomain))
    .limit(1);
  return rows[0] ?? null;
}

export async function buildSiteMetadata(subdomain: string): Promise<Metadata> {
  const data = await loadSite(subdomain);
  if (!data) return { title: "Batiste" };
  const title = data.site.seoTitle || data.site.name;
  const siteUrl = `https://${subdomain}.batiste.app`;
  return {
    title,
    description: data.site.seoDescription ?? undefined,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description: data.site.seoDescription ?? undefined,
      type: "website",
      siteName: data.site.name,
      images: data.site.seoImage ? [data.site.seoImage] : undefined,
    },
    twitter: { card: "summary_large_image", title },
    icons: data.site.faviconUrl ? { icon: data.site.faviconUrl } : undefined,
  };
}

export default async function PublicSite({
  subdomain,
  slug = [],
}: {
  subdomain: string;
  slug?: string[];
}) {
  const data = await loadSite(subdomain);
  if (!data || data.site.status !== "published") {
    const fallback = getMessages("fr");
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            {fallback.publicSite.notFound}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {fallback.publicSite.notFoundDesc}
          </p>
        </div>
      </main>
    );
  }

  const { site, theme } = data;
  const defaultLanguage = isSupportedLocale(site.defaultLanguage)
    ? site.defaultLanguage
    : "fr";
  const supported: Locale[] = Array.from(
    new Set([
      defaultLanguage,
      ...((site.supportedLanguages as string[]) ?? []).filter(
        isSupportedLocale,
      ),
    ]),
  );

  const segments = [...slug];
  let language = defaultLanguage;
  if (
    segments.length &&
    isSupportedLocale(segments[0]) &&
    supported.includes(segments[0])
  ) {
    language = segments.shift() as Locale;
  }
  const locale = normalizeLocale(language) as Locale;
  const t = getMessages(locale);

  const host = (await headers()).get("host")?.split(":")[0] ?? "";
  const onSubdomain = ROOT_DOMAINS.some(
    (root) => host.endsWith(`.${root}`) && host.startsWith(`${subdomain}.`),
  );
  const root = onSubdomain ? "" : `/s/${subdomain}`;
  const prefix = publicLanguagePrefix(root, language, defaultLanguage);
  const href = (path: string) => publicPath(prefix, path);

  const flags = await db
    .select()
    .from(featureFlags)
    .where(eq(featureFlags.siteId, site.id));
  const features = Object.fromEntries(
    flags.map((f) => [f.feature, Boolean(f.isEnabled)]),
  );

  const navPages = await db
    .select()
    .from(pages)
    .where(
      and(
        eq(pages.siteId, site.id),
        eq(pages.status, "published"),
        eq(pages.language, language),
      ),
    )
    .orderBy(asc(pages.sortOrder));

  const productRows = features.catalog
    ? await db
        .select()
        .from(products)
        .where(
          and(eq(products.siteId, site.id), eq(products.status, "published")),
        )
        .orderBy(asc(products.sortOrder))
    : [];

  const publicProducts: PublicProduct[] = productRows.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    currency: p.currency,
    images: p.images,
    category: p.category,
    customAttributes: p.customAttributes,
  }));

  const route = segments.join("/");
  const isBlog = route === "blog" && features.blog;
  const isCatalog = route === "catalog" && features.catalog;
  const blogSlug = segments[0] === "blog" && segments[1] ? segments[1] : null;

  const currentPage =
    !isBlog && !isCatalog && !blogSlug
      ? (navPages.find((p) => p.slug === route) ??
        (route === ""
          ? (navPages.find((p) => p.isHomepage) ?? navPages[0])
          : undefined))
      : undefined;

  const pageBlocks = currentPage
    ? await db
        .select()
        .from(blocks)
        .where(
          and(eq(blocks.pageId, currentPage.id), eq(blocks.isVisible, true)),
        )
        .orderBy(asc(blocks.position))
    : [];

  const posts =
    (isBlog || blogSlug) && features.blog
      ? await db
          .select()
          .from(blogPosts)
          .where(
            and(
              eq(blogPosts.siteId, site.id),
              eq(blogPosts.status, "published"),
              eq(blogPosts.language, language),
            ),
          )
          .orderBy(desc(blogPosts.publishedAt))
      : [];

  const singlePost = blogSlug
    ? posts.find((p) => p.slug === blogSlug)
    : undefined;

  // Fix N+1 : une seule requête groupée pour tous les slugs de pages par langue
  const allPageSlugs = await (supported.length > 1
    ? db
        .select({ slug: pages.slug, language: pages.language })
        .from(pages)
        .where(
          and(
            eq(pages.siteId, site.id),
            eq(pages.status, "published"),
            inArray(pages.language, supported),
          ),
        )
    : Promise.resolve([]));

  const slugsByLang = new Map<string, string[]>();
  for (const row of allPageSlugs) {
    const arr = slugsByLang.get(row.language) ?? [];
    arr.push(row.slug);
    slugsByLang.set(row.language, arr);
  }

  const languageTargets = supported.map((code) => {
    const targetPrefix = publicLanguagePrefix(root, code, defaultLanguage);
    if (!segments.length) return publicPath(targetPrefix);
    if (segments[0] === "catalog") return publicPath(targetPrefix, "catalog");
    if (segments[0] === "blog") {
      if (segments.length === 1) return publicPath(targetPrefix, "blog");
      const slugs = slugsByLang.get(code) ?? [];
      return slugs.includes(segments[1])
        ? publicPath(targetPrefix, `blog/${segments[1]}`)
        : publicPath(targetPrefix, "blog");
    }
    const slugs = slugsByLang.get(code) ?? [];
    return slugs.includes(route)
      ? publicPath(targetPrefix, route)
      : publicPath(targetPrefix);
  });

  const categories = Array.from(
    new Set(publicProducts.map((p) => p.category).filter(Boolean)),
  ) as string[];

  const logoUrl = safeImageUrl(site.logoUrl);
  const currentPath = `/${route}`;

  return (
    <div className="site-root min-h-screen" style={themeStyle(theme)}>
      {/* Tracker analytics côté client — ne bloque pas le rendu */}
      <AnalyticsTracker subdomain={subdomain} path={currentPath} />

      {/* Nav */}
      <header
        className="site-surface sticky top-0 z-40 border-b"
        style={{ borderColor: "var(--c-border)" }}
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
          <Link
            href={href("")}
            className="flex items-center gap-2 site-heading text-[17px] font-semibold"
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={site.name}
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
            ) : (
              site.name
            )}
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13.5px]">
            {navPages.map((page) => (
              <Link
                key={page.id}
                href={href(page.slug)}
                className="transition hover:opacity-70"
                style={{
                  color:
                    currentPage?.id === page.id
                      ? "var(--c-primary)"
                      : "var(--c-muted)",
                }}
              >
                {page.title}
              </Link>
            ))}
            {features.blog && (
              <Link
                href={href("blog")}
                className="transition hover:opacity-70"
                style={{
                  color: isBlog ? "var(--c-primary)" : "var(--c-muted)",
                }}
              >
                Blog
              </Link>
            )}
            {features.catalog && (
              <Link
                href={href("catalog")}
                className="transition hover:opacity-70"
                style={{
                  color: isCatalog ? "var(--c-primary)" : "var(--c-muted)",
                }}
              >
                {t.catalog.title}
              </Link>
            )}
          </nav>
          {supported.length > 1 && (
            <div className="ml-auto flex items-center gap-1 text-[12px]">
              {supported.map((code, index) => {
                const target = languageTargets[index];
                return (
                  <Link
                    key={code}
                    href={target || "/"}
                    className="rounded-md px-2 py-1 uppercase transition"
                    style={{
                      background:
                        code === language ? "var(--c-primary)" : "transparent",
                      color:
                        code === language
                          ? "var(--c-on-primary)"
                          : "var(--c-muted)",
                    }}
                  >
                    {code}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main>
        {singlePost ? (
          <article className="mx-auto max-w-3xl px-6 py-16">
            <Link href={href("blog")} className="site-muted text-[13px]">
              &larr; Blog
            </Link>
            <h1 className="site-heading mt-6 text-[34px] font-semibold leading-tight">
              {singlePost.title}
            </h1>
            <p className="site-muted mt-2 text-[13px]">
              {formatDate(singlePost.publishedAt, `${locale}-FR`)}
              {singlePost.category ? ` · ${singlePost.category}` : ""}
            </p>
            {safeImageUrl(singlePost.coverImage) && (
              <div className="relative mt-8 h-64 w-full overflow-hidden rounded-xl sm:h-80">
                <Image
                  src={safeImageUrl(singlePost.coverImage)!}
                  alt={singlePost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            <div className="mt-8 space-y-4 text-[15.5px] leading-[1.8]">
              {singlePost.content
                .split("\n")
                .filter((line) => line.trim())
                .map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
            </div>
          </article>
        ) : isBlog ? (
          <section className="mx-auto max-w-5xl px-6 py-16">
            <h1 className="site-heading text-[32px] font-semibold">Blog</h1>
            {posts.length === 0 ? (
              <p className="site-muted mt-8 text-sm">{t.publicSite.noPosts}</p>
            ) : (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={href(`blog/${post.slug}`)}
                    className="site-card overflow-hidden"
                  >
                    {safeImageUrl(post.coverImage) && (
                      <div className="relative h-40 w-full">
                        <Image
                          src={safeImageUrl(post.coverImage)!}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="site-muted text-[12px]">
                        {formatDate(post.publishedAt, `${locale}-FR`)}
                      </p>
                      <h2 className="site-heading mt-1.5 text-[17px] font-semibold">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="site-muted mt-2 line-clamp-3 text-[13.5px] leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ) : isCatalog ? (
          <CatalogClient
            products={publicProducts}
            categories={categories}
            locale={locale}
            t={t}
          />
        ) : currentPage ? (
          pageBlocks.length === 0 ? (
            <section className="mx-auto max-w-3xl px-6 py-24 text-center">
              <h1 className="site-heading text-[30px] font-semibold">
                {currentPage.title}
              </h1>
            </section>
          ) : (
            pageBlocks.map((block) => (
              <BlockView
                key={block.id}
                type={block.type}
                content={(block.content as Record<string, unknown>) ?? {}}
                ctx={{
                  siteId: site.id,
                  pageId: currentPage.id,
                  locale,
                  products: publicProducts,
                  publicPrefix: prefix,
                }}
              />
            ))
          )
        ) : (
          <section className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h1 className="site-heading text-[26px] font-semibold">
              {t.publicSite.pageNotFound}
            </h1>
            <Link
              href={href("")}
              className="site-muted mt-3 inline-block text-sm underline"
            >
              {site.name}
            </Link>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer
        className="site-surface border-t px-6 py-10 text-center text-[13px]"
        style={{ borderColor: "var(--c-border)", color: "var(--c-muted)" }}
      >
        <p>
          &copy; {new Date().getFullYear()} {site.name} &ndash;{" "}
          {t.publicSite.poweredBy} Batiste
        </p>
      </footer>
    </div>
  );
}
