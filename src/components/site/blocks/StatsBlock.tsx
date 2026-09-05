import { type BlockProps, str, list } from "./types";
import { Section, Heading } from "./wrappers";

export default function StatsBlock({ content }: BlockProps) {
  const statItems = list(content.stats);

  return (
    <Section surface>
      {str(content.title) && (
        <Heading data-anim="up" className="mb-12 text-center">
          {str(content.title)}
        </Heading>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statItems.map((s, idx) => (
          <div
            key={idx}
            data-anim="up"
            data-delay={String(idx * 0.1)}
            className="site-card p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className="site-heading text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ color: "var(--c-primary)" }}
            >
              {str(s.value)}
            </div>
            <div className="mt-2 text-[15px] font-semibold">{str(s.label)}</div>
            {str(s.description) && (
              <p className="site-muted mt-1.5 text-[13px] leading-relaxed">
                {str(s.description)}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
