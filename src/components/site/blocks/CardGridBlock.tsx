import Image from "next/image";
import { getMessages } from "@/i18n/messages";
import { type BlockProps, str, list, safeUrl, blockHref } from "./types";
import { Section, Heading } from "./wrappers";

export default function CardGridBlock({ content, ctx }: BlockProps) {
  const t = getMessages(ctx.locale);
  const columns = Number(str(content.columns, "3"));
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-3";

  return (
    <Section surface>
      {str(content.title) && (
        <Heading data-anim="up" className="mb-10 text-center">
          {str(content.title)}
        </Heading>
      )}
      <div className={`grid gap-5 ${gridClass}`}>
        {list(content.cards).map((card, index) => (
          <div
            key={index}
            data-anim="up"
            data-delay={String(index * 0.08)}
            className="site-card overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            {safeUrl(card.imageUrl) && (
              <div className="relative h-44 w-full">
                <Image
                  src={safeUrl(card.imageUrl)!}
                  alt={str(card.title)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="site-heading text-[17px] font-semibold">
                {str(card.title)}
              </h3>
              <p className="site-muted mt-2 text-[14px] leading-relaxed">
                {str(card.description)}
              </p>
              {str(card.buttonUrl) && (
                <a
                  href={blockHref(card.buttonUrl, ctx.publicPrefix)}
                  className="mt-4 inline-block text-[13px] font-medium underline underline-offset-4"
                  style={{ color: "var(--c-primary)" }}
                >
                  {t.publicSite.readMore}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
