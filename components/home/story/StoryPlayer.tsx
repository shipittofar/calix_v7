"use client";

import { useEffect } from "react";
import { STORY_MOTION_QUERY } from "@/lib/motion";
import { CHAPTER_SPANS, TOTAL, beat, beatAt, progress, smooth } from "./beats";
import { PHOTOS, photosAt, place } from "./film";
import { drawPlate, type Rect } from "./plate";

/** How quickly the picture follows the scroll position (seconds). Small enough to stay attached. */
const FOLLOW = 0.09;
/** Fade-in for a photograph that arrives after it was needed (milliseconds). */
const LATE_FADE = 300;
/** Caption fades, in timeline units. */
const CAPTION_FADE = 0.25;

/**
 * Plays the olive story in its pinned stage: the drawing (plate.ts) on a 2D canvas, the chapter's
 * photograph in a window beside it, and the caption with the current step. Everything is a function
 * of the timeline position, which follows the scroll position. Only active when STORY_MOTION_QUERY
 * matches; otherwise data-story is removed and the static stages remain.
 *
 * Rendering is event-driven: it updates on scroll, resize and image arrival, follows the scroll
 * position briefly, then stops. Nothing runs while the section is off screen.
 */
export function StoryPlayer() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-story-root]");
    if (!root) return;
    const html = document.documentElement;
    const mq = window.matchMedia(STORY_MOTION_QUERY);
    let teardown: (() => void) | null = null;

    const onChange = () => {
      teardown?.();
      teardown = null;
      if (!mq.matches) {
        delete html.dataset.story;
        return;
      }
      html.dataset.story = "on";
      teardown = mount(root);
      if (!teardown) delete html.dataset.story;
    };

    onChange();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      teardown?.();
      delete html.dataset.story;
    };
  }, []);

  return null;
}

type Layout = { window: Rect; panel: Rect; drawing: Rect; margin: number };

/** Landscape: drawing on the left, photograph and caption in a column on the right. Portrait: stacked. */
function layout(w: number, h: number): Layout {
  if (w >= 820 && w >= h * 1.05) {
    const m = Math.min(56, Math.max(24, w * 0.035));
    const cw = Math.min(520, w * 0.36);
    const win = { x: w - m - cw, y: m * 0.7, w: cw, h: Math.min(cw * 0.5625, h * 0.38) };
    const panel = { x: win.x, y: win.y + win.h + 22, w: cw, h: h - (win.y + win.h + 22) - m * 0.7 };
    return { window: win, panel, drawing: { x: 0, y: 0, w: win.x - m * 0.6, h }, margin: m };
  }
  const m = 16;
  const winH = Math.min(h * 0.2, (w - 2 * m) * 0.5);
  const win = { x: m, y: 12, w: w - 2 * m, h: winH };
  const panelH = Math.min(250, h * 0.36);
  const panel = { x: m, y: h - panelH - 10, w: w - 2 * m, h: panelH };
  return { window: win, panel, drawing: { x: 0, y: win.y + win.h + 4, w, h: panel.y - (win.y + win.h + 4) - 4 }, margin: m };
}

