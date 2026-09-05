import { ArrowRight } from "lucide-react";
import { type BlockProps, str, blockHref } from "./types";

export default function BannerBlock({ content, ctx }: BlockProps) {
  const badge = str(content.badge);
  const title = str(content.title);
  const buttonText = str(content.buttonText);
  const buttonUrl = str(content.buttonUrl);

  return (
    <div
      data-anim="fade"
      className="relative overflow-hidden border-b border-zinc-200/80 bg-zinc-900 py-3.5 px-4 text-white text-center text-xs sm:text-sm font-medium"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2.5">
        {badge && (
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
            {badge}
          </span>
        )}
        <span>{title}</span>
        {buttonText && (
          <a
            href={blockHref(buttonUrl, ctx.publicPrefix)}
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 transition hover:text-zinc-300 ml-1"
          >
            {buttonText}
            <ArrowRight className="size-3" />
          </a>
        )}
      </div>
    </div>
  );
}
