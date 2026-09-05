import Image from "next/image";
import { type BlockProps, str, list, safeUrl } from "./types";
import { Section, Heading } from "./wrappers";

export default function CarouselBlock({ content }: BlockProps) {
  const slides = list(content.slides);

  return (
    <Section surface>
      {str(content.title) && (
        <Heading className="mb-8">{str(content.title)}</Heading>
      )}
      <div className="scroll-slim flex snap-x gap-4 overflow-x-auto pb-3">
        {slides.map((slide, index) => (
          <figure
            key={index}
            className="site-card w-[300px] shrink-0 snap-start overflow-hidden"
          >
            {safeUrl(slide.imageUrl) ? (
              <div className="relative h-48 w-full">
                <Image
                  src={safeUrl(slide.imageUrl)!}
                  alt={str(slide.title)}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            ) : (
              <div className="h-48 w-full" style={{ background: "var(--c-border)" }} />
            )}
            <figcaption className="p-4">
              <p className="text-[14px] font-medium">{str(slide.title)}</p>
              <p className="site-muted mt-1 text-[13px]">{str(slide.description)}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
