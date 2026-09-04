"use client";

import { useEffect, useRef } from "react";
import { trackPageView } from "@/actions/analytics";

function getOrCreateVisitorId(): string {
  const key = "batiste_vid";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function AnalyticsTracker({
  subdomain,
  path,
}: {
  subdomain: string;
  path: string;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    const visitorId = getOrCreateVisitorId();
    void trackPageView(subdomain, path, visitorId);
  }, [subdomain, path]);

  return null;
}
