"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function ProfileAvatar({
  collapsed,
  locale,
}: {
  collapsed: boolean;
  locale: string;
}) {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "";
  const image = session?.user?.image;
  const initials =
    name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "B";

  return (
    <Link
      href={`/${locale}/dashboard/profile`}
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-zinc-200 px-2.5 py-2 text-[13px] font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50",
        collapsed && "justify-center px-2",
      )}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="size-7 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-[11px] font-semibold text-white">
          {initials}
        </span>
      )}
      {!collapsed && (
        <span className="min-w-0 flex-1 truncate text-[12.5px]">
          {name || session?.user?.email?.split("@")[0] || "Profil"}
        </span>
      )}
    </Link>
  );
}
