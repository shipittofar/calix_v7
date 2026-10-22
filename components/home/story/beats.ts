/**
 * The olive story's timeline: 82 beats, each a distinct, visible state of the drawing in
 * plate.ts, grouped into the eight chapters of stages.ts. A beat's label is shown as the "now"
 * line in the caption during playback, and listed as the chapter's steps in the static layout.
 *
 * Durations are in timeline units (about three quarters of a viewport of scrolling each; see the
 * CSS), so one wheel notch moves the story by about half a beat.
 */

type BeatSpec = readonly [id: string, label: string, duration: number];

const CHAPTERS: readonly (readonly BeatSpec[])[] = [
  // 1. The idea
  [
    ["i1", "A founder at her desk, with an idea.", 0.5],
    ["i2", "She opens a clean page.", 0.35],
    ["i3", "A first line: the ground it will grow from.", 0.3],
    ["i4", "She sketches a planter.", 0.35],
    ["i5", "One small mark: the seed of the idea.", 0.3],
    ["i6", "What it could become, in outline.", 0.35],
    ["i7", "A note: what it stands for.", 0.3],
    ["i8", "A note: who it is for.", 0.3],
    ["i9", "A note: how people will find it.", 0.3],
    ["i10", "The plan becomes ground to build on.", 0.4],
  ],
  // 2. The seed
  [
    ["s1", "An olive pit rests on the planter's edge.", 0.4],
    ["s2", "Her hand reaches for it.", 0.35],
    ["s3", "Fingers open around the pit.", 0.3],
    ["s4", "They close on it.", 0.3],
    ["s5", "She lifts it.", 0.3],
    ["s6", "And holds it, ready.", 0.4],
  ],
  // 3. Planting
  [
    ["p1", "The soil is rough.", 0.3],
    ["p2", "She levels it.", 0.35],
    ["p3", "And rakes it fine.", 0.3],
    ["p4", "A fingertip presses into the soil.", 0.3],
    ["p5", "A small hole forms.", 0.3],
    ["p6", "The hole is ready.", 0.3],
    ["p7", "The pit is brought over it.", 0.3],
    ["p8", "Released into the hole.", 0.3],
    ["p9", "Soil falls back over it.", 0.3],
    ["p10", "Covered.", 0.3],
    ["p11", "Pressed gently, so it holds.", 0.3],
    ["p12", "Planted.", 0.35],
  ],
  // 4. Germination
  [
    ["g1", "Days pass. Nothing shows yet.", 0.45],
    ["g2", "Below the surface, the pit swells.", 0.3],
    ["g3", "Its shell splits.", 0.3],
    ["g4", "A first root reaches down.", 0.3],
    ["g5", "More roots take hold.", 0.3],
    ["g6", "A shoot climbs toward the light.", 0.35],
    ["g7", "The surface cracks.", 0.3],
    ["g8", "It breaks through.", 0.3],
    ["g9", "The stem straightens.", 0.3],
    ["g10", "Two seed leaves open.", 0.3],
    ["g11", "The first true leaves follow.", 0.35],
  ],
  // 5. Cultivation
  [
    ["c1", "A stake, to give it direction: strategy.", 0.4],
    ["c2", "Tied in, so it grows straight.", 0.3],
    ["c3", "A name tag with its mark: brand identity.", 0.4],
    ["c4", "A proper base beneath it: the website.", 0.4],
    ["c5", "Light reaches it: found in search (SEO).", 0.35],
    ["c6", "Light reflected from the wall: cited in AI answers (GEO).", 0.4],
    ["c7", "Watered, week after week: content.", 0.35],
    ["c8", "A breeze carries it further: digital marketing.", 0.35],
    ["c9", "Tended together, it grows.", 0.4],
  ],
  // 6. Growth
  [
    ["r1", "A first branch.", 0.3],
    ["r2", "A second.", 0.3],
    ["r3", "The stem thickens into a trunk.", 0.3],
    ["r4", "New leaves along every branch.", 0.3],
    ["r5", "A canopy forms.", 0.35],
    ["r6", "Below, the roots spread wide.", 0.3],
    ["r7", "Taller each season.", 0.35],
    ["r8", "Buds appear.", 0.3],
    ["r9", "And flower.", 0.3],
  ],
  // 7. Harvest
  [
    ["h1", "The flowers fall; fruit sets.", 0.3],
    ["h2", "Green olives swell.", 0.3],
    ["h3", "They begin to ripen.", 0.3],
    ["h4", "Ripe.", 0.3],
    ["h5", "A hand reaches for the first olive.", 0.35],
    ["h6", "Picked, and into the basket.", 0.35],
    ["h7", "One after another.", 0.4],
    ["h8", "The rest are brought down onto a net.", 0.35],
    ["h9", "Gathered into the basket.", 0.3],
    ["h10", "Pressed.", 0.35],
    ["h11", "Into something of lasting value.", 0.4],
    ["h12", "Bottled and labelled.", 0.4],
    ["h13", "Set out on the table.", 0.35],
    ["h14", "People gather round.", 0.45],
    ["h15", "A first taste.", 0.5],
    ["h16", "Passed from hand to hand.", 0.45],
    ["h17", "Valued, and carried home.", 0.45],
  ],
  // 8. The ecosystem
  [
    ["e1", "The tree, mature.", 0.35],
    ["e2", "Stepping back: it is not alone for long.", 0.35],
    ["e3", "New trees, planted from its stock.", 0.35],
    ["e4", "They take root and grow.", 0.35],
    ["e5", "Row after row.", 0.35],
    ["e6", "Across the hillside.", 0.35],
    ["e7", "An entire grove.", 0.45],
    ["e8", "From above: the ecosystem it became.", 0.8],
  ],
];

