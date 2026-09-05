export type UserPlan = "free" | "starter" | "pro" | "agency";

export interface SubscriptionInfo {
  planId?: string | null;
  status?: string | null;
}

export function getEffectivePlan(sub?: SubscriptionInfo | null): UserPlan {
  if (!sub || !sub.planId) return "free";
  const activeStatuses = ["active", "trialing"];
  if (!sub.status || !activeStatuses.includes(sub.status)) return "free";

  const id = sub.planId.toLowerCase();
  if (id === "agency") return "agency";
  if (id === "pro") return "pro";
  if (id === "starter") return "starter";
  return "free";
}

export function canUseCustomDomain(plan: UserPlan): boolean {
  return plan === "pro" || plan === "agency";
}

export function canRemoveBranding(plan: UserPlan): boolean {
  return plan === "pro" || plan === "agency";
}

export function canUseThemeOverrides(plan: UserPlan): boolean {
  return plan === "pro" || plan === "agency";
}

export function canUseBooking(plan: UserPlan): boolean {
  return plan === "pro" || plan === "agency";
}

export function getMaxSites(plan: UserPlan): number {
  if (plan === "agency") return Infinity;
  if (plan === "pro") return 5;
  return 1;
}

export function getMaxPages(plan: UserPlan): number {
  if (plan === "agency" || plan === "pro") return Infinity;
  return 5;
}
