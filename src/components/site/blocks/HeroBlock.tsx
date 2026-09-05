import Image from "next/image";
import { type BlockProps, str, safeUrl } from "./types";
import { getHeroVariantStyles } from "./hero/heroStyles";
import HeroButtons from "./hero/HeroButtons";
import HeroRating from "./hero/HeroRating";

export default function HeroBlock({ content, ctx }: BlockProps) {
  const align = str(content.alignment, "center");
  const image = safeUrl(content.imageUrl);
  const badge = str(content.badge);
  const buttonText = str(content.buttonText);
  const buttonUrl = str(content.buttonUrl);
  const secondaryButtonText = str(content.secondaryButtonText);
  const secondaryButtonUrl = str(content.secondaryButtonUrl);
  const showRating = content.showRating !== false;
  const ratingText = str(content.ratingText, "4.9/5 avis clients vérifiés");
  const variant = str(content.styleVariant, "default");

  const isDark = variant === "dark" || Boolean(image);
  const variantStyles = getHeroVariantStyles(variant, Boolean(image));

  return (
    <section
      className="relative overflow-hidden transition-colors duration-300"
      style={variantStyles}
    >
      {/* Ambient background glow for dark variant */}
      {variant === "dark" && !image && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,119,198,0.25),transparent)]" />
      )}

      {image && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}

      {image && content.overlay !== false && (
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
      )}

      <div
        className={`relative mx-auto max-w-4xl px-6 py-24 sm:py-32 ${
          align === "left" ? "text-left" : "text-center"
        }`}
      >
        {badge && (
          <div
            data-anim="up"
            className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium shadow-xs transition-all ${
              isDark
                ? "border border-white/20 bg-white/10 text-white backdrop-blur-md"
                : "border border-zinc-200/80 bg-white/90 text-zinc-700 shadow-sm backdrop-blur-md"
            }`}
          >
            <span
              className="size-1.5 rounded-full animate-pulse"
              style={{ background: isDark ? "#34d399" : "var(--c-primary, #18181b)" }}
            />
            {badge}
          </div>
        )}

        <h1
          data-anim="up"
          className="site-heading text-[38px] font-bold tracking-tight leading-[1.08] sm:text-[56px] lg:text-[64px]"
        >
          {str(content.title, "Un titre percutant")}
        </h1>

        {str(content.subtitle) && (
          <p
            data-anim="up"
            data-delay="0.1"
            className={`mt-6 max-w-2xl text-[16px] leading-relaxed sm:text-[18px] ${
              isDark ? "text-zinc-300" : "text-zinc-600"
            } ${align === "left" ? "" : "mx-auto"}`}
          >
            {str(content.subtitle)}
          </p>
        )}

        <HeroButtons
          buttonText={buttonText}
          buttonUrl={buttonUrl}
          secondaryButtonText={secondaryButtonText}
          secondaryButtonUrl={secondaryButtonUrl}
          publicPrefix={ctx.publicPrefix}
          isDark={isDark}
          align={align}
        />

        {showRating && ratingText && (
          <HeroRating
            ratingText={ratingText}
            isDark={isDark}
            align={align}
          />
        )}
      </div>
    </section>
  );
}
