"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { PublicProduct } from "@/components/site/BlockView";
import type { Locale } from "@/i18n/messages";
import type { Messages } from "@/i18n/messages";

function safeImageUrl(url: unknown): string | null {
  if (typeof url !== "string" || !url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return url;
  } catch {
    return null;
  }
}

export default function CatalogClient({
  products,
  categories,
  locale,
  t,
}: {
  products: PublicProduct[];
  categories: string[];
  locale: Locale;
  t: Messages;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="site-heading text-[32px] font-semibold">
        {t.catalog.title}
      </h1>

      {categories.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="site-muted">{t.publicSite.filters} :</span>
          <button
            onClick={() => setActiveCategory(null)}
            className="rounded-full px-3 py-1 transition"
            style={{
              background: activeCategory === null ? "var(--c-primary)" : "var(--c-surface)",
              color: activeCategory === null ? "var(--c-on-primary)" : "inherit",
            }}
          >
            {t.publicSite.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className="rounded-full px-3 py-1 transition"
              style={{
                background:
                  activeCategory === cat ? "var(--c-primary)" : "var(--c-surface)",
                color:
                  activeCategory === cat ? "var(--c-on-primary)" : "inherit",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="site-muted mt-8 text-sm">{t.publicSite.noProducts}</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => {
            const imageUrl = safeImageUrl(
              Array.isArray(product.images) ? product.images[0] : null,
            );
            const attributes =
              (product.customAttributes as Record<string, string>) ?? {};
            return (
              <article key={product.id} className="site-card overflow-hidden">
                {imageUrl ? (
                  <div className="relative h-44 w-full">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div
                    className="h-44 w-full"
                    style={{ background: "var(--c-surface)" }}
                  />
                )}
                <div className="p-5">
                  <h2 className="site-heading text-[16px] font-semibold">
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="site-muted mt-1.5 text-[13.5px] leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  {Object.keys(attributes).length > 0 && (
                    <dl className="mt-3 space-y-1 text-[12.5px]">
                      {Object.entries(attributes).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-3">
                          <dt className="site-muted">{key}</dt>
                          <dd>{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {product.price !== null && (
                    <p className="mt-3 text-[15px] font-semibold">
                      {formatPrice(
                        product.price,
                        product.currency ?? "EUR",
                        `${locale}-FR`,
                      )}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
