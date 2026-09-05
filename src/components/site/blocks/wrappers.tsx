import React from "react";

export function Section({
  children,
  surface,
  className = "",
}: {
  children: React.ReactNode;
  surface?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`px-6 py-16 sm:px-10 sm:py-20 ${surface ? "site-surface" : ""} ${className}`}
      style={surface ? undefined : { background: "var(--c-bg)" }}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export function Heading({
  children,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <h2
      className={`site-heading text-[28px] font-semibold sm:text-[34px] ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
}
