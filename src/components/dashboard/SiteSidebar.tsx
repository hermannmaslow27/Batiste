"use client";

import { useState, useEffect } from "react";
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
import { Badge, Collapsible, IconButton, Select } from "@/components/ui";
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

const STORAGE_KEY = "batiste-sidebar-groups";

function loadGroupState(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveGroupState(state: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silent
  }
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

  // Track which groups are open/closed (persisted in localStorage)
  const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = loadGroupState();
    // Auto-open the group containing the active item
    const result: Record<string, boolean> = {};
    groups.forEach((g) => {
      if (!g.title) return;
      const hasActive = g.items.some((item) => item.href === pathname);
      // Use saved state if exists, otherwise open if has active item
      result[g.title] = saved[g.title] !== undefined ? saved[g.title] : (hasActive || true);
    });
    setGroupOpen(result);
  }, []);

  const toggleGroup = (title: string) => {
    setGroupOpen((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      saveGroupState(next);
      return next;
    });
  };

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-zinc-200/80 bg-white transition-[width] duration-200 lg:flex",
        collapsed ? "w-[72px]" : "w-60",
      )}
    >
      {/* ─── Header: Back + Site Info ─── */}
      <div
        className={cn(
          "border-b border-zinc-200/80 py-3.5",
          collapsed ? "px-3" : "px-4",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/${locale}/dashboard`}
            className={cn(
              "text-[11px] font-medium uppercase tracking-wider text-zinc-400 hover:text-zinc-600 transition-colors",
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
          <div className="mt-2.5">
            <p className="truncate text-sm font-semibold tracking-tight text-zinc-900">
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
          </div>
        )}
      </div>

      {/* ─── Navigation Groups ─── */}
      <nav aria-label="Site navigation" className="flex-1 overflow-y-auto py-2 px-2">
        {groups.map((group, gIdx) => {
          // Group without title (e.g. Overview) — always visible
          if (!group.title || collapsed) {
            return (
              <div key={gIdx} className="space-y-0.5 mb-2">
                {collapsed && group.title && (
                  <div className="my-2 mx-auto h-px w-6 bg-zinc-200" />
                )}
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            );
          }

          // Collapsible group
          const isOpen = groupOpen[group.title] !== false;
          return (
            <Collapsible
              key={group.title}
              title={group.title}
              variant="sidebar"
              defaultOpen
              open={isOpen}
              onOpenChange={() => toggleGroup(group.title!)}
              className="mb-1"
            >
              {group.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              ))}
            </Collapsible>
          );
        })}
      </nav>

      {/* ─── Footer: Quick Actions ─── */}
      <div className="space-y-1.5 border-t border-zinc-200 p-2">
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

/* ─── NavLink sub-component ─── */

function NavLink({
  item,
  pathname,
  collapsed,
}: {
  item: SiteNavItem;
  pathname: string;
  collapsed: boolean;
}) {
  const active = item.href === pathname;
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-150",
        active
          ? "bg-zinc-900 text-white shadow-sm"
          : "text-zinc-600 hover:translate-x-0.5 hover:bg-zinc-100 hover:text-zinc-950",
        collapsed && "justify-center px-2",
      )}
    >
      <item.icon
        className={cn(
          "size-4 shrink-0",
          active ? "opacity-90" : "text-zinc-400 group-hover:text-zinc-600",
        )}
      />
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
      {item.badge && !collapsed ? (
        <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}
