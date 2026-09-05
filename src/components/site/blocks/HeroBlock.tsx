import Image from "next/image";
import { type BlockProps, str, safeUrl, blockHref } from "./types";

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

  const getVariantStyles = () => {
    if (image) return { color: "#ffffff" };
    switch (variant) {
      case "dark":
        return { background: "#09090b", color: "#fafafa" };
      case "gradient":
        return {
          background:
            "linear-gradient(135deg, var(--c-surface, #f4f4f5) 0%, var(--c-bg, #ffffff) 100%)",
        };
      case "surface":
        return { background: "var(--c-surface, #f4f4f5)" };
      default:
        return { background: "var(--c-bg, #ffffff)" };
    }
  };

  const isDark = variant === "dark" || Boolean(image);

  return (
    <section
      className="relative overflow-hidden transition-colors duration-300"
      style={getVariantStyles()}
    >
      {/* Ambient background glow for dark/gradient variants */}
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

        {(buttonText || secondaryButtonText) && (
          <div
            data-anim="scale"
            data-delay="0.2"
            className={`mt-9 flex flex-wrap items-center gap-3.5 ${
              align === "left" ? "" : "justify-center"
            }`}
          >
            {buttonText && (
              <a
                href={blockHref(buttonUrl, ctx.publicPrefix)}
                className="site-button inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold shadow-md transition hover:scale-[1.03] active:scale-[0.98]"
              >
                {buttonText}
              </a>
            )}
            {secondaryButtonText && (
              <a
                href={blockHref(secondaryButtonUrl, ctx.publicPrefix)}
                className={`inline-flex items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-semibold transition hover:scale-[1.02] active:scale-[0.98] ${
                  isDark
                    ? "border-white/25 bg-white/5 text-white hover:bg-white/15"
                    : "border-zinc-300 bg-white text-zinc-800 shadow-xs hover:border-zinc-400 hover:bg-zinc-50"
                }`}
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        )}

        {showRating && ratingText && (
          <div
            data-anim="fade"
            data-delay="0.25"
            className={`mt-10 flex items-center gap-2.5 text-xs ${
              isDark ? "text-zinc-300" : "text-zinc-500"
            } ${align === "left" ? "" : "justify-center"}`}
          >
            <span className="flex text-amber-400 font-bold tracking-widest text-[13px]">
              ★★★★★
            </span>
            <span className="font-medium tracking-tight">{ratingText}</span>
          </div>
        )}
      </div>
    </section>
  );
}
