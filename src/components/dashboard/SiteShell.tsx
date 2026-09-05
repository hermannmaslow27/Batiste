"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  BarChart2,
  BookOpen,
  Compass,
  FileText,
  Globe2,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Palette,
  Settings,
  ShoppingBag,
} from "lucide-react";
import SiteSidebar, { type SiteNavItem, type SiteNavGroup } from "./SiteSidebar";
import MobileSiteHeader from "./MobileSiteHeader";
import CommandPalette from "./CommandPalette";

export interface ShellSite {
  id: string;
  name: string;
  subdomain: string;
  status: string;
}

export default function SiteShell({
  site,
  sites,
  features,
  unreadCount,
  children,
}: {
  site: ShellSite;
  sites: ShellSite[];
  features: Record<string, boolean>;
  unreadCount: number;
  children: React.ReactNode;
}) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const base = `/${locale}/dashboard/${site.id}`;
  const [collapsed, setCollapsed] = useState(false);

  const groups: SiteNavGroup[] = [
    {
      items: [
        { href: base, label: t.nav.overview, icon: LayoutDashboard },
      ],
    },
    {
      title: "Contenu",
      items: [
        { href: `${base}/pages`, label: t.nav.pages, icon: FileText },
        { href: `${base}/navigation`, label: "Navigation & Menu", icon: Compass },
        ...(features.catalog
          ? [{ href: `${base}/catalog`, label: t.nav.catalog, icon: ShoppingBag }]
          : []),
        ...(features.blog
          ? [{ href: `${base}/blog`, label: t.nav.blog, icon: BookOpen }]
          : []),
        { href: `${base}/testimonials`, label: t.nav.testimonials, icon: MessageSquareQuote },
      ],
    },
    {
      title: "Apparence",
      items: [
        { href: `${base}/theme`, label: "Thème & Design", icon: Palette },
      ],
    },
    {
      title: "Gestion",
      items: [
        { href: `${base}/inbox`, label: t.nav.inbox, icon: Inbox, badge: unreadCount },
        { href: `${base}/analytics`, label: t.nav.analytics, icon: BarChart2 },
        { href: `${base}/settings`, label: t.nav.settings, icon: Settings },
      ],
    },
  ];

  const allItems = groups.flatMap((g) => g.items);
  const currentItem = allItems.find((item) => item.href === pathname);

  const sidebarRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.05 });
    if (sidebarRef.current) {
      const navItems = sidebarRef.current.querySelectorAll("nav a, nav button");
      gsap.set(sidebarRef.current, { x: -16, opacity: 0 });
      tl.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      if (navItems.length) {
        gsap.set(navItems, { x: -10, opacity: 0 });
        tl.to(
          navItems,
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.04,
          },
          "-=0.2",
        );
      }
    }
    if (mainRef.current) {
      gsap.set(mainRef.current, { opacity: 0, y: 12 });
      tl.to(
        mainRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.15,
      );
    }
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <SiteSidebar
        site={site}
        sites={sites}
        groups={groups}
        locale={locale}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div ref={mainRef} className="flex min-w-0 flex-1 flex-col">
        <MobileSiteHeader site={site} items={allItems} visitLabel={t.common.visit} />
        <div className="sticky top-0 z-30 hidden items-center justify-between border-b border-zinc-200/80 bg-white/95 px-8 py-3 backdrop-blur lg:flex">
          <div className="flex min-w-0 items-center gap-2 text-[12px] text-zinc-400">
            <span className="font-medium text-zinc-500">{t.nav.mySites}</span>
            <span>/</span>
            <span className="truncate font-medium text-zinc-500">
              {site.name}
            </span>
            {currentItem && (
              <>
                <span>/</span>
                <span className="truncate font-medium text-zinc-950">
                  {currentItem.label}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <CommandPalette
              siteId={site.id}
              locale={locale}
              subdomain={site.subdomain}
            />
            <a
              href={`/s/${site.subdomain}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-500 hover:text-zinc-950"
            >
              <Globe2 className="size-3.5" /> {t.common.visit}{" "}
              <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
        <main className="dashboard-grid min-w-0 flex-1 p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
