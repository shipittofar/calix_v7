"use client";

import { useEffect } from "react";
import { SEQUENCE_MOTION_QUERY } from "@/lib/motion";

/**
 * Drives the sticky plate of the scroll sequence. No React state: the stage
 * being read is written straight to DOM attributes and classes, and the CSS
 * transitions do the rest. Everything is torn down when the mode switches off
 * or the component unmounts.
 */
export function SequenceController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-sequence]");
    const plate = root?.querySelector<HTMLElement>(".sequence__plate");
    const field = plate?.querySelector<HTMLElement>(".sequence__field");
    const traveller = plate?.querySelector<HTMLElement>(".sequence__traveller");
    if (!root || !plate || !field || !traveller) return;

    const html = document.documentElement;
    const mq = window.matchMedia(SEQUENCE_MOTION_QUERY);
    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-stage-index]"));
    const layers = Array.from(plate.querySelectorAll<HTMLElement>("[data-layer]"));
    const captions = Array.from(plate.querySelectorAll<HTMLElement>("[data-caption]"));
    const railItems = Array.from(plate.querySelectorAll<HTMLElement>("[data-rail]"));

    let active = -1;
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let cancelled = false;

    /** Moves the travelling mark onto the active layer's anchor (one read, one write). */
    const placeTraveller = (animate: boolean) => {
      const layer = layers[active];
      const anchor = layer?.querySelector<HTMLElement>("[data-specimen-anchor]");
      if (!anchor) return;
      const box = field.getBoundingClientRect();
      const target = anchor.getBoundingClientRect();
      const scale = target.width / traveller.offsetWidth;
      traveller.classList.toggle("is-instant", !animate);
      traveller.style.transform = `translate(${target.left - box.left}px, ${target.top - box.top}px) scale(${scale})`;
      traveller.classList.add("is-placed");
      // Drawings hide their own mark only once the travelling mark is in place.
      plate.classList.add("is-ready");
    };

    const setStage = (index: number, animate = true) => {
      if (index === active) return;
      active = index;
      plate.dataset.stage = String(index);
      layers.forEach((el, i) => el.classList.toggle("is-active", i === index));
      captions.forEach((el, i) => el.classList.toggle("is-active", i === index));
      railItems.forEach((el) => {
        const current = Number(el.dataset.rail) === index;
        el.classList.toggle("is-active", current);
        if (current) el.setAttribute("aria-current", "step");
        else el.removeAttribute("aria-current");
      });
      placeTraveller(animate);
    };

    /** The stage whose block crosses the viewport's centre line, by geometry. */
    const stageAtCentre = () => {
      const centre = window.innerHeight / 2;
      let found = 0;
      stages.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= centre) found = i;
      });
      return found;
    };

    const start = () => {
      html.dataset.motion = "on";
      setStage(stageAtCentre(), false);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setStage(Number((entry.target as HTMLElement).dataset.stageIndex));
          }
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );
      stages.forEach((el) => observer?.observe(el));

      // Layout changes (resize, late fonts) move the anchors: re-place without animating.
      resizeObserver = new ResizeObserver(() => placeTraveller(false));
      resizeObserver.observe(field);
      document.fonts?.ready.then(() => {
        if (!cancelled && observer) placeTraveller(false);
      });
    };

    const stop = () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      observer = null;
      resizeObserver = null;
      active = -1;
      delete html.dataset.motion;
      traveller.style.transform = "";
      traveller.classList.remove("is-placed");
      plate.classList.remove("is-ready");
    };

    const onChange = () => (mq.matches ? start() : stop());
    onChange();
    mq.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
