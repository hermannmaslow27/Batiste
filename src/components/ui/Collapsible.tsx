"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  icon?: ReactNode;
  badge?: string | number;
  variant?: "sidebar" | "panel" | "card";
  className?: string;
  headerClassName?: string;
  children: ReactNode;
  /** Controlled open state (optional) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Collapsible({
  title,
  defaultOpen = true,
  icon,
  badge,
  variant = "panel",
  className,
  headerClassName,
  children,
  open: controlledOpen,
  onOpenChange,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(defaultOpen ? "auto" : 0);

  const toggle = () => {
    const next = !isOpen;
    if (onOpenChange) {
      onOpenChange(next);
    } else {
      setInternalOpen(next);
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      const h = contentRef.current.scrollHeight;
      setHeight(h);
      const timer = setTimeout(() => setHeight("auto"), 200);
      return () => clearTimeout(timer);
    } else {
      // First set to the current scrollHeight so the transition has a starting point
      setHeight(contentRef.current.scrollHeight);
      // Force reflow, then set to 0
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
        });
      });
    }
  }, [isOpen]);

  const variantStyles = {
    sidebar: {
      wrapper: "",
      header:
        "flex w-full items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer select-none",
      content: "space-y-0.5",
    },
    panel: {
      wrapper: "",
      header:
        "flex w-full items-center gap-2 px-1 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer select-none",
      content: "",
    },
    card: {
      wrapper: "border-b border-zinc-100 last:border-b-0",
      header:
        "flex w-full items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50/80 transition-colors cursor-pointer select-none",
      content: "px-5 pb-4",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.wrapper, className)}>
      <button
        type="button"
        onClick={toggle}
        className={cn(styles.header, headerClassName)}
        aria-expanded={isOpen}
      >
        <ChevronRight
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-200",
            isOpen && "rotate-90",
          )}
        />
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{title}</span>
        {badge !== undefined && (
          <span className="rounded-full bg-zinc-200/80 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">
            {badge}
          </span>
        )}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out"
        style={{
          maxHeight: height === "auto" ? "none" : `${height}px`,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