function mount(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>(".story__track");
  const stage = root.querySelector<HTMLElement>(".story__stage");
  const shotEls = Array.from(root.querySelectorAll<HTMLElement>("[data-shot]"));
  const frames = shotEls.map((el) => el.querySelector<HTMLElement>(".story__frame"));
  const sprout = root.querySelector<HTMLElement>(".story__sprout");
  const captions = Array.from(root.querySelectorAll<HTMLElement>("[data-caption]"));
  const nowLines = captions.map((c) => c.querySelector<HTMLElement>(".story__now"));
  const disciplines = Array.from(root.querySelectorAll<HTMLElement>("[data-discipline]"));
  const rule = root.querySelector<HTMLElement>(".story__progress-rule");
  if (!track || !stage || !rule || shotEls.length !== PHOTOS.length || frames.some((f) => !f)) return null;

  const canvas = document.createElement("canvas");
  canvas.className = "story__canvas";
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  stage.prepend(canvas);

  const fonts = {
    text: getComputedStyle(document.body).fontFamily,
    display: getComputedStyle(root.querySelector("h2") ?? document.body).fontFamily,
  };

  // ---------- Size and layout ----------
  let W = 0;
  let H = 0;
  let dpr = 1;
  let lay = layout(1, 1);
  let drawRect: Rect = { x: 0, y: 0, w: 1, h: 1 };
  const resize = () => {
    W = stage.clientWidth;
    H = stage.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    lay = layout(W, H);
    // The canvas covers only the drawing's area, not the whole stage: every frame's canvas is
    // rasterized and handed to the compositor, at a cost that grows with its size.
    const d = lay.drawing;
    canvas.width = Math.round(d.w * dpr);
    canvas.height = Math.round(d.h * dpr);
    drawRect = { x: 0, y: 0, w: d.w, h: d.h };
    still = false;
    overlayHeight = 0;
    lastBand = -1;
    stage.style.setProperty("--draw-x", `${d.x}px`);
    stage.style.setProperty("--draw-y", `${d.y}px`);
    stage.style.setProperty("--draw-w", `${d.w}px`);
    stage.style.setProperty("--draw-h", `${d.h}px`);
    const p = lay.panel;
    stage.style.setProperty("--panel-x", `${p.x}px`);
    stage.style.setProperty("--panel-y", `${p.y}px`);
    stage.style.setProperty("--panel-w", `${p.w}px`);
    stage.style.setProperty("--panel-h", `${p.h}px`);
    request();
  };

  // ---------- Loading: a chapter's photograph is laid out (so fetched) only when the reader is near ----------
  const near = (index: number) => {
    // The last photograph is the largest file (it fills the stage), so it starts two chapters ahead.
    const ahead = index + 2 === PHOTOS.length - 1 ? 2 : 1;
    for (let i = Math.max(0, index - 1); i <= Math.min(PHOTOS.length - 1, index + ahead); i++) {
      if (shotEls[i].classList.contains("is-near")) continue;
      shotEls[i].classList.add("is-near");
      shotEls[i].querySelectorAll("img").forEach((img) => img.decode?.().catch(() => {}));
    }
  };

  // ---------- Timeline ----------
  const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
  const target = () => {
    const rect = track.getBoundingClientRect();
    const range = track.offsetHeight - stage.offsetHeight;
    if (range <= 0) return 0;
    return Math.min(Math.max((headerHeight() - rect.top) / range, 0), 1) * TOTAL;
  };

  // ---------- Photograph window ----------
  let shown = new Set<number>();
  const frameWidths: number[] = [];
  /** Photographs needed while still loading, and when each that was late arrived. */
  const waiting = new Set<number>();
  const arrived = new Map<number, number>();
  const drawWindow = (t: number) => {
    // In the last beat the window opens out to the whole stage, by 60% of the beat, so the end
    // title's band (see placeFinalCaption) only rises once the photograph fills the stage.
    const open = smooth(0, 0.6, progress(t, "e8"));
    const r = lay.window;
    const win = {
      x: r.x * (1 - open),
      y: r.y * (1 - open),
      w: r.w + (W - r.w) * open,
      h: r.h + (H - r.h) * open,
    };
    stage.style.setProperty("--win-x", `${win.x}px`);
    stage.style.setProperty("--win-y", `${win.y}px`);
    stage.style.setProperty("--win-w", `${win.w}px`);
    stage.style.setProperty("--win-h", `${win.h}px`);
    let visible = photosAt(t);
    const current = visible[visible.length - 1]?.index ?? 0;
    near(current);
    // A photograph still loading (after a jump) never leaves the window empty: hold the nearest
    // loaded one until it arrives.
    const ready = (i: number) => {
      const img = shotEls[i].querySelector<HTMLImageElement>(".story__image");
      return Boolean(img?.complete && img.naturalWidth > 0);
    };
    // One that arrives after it was needed fades in over the held one, rather than cutting in.
    const now = performance.now();
    visible = visible.map((v) => {
      if (!ready(v.index)) {
        waiting.add(v.index);
        return v;
      }
      if (waiting.delete(v.index)) arrived.set(v.index, now);
      const since = arrived.get(v.index);
      if (since === undefined) return v;
      const fade = smooth(0, LATE_FADE, now - since);
      if (fade >= 1) arrived.delete(v.index);
      return { ...v, opacity: v.opacity * fade };
    });
    if (!visible.some((v) => ready(v.index) && v.opacity >= 1)) {
      const held = [...PHOTOS.keys()].sort((x, y) => Math.abs(x - current) - Math.abs(y - current)).find((i) => ready(i) && !visible.some((v) => v.index === i));
      if (held !== undefined) {
        visible = [{ index: held, opacity: 1, cam: photosAt(beat(PHOTOS[held].to).end - 0.01).find((v) => v.index === held)?.cam ?? [0.5, 0.5, 1] }, ...visible.filter((v) => ready(v.index))];
      }
    }
    const next = new Set<number>();
    visible.forEach(({ index, opacity, cam }, k) => {
      const p = place(cam, win.w, win.h);
      const frame = frames[index]!;
      // The last photograph grows to fill the stage. It is laid out once at that full size and
      // shrunk by transform, so opening it only changes a transform: resizing its layout every
      // frame made Chrome re-raster (and re-decode) the image at each new size.
      const laidOut = index === PHOTOS.length - 1 ? place(cam, W, H).width : p.width;
      if (frameWidths[index] !== laidOut) {
        frameWidths[index] = laidOut;
        frame.style.width = `${laidOut}px`;
      }
      const scale = (p.scale * p.width) / laidOut;
      frame.style.transform = `translate(-50%, -50%) translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scale(${scale.toFixed(4)})`;
      shotEls[index].style.opacity = String(opacity);
      shotEls[index].style.visibility = "visible";
      shotEls[index].style.zIndex = String(k + 1);
      next.add(index);
    });
    shown.forEach((i) => {
      if (next.has(i)) return;
      shotEls[i].style.opacity = "0";
      shotEls[i].style.visibility = "hidden";
    });
    shown = next;
    // The soil photograph's seedling grows with the drawing's.
    if (sprout) {
      const grow = progress(t, "g8", "g11");
      sprout.style.transform = `scale(${(0.06 + 0.94 * grow).toFixed(4)})`;
      sprout.style.opacity = String(smooth(0, 0.15, grow));
    }
    const canvasOpacity = 1 - smooth(0.4, 1, open);
    canvas.style.opacity = String(canvasOpacity);
    return canvasOpacity;
  };

  // ---------- Captions, current step and progress ----------
  let lastBeat = "";
  let lastCaption = -2;
  const updateText = (t: number) => {
    let active = -1;
    const reveal = finalReveal(t);
    CHAPTER_SPANS.forEach(([s, e], i) => {
      // Out, then in: two captions never overlap.
      const fadeIn = i === 0 ? 1 : smooth(s, s + CAPTION_FADE, t);
      const fadeOut = i === CHAPTER_SPANS.length - 1 ? reveal.caption : 1 - smooth(e - CAPTION_FADE, e, t);
      const o = Math.max(0, Math.min(fadeIn, fadeOut));
      captions[i].style.opacity = String(o);
      if (o > 0.5) active = i;
    });
    if (active !== lastCaption) {
      lastCaption = active;
      captions.forEach((c, i) => c.toggleAttribute("data-current", i === active));
    }
    const b = beatAt(t);
    if (b.id !== lastBeat) {
      lastBeat = b.id;
      const line = nowLines[b.chapter];
      if (line) line.textContent = b.label;
    }
    disciplines.forEach((el, k) => {
      const id = ["c1", "c3", "c4", "c5", "c6", "c7", "c8"][k];
      if (id) el.toggleAttribute("data-active", t >= beat(id).start + 0.1);
    });
    rule.style.transform = `scaleX(${t / TOTAL})`;
    placeFinalCaption(reveal);
  };

  // ---------- The final reveal ----------
  // As the aerial photograph opens over the stage, the last caption's Ivory panel would sit on it
  // as a white block. Instead the caption fades out; while it is invisible it becomes Ivory text
  // with no panel at the lower left; a solid Espresso band rises from the bottom edge of the stage
  // (the brand's way of putting text on a photograph); then the caption fades back in on it.
  const finalCaption = captions[captions.length - 1];
  const band = root.querySelector<HTMLElement>(".story__band");
  let overlay = false;
  let overlayHeight = 0;
  let lastBand = -1;
  const finalReveal = (t: number) => {
    const open = progress(t, "e8");
    const swap = 0.4;
    return {
      overlay: open >= swap,
      caption: open < swap ? 1 - smooth(0.05, 0.3, open) : smooth(0.7, 0.95, open),
      band: smooth(0.6, 0.8, open),
    };
  };
  const placeFinalCaption = (reveal: ReturnType<typeof finalReveal>) => {
    if (reveal.overlay !== overlay) {
      overlay = reveal.overlay;
      finalCaption.toggleAttribute("data-overlay", overlay);
      overlayHeight = 0;
      lastBand = -1;
    }
    if (!overlay) {
      finalCaption.style.removeProperty("transform");
      if (band && lastBand !== 0) {
        lastBand = 0;
        band.style.visibility = "hidden";
      }
      return;
    }
    // Same width as the panel, so only a transform moves it.
    if (!overlayHeight) overlayHeight = finalCaption.offsetHeight;
    const pad = Math.max(20, lay.margin * 0.6);
    const p = lay.panel;
    const x = lay.margin;
    const y = H - overlayHeight - pad;
    finalCaption.style.transform = `translate(${(x - p.x).toFixed(1)}px, ${(y - p.y).toFixed(1)}px)`;
    if (band && reveal.band !== lastBand) {
      lastBand = reveal.band;
      band.style.height = `${Math.ceil(overlayHeight + pad * 2)}px`;
      band.style.transform = `translateY(${((1 - reveal.band) * 100).toFixed(2)}%)`;
      band.style.visibility = reveal.band > 0 ? "visible" : "hidden";
    }
  };

  // From the end of e7 the drawing no longer changes (only the photograph opens over it), so it is
  // drawn once there and left alone; resizing clears this.
  const stillFrom = beat("e7").end;
  let still = false;
  let incomplete = false;
  const render = (t: number) => {
    // Once the aerial photograph covers the stage, the drawing beneath it isn't drawn.
    const visibleCanvas = drawWindow(t) > 0;
    incomplete = false;
    if (visibleCanvas && !(still && t >= stillFrom)) {
      const complete = drawPlate(ctx, { t, rect: drawRect, dpr, fonts, canvasW: canvas.width, canvasH: canvas.height });
      // A frame with stand-in tree bitmaps is drawn again next frame, even once scrolling stops.
      incomplete = !complete;
      still = complete && t >= stillFrom;
    }
    updateText(t);
  };

  // ---------- Loop: only while following the scroll position ----------
  let time = target();
  let raf = 0;
  let last = 0;
  let visible = false;
  let disposed = false;

  const tick = (now: number) => {
    raf = 0;
    if (disposed) return;
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
    last = now;
    const goal = target();
    const diff = goal - time;
    time = Math.abs(diff) < 0.0005 ? goal : time + diff * (1 - Math.exp(-dt / FOLLOW));
    render(time);
    if (time !== goal || arrived.size > 0 || incomplete) raf = requestAnimationFrame(tick);
    else last = 0;
  };
  function request() {
    if (!raf && visible && !disposed) raf = requestAnimationFrame(tick);
  }

  const onScroll = () => request();
  window.addEventListener("scroll", onScroll, { passive: true });
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) request();
    },
    { rootMargin: "100% 0px 100% 0px" },
  );
  io.observe(track);

  const images = Array.from(root.querySelectorAll<HTMLImageElement>(".story__image"));
  const onLoad = () => {
    last = 0;
    if (!raf && !disposed) raf = requestAnimationFrame(tick);
  };
  images.forEach((img) => img.addEventListener("load", onLoad));
  document.fonts?.ready.then(onLoad);

  // The story is long; smooth-scrolling past it would take seconds. The skip link jumps instantly.
  const skip = root.querySelector<HTMLAnchorElement>('a[href="#services"]');
  const onSkip = (event: MouseEvent) => {
    const services = document.getElementById("services");
    if (!services) return;
    event.preventDefault();
    services.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    history.pushState(null, "", "#services");
    const focusable = services.querySelector<HTMLElement>("h2, h3") ?? services;
    focusable.setAttribute("tabindex", "-1");
    focusable.focus({ preventScroll: true });
  };
  skip?.addEventListener("click", onSkip);

  resize();
  render(time);

  return () => {
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    skip?.removeEventListener("click", onSkip);
    images.forEach((img) => img.removeEventListener("load", onLoad));
    ro.disconnect();
    io.disconnect();
    canvas.remove();
    for (const prop of ["--win-x", "--win-y", "--win-w", "--win-h", "--panel-x", "--panel-y", "--panel-w", "--panel-h", "--draw-x", "--draw-y", "--draw-w", "--draw-h"]) {
      stage.style.removeProperty(prop);
    }
    shotEls.forEach((el) => {
      el.classList.remove("is-near");
      el.style.removeProperty("opacity");
      el.style.removeProperty("visibility");
      el.style.removeProperty("z-index");
    });
    frames.forEach((f) => f?.removeAttribute("style"));
    frameWidths.length = 0;
    if (sprout) {
      sprout.style.removeProperty("transform");
      sprout.style.removeProperty("opacity");
    }
    captions.forEach((c) => {
      c.style.opacity = "";
      c.style.removeProperty("transform");
      c.removeAttribute("data-current");
      c.removeAttribute("data-overlay");
    });
    band?.removeAttribute("style");
    nowLines.forEach((n) => n && (n.textContent = ""));
    disciplines.forEach((d) => d.removeAttribute("data-active"));
    rule.style.transform = "";
  };
}
