"use client";
import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { submitPublicFormAction } from "@/actions/catalog";
import { formatPrice } from "@/lib/utils";
import { getMessages, type Locale } from "@/i18n/messages";
import { useScrollReveal } from "@/lib/animations";
import { publicPath } from "@/lib/public-site";

export interface PublicProduct {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  images: unknown;
  category: string | null;
  customAttributes: unknown;
}

export interface BlockViewContext {
  siteId: string;
  pageId: string | null;
  locale: Locale;
  products: PublicProduct[];
  publicPrefix?: string;
  /** true inside the editor preview: forms are inert */
  preview?: boolean;
}

interface BlockViewProps {
  type: string;
  content: Record<string, unknown>;
  ctx: BlockViewContext;
}

const str = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() ? value : fallback;

const list = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value) ? (value as Record<string, unknown>[]) : [];

function safeUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const p = new URL(value);
    if (p.protocol !== "https:" && p.protocol !== "http:") return null;
    return value;
  } catch {
    return null;
  }
}

function blockHref(value: unknown, prefix: string | undefined) {
  const target = str(value, "#");
  if (!prefix || target.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(target))
    return target;
  return publicPath(prefix, target);
}

function Section({
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

function Heading({
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

/* ------------------------------------------------------------------ Forms */
function PublicFormFields({
  fields,
  submitText,
  successMessage,
  formType,
  ctx,
}: {
  fields: { label: string; type: string; options?: string; required?: boolean }[];
  submitText: string;
  successMessage: string;
  formType: "contact" | "quote" | "booking";
  ctx: BlockViewContext;
}) {
  const t = getMessages(ctx.locale);
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="site-card px-5 py-6 text-center text-sm">
        {successMessage || t.publicSite.messageSent}
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        const payload: Record<string, string> = {};
        formData.forEach((value, key) => {
          payload[key] = String(value).slice(0, 5000);
        });
        if (ctx.preview) {
          toast.info(t.common.preview);
          return;
        }
        startTransition(async () => {
          const result = await submitPublicFormAction({
            siteId: ctx.siteId,
            formType,
            pageId: ctx.pageId,
            data: payload,
          });
          if (result.ok) {
            setDone(true);
            toast.success(successMessage || t.publicSite.messageSent);
            formEl.reset();
          } else {
            toast.error(
              result.error === "rate_limited"
                ? t.validation.rateLimited
                : t.common.genericError,
            );
          }
        });
      }}
    >
      {fields.map((field, index) => {
        const name = field.label || `field-${index + 1}`;
        return (
          <div key={`${name}-${index}`} className="space-y-1.5">
            <label className="block text-[13px] font-medium">
              {field.label}{" "}
              {field.required && <span className="ml-0.5 opacity-60">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={name}
                required={field.required}
                rows={4}
                className="site-input w-full px-3.5 py-2.5 text-sm"
              />
            ) : field.type === "select" ? (
              <select
                name={name}
                required={field.required}
                className="site-input w-full px-3.5 py-2.5 text-sm"
              >
                {String(field.options ?? "")
                  .split("|")
                  .filter(Boolean)
                  .map((option) => (
                    <option key={option}>{option.trim()}</option>
                  ))}
              </select>
            ) : (
              <input
                name={name}
                type={field.type || "text"}
                required={field.required}
                className="site-input w-full px-3.5 py-2.5 text-sm"
              />
            )}
          </div>
        );
      })}
      <button
        type="submit"
        disabled={pending}
        className="site-button w-full px-5 py-3 text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? t.publicSite.sending : submitText || t.publicSite.send}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------- Block view */
function AnimatedBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return <div ref={ref}>{children}</div>;
}

export default function BlockView({ type, content, ctx }: BlockViewProps) {
  const t = getMessages(ctx.locale);
  const inner = renderBlock(type, content, ctx, t);
  if (!inner) return null;
  if (ctx.preview) return inner;
  return <AnimatedBlock>{inner}</AnimatedBlock>;
}

function renderBlock(
  type: string,
  content: Record<string, unknown>,
  ctx: BlockViewContext,
  t: ReturnType<typeof getMessages>,
): React.ReactNode {
  switch (type) {
    case "hero": {
      const align = str(content.alignment, "center");
      const image = safeUrl(content.imageUrl);
      return (
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--c-surface)" }}
        >
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
            <div className="absolute inset-0 bg-black/45" />
          )}
          <div
            className={`relative mx-auto max-w-4xl px-6 py-24 sm:py-32 ${align === "left" ? "text-left" : "text-center"}`}
            style={image ? { color: "#fff" } : undefined}
          >
            <h1
              data-anim="up"
              className="site-heading text-[38px] font-semibold leading-[1.08] sm:text-[54px]"
            >
              {str(content.title, "…")}
            </h1>
            {str(content.subtitle) && (
              <p
                data-anim="up"
                data-delay="0.1"
                className={`mt-5 max-w-2xl text-[16px] leading-relaxed opacity-80 ${align === "left" ? "" : "mx-auto"}`}
              >
                {str(content.subtitle)}
              </p>
            )}
            {str(content.buttonText) && (
              <div data-anim="scale" data-delay="0.2" className="mt-8">
                <a
                  href={blockHref(content.buttonUrl, ctx.publicPrefix)}
                  className="site-button inline-block px-6 py-3.5 text-sm font-medium transition hover:opacity-90"
                >
                  {str(content.buttonText)}
                </a>
              </div>
            )}
          </div>
        </section>
      );
    }

    case "rich_text": {
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

    case "card_grid": {
      const columns = Number(str(content.columns, "3"));
      const gridClass =
        columns === 2
          ? "sm:grid-cols-2"
          : columns === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-3";
      return (
        <Section surface>
          {str(content.title) && (
            <Heading data-anim="up" className="mb-10 text-center">
              {str(content.title)}
            </Heading>
          )}
          <div className={`grid gap-5 ${gridClass}`}>
            {list(content.cards).map((card, index) => (
              <div
                key={index}
                data-anim="up"
                data-delay={String(index * 0.08)}
                className="site-card overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {safeUrl(card.imageUrl) && (
                  <div className="relative h-44 w-full">
                    <Image
                      src={safeUrl(card.imageUrl)!}
                      alt={str(card.title)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="site-heading text-[17px] font-semibold">
                    {str(card.title)}
                  </h3>
                  <p className="site-muted mt-2 text-[14px] leading-relaxed">
                    {str(card.description)}
                  </p>
                  {str(card.buttonUrl) && (
                    <a
                      href={blockHref(card.buttonUrl, ctx.publicPrefix)}
                      className="mt-4 inline-block text-[13px] font-medium underline underline-offset-4"
                      style={{ color: "var(--c-primary)" }}
                    >
                      {t.publicSite.readMore}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      );
    }

    case "cta": {
      return (
        <section
          className="px-6 py-16 text-center sm:py-20"
          style={{ background: "var(--c-primary)", color: "var(--c-on-primary)" }}
        >
          <div className="mx-auto max-w-2xl">
            <h2
              data-anim="up"
              className="site-heading text-[28px] font-semibold sm:text-[34px]"
            >
              {str(content.title)}
            </h2>
            {str(content.description) && (
              <p data-anim="fade" data-delay="0.1" className="mt-3 text-[15px] opacity-85">
                {str(content.description)}
              </p>
            )}
            {str(content.buttonText) && (
              <a
                data-anim="scale"
                data-delay="0.2"
                href={blockHref(content.buttonUrl, ctx.publicPrefix)}
                className="mt-8 inline-block px-6 py-3.5 text-sm font-medium transition hover:opacity-90 hover:scale-[1.05] active:scale-[0.97]"
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

    case "testimonials": {
      return (
        <Section>
          {str(content.title) && (
            <Heading data-anim="up" className="mb-10 text-center">
              {str(content.title)}
            </Heading>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list(content.items).map((item, index) => (
              <figure
                key={index}
                data-anim="up"
                data-delay={String(index * 0.1)}
                className="site-card p-6 transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <blockquote className="text-[15px] leading-relaxed">
                  &ldquo;{str(item.quote)}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {safeUrl(item.avatarUrl) ? (
                    <Image
                      src={safeUrl(item.avatarUrl)!}
                      alt={str(item.name)}
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="flex size-9 items-center justify-center rounded-full text-xs font-medium"
                      style={{ background: "var(--c-surface)" }}
                    >
                      {str(item.name, "?").slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <div>
                    <p className="text-[13px] font-medium">{str(item.name)}</p>
                    <p className="site-muted text-[12px]">{str(item.role)}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      );
    }

    case "carousel": {
      const slides = list(content.slides);
      return (
        <Section surface>
          {str(content.title) && (
            <Heading className="mb-8">{str(content.title)}</Heading>
          )}
          <div className="scroll-slim flex snap-x gap-4 overflow-x-auto pb-3">
            {slides.map((slide, index) => (
              <figure
                key={index}
                className="site-card w-[300px] shrink-0 snap-start overflow-hidden"
              >
                {safeUrl(slide.imageUrl) ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={safeUrl(slide.imageUrl)!}
                      alt={str(slide.title)}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full" style={{ background: "var(--c-border)" }} />
                )}
                <figcaption className="p-4">
                  <p className="text-[14px] font-medium">{str(slide.title)}</p>
                  <p className="site-muted mt-1 text-[13px]">{str(slide.description)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      );
    }

    case "product_grid": {
      const category = str(content.category);
      const limit = Number(content.limit) || 6;
      const items = ctx.products
        .filter((p) => !category || p.category === category)
        .slice(0, limit);
      const columns = Number(str(content.columns, "3"));
      const gridClass =
        columns === 2
          ? "sm:grid-cols-2"
          : columns === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-3";
      return (
        <Section>
          {str(content.title) && (
            <Heading data-anim="up" className="mb-10 text-center">
              {str(content.title)}
            </Heading>
          )}
          {items.length === 0 ? (
            <p className="site-muted text-center text-sm">{t.publicSite.noProducts}</p>
          ) : (
            <div className={`grid gap-5 ${gridClass}`}>
              {items.map((product, idx) => {
                const imageUrl = safeUrl(
                  Array.isArray(product.images) ? product.images[0] : null,
                );
                return (
                  <article
                    key={product.id}
                    data-anim="up"
                    data-delay={String(idx * 0.07)}
                    className="site-card overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    {imageUrl ? (
                      <div className="relative h-44 w-full">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-44 w-full" style={{ background: "var(--c-surface)" }} />
                    )}
                    <div className="p-5">
                      <h3 className="site-heading text-[16px] font-semibold">{product.name}</h3>
                      {product.description && (
                        <p className="site-muted mt-1.5 line-clamp-3 text-[13.5px] leading-relaxed">
                          {product.description}
                        </p>
                      )}
                      {content.showPrice !== false && product.price !== null && (
                        <p className="mt-3 text-[15px] font-semibold">
                          {formatPrice(product.price, product.currency ?? "EUR", `${ctx.locale}-FR`)}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Section>
      );
    }

    case "form":
    case "contact_form":
    case "booking_form": {
      const isBooking = type === "booking_form";
      const fields =
        type === "form"
          ? (list(content.fields) as unknown as {
              label: string;
              type: string;
              options?: string;
              required?: boolean;
            }[])
          : isBooking
            ? [
                { label: "Nom", type: "text", required: true },
                { label: "Email", type: "email", required: true },
                { label: "Date", type: "text", required: true },
                { label: "Message", type: "textarea", required: false },
              ]
            : [
                { label: "Nom", type: "text", required: true },
                { label: "Email", type: "email", required: true },
                { label: "Message", type: "textarea", required: true },
              ];
      return (
        <Section surface>
          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
            <div data-anim="left">
              <Heading>{str(content.title, t.publicSite.send)}</Heading>
              {str(content.description) && (
                <p className="site-muted mt-3 text-[15px] leading-relaxed">
                  {str(content.description)}
                </p>
              )}
              <ul className="mt-6 space-y-2 text-[14px]">
                {str(content.email) && <li>✉ {str(content.email)}</li>}
                {str(content.phone) && <li>☎ {str(content.phone)}</li>}
                {str(content.address) && <li>⌖ {str(content.address)}</li>}
                {isBooking && Number(content.duration) > 0 && (
                  <li>◷ {String(content.duration)} min</li>
                )}
              </ul>
            </div>
            <PublicFormFields
              fields={fields}
              submitText={str(content.submitText, isBooking ? t.publicSite.bookNow : t.publicSite.send)}
              successMessage={str(content.successMessage, t.publicSite.messageSent)}
              formType={type === "form" ? "quote" : isBooking ? "booking" : "contact"}
              ctx={ctx}
            />
          </div>
        </Section>
      );
    }

    default:
      return null;
  }
}
