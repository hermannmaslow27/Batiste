"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  saveNavbarConfigAction,
  resetNavbarConfigAction,
  type NavbarConfig,
  type NavItemConfig,
} from "@/actions/navigation";

export function useNavigationActions(
  siteId: string,
  initialConfig?: NavbarConfig | null,
) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [items, setItems] = useState<NavItemConfig[]>(
    initialConfig?.items ?? [],
  );
  const [ctaButton, setCtaButton] = useState(
    initialConfig?.ctaButton ?? {
      label: "Contact",
      url: "/contact",
      enabled: false,
    },
  );

  const addItem = (item: Omit<NavItemConfig, "id">) => {
    const newItem: NavItemConfig = {
      ...item,
      id: crypto.randomUUID(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<NavItemConfig>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...updates } : it)),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    setItems((prev) => {
      const next = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const save = () => {
    startTransition(async () => {
      const result = await saveNavbarConfigAction(siteId, {
        items,
        ctaButton,
      });
      if (result.ok) {
        toast.success("Navigation enregistrée ✓");
        router.refresh();
      } else {
        toast.error("Erreur lors de l'enregistrement de la navigation");
      }
    });
  };

  const reset = () => {
    startTransition(async () => {
      const result = await resetNavbarConfigAction(siteId);
      if (result.ok) {
        toast.success("Navigation réinitialisée aux pages par défaut");
        router.refresh();
      }
    });
  };

  return {
    items,
    ctaButton,
    setCtaButton,
    addItem,
    updateItem,
    removeItem,
    moveItem,
    save,
    reset,
    pending,
  };
}
