import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string, maxLength = 50): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength);
}

export function formatPrice(
  cents: number | null,
  currency = "EUR",
  locale = "fr-FR",
) {
  if (cents === null || cents === undefined) return null;
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    cents / 100,
  );
}

export function formatDate(date: Date | string | null, locale = "fr-FR") {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
    new Date(date),
  );
}

export function formatDateTime(date: Date | string | null, locale = "fr-FR") {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

/**
 * Rate limiter avec Redis (Upstash) si UPSTASH_REDIS_REST_URL est configuré,
 * sinon fallback en mémoire (dev uniquement — non fiable en serverless multi-instance).
 */
const memBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimitMemory(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = memBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    memBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= max) return false;
  bucket.count += 1;
  return true;
}

async function rateLimitRedis(
  key: string,
  max: number,
  windowMs: number,
): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return rateLimitMemory(key, max, windowMs);

  const windowSec = Math.ceil(windowMs / 1000);
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, windowSec, "NX"],
    ]),
  });
  if (!res.ok) return true; // fail open
  const data = (await res.json()) as [{ result: number }, unknown];
  return data[0].result <= max;
}

export async function rateLimit(
  key: string,
  max = 10,
  windowMs = 60_000,
): Promise<boolean> {
  return rateLimitRedis(key, max, windowMs);
}

export const FEATURES = ["blog", "catalog", "quote", "booking"] as const;
export type FeatureId = (typeof FEATURES)[number];
