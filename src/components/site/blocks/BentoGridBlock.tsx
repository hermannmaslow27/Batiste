import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type BlockProps, str, list, safeUrl, blockHref } from "./types";
import { Section, Heading } from "./wrappers";

interface BentoCardItem {
  title?: unknown;
  description?: unknown;
  badge?: unknown;
  imageUrl?: unknown;
  colSpan?: unknown;
  buttonUrl?: unknown;
}

export default function BentoGridBlock({ content, ctx }: BlockProps) {
  const cards = list<BentoCardItem>(content.cards);

  return (
    <Section surface>
      <div className="text-center">
        {str(content.title) && (
          <Heading data-anim="up">
            {str(content.title, "Conçu pour la performance et l'impact")}
          </Heading>
        )}
        {str(content.subtitle) && (
          <p
            data-anim="up"
            data-delay="0.1"
            className="site-muted mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed"
          >
            {str(content.subtitle)}
          </p>
        )}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const colSpan = str(card.colSpan, "1");
          const isWide = colSpan === "2";
          const image = safeUrl(card.imageUrl);
          const link = str(card.buttonUrl);

          return (
            <div
              key={index}
              data-anim="up"
              data-delay={String(index * 0.08)}
              className={`site-card group relative flex flex-col justify-between overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isWide ? "sm:col-span-2" : "col-span-1"
              }`}
            >
              {/* Subtle ambient light on hover */}
              <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-zinc-900/5 blur-2xl transition-all group-hover:scale-150 group-hover:bg-zinc-900/10" />

              <div>
                {str(card.badge) && (
                  <span className="inline-block rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1 text-[11px] font-semibold text-zinc-600 mb-4 tracking-wide">
                    {str(card.badge)}
                  </span>
                )}

                <h3 className="site-heading text-[18px] sm:text-[20px] font-bold tracking-tight">
                  {str(card.title)}
                </h3>

                <p className="site-muted mt-2.5 text-[14px] leading-relaxed">
                  {str(card.description)}
                </p>
              </div>

              {image && (
                <div className="relative mt-6 h-48 w-full overflow-hidden rounded-xl border border-zinc-100">
                  <Image
                    src={image}
                    alt={str(card.title)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {link && (
                <div className="mt-6 pt-2">
                  <a
                    href={blockHref(link, ctx.publicPrefix)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600"
                  >
                    En savoir plus
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
