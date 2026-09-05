"use client";

import { useState } from "react";
import { type BlockProps, str, list } from "./types";
import { Section, Heading } from "./wrappers";

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="site-card overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left text-[15px] font-medium"
      >
        <span className="site-heading pr-4 font-semibold">{question}</span>
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-base font-semibold transition-transform duration-200"
          style={{ background: "var(--c-surface)", color: "var(--c-primary)" }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div
          className="border-t px-5 pb-5 pt-3 text-[14px] leading-relaxed site-muted"
          style={{ borderColor: "var(--c-border)" }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FaqBlock({ content }: BlockProps) {
  const questions = list(content.questions);

  return (
    <Section surface>
      <div className="mx-auto max-w-3xl">
        {str(content.title) && (
          <Heading data-anim="up" className="mb-10 text-center">
            {str(content.title)}
          </Heading>
        )}
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <FaqAccordionItem
              key={idx}
              question={str(q.question)}
              answer={str(q.answer)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
