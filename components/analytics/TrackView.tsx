"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

/** Fires one view event per mount (guarded against React Strict Mode's double effect). */
export function TrackView({ event, props }: { event: AnalyticsEvent; props?: AnalyticsProps }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track(event, props);
  }, [event, props]);
  return null;
}
