import Image from "next/image";
import { type BlockProps, str, list, safeUrl } from "./types";
import { Section, Heading } from "./wrappers";

export default function TestimonialsBlock({ content }: BlockProps) {
  return (
    <Section>
      {str(content.title) && (
        <Heading data-anim="up" className="mb-10 text-center">
          {str(content.title)}
        </Heading>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list(content.items).map((item, index) => (
          <figure
            key={index}
            data-anim="up"
            data-delay={String(index * 0.1)}
            className="site-card p-6 transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="mb-3 text-amber-400 text-sm tracking-wider font-bold">★★★★★</div>
              <blockquote className="text-[15px] leading-relaxed italic">
                &ldquo;{str(item.quote)}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--c-border)] pt-4">
              {safeUrl(item.avatarUrl) ? (
                <Image
                  src={safeUrl(item.avatarUrl)!}
                  alt={str(item.name)}
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
              ) : (
                <span
                  className="flex size-9 items-center justify-center rounded-full text-xs font-medium"
                  style={{ background: "var(--c-surface)" }}
                >
                  {str(item.name, "?").slice(0, 1).toUpperCase()}
                </span>
              )}
              <div>
                <p className="text-[13px] font-medium">{str(item.name)}</p>
                <p className="site-muted text-[12px]">{str(item.role)}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
