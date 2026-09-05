"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShellSite } from "./SiteShell";
import type { SiteNavItem } from "./SiteSidebar";

interface MobileSiteHeaderProps {
  site: ShellSite;
  items: SiteNavItem[];
  visitLabel: string;
}

export default function MobileSiteHeader({
  site,
  items,
  visitLabel,
}: MobileSiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-zinc-950">
            {site.name}
          </p>
          <p className="truncate font-mono text-[10px] text-zinc-400">
            {site.subdomain}.batiste.app
          </p>
        </div>
        <a
          href={`/s/${site.subdomain}`}
          target="_blank"
          rel="noreferrer"
          aria-label={visitLabel}
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50"
        >
          <Globe2 className="size-4" />
        </a>
      </div>
      <nav
        aria-label="Site navigation"
        className="scroll-slim flex gap-1 overflow-x-auto px-3 pb-3"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-medium",
              pathname === item.href
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:bg-zinc-100",
            )}
          >
            <item.icon className="size-3.5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
