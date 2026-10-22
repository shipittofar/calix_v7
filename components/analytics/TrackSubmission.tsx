"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * project_form_submitted fires on the thank-you page only when the server action
 * redirected with ?submitted=1 (a delivered enquiry). Spam rejections redirect
 * without it. The query is removed afterwards, so a reload cannot count twice.
 */
export function TrackSubmission() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("submitted") !== "1") return;
    sent.current = true;
    track("project_form_submitted", {
      services: params.get("services") ?? undefined,
      timeline: params.get("timeline") ?? undefined,
    });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);
  return null;
}
