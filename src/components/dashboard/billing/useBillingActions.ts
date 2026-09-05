"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createCheckoutSessionAction,
  openBillingPortalAction,
} from "@/actions/billing";

export function useBillingActions(yearly: boolean) {
  const [pending, startTransition] = useTransition();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = (planKey: "starter" | "pro" | "agency") => {
    setLoadingPlan(planKey);
    startTransition(async () => {
      const result = await createCheckoutSessionAction(planKey, yearly);
      setLoadingPlan(null);
      if (result.ok) {
        window.location.href = result.data.url;
      } else {
        if (result.error === "price_not_configured") {
          toast.error(
            "Les prix Stripe ne sont pas encore configurés. Ajoutez vos STRIPE_PRICE_* dans .env",
          );
        } else {
          toast.error("Erreur lors de la création de la session de paiement");
        }
      }
    });
  };

  const handlePortal = () => {
    startTransition(async () => {
      const result = await openBillingPortalAction();
      if (result.ok) {
        window.location.href = result.data.url;
      } else {
        toast.error("Impossible d'ouvrir le portail de facturation");
      }
    });
  };

  return {
    pending,
    loadingPlan,
    handleCheckout,
    handlePortal,
  };
}
