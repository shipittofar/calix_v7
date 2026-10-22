import { beat, smooth } from "./beats";

/**
 * The photograph window beside the drawing: one photograph per chapter (two for the last), each
 * with a slow 2D camera move, crossfading at chapter changes. In the last beat the window opens out
 * to fill the stage with the grove from above.
 */

export const FRAME_ASPECT = 2752 / 1536;

/** [u, v, zoom]: focus point (fractions of the photograph) and zoom over "cover". */
type Cam = readonly [u: number, v: number, zoom: number];

export type PhotoSpec = { key: string; from: string; to: string; cams: readonly [Cam, Cam] };

/** In film order; `from`/`to` are the beats during which each photograph is the current one. */
export const PHOTOS: readonly PhotoSpec[] = [
  { key: "plaza", from: "i1", to: "i10", cams: [[0.62, 0.55, 1.05], [0.76, 0.62, 1.35]] },
  { key: "hand", from: "s1", to: "s6", cams: [[0.55, 0.45, 1.05], [0.48, 0.64, 1.3]] },
  { key: "planting", from: "p1", to: "p12", cams: [[0.5, 0.55, 1.02], [0.38, 0.8, 1.35]] },
  { key: "soil", from: "g1", to: "g11", cams: [[0.5, 0.62, 1.05], [0.52, 0.66, 1.2]] },
  { key: "tending", from: "c1", to: "c9", cams: [[0.5, 0.55, 1.05], [0.46, 0.68, 1.2]] },
  { key: "fruit", from: "r1", to: "r9", cams: [[0.45, 0.5, 1.02], [0.43, 0.26, 1.25]] },
  { key: "harvest", from: "h1", to: "h17", cams: [[0.5, 0.5, 1.02], [0.36, 0.46, 1.15]] },
  { key: "terrace", from: "e1", to: "e6", cams: [[0.6, 0.5, 1.06], [0.5, 0.45, 1.0]] },
  { key: "grove", from: "e7", to: "e8", cams: [[0.51, 0.6, 1.2], [0.5, 0.5, 1.0]] },
];

const CROSSFADE = 0.3;

/** Visible photographs at t: index, opacity and camera. At most two (during a crossfade). */
export function photosAt(t: number) {
  const out: { index: number; opacity: number; cam: Cam }[] = [];
  PHOTOS.forEach((p, i) => {
    const start = beat(p.from).start;
    const end = beat(p.to).end;
    const nextStart = i + 1 < PHOTOS.length ? beat(PHOTOS[i + 1].from).start : Infinity;
    const fadeIn = i === 0 ? 1 : smooth(start - CROSSFADE / 2, start + CROSSFADE / 2, t);
    const covered = smooth(nextStart - CROSSFADE / 2, nextStart + CROSSFADE / 2, t) >= 1;
    if (fadeIn <= 0 || covered) return;
    const k = smooth(start, end, t);
    const [a, b] = p.cams;
    out.push({ index: i, opacity: fadeIn, cam: [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k] });
  });
  return out;
}

/** The photograph's displayed size and offset in a window of w × h, clamped so its edges never show. */
export function place([u, v, zoom]: Cam, w: number, h: number) {
  const width = Math.max(w, h * FRAME_ASPECT);
  const height = width / FRAME_ASPECT;
  const limitX = Math.max(0, (width * zoom - w) / 2);
  const limitY = Math.max(0, (height * zoom - h) / 2);
  const clamp = (x: number, lo: number, hi: number) => Math.min(Math.max(x, lo), hi);
  return {
    width,
    scale: zoom,
    x: clamp(-(u - 0.5) * width * zoom, -limitX, limitX),
    y: clamp(-(v - 0.5) * height * zoom, -limitY, limitY),
  };
}
