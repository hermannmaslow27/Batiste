import { type BlockProps, str } from "./types";
import { Section, Heading } from "./wrappers";

export default function RichTextBlock({ content }: BlockProps) {
  const align = str(content.alignment, "left");

  return (
    <Section>
      <div className={`mx-auto max-w-3xl ${align === "center" ? "text-center" : ""}`}>
        {str(content.title) && (
          <Heading className="mb-5" data-anim="up">
            {str(content.title)}
          </Heading>
        )}
        <div
          data-anim="fade"
          data-delay="0.15"
          className="space-y-4 text-[15px] leading-[1.75] opacity-85"
        >
          {str(content.content)
            .split("\n")
            .filter((line) => line.trim())
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </div>
    </Section>
  );
}
