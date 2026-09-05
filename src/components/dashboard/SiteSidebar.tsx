"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, IconButton, Select } from "@/components/ui";
import SignOutButton from "./SignOutButton";
import ProfileAvatar from "./ProfileAvatar";
import type { ShellSite } from "./SiteShell";

export interface SiteNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export interface SiteNavGroup {
  title?: string;
  items: SiteNavItem[];
}

export default function SiteSidebar({
  site,
  sites,
  groups,
  locale,
  collapsed,
  onToggle,
}: {
  site: ShellSite;
  sites: ShellSite[];
  groups: SiteNavGroup[];
  locale: string;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const billingHref = `/${locale}/billing`;
  const isBillingActive = pathname === billingHref;

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-zinc-200/80 bg-white transition-[width] lg:flex",
        collapsed ? "w-[76px]" : "w-64",
      )}
    >
      <div
        className={cn(
          "border-b border-zinc-200/80 py-4",
          collapsed ? "px-3" : "px-4",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/${locale}/dashboard`}
            className={cn(
              "text-[11px] font-medium uppercase tracking-wider text-zinc-400 hover:text-zinc-600",
              collapsed && "mx-auto",
            )}
          >
            {collapsed ? (
              <ArrowLeft className="size-4" />
            ) : (
              <>
                <ArrowLeft className="mr-1 inline size-3" />
                Mes sites
              </>
            )}
          </Link>
          <IconButton
            label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggle}
            className="shrink-0 border border-zinc-200 bg-zinc-50 hover:bg-zinc-100"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </IconButton>
        </div>
        {!collapsed && (
          <>
            <p className="mt-2 truncate text-sm font-semibold tracking-tight text-zinc-900">
              {site.name}
            </p>
            <p className="mt-0.5 truncate font-mono text-[11px] text-zinc-400">
              {site.subdomain}.batiste.app
            </p>
            <div className="mt-2">
              <Badge tone={site.status === "published" ? "success" : "neutral"}>
                {site.status === "published" ? "Publié" : "Brouillon"}
              </Badge>
            </div>
          </>
        )}
      </div>

      <nav aria-label="Site navigation" className="flex-1 space-y-3 overflow-y-auto p-3">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!collapsed && group.title && (
              <p className="px-3 pt-2 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {group.title}
              </p>
            )}
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-[background-color,color,transform]",
                  item.href === pathname
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-600 hover:translate-x-0.5 hover:bg-zinc-100 hover:text-zinc-950",
                )}
              >
                <item.icon
                  className={cn(
                    "size-4 shrink-0",
                    item.href === pathname ? "opacity-90" : "text-zinc-400",
                  )}
                />
                {!collapsed && <span className="flex-1">{item.label}</span>}
                {item.badge && !collapsed ? (
                  <span className="rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-zinc-200 p-3">
        <Link
          href={billingHref}
          title={collapsed ? "Facturation" : undefined}
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition",
            isBillingActive
              ? "bg-zinc-900 text-white shadow-sm"
              : "border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
            collapsed && "justify-center px-2",
          )}
        >
          <CreditCard className="size-4 shrink-0 text-zinc-500" />
          {!collapsed && <span>Facturation</span>}
        </Link>
        <a
          href={`/s/${site.subdomain}`}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "flex items-center rounded-xl border border-zinc-200 px-3 py-2 text-[13px] font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          <span className={collapsed ? "sr-only" : ""}>Voir le site</span>
          <ArrowUpRight className="size-4 text-zinc-400" />
        </a>
        {sites.length > 1 && !collapsed && (
          <Select
            value={site.id}
            onChange={(event) => {
              window.location.href = `/${locale}/dashboard/${event.target.value}`;
            }}
          >
            {sites.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </Select>
        )}
        <ProfileAvatar collapsed={collapsed} locale={locale} />
        <SignOutButton variant="ghost" />
      </div>
    </aside>
  );
}
