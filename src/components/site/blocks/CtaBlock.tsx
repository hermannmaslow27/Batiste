import { type BlockProps, str, blockHref } from "./types";

export default function CtaBlock({ content, ctx }: BlockProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-20 text-center sm:py-28"
      style={{ background: "var(--c-primary)", color: "var(--c-on-primary)" }}
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <h2
          data-anim="up"
          className="site-heading text-[30px] font-semibold tracking-tight sm:text-[40px]"
        >
          {str(content.title)}
        </h2>
        {str(content.description) && (
          <p data-anim="fade" data-delay="0.1" className="mt-3 text-[16px] opacity-85 leading-relaxed">
            {str(content.description)}
          </p>
        )}
        {str(content.buttonText) && (
          <a
            data-anim="scale"
            data-delay="0.2"
            href={blockHref(content.buttonUrl, ctx.publicPrefix)}
            className="mt-8 inline-block px-8 py-4 text-sm font-semibold shadow-lg transition hover:opacity-95 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              background: "var(--c-on-primary)",
              color: "var(--c-primary)",
              borderRadius: "var(--radius)",
            }}
          >
            {str(content.buttonText)}
          </a>
        )}
      </div>
    </section>
  );
}
