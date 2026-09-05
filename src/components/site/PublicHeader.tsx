import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/messages";
import type { NavbarConfig } from "@/actions/navigation";

interface PublicHeaderProps {
  siteName: string;
  logoUrl: string | null;
  navPages: { id: string; slug: string; title: string }[];
  currentPageId?: string;
  isBlog: boolean;
  isCatalog: boolean;
  showBlog: boolean;
  showCatalog: boolean;
  navbarConfig?: NavbarConfig | null;
  href: (slug: string) => string;
  supportedLanguages: Locale[];
  languageTargets: string[];
  currentLanguage: Locale;
  catalogTitle: string;
}

export default function PublicHeader({
  siteName,
  logoUrl,
  navPages,
  currentPageId,
  isBlog,
  isCatalog,
  showBlog,
  showCatalog,
  navbarConfig,
  href,
  supportedLanguages,
  languageTargets,
  currentLanguage,
  catalogTitle,
}: PublicHeaderProps) {
  const customItems = navbarConfig?.items ?? [];
  const ctaButton = navbarConfig?.ctaButton;

  return (
    <header
      className="site-surface sticky top-0 z-40 border-b"
      style={{ borderColor: "var(--c-border)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href={href("")}
            className="flex items-center gap-2 site-heading text-[17px] font-semibold"
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={siteName}
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
            ) : (
              siteName
            )}
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13.5px]">
            {customItems.length > 0 ? (
              customItems.map((item) => {
                if (item.isExternal) {
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:opacity-70"
                      style={{ color: "var(--c-muted)" }}
                    >
                      {item.label}
                    </a>
                  );
                }
                const isAnchor = item.url.startsWith("#");
                const targetUrl = isAnchor
                  ? item.url
                  : href(item.url.replace(/^\//, ""));
                return (
                  <a
                    key={item.id}
                    href={targetUrl}
                    className="transition hover:opacity-70"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {item.label}
                  </a>
                );
              })
            ) : (
              <>
                {navPages.map((page) => (
                  <Link
                    key={page.id}
                    href={href(page.slug)}
                    className="transition hover:opacity-70"
                    style={{
                      color:
                        currentPageId === page.id
                          ? "var(--c-primary)"
                          : "var(--c-muted)",
                    }}
                  >
                    {page.title}
                  </Link>
                ))}
                {showBlog && (
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
                {showCatalog && (
                  <Link
                    href={href("catalog")}
                    className="transition hover:opacity-70"
                    style={{
                      color: isCatalog ? "var(--c-primary)" : "var(--c-muted)",
                    }}
                  >
                    {catalogTitle}
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {supportedLanguages.length > 1 && (
            <div className="flex items-center gap-1 text-[12px]">
              {supportedLanguages.map((code, index) => (
                <a
                  key={code}
                  href={languageTargets[index]}
                  className="px-1.5 py-0.5 rounded transition uppercase font-mono text-[11px]"
                  style={{
                    color:
                      code === currentLanguage
                        ? "var(--c-primary)"
                        : "var(--c-muted)",
                    fontWeight: code === currentLanguage ? 600 : 400,
                  }}
                >
                  {code}
                </a>
              ))}
            </div>
          )}

          {ctaButton?.enabled && ctaButton.label && (
            <a
              href={
                ctaButton.url.startsWith("#")
                  ? ctaButton.url
                  : href(ctaButton.url.replace(/^\//, ""))
              }
              className="site-button px-4 py-1.5 text-xs font-semibold shadow-xs transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "var(--c-primary)",
                color: "var(--c-on-primary)",
                borderRadius: "var(--radius)",
              }}
            >
              {ctaButton.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
