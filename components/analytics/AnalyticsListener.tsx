"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated listener for primary CTAs, marked with data-cta="<location>".
 * A single listener avoids duplicate events from nested or repeated handlers.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-cta]");
      if (!link) return;
      const service = new URL(link.href, window.location.href).searchParams.get("service") ?? undefined;
      track("primary_cta_clicked", {
        location: link.dataset.cta,
        label: link.textContent?.trim().slice(0, 60),
        service,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
