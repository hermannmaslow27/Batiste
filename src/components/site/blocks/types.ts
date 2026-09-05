import { type Locale } from "@/i18n/messages";
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

export interface BlockProps {
  content: Record<string, unknown>;
  ctx: BlockViewContext;
}

export const str = (value: unknown, fallback = ""): string =>
  typeof value === "string" && value.trim() ? value : fallback;

export const list = <T = Record<string, unknown>>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

export function safeUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const p = new URL(value);
    if (p.protocol !== "https:" && p.protocol !== "http:") return null;
    return value;
  } catch {
    return null;
  }
}

export function blockHref(value: unknown, prefix: string | undefined): string {
  const target = str(value, "#");
  if (!prefix || target.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(target)) {
    return target;
  }
  return publicPath(prefix, target);
}
