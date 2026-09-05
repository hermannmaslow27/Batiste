"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import ProBadge from "./ProBadge";

interface UpgradeGateProps {
  title: string;
  description: string;
  locale?: string;
  children?: React.ReactNode;
  locked?: boolean;
}

export default function UpgradeGate({
  title,
  description,
  locale = "fr",
  children,
  locked = true,
}: UpgradeGateProps) {
  if (!locked) {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-2xl border border-dashed border-violet-300 bg-gradient-to-b from-violet-50/70 to-indigo-50/40 p-6 text-center shadow-xs">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-violet-200">
        <Lock className="size-5 text-violet-600" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <h4 className="text-base font-semibold text-zinc-900">{title}</h4>
        <ProBadge />
      </div>
      <p className="mx-auto mt-1.5 max-w-md text-xs text-zinc-600 leading-relaxed">
        {description}
      </p>
      <div className="mt-5">
        <Link
          href={`/${locale}/billing`}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]"
        >
          Débloquer avec la formule Pro
        </Link>
      </div>
    </div>
  );
}
