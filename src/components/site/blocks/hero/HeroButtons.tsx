import { blockHref } from "../types";

export default function HeroButtons({
  buttonText,
  buttonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  publicPrefix,
  isDark,
  align,
}: {
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  publicPrefix?: string;
  isDark: boolean;
  align: string;
}) {
  if (!buttonText && !secondaryButtonText) return null;

  return (
    <div
      data-anim="scale"
      data-delay="0.2"
      className={`mt-9 flex flex-wrap items-center gap-3.5 ${
        align === "left" ? "" : "justify-center"
      }`}
    >
      {buttonText && (
        <a
          href={blockHref(buttonUrl, publicPrefix)}
          className="site-button inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold shadow-md transition hover:scale-[1.03] active:scale-[0.98]"
        >
          {buttonText}
        </a>
      )}
      {secondaryButtonText && (
        <a
          href={blockHref(secondaryButtonUrl, publicPrefix)}
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
  );
}
