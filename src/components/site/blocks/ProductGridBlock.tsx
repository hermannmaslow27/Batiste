import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { getMessages } from "@/i18n/messages";
import { type BlockProps, str, safeUrl } from "./types";
import { Section, Heading } from "./wrappers";

export default function ProductGridBlock({ content, ctx }: BlockProps) {
  const t = getMessages(ctx.locale);
  const category = str(content.category);
  const limit = Number(content.limit) || 6;
  const items = ctx.products
    .filter((p) => !category || p.category === category)
    .slice(0, limit);
  const columns = Number(str(content.columns, "3"));
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-3";

  return (
    <Section>
      {str(content.title) && (
        <Heading data-anim="up" className="mb-10 text-center">
          {str(content.title)}
        </Heading>
      )}
      {items.length === 0 ? (
        <p className="site-muted text-center text-sm">{t.publicSite.noProducts}</p>
      ) : (
        <div className={`grid gap-5 ${gridClass}`}>
          {items.map((product, idx) => {
            const imageUrl = safeUrl(
              Array.isArray(product.images) ? product.images[0] : null,
            );
            return (
              <article
                key={product.id}
                data-anim="up"
                data-delay={String(idx * 0.07)}
                className="site-card overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
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
                  <div className="h-44 w-full" style={{ background: "var(--c-surface)" }} />
                )}
                <div className="p-5">
                  <h3 className="site-heading text-[16px] font-semibold">{product.name}</h3>
                  {product.description && (
                    <p className="site-muted mt-1.5 line-clamp-3 text-[13.5px] leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  {content.showPrice !== false && product.price !== null && (
                    <p className="mt-3 text-[15px] font-semibold">
                      {formatPrice(product.price, product.currency ?? "EUR", `${ctx.locale}-FR`)}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Section>
  );
}
