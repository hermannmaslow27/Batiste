import Image from "next/image";
import { type BlockProps, str, list, safeUrl } from "./types";
import { Section } from "./wrappers";

interface LogoItem {
  name?: unknown;
  imageUrl?: unknown;
}

export default function LogoCloudBlock({ content }: BlockProps) {
  const logos = list<LogoItem>(content.logos);

  return (
    <Section surface className="border-y border-zinc-200/60 py-12 sm:py-16">
      {str(content.title) && (
        <p
          data-anim="up"
          className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          {str(content.title, "Ils nous font confiance")}
        </p>
      )}

      <div
        data-anim="fade"
        data-delay="0.1"
        className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-75 grayscale transition hover:grayscale-0"
      >
        {logos.map((logo, index) => {
          const image = safeUrl(logo.imageUrl);
          const name = str(logo.name, "Partenaire");

          return (
            <div
              key={index}
              className="flex items-center justify-center transition hover:scale-105"
            >
              {image ? (
                <div className="relative h-8 w-28 sm:h-10 sm:w-32">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ) : (
                <span className="font-semibold tracking-tight text-zinc-800 text-sm sm:text-base px-3 py-1.5 rounded-lg border border-zinc-200/80 bg-white/80 shadow-2xs">
                  {name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