export type Beat = { id: string; label: string; chapter: number; start: number; end: number };

export const BEATS: readonly Beat[] = (() => {
  const out: Beat[] = [];
  let at = 0;
  CHAPTERS.forEach((beats, chapter) =>
    beats.forEach(([id, label, d]) => {
      out.push({ id, label, chapter, start: at, end: at + d });
      at += d;
    }),
  );
  return out;
})();

export const TOTAL = BEATS[BEATS.length - 1].end;

const byId = new Map(BEATS.map((b) => [b.id, b]));
export const beat = (id: string) => {
  const b = byId.get(id);
  if (!b) throw new Error(`Unknown beat ${id}`);
  return b;
};

/** Each chapter's span on the timeline. */
export const CHAPTER_SPANS: readonly [number, number][] = CHAPTERS.map((_, c) => {
  const own = BEATS.filter((b) => b.chapter === c);
  return [own[0].start, own[own.length - 1].end];
});

/** The beat on screen at t. */
export const beatAt = (t: number) => BEATS.find((b) => t < b.end) ?? BEATS[BEATS.length - 1];

/** Step labels per chapter, for the static layout. */
export const stepsFor = (chapter: number) => BEATS.filter((b) => b.chapter === chapter).map((b) => b.label);

/** Smooth step, clamped. */
export const smooth = (a: number, b: number, x: number) => {
  if (b <= a) return x >= b ? 1 : 0;
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return k * k * (3 - 2 * k);
};

/** Linear progress, clamped. */
export const linear = (a: number, b: number, x: number) => (b <= a ? (x >= b ? 1 : 0) : Math.min(Math.max((x - a) / (b - a), 0), 1));

/**
 * Progress (0–1) of a beat, or of a run of beats from `from` to `to`. Actions fill the middle of
 * their beat (10%–90%), so each beat begins and ends on a readable, still state.
 */
export const progress = (t: number, from: string, to = from, ease = true) => {
  const a = beat(from);
  const b = beat(to);
  const s = a.start + (a.end - a.start) * 0.1;
  const e = b.end - (b.end - b.start) * 0.1;
  return ease ? smooth(s, e, t) : linear(s, e, t);
};

/** Piecewise-linear value through [beatId, value] points, each at the end of its beat. */
export const through = (t: number, points: readonly (readonly [string, number])[]) => {
  const xs = points.map(([id]) => beat(id).end);
  if (t <= xs[0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (t <= xs[i]) {
      const k = smooth(xs[i - 1], xs[i], t);
      return points[i - 1][1] + (points[i][1] - points[i - 1][1]) * k;
    }
  }
  return points[points.length - 1][1];
};
