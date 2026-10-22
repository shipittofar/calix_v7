import { palette } from "@/lib/palette";
import { beat, linear, progress, smooth, through } from "./beats";

/**
 * The olive story's drawing: one continuous architectural section through the planter, drawn on a
 * 2D canvas in the CALIX plate style (hairlines, flat palette fills, no shading). Every beat in
 * beats.ts is a distinct state of this one drawing, so the actions the photographs cannot show
 * (picking up the pit, digging, covering, germinating, growing, ripening, picking, pressing,
 * planting a grove) happen in front of the viewer, in place.
 *
 * World units are roughly millimetres: the planter is 440 wide. y grows downwards.
 */

const C = palette;

// ---------- Fixed geometry ----------
const SOIL = 560; // soil surface
const GROUND = 860; // paving surface
const PLANTER = { left: 380, right: 820, top: 520, wall: 40, floor: 830 } as const;
const IN_L = PLANTER.left + PLANTER.wall;
const IN_R = PLANTER.right - PLANTER.wall;
const PX = 600; // plant position
const SEED_REST = [400, 514] as const; // on the left rim
const SEED_HOLD = [690, 470] as const;
const SEED_PLANTED = [PX, 590] as const;
const SUN_DAY = { x0: 470, x1: 730, y: 440, lift: 26 } as const;
const SUN_FIXED = [440, 330] as const;
const WALL = { left: 900, right: 940, top: 160 } as const;
const BASKET = { x: 320, top: 818 } as const;
const BASIN = { x: 170 } as const;
const VESSEL = { x: 58 } as const;

export type Rect = { x: number; y: number; w: number; h: number };
export type Fonts = { text: string; display: string };

// ---------- Deterministic randomness ----------
const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

// ---------- Camera ----------
type CamKey = readonly [beat: string, cx: number, cy: number, span: number];
const CAMERA: readonly CamKey[] = [
  ["i1", 600, 620, 780],
  ["i10", 600, 600, 760],
  ["s1", 430, 515, 200],
  ["s4", 420, 510, 200],
  ["s5", 440, 500, 230],
  ["s6", 590, 520, 360],
  ["p1", 600, 540, 340],
  ["p3", 600, 545, 300],
  ["p6", 610, 545, 260],
  ["p8", 615, 555, 250],
  ["p12", 600, 560, 230],
  ["g1", 600, 520, 330],
  ["g5", 600, 600, 300],
  ["g8", 600, 560, 250],
  ["g11", 600, 540, 260],
  ["c1", 620, 500, 480],
  ["c3", 600, 540, 480],
  ["c4", 600, 640, 560],
  ["c5", 590, 480, 600],
  ["c6", 680, 470, 680],
  ["c9", 640, 500, 680],
  ["r1", 600, 480, 600],
  ["r4", 600, 440, 760],
  ["r6", 600, 560, 900],
  ["r7", 600, 450, 980],
  ["r9", 600, 300, 560],
  ["h2", 600, 290, 520],
  ["h4", 580, 300, 540],
  ["h5", 430, 380, 380],
  ["h6", 400, 560, 640],
  ["h7", 420, 560, 680],
  ["h8", 600, 560, 900],
  ["h9", 380, 720, 520],
  ["h10", 230, 800, 380],
  ["h11", 130, 800, 360],
  // The reception: along to the table, then out to the people around it.
  ["h12", -130, 760, 400],
  ["h13", -230, 740, 420],
  ["h14", -320, 690, 640],
  ["h15", -240, 680, 540],
  ["h16", -470, 690, 560],
  ["h17", -540, 690, 640],
  ["e1", 600, 520, 1000],
  ["e2", 600, 600, 1250],
  ["e4", 600, 620, 1350],
  ["e5", 600, 620, 1450],
  ["e6", 600, 580, 1650],
  ["e7", 600, 570, 1750],
  ["e8", 600, 570, 1750],
];

const CAM_X = CAMERA.map(([b, cx]) => [b, cx] as const);
const CAM_Y = CAMERA.map(([b, , cy]) => [b, cy] as const);
const CAM_SPAN = CAMERA.map(([b, , , s]) => [b, s] as const);
const cameraAt = (t: number) => ({ cx: through(t, CAM_X), cy: through(t, CAM_Y), span: through(t, CAM_SPAN) });

// ---------- The tree ----------
type Seg = {
  /** Index of the parent segment (-1 for branches off the trunk). */
  parent: number;
  /** Where on the parent (0–1 of its length, or of trunk height). */
  at: number;
  side: number;
  angle: number; // radians from the parent's direction
  length: number;
  birth: number; // growth (0–1) at which it starts
  curve: number;
};
type LeafSpec = { seg: number; at: number; side: number; birth: number; silver: boolean; size: number; spin: number };
type FruitSpec = { seg: number; at: number; side: number; ripeAt: number; drop: number };
type TreeSpec = { segs: Seg[]; leaves: LeafSpec[]; fruit: FruitSpec[]; lean: number };

function buildTree(seed: number): TreeSpec {
  const r = rng(seed);
  const segs: Seg[] = [];
  // Main branches: the first two arrive early and visibly (beats r1, r2).
  const mains: [number, number, number, number, number][] = [
    // at, side, angle(deg), length, birth
    [0.55, -1, 52, 175, 0.17],
    [0.66, 1, 48, 170, 0.25],
    [0.74, -1, 40, 150, 0.33],
    [0.8, 1, 36, 140, 0.38],
    [0.47, 1, 62, 120, 0.44],
    [0.86, -1, 28, 120, 0.48],
    [0.9, 1, 22, 105, 0.54],
    [0.62, -1, 66, 110, 0.6],
    [0.95, -1, 10, 80, 0.66],
  ];
  for (const [at, side, ang, len, birth] of mains) {
    segs.push({ parent: -1, at, side, angle: (side * ang * Math.PI) / 180, length: len * (0.9 + r() * 0.2), birth, curve: -side * (0.18 + r() * 0.12) });
  }
  // Secondary branches on the mains.
  const n = segs.length;
  for (let i = 0; i < n; i++) {
    const count = 3 + (r() < 0.5 ? 1 : 0);
    for (let k = 0; k < count; k++) {
      const side = k % 2 === 0 ? 1 : -1;
      segs.push({
        parent: i,
        at: 0.35 + 0.5 * (k / count) + r() * 0.1,
        side,
        angle: side * (0.45 + r() * 0.35),
        length: segs[i].length * (0.38 + r() * 0.2),
        birth: segs[i].birth + 0.14 + r() * 0.12,
        curve: -side * 0.15,
      });
    }
  }
  const leaves: LeafSpec[] = [];
  // Leaves on the young stem (segment -2 = trunk), from the bottom up.
  for (let k = 0; k < 14; k++) {
    const at = 0.18 + (k / 14) * 0.82;
    leaves.push({ seg: -2, at, side: k % 2 ? 1 : -1, birth: -0.02 + at * 0.12, silver: r() < 0.3, size: 0.8 + r() * 0.3, spin: 0 });
  }
  segs.forEach((s, i) => {
    const count = Math.round(s.length / 5);
    for (let k = 1; k <= count; k++) {
      const at = 0.12 + (k / (count + 0.5)) * 0.88;
      leaves.push({ seg: i, at, side: k % 2 ? 1 : -1, birth: s.birth + 0.04 + at * 0.16, silver: r() < 0.38, size: 1 + r() * 0.5, spin: (r() - 0.5) * 0.9 });
    }
  });
  // Fruit on the outer half of the branches.
  const fruit: FruitSpec[] = [];
  segs.forEach((s, i) => {
    if (s.length < 50) return;
    const count = 2 + Math.floor(r() * 4);
    for (let k = 0; k < count; k++) {
      fruit.push({ seg: i, at: 0.45 + r() * 0.5, side: r() < 0.5 ? 1 : -1, ripeAt: r(), drop: r() });
    }
  });
  return { segs, leaves, fruit, lean: (r() - 0.5) * 0.08 };
}

type Pt = { x: number; y: number };
type Posed = { a: Pt; b: Pt; c: Pt; dir: number; width: number; len: number }[]; // quad curves

const TREE = buildTree(7);
const GROVE_SPECS = [buildTree(11), buildTree(23), buildTree(31), buildTree(47), buildTree(59)];

const trunkHeight = (g: number) => 62 + 368 * Math.pow(Math.max(g, 0), 0.85);
const quad = (a: Pt, b: Pt, c: Pt, s: number): Pt => ({
  x: (1 - s) * (1 - s) * a.x + 2 * (1 - s) * s * b.x + s * s * c.x,
  y: (1 - s) * (1 - s) * a.y + 2 * (1 - s) * s * b.y + s * s * c.y,
});
const quadDir = (a: Pt, b: Pt, c: Pt, s: number) => {
  const dx = 2 * (1 - s) * (b.x - a.x) + 2 * s * (c.x - b.x);
  const dy = 2 * (1 - s) * (b.y - a.y) + 2 * s * (c.y - b.y);
  return Math.atan2(dx, -dy); // angle from vertical (up), clockwise positive
};

/** The tree's skeleton at growth g, with its base at (x, y). Index 0 is the trunk. */
function pose(spec: TreeSpec, g: number, x: number, y: number): Posed {
  const h = trunkHeight(g);
  const lean = spec.lean * g;
  const trunk = {
    a: { x, y },
    b: { x: x + Math.sin(lean) * h * 0.5 + 6 * g, y: y - h * 0.5 },
    c: { x: x + Math.sin(lean) * h, y: y - h },
    dir: 0,
    width: 2.4 + 15 * Math.pow(Math.max(g, 0), 1.4),
    len: h,
  };
  const out: Posed = [trunk];
  spec.segs.forEach((s) => {
    const parent = s.parent === -1 ? trunk : out[s.parent + 1];
    const grown = smooth(s.birth, s.birth + 0.22, g);
    const len = s.length * grown * (0.55 + 0.45 * g);
    const base = quad(parent.a, parent.b, parent.c, s.at);
    const pd = quadDir(parent.a, parent.b, parent.c, s.at);
    const d0 = pd + s.angle;
    const d1 = d0 + s.curve;
    const b = { x: base.x + Math.sin(d0) * len * 0.5, y: base.y - Math.cos(d0) * len * 0.5 };
    const c = { x: b.x + Math.sin(d1) * len * 0.5, y: b.y - Math.cos(d1) * len * 0.5 };
    const width = grown <= 0 ? 0 : Math.max(0.8, parent.width * 0.42 * Math.min(1, len / 60));
    out.push({ a: base, b, c, dir: d0, width, len });
  });
  return out;
}

// ---------- Drawing helpers ----------
type Ctx = CanvasRenderingContext2D;

const ellipse = (ctx: Ctx, x: number, y: number, rx: number, ry: number, rot: number, fill: string | null, stroke: string | null, lw: number) => {
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(rx, 0.01), Math.max(ry, 0.01), rot, 0, Math.PI * 2);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
};

const line = (ctx: Ctx, x1: number, y1: number, x2: number, y2: number, p = 1) => {
  if (p <= 0) return;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 + (x2 - x1) * p, y1 + (y2 - y1) * p);
  ctx.stroke();
};

/** A polyline drawn up to fraction p of its length. */
const polyline = (ctx: Ctx, pts: readonly (readonly [number, number])[], p = 1) => {
  if (p <= 0 || pts.length < 2) return;
  const lens = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  let remain = lens.reduce((a, b) => a + b, 0) * p;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && remain > 0; i++) {
    const f = Math.min(1, remain / (lens[i - 1] || 1));
    ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f);
    remain -= lens[i - 1];
  }
  ctx.stroke();
};

type Part = { kind: "capsule"; a: Pt; b: Pt; w: number } | { kind: "ellipse"; c: Pt; rx: number; ry: number; rot: number };

/** Draws parts as one silhouette: an Espresso outline pass, then an Ivory fill pass over it. */
const silhouette = (ctx: Ctx, parts: Part[], hair: number) => {
  ctx.lineCap = "round";
  for (const pass of [0, 1]) {
    for (const p of parts) {
      if (p.kind === "capsule") {
        ctx.strokeStyle = pass ? C.ivory : C.espresso;
        ctx.lineWidth = p.w + (pass ? 0 : hair * 2.4);
        ctx.beginPath();
        ctx.moveTo(p.a.x, p.a.y);
        ctx.lineTo(p.b.x, p.b.y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.ellipse(p.c.x, p.c.y, p.rx, p.ry, p.rot, 0, Math.PI * 2);
        if (pass) {
          ctx.fillStyle = C.ivory;
          ctx.fill();
        } else {
          ctx.strokeStyle = C.espresso;
          ctx.lineWidth = hair * 2.4;
          ctx.stroke();
        }
      }
    }
  }
  ctx.lineCap = "butt";
};

const nail = (ctx: Ctx, tip: Pt, dir: number, w: number, hair: number) => {
  ctx.strokeStyle = C.travertine;
  ctx.lineWidth = hair;
  ctx.beginPath();
  ctx.ellipse(tip.x + Math.sin(dir) * (w / 2 + 3), tip.y - Math.cos(dir) * (w / 2 + 3), w * 0.28, w * 0.4, dir, 0, Math.PI * 2);
  ctx.stroke();
};

const offset = (p: Pt, dir: number, d: number): Pt => ({ x: p.x + Math.sin(dir) * d, y: p.y - Math.cos(dir) * d });

/**
 * A pinching hand, seen from the side: thumb and index finger around a grip point (`open` apart
 * from it), the other fingers curled under the palm, the forearm leaving the frame up and right.
 */
const pinch = (ctx: Ctx, x: number, y: number, open: number, hair: number) => {
  const indexTip = { x: x - open - 7, y: y - 1 };
  const thumbTip = { x: x + open + 7, y: y - 1 };
  const knuckle = { x: x - 4, y: y - 62 };
  const indexBase = { x: knuckle.x - 14, y: knuckle.y + 8 };
  const thumbBase = { x: knuckle.x + 30, y: knuckle.y + 14 };
  const parts: Part[] = [
    { kind: "capsule", a: { x: knuckle.x + 18, y: knuckle.y - 18 }, b: offset(knuckle, 0.55, 420), w: 50 },
    { kind: "ellipse", c: { x: knuckle.x + 8, y: knuckle.y - 8 }, rx: 34, ry: 26, rot: 0.5 },
    { kind: "capsule", a: { x: knuckle.x - 22, y: knuckle.y + 2 }, b: { x: knuckle.x - 8, y: knuckle.y - 14 }, w: 15 },
    { kind: "capsule", a: indexTip, b: indexBase, w: 15 },
    { kind: "capsule", a: thumbTip, b: thumbBase, w: 17 },
  ];
  silhouette(ctx, parts, hair);
  nail(ctx, indexTip, Math.atan2(indexBase.x - indexTip.x, -(indexBase.y - indexTip.y)), 15, hair);
  nail(ctx, thumbTip, Math.atan2(thumbBase.x - thumbTip.x, -(thumbBase.y - thumbTip.y)), 17, hair);
};

/** A hand pointing with its index finger: fingertip at (x, y), finger along `dir` (radians from up). */
const pointing = (ctx: Ctx, x: number, y: number, dir: number, hair: number) => {
  const tip = { x, y };
  const base = offset(tip, dir, 74);
  const palm = offset(base, dir + 0.25, 22);
  const parts: Part[] = [
    { kind: "capsule", a: palm, b: offset(palm, dir + 0.5, 420), w: 50 },
    { kind: "ellipse", c: palm, rx: 30, ry: 26, rot: dir },
    { kind: "capsule", a: offset(base, dir + 1.6, 10), b: offset(palm, dir + 1.9, 14), w: 15 },
    { kind: "capsule", a: tip, b: base, w: 15 },
  ];
  silhouette(ctx, parts, hair);
  nail(ctx, tip, dir, 15, hair);
};

/** The side of a flat hand, levelling the soil: its edge along y, moving right. */
const levelling = (ctx: Ctx, x: number, y: number, hair: number) => {
  const parts: Part[] = [
    { kind: "capsule", a: { x: x + 40, y: y - 26 }, b: { x: x + 40 + 300, y: y - 300 }, w: 48 },
    { kind: "ellipse", c: { x: x + 4, y: y - 12 }, rx: 58, ry: 14, rot: -0.06 },
  ];
  silhouette(ctx, parts, hair);
};

/** The olive pit, whole or split open by `split` (0–1). */
const pit = (ctx: Ctx, x: number, y: number, s: number, split: number, hair: number) => {
  const rx = 9 * s;
  const ry = 6 * s;
  const gap = split * 2.2;
  if (split <= 0) {
    ellipse(ctx, x, y, rx, ry, 0, C.gold, C.espresso, hair);
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.beginPath();
    ctx.ellipse(x, y, rx * 0.65, ry * 0.25, 0, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    return;
  }
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(x, y + side * gap, rx, ry, 0, side < 0 ? Math.PI : 0, side < 0 ? Math.PI * 2 : Math.PI);
    ctx.closePath();
    ctx.fillStyle = C.gold;
    ctx.fill();
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.stroke();
  }
};

const leaf = (ctx: Ctx, x: number, y: number, dir: number, len: number, wid: number, silver: boolean, hair: number) => {
  if (len < 0.4) return;
  const cx = x + Math.sin(dir) * len * 0.5;
  const cy = y - Math.cos(dir) * len * 0.5;
  ctx.beginPath();
  ctx.ellipse(cx, cy, wid / 2, len / 2, dir, 0, Math.PI * 2);
  ctx.fillStyle = silver ? C.travertine : C.olive;
  ctx.fill();
  if (silver) {
    ctx.strokeStyle = C.olive;
    ctx.lineWidth = hair;
    ctx.stroke();
  }
};

// ---------- Soil surface ----------
const rough = (x: number) => 4.5 * Math.sin(x * 0.11) + 3 * Math.sin(x * 0.27 + 1.3) + 2 * Math.sin(x * 0.53 + 0.4);
const bump = (u: number) => (Math.abs(u) >= 1 ? 0 : Math.pow(1 - u * u, 0.7));

type SoilState = { level: number; rake: number; hole: number; fill: number; dent: number; crack: number };

const soilState = (t: number): SoilState => {
  const level = progress(t, "p2", "p2", false);
  const rake = progress(t, "p3", "p3", false);
  const hole = 36 * progress(t, "p5") * (1 - progress(t, "p9", "p10"));
  const fill = progress(t, "p9", "p10");
  const dent = 2.4 * progress(t, "p11") * (1 - 0.5 * progress(t, "p12"));
  const crack = progress(t, "g7") * (1 - progress(t, "g8"));
  return { level, rake, hole, fill, dent, crack };
};

const soilTop = (x: number, s: SoilState) => {
  const xs = IN_L + (IN_R - IN_L) * s.level;
  const flat = smooth(xs - 14, xs + 14, x); // 1 where still rough
  const xr = IN_L + (IN_R - IN_L) * s.rake;
  const raked = x < xr ? 1.3 * Math.abs(Math.sin((x - IN_L) / 4.2)) : 0;
  const u = (x - PX) / 12;
  return (
    SOIL +
    rough(x) * flat +
    raked +
    s.hole * bump(u) -
    s.fill * 1.5 * bump((x - PX) / 16) +
    s.dent * bump((x - PX) / 13) -
    3.2 * s.crack * bump((x - PX) / 10)
  );
};

// ---------- Labels ----------
type Label = { text: string; ax: number; ay: number; lx: number; ly: number; align: CanvasTextAlign; alpha: number };

// ---------- Main draw ----------
export type PlateInput = { t: number; rect: Rect; dpr: number; fonts: Fonts; canvasW: number; canvasH: number };

/**
 * Draws the plate at t. Returns false if some grove trees were drawn with a stand-in bitmap (built
 * in a later frame), so the caller should draw again.
 */
export function drawPlate(ctx: Ctx, { t, rect, dpr, fonts, canvasW, canvasH }: PlateInput): boolean {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.fillStyle = C.ivory;
  ctx.fillRect(0, 0, canvasW, canvasH);
  if (rect.w < 40 || rect.h < 40) return true;
  spriteStandIns = 0;

  const cam = cameraAt(t);
  // While olives are picked by hand, frame the hand and the basket together.
  const pickA = beat("h5").start;
  const pickB = beat("h7").end;
  const follow = smooth(pickA - 0.1, pickA + 0.15, t) * (1 - smooth(pickB - 0.15, pickB + 0.1, t));
  const first = pickSchedule(t).focus;
  // The close-up opens out as the olive is released (72% of its pick), so it lands in a visible basket.
  const pickL = beat("h6").end - pickA;
  const closeUp = first ? smooth(pickA, pickA + 0.12, t) * (1 - smooth(pickA + pickL * 0.6, pickA + pickL * 0.78, t)) : 0;
  if (follow > 0) {
    const hand = pickSchedule(t).hand ?? pickSchedule(Math.max(pickA + 0.01, t - 0.05)).hand;
    if (first && closeUp > 0) {
      // The first olive: close on the hand and the olive, then down with it into the basket.
      const cx = first.x;
      const cy = Math.min(first.y + 20, GROUND - 120);
      cam.cx += (cx - cam.cx) * closeUp;
      cam.cy += (cy - cam.cy) * closeUp;
      cam.span += (300 - cam.span) * closeUp;
    }
    if (hand && closeUp < 1) {
      const w = follow * (1 - closeUp);
      const cx = (hand.x + BASKET.x) / 2;
      // The hand's palm and forearm reach well above its fingertips, so leave room for them.
      const cy = (hand.y - 150 + GROUND + 20) / 2;
      const span = Math.max(GROUND - hand.y + 200, Math.abs(hand.x - BASKET.x) + 200, 320);
      cam.cx += (cx - cam.cx) * w;
      cam.cy += (cy - cam.cy) * w;
      cam.span += (span - cam.span) * w;
    }
  }
  const scale = Math.min(rect.w, rect.h) / cam.span;
  const ox = rect.x + rect.w / 2 - cam.cx * scale;
  const oy = rect.y + rect.h / 2 - cam.cy * scale;
  const toScreen = (x: number, y: number): [number, number] => [x * scale + ox, y * scale + oy];
  const hair = 1.15 / scale;
  const labels: Label[] = [];

  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x * dpr, rect.y * dpr, rect.w * dpr, rect.h * dpr);
  ctx.clip();
  ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);
  ctx.lineJoin = "round";

  const ideaSketch = 1 - progress(t, "i10"); // 1 while the drawing is still a plan
  const built = progress(t, "i10");
  const eco = progress(t, "e2", "e7");

  // ---------- Ecosystem field, hills and grove rows (behind everything) ----------
  const view: View = { x0: (rect.x - ox) / scale, x1: (rect.x + rect.w - ox) / scale, y0: (rect.y - oy) / scale, y1: (rect.y + rect.h - oy) / scale };
  if (t > beat("e1").start) drawGroveBack(ctx, t, hair, scale, dpr, view);
  else if (spriteCache.size && t < beat("e1").start - 1) clearSprites();

  // ---------- Grid of the plan ----------
  const gridIn = progress(t, "i2", "i2", false);
  const gridOut = 1 - built;
  if (gridIn > 0 && gridOut > 0) {
    ctx.globalAlpha = gridOut;
    ctx.strokeStyle = C.travertine;
    ctx.lineWidth = hair;
    for (let i = 0, x = 260; x <= 940; x += 40, i++) line(ctx, x, 300, x, 900, smooth(i * 0.04, i * 0.04 + 0.4, gridIn));
    for (let i = 0, y = 300; y <= 900; y += 40, i++) line(ctx, 260, y, 940, y, smooth(i * 0.04, i * 0.04 + 0.4, gridIn));
    ctx.globalAlpha = 1;
  }

  // ---------- Ghost of the tree to come ----------
  const ghostIn = progress(t, "i6");
  const ghostOut = 1 - progress(t, "r4", "r5");
  if (ghostIn > 0 && ghostOut > 0) {
    ctx.globalAlpha = ghostOut;
    ctx.strokeStyle = t < beat("i10").end ? C.gold : C.travertine;
    ctx.lineWidth = hair * 1.2;
    ctx.setLineDash([7 * hair * 1.6, 5 * hair * 1.6]);
    line(ctx, PX, SOIL, PX, 380, ghostIn);
    ctx.beginPath();
    ctx.ellipse(PX, 255, 215, 140, 0, Math.PI / 2, Math.PI / 2 + Math.PI * 2 * ghostIn);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  // ---------- Ground and paving ----------
  const groundReach = 300 + 4200 * eco;
  const groundIn = progress(t, "i3", "i3", false);
  ctx.strokeStyle = C.espresso;
  ctx.lineWidth = hair;
  if (built > 0) {
    ctx.globalAlpha = built;
    ctx.fillStyle = C.travertine;
    ctx.fillRect(PX - groundReach, GROUND, groundReach * 2, 40);
    ctx.globalAlpha = 1;
  }
  if (ideaSketch > 0 && t < beat("i10").end) ctx.setLineDash([6 * hair * 1.5, 4 * hair * 1.5]);
  line(ctx, PX - groundReach * groundIn, GROUND, PX + groundReach * groundIn, GROUND, 1);
  ctx.setLineDash([]);

  // ---------- Soil ----------
  const soil = soilState(t);
  const top: [number, number][] = [];
  for (let x = IN_L; x <= IN_R; x += 2) top.push([x, soilTop(x, soil)]);
  if (built > 0) {
    ctx.globalAlpha = built;
    ctx.beginPath();
    ctx.moveTo(IN_L, PLANTER.floor);
    top.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.lineTo(IN_R, PLANTER.floor);
    ctx.closePath();
    ctx.fillStyle = C.espresso;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Grains.
    const r = rng(3);
    ctx.fillStyle = C.gold;
    for (let i = 0; i < 90; i++) {
      const gx = IN_L + 6 + r() * (IN_R - IN_L - 12);
      const gy = SOIL + 10 + r() * (PLANTER.floor - SOIL - 20);
      if (gy < soilTop(gx, soil) + 4) continue;
      ctx.globalAlpha = built;
      ctx.beginPath();
      ctx.arc(gx, gy, 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Everything below the soil surface is clipped to the soil body.
  const clipSoil = () => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(IN_L, PLANTER.floor);
    top.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.lineTo(IN_R, PLANTER.floor);
    ctx.closePath();
    ctx.clip();
  };

  // ---------- The website: a proper base (drainage and structure) ----------
  const base = progress(t, "c4");
  if (base > 0) {
    clipSoil();
    ctx.strokeStyle = C.travertine;
    ctx.lineWidth = hair;
    const reach = IN_L + (IN_R - IN_L) * base;
    ctx.setLineDash([5 * hair * 2, 4 * hair * 2]);
    line(ctx, IN_L, 800, reach, 800);
    ctx.setLineDash([]);
    for (let row = 0; row < 2; row++) {
      for (let x = IN_L + 7 + row * 5; x < reach - 4; x += 11) {
        ctx.beginPath();
        ctx.arc(x, 812 + row * 9, 4.2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.restore();
    if (base > 0.3) labels.push({ text: "Website", ax: IN_L + 30, ay: 812, lx: 330, ly: 760, align: "right", alpha: Math.min(base, 1 - progress(t, "r1")) });
  }

  // ---------- Moisture from watering (content) ----------
  const wet = progress(t, "c7", "c9");
  if (wet > 0) {
    clipSoil();
    ctx.strokeStyle = C.travertine;
    ctx.lineWidth = hair;
    ctx.setLineDash([4 * hair * 2, 4 * hair * 2]);
    for (const k of [1, 0.7, 0.45]) {
      ctx.beginPath();
      ctx.ellipse(PX + 12, SOIL, 140 * wet * k, 90 * wet * k, 0, 0, Math.PI);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  // ---------- Roots ----------
  const g = growth(t);
  drawRoots(ctx, t, g, hair, clipSoil);

  // ---------- The pit ----------
  drawPit(ctx, t, hair);

  // ---------- Planter (section cut, over the soil edges) ----------
  drawPlanter(ctx, t, hair, ideaSketch);

  // ---------- Idea: the seed mark and notes ----------
  const mark = progress(t, "i5") * (1 - built);
  if (mark > 0) {
    ctx.globalAlpha = mark;
    ctx.strokeStyle = C.gold;
    ctx.lineWidth = hair * 1.3;
    ctx.beginPath();
    ctx.ellipse(PX, 592, 9, 6, 0, 0, Math.PI * 2 * Math.min(1, mark * 1.4));
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  const notes: [string, string, number, number, CanvasTextAlign][] = [
    ["i7", "What it stands for", 520, 440, "right"],
    ["i8", "Who it is for", 690, 430, "left"],
    ["i9", "How people will find it", 690, 478, "left"],
  ];
  notes.forEach(([id, text, lx, ly, align]) => {
    const a = progress(t, id) * (1 - built);
    if (a > 0) labels.push({ text, ax: PX + (lx < PX ? -12 : 12), ay: 588, lx, ly, align, alpha: a });
  });

  // ---------- Soil crumbs falling back into the hole ----------
  const crumbs = progress(t, "p9", "p9", false);
  if (crumbs > 0 && crumbs < 1) {
    const r = rng(9);
    ctx.fillStyle = C.espresso;
    for (let i = 0; i < 14; i++) {
      const side = i % 2 ? 1 : -1;
      const sx = PX + side * (14 + r() * 10);
      const delay = r() * 0.5;
      const k = linear(delay, delay + 0.5, crumbs);
      if (k <= 0 || k >= 1) continue;
      const x = sx + (PX + side * 3 - sx) * k;
      const y = SOIL - 4 + k * k * 30;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ---------- Seedling and tree ----------
  if (t >= beat("g6").start) drawSeedlingOrTree(ctx, t, g, hair);

  // ---------- Cultivation ----------
  drawCultivation(ctx, t, hair, labels);

  // ---------- Harvest props ----------
  drawHarvest(ctx, t, hair);

  // ---------- Reception: the oil bottled, set out, tasted and taken home ----------
  if (t > beat("h12").start) drawReception(ctx, t, hair);

  // ---------- Grove in front ----------
  if (t > beat("e1").start) drawGroveFront(ctx, t, hair, scale, dpr, view);

  // ---------- Hands ----------
  drawHands(ctx, t, hair);

  // ---------- Sun and days ----------
  const day = drawSun(ctx, t, hair);

  ctx.restore();

  // ---------- Labels, in screen space ----------
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.clip();
  const placed: [number, number, number, number][] = [];
  labels.forEach((l) => {
    const [ax, ay] = toScreen(l.ax, l.ay);
    let [lx, ly] = toScreen(l.lx, l.ly);
    const isNote = t < beat("i10").end;
    ctx.font = isNote ? `italic 500 18px ${fonts.display}` : `500 11px ${fonts.text}`;
    if (!isNote && "letterSpacing" in ctx) (ctx as Ctx & { letterSpacing: string }).letterSpacing = "1.4px";
    const text = isNote ? l.text : l.text.toUpperCase();
    const w = ctx.measureText(text).width;
    const pad = l.align === "right" ? -6 : 6;
    // Keep the whole label inside the drawing (narrow screens crop the world at the sides), and
    // step it down past any label already placed there.
    const left = (x: number) => (l.align === "right" ? x + pad - w - 4 : x + pad - 4);
    const minX = rect.x + 6;
    const maxX = rect.x + rect.w - 6 - (w + 8);
    if (left(lx) < minX) lx += minX - left(lx);
    else if (left(lx) > maxX) lx -= left(lx) - maxX;
    ly = Math.min(Math.max(ly, rect.y + 14), rect.y + rect.h - 14);
    for (let guard = 0; guard < 6; guard++) {
      const bx = left(lx);
      const hit = placed.find(([px, py, pw]) => bx < px + pw && px < bx + w + 8 && Math.abs(ly - py) < 22);
      if (!hit) break;
      ly = hit[1] + 22;
    }
    placed.push([left(lx), ly, w + 8, 20]);
    ctx.globalAlpha = l.alpha;
    ctx.strokeStyle = C.espresso;
    ctx.fillStyle = C.espresso;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(lx, ly);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ax, ay, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = l.align;
    ctx.textBaseline = "middle";
    // A solid Ivory backing keeps labels legible over the drawing.
    const bx = left(lx);
    ctx.fillStyle = C.ivory;
    ctx.fillRect(bx, ly - 10, w + 8, 20);
    ctx.fillStyle = C.espresso;
    ctx.fillText(text, lx + pad, ly + 0.5);
    if ("letterSpacing" in ctx) (ctx as Ctx & { letterSpacing: string }).letterSpacing = "0px";
  });
  ctx.globalAlpha = 1;
  if (day) {
    ctx.font = `500 11px ${fonts.text}`;
    if ("letterSpacing" in ctx) (ctx as Ctx & { letterSpacing: string }).letterSpacing = "1.4px";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = C.espresso;
    ctx.globalAlpha = day.alpha;
    ctx.fillText(`DAY ${day.n}`, rect.x + 20, rect.y + 20);
    if ("letterSpacing" in ctx) (ctx as Ctx & { letterSpacing: string }).letterSpacing = "0px";
    ctx.globalAlpha = 1;
  }
  ctx.restore();
  return spriteStandIns === 0;
}

// ---------- Growth of the plant ----------
/** 0 at the end of germination (stem with first true leaves), 1 for the mature tree. */
const growth = (t: number) =>
  through(t, [
    ["g11", 0],
    ["c8", 0.1],
    ["c9", 0.16],
    ["r1", 0.24],
    ["r2", 0.32],
    ["r3", 0.42],
    ["r4", 0.55],
    ["r5", 0.7],
    ["r6", 0.78],
    ["r7", 1],
  ]);

function drawPlanter(ctx: Ctx, t: number, hair: number, sketch: number) {
  const reveal = progress(t, "i4", "i4", false);
  if (reveal <= 0) return;
  const { left, right, top, wall, floor } = PLANTER;
  const outline: [number, number][] = [
    [left, GROUND],
    [left, top],
    [left + wall, top],
    [left + wall, floor],
    [right - wall, floor],
    [right - wall, top],
    [right, top],
    [right, GROUND],
  ];
  const filled = 1 - sketch;
  if (filled > 0) {
    ctx.globalAlpha = filled;
    ctx.fillStyle = C.travertine;
    ctx.fillRect(left, top, wall, GROUND - top);
    ctx.fillRect(right - wall, top, wall, GROUND - top);
    ctx.fillRect(left, floor, right - left, GROUND - floor);
    // Section hatch.
    ctx.save();
    ctx.beginPath();
    ctx.rect(left, top, wall, GROUND - top);
    ctx.rect(right - wall, top, wall, GROUND - top);
    ctx.rect(left, floor, right - left, GROUND - floor);
    ctx.clip();
    ctx.strokeStyle = C.gold;
    ctx.lineWidth = hair;
    for (let k = -400; k < 900; k += 14) line(ctx, left + k, GROUND, left + k + 340, GROUND - 340);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  ctx.strokeStyle = C.espresso;
  ctx.lineWidth = hair * 1.2;
  if (sketch > 0 && t < beat("i10").end) ctx.setLineDash([6 * hair * 1.5, 4 * hair * 1.5]);
  polyline(ctx, outline, reveal);
  ctx.setLineDash([]);
}

function drawPit(ctx: Ctx, t: number, hair: number) {
  if (t < beat("s1").start) return;
  // Gone once the seedling has used it up.
  const fade = 1 - progress(t, "c1", "c3");
  if (fade <= 0) return;
  const grip = gripAt(t);
  let x: number = SEED_REST[0];
  let y: number = SEED_REST[1];
  const appear = progress(t, "s1");
  if (t >= beat("s5").start && t < beat("p8").start) {
    x = grip.x;
    y = grip.y;
  } else if (t >= beat("p8").start) {
    const fall = progress(t, "p8", "p8", false);
    const start = gripAt(beat("p8").start);
    const k = smooth(0.15, 0.65, fall);
    x = start.x + (SEED_PLANTED[0] - start.x) * k;
    y = start.y + (SEED_PLANTED[1] - start.y) * k * k;
  }
  const swell = 1 + 0.15 * progress(t, "g2");
  const split = progress(t, "g3");
  ctx.globalAlpha = Math.min(appear, fade);
  pit(ctx, x, y, swell, split, hair);
  ctx.globalAlpha = 1;
}

/** Where the pinching hand's grip is: picking up the pit, carrying it and placing it. */
function gripAt(t: number) {
  const [rx, ry] = SEED_REST;
  const pts: [string, number, number][] = [
    ["s1", 540, 380],
    ["s2", rx, 494],
    ["s3", rx, ry],
    ["s4", rx, ry],
    ["s5", rx + 6, 466],
    ["s6", SEED_HOLD[0], SEED_HOLD[1]],
    ["p6", SEED_HOLD[0], SEED_HOLD[1]],
    ["p7", PX, 540],
    ["p8", PX, 540],
  ];
  return {
    x: through(t, pts.map(([b, x]) => [b, x] as const)),
    y: through(t, pts.map(([b, , y]) => [b, y] as const)),
  };
}

function drawHands(ctx: Ctx, t: number, hair: number) {
  // The hand that picks up, holds and places the pit.
  const handIn = progress(t, "s2", "s2");
  const handOut = 1 - progress(t, "p8", "p8");
  if (handIn > 0 && handOut > 0 && t > beat("s1").end) {
    const grip = gripAt(t);
    let open = 20;
    if (t >= beat("s4").start) open = 20 - 10 * progress(t, "s4");
    if (t >= beat("p8").start) open = 10 + 14 * smooth(0, 0.3, progress(t, "p8", "p8", false));
    const lift = t >= beat("p8").start ? 70 * smooth(0.3, 1, progress(t, "p8", "p8", false)) : 0;
    ctx.globalAlpha = Math.min(1, handIn * 1.5, handOut * 1.5 + 0.2);
    pinch(ctx, grip.x, grip.y - lift, open, hair);
    ctx.globalAlpha = 1;
  }

  // The other hand: levels, rakes, makes the hole, presses the soil.
  const level = progress(t, "p2", "p2", false);
  if (level > 0 && level < 1) {
    const x = IN_L + (IN_R - IN_L) * level;
    levelling(ctx, x, SOIL - 3, hair);
  }
  const rake = progress(t, "p3", "p3", false);
  if (rake > 0 && rake < 1) {
    const x = IN_L + (IN_R - IN_L) * rake;
    pointing(ctx, x, SOIL - 1, 0.35, hair);
  }
  if (t >= beat("p4").start && t < beat("p6").end) {
    const down = progress(t, "p4");
    const push = progress(t, "p5");
    const up = progress(t, "p6");
    const tip = 430 + (SOIL - 430) * down + 36 * push - (36 + SOIL - 430) * up;
    pointing(ctx, PX, tip, 0.04, hair);
  }
  if (t >= beat("p11").start && t < beat("p12").end) {
    const down = progress(t, "p11");
    const up = progress(t, "p12");
    const tip = 430 + (SOIL + 2 - 430) * down - (SOIL + 2 - 430) * up;
    pointing(ctx, PX, tip, 0.04, hair);
  }

  // Harvest: picking olives.
  const picks = pickSchedule(t);
  if (picks.hand) {
    pinch(ctx, picks.hand.x, picks.hand.y, picks.hand.open, hair);
  }
}

function drawSun(ctx: Ctx, t: number, hair: number) {
  const days = progress(t, "g1", "g8", false);
  const toFixed = progress(t, "g9", "g11");
  const out = 1 - progress(t, "e1", "e2");
  if (days <= 0 || out <= 0) return null;
  let x: number;
  let y: number;
  let alpha = 1;
  if (toFixed <= 0) {
    const d = days * 12;
    const f = d % 1;
    x = SUN_DAY.x0 + (SUN_DAY.x1 - SUN_DAY.x0) * f;
    y = SUN_DAY.y - Math.sin(f * Math.PI) * SUN_DAY.lift;
    alpha = Math.min(1, Math.sin(f * Math.PI) * 4);
  } else {
    const from = { x: (SUN_DAY.x0 + SUN_DAY.x1) / 2, y: SUN_DAY.y - SUN_DAY.lift };
    x = from.x + (SUN_FIXED[0] - from.x) * toFixed;
    y = from.y + (SUN_FIXED[1] - from.y) * toFixed;
  }
  ctx.globalAlpha = alpha * out;
  ellipse(ctx, x, y, 11, 11, 0, C.ivory, C.gold, hair * 1.4);
  ctx.strokeStyle = C.gold;
  ctx.lineWidth = hair * 1.2;
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    line(ctx, x + Math.cos(a) * 15, y + Math.sin(a) * 15, x + Math.cos(a) * 21, y + Math.sin(a) * 21);
  }
  ctx.globalAlpha = 1;
  sunPos = { x, y };
  return toFixed <= 0 ? { n: Math.min(12, Math.floor(days * 12) + 1), alpha: 1 - progress(t, "g9") } : null;
}
let sunPos: Pt = { x: SUN_FIXED[0], y: SUN_FIXED[1] };

function drawRoots(ctx: Ctx, t: number, g: number, hair: number, clipSoil: () => void) {
  const first = progress(t, "g4");
  if (first <= 0) return;
  const more = progress(t, "g5");
  const spread = progress(t, "r5", "r6");
  const [sx, sy] = SEED_PLANTED;
  clipSoil();
  ctx.strokeStyle = C.travertine;
  ctx.lineCap = "round";
  const mainLen = 60 * first + 50 * more + 110 * Math.min(1, g * 1.4);
  ctx.lineWidth = Math.max(hair * 1.6, 1.4 + 4 * g);
  ctx.beginPath();
  ctx.moveTo(sx, sy + 6);
  ctx.quadraticCurveTo(sx + 4, sy + 6 + mainLen * 0.5, sx - 2, sy + 6 + mainLen);
  ctx.stroke();
  const r = rng(5);
  const laterals = 16;
  for (let i = 0; i < laterals; i++) {
    const at = 0.15 + (i / laterals) * 0.8;
    const side = i % 2 ? 1 : -1;
    const birth = i < 4 ? 0 : i < 8 ? 0.15 : 0.45;
    const k = i < 4 ? more : smooth(birth, birth + 0.3, g) * (i >= 8 ? 0.3 + 0.7 * spread : 1);
    if (k <= 0) continue;
    const len = (22 + r() * 30 + (i >= 8 ? 90 : 30) * g) * k;
    const y0 = sy + 6 + mainLen * at;
    const ang = side * (0.9 + r() * 0.4);
    ctx.lineWidth = Math.max(hair * 1.2, 0.8 + 2 * g);
    ctx.beginPath();
    ctx.moveTo(sx, y0);
    ctx.quadraticCurveTo(sx + Math.sin(ang) * len * 0.6, y0 + Math.cos(ang) * len * 0.2, sx + Math.sin(ang) * len, y0 + len * 0.45);
    ctx.stroke();
  }
  ctx.lineCap = "butt";
  ctx.restore();
}

function drawSeedlingOrTree(ctx: Ctx, t: number, g: number, hair: number) {
  const [sx, sy] = SEED_PLANTED;
  const top = sy - 6;
  if (t < beat("g11").end) {
    // Germination: the hooked shoot rises, breaks through, straightens and opens its leaves.
    const H = 26 * progress(t, "g6") + 12 * progress(t, "g8") + 14 * progress(t, "g9") + 10 * progress(t, "g11");
    const hook = 1 - progress(t, "g9");
    const tipY = top - H;
    const theta = hook * 2.6;
    const tip = { x: sx + Math.sin(theta) * 9, y: tipY - Math.cos(theta) * 9 };
    // Pale below the surface, olive above it.
    for (const [clipTop, colour] of [
      [SOIL, C.travertine],
      [-1e4, C.olive],
    ] as const) {
      ctx.save();
      ctx.beginPath();
      if (clipTop === SOIL) ctx.rect(0, SOIL, 2000, 600);
      else ctx.rect(0, -1e4, 2000, 1e4 + SOIL);
      ctx.clip();
      ctx.strokeStyle = colour;
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(sx, top);
      ctx.lineTo(sx, tipY);
      ctx.quadraticCurveTo(sx + Math.sin(theta / 2) * 6, tipY - 6, tip.x, tip.y);
      ctx.stroke();
      ctx.lineCap = "butt";
      ctx.restore();
    }
    // Cracks in the surface where it breaks through.
    const crack = progress(t, "g7");
    if (crack > 0) {
      ctx.strokeStyle = C.espresso;
      ctx.lineWidth = hair * 1.2;
      ctx.globalAlpha = crack;
      line(ctx, sx - 3, SOIL - 3, sx - 13, SOIL - 9);
      line(ctx, sx + 3, SOIL - 3, sx + 12, SOIL - 10);
      ctx.globalAlpha = 1;
    }
    // Seed leaves, then the first true leaves.
    const cot = progress(t, "g10");
    if (cot > 0) {
      const spread = 0.15 + 0.95 * cot;
      leaf(ctx, sx, tipY, -spread, 15 * (0.5 + 0.5 * cot), 7, false, hair);
      leaf(ctx, sx, tipY, spread, 15 * (0.5 + 0.5 * cot), 7, false, hair);
    }
    const tl = progress(t, "g11");
    if (tl > 0) {
      leaf(ctx, sx, tipY - 1, -0.35, 16 * tl, 3.6, false, hair);
      leaf(ctx, sx, tipY - 1, 0.35, 16 * tl, 3.6, true, hair);
    }
    return;
  }
  drawTree(ctx, TREE, g, PX, SOIL, 1, hair, t, true);
  // The seed leaves fall away as the sapling grows.
  const cotOut = 1 - progress(t, "c2", "c4");
  if (cotOut > 0) {
    const y = SOIL - 52;
    ctx.globalAlpha = cotOut;
    leaf(ctx, PX, y, -1.1, 15, 7, false, hair);
    leaf(ctx, PX, y, 1.1, 15, 7, false, hair);
    ctx.globalAlpha = 1;
  }
}

/** Fruit position (world) on the main tree at full growth. */
let fruitPositions: Pt[] | null = null;
const fruitAt = () => {
  if (fruitPositions) return fruitPositions;
  const posed = pose(TREE, 1, PX, SOIL);
  fruitPositions = TREE.fruit.map((f) => {
    const s = posed[f.seg + 1];
    const p = quad(s.a, s.b, s.c, f.at);
    const d = quadDir(s.a, s.b, s.c, f.at) + f.side * 1.3;
    return { x: p.x + Math.sin(d) * 7, y: p.y - Math.cos(d) * 7 + 5 };
  });
  return fruitPositions;
};

/**
 * Draws a tree. `stride` > 1 draws every stride-th leaf, slightly larger, for renderings so small
 * that single leaves are under a few pixels (the grove's far rows): the canopy reads the same.
 */
function drawTree(ctx: Ctx, spec: TreeSpec, g: number, x: number, y: number, s: number, hair: number, t: number, main: boolean, stride = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.translate(-x, -y);
  const posed = pose(spec, g, x, y);
  const lw = hair / s;
  // Wood.
  ctx.lineCap = "round";
  posed.forEach((seg, i) => {
    if (seg.len < 0.5 || seg.width <= 0) return;
    ctx.strokeStyle = i === 0 && g < 0.3 ? C.olive : C.espresso;
    ctx.lineWidth = seg.width;
    ctx.beginPath();
    ctx.moveTo(seg.a.x, seg.a.y);
    ctx.quadraticCurveTo(seg.b.x, seg.b.y, seg.c.x, seg.c.y);
    ctx.stroke();
  });
  ctx.lineCap = "butt";
  // Leaves.
  const trunk = posed[0];
  const enlarge = Math.sqrt(stride);
  for (let li = 0; li < spec.leaves.length; li += stride) {
    const l = spec.leaves[li];
    const grown = smooth(l.birth, l.birth + 0.08, g) * enlarge;
    if (grown <= 0) continue;
    let p: Pt;
    let d: number;
    if (l.seg === -2) {
      // Leaves on the young stem drop from the bottom up as it becomes a trunk.
      const dropped = smooth(0.35 + l.at * 0.4, 0.45 + l.at * 0.4, g);
      if (dropped >= 1) continue;
      p = quad(trunk.a, trunk.b, trunk.c, l.at);
      d = l.side * 0.75;
      ctx.globalAlpha = 1 - dropped;
    } else {
      const seg = posed[l.seg + 1];
      if (seg.len < 2) continue;
      p = quad(seg.a, seg.b, seg.c, l.at);
      d = quadDir(seg.a, seg.b, seg.c, l.at) + l.side * 0.8 + l.spin;
    }
    leaf(ctx, p.x, p.y, d, 15 * l.size * grown, 3.9 * l.size * grown, l.silver, lw);
    ctx.globalAlpha = 1;
  }
  ctx.restore();

  if (!main) return;
  // Flowers and fruit (main tree only, at full growth).
  const buds = progress(t, "r8");
  if (buds <= 0) return;
  const open = progress(t, "r9");
  const fall = progress(t, "h1");
  const swell = progress(t, "h1", "h2");
  const pts = fruitAt();
  const picked = pickSchedule(t);
  spec.fruit.forEach((f, i) => {
    const p = pts[i];
    // Flower.
    if (fall < 1) {
      const r = (2.6 + 3.6 * open) * (1 - fall);
      ctx.globalAlpha = 1 - fall;
      ellipse(ctx, p.x, p.y + fall * 20 * f.drop, r * buds, r * buds, 0, C.ivory, C.espresso, hair);
      if (open > 0) ellipse(ctx, p.x, p.y + fall * 20 * f.drop, 1.8 * open, 1.8 * open, 0, C.gold, null, 0);
      ctx.globalAlpha = 1;
    }
    // Olive.
    if (swell <= 0) return;
    const state = picked.olives[i];
    if (state.gone) return;
    const ripe = smooth(beat("h3").start + f.ripeAt * (beat("h4").end - beat("h3").start) * 0.9, beat("h3").start + f.ripeAt * (beat("h4").end - beat("h3").start) * 0.9 + 0.06, t);
    const rx = 1.4 + 3.2 * swell;
    const ry = 1.1 + 2.4 * swell;
    const ox = state.x ?? p.x;
    const oy = state.y ?? p.y;
    ellipse(ctx, ox, oy, ry, rx, 0, C.olive, null, 0);
    if (ripe > 0) {
      ctx.globalAlpha = ripe;
      ellipse(ctx, ox, oy, ry, rx, 0, C.espresso, null, 0);
      ctx.globalAlpha = 1;
    }
  });
}

/**
 * Harvest choreography: the first five olives on the lower left are picked by hand, one at a time,
 * and dropped into the basket; the rest fall onto a net, are gathered into the basket, pressed, and
 * the oil fills a vessel. Returns each olive's override position and the picking hand.
 */
function pickSchedule(t: number) {
  const pts = fruitAt();
  const order = pts
    .map((p, i) => ({ i, score: p.x + (SOIL - p.y) * 0.5 }))
    .sort((a, b) => a.score - b.score)
    .map((o) => o.i);
  // Hand-picked: the five olives nearest the basket.
  const handPicked = pts
    .map((p, i) => ({ i, d: Math.hypot(p.x - BASKET.x, p.y - GROUND) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 5)
    .map((o) => o.i);
  const rest = order.filter((i) => !handPicked.includes(i));
  let focus: Pt | null = null;
  const olives: { x?: number; y?: number; gone: boolean }[] = pts.map(() => ({ gone: false }));
  let hand: { x: number; y: number; open: number } | null = null;

  const basketPoint = (k: number) => ({ x: BASKET.x - 16 + (k % 6) * 6, y: BASKET.top + 22 - Math.floor(k / 6) * 5 });
  // Pick windows: the first in h5–h6, the next four through h7.
  const windows: [number, number][] = [[beat("h5").start, beat("h6").end]];
  const h7 = beat("h7");
  for (let k = 0; k < 4; k++) windows.push([h7.start + (k / 4) * (h7.end - h7.start), h7.start + ((k + 1) / 4) * (h7.end - h7.start)]);

  handPicked.forEach((idx, k) => {
    const [a, b] = windows[k];
    const p = pts[idx];
    const local = linear(a, b, t);
    if (t >= a && t <= b) {
      // Reach (0–0.4), close (0.4–0.55), pull and release (0.55–0.75).
      const reach = smooth(0, 0.4, local);
      const from = k === 0 ? { x: p.x - 140, y: p.y - 110 } : pts[handPicked[k - 1]];
      const hx = from.x + (p.x - from.x) * reach;
      const hy = from.y + (p.y - from.y) * reach;
      const open = 14 - 9 * smooth(0.4, 0.55, local) + 9 * smooth(0.7, 0.78, local);
      const pull = smooth(0.55, 0.7, local) * 10;
      hand = { x: hx - pull * 0.3, y: hy + pull, open };
      if (local > 0.55) {
        olives[idx] = { x: hx - pull * 0.3, y: hy + pull, gone: false };
      }
      if (local > 0.72) {
        const fall = smooth(0.72, 1, local);
        const target = basketPoint(k);
        olives[idx] = { x: hx + (target.x - hx) * fall, y: hy + pull + (target.y - hy - pull) * fall * fall, gone: false };
      }
      if (k === 0) focus = local > 0.72 ? { x: olives[idx].x!, y: olives[idx].y! } : { x: p.x, y: p.y };
    } else if (t > b) {
      olives[idx] = { ...basketPoint(k), gone: false };
    }
  });

  // The rest fall onto the net, then are gathered into the basket.
  const net = beat("h8");
  const gather = beat("h9");
  rest.forEach((idx, k) => {
    const p = pts[idx];
    const delay = (k % 17) / 17;
    const fall = smooth(net.start + delay * 0.6 * (net.end - net.start), net.start + (delay * 0.6 + 0.3) * (net.end - net.start), t);
    const nx = Math.min(Math.max(p.x, PLANTER.left - 10), PLANTER.right + 10);
    const ny = PLANTER.top - 4 - (k % 3) * 2;
    let x = p.x + (nx - p.x) * fall;
    let y = p.y + (ny - p.y) * fall * fall;
    const g2 = smooth(gather.start + delay * 0.4 * (gather.end - gather.start), gather.start + (delay * 0.4 + 0.5) * (gather.end - gather.start), t);
    if (g2 > 0) {
      const target = basketPoint(5 + k);
      x = x + (target.x - x) * g2;
      y = y + (target.y - y) * g2;
    }
    if (fall > 0) olives[idx] = { x, y, gone: false };
  });

  // Into the press, then gone.
  const press = progress(t, "h10", "h10", false);
  if (press > 0) {
    olives.forEach((o, i) => {
      if (o.x === undefined) return;
      const delay = (i % 13) / 13;
      const k = smooth(delay * 0.5, delay * 0.5 + 0.3, press);
      if (k >= 1) {
        olives[i] = { gone: true };
        return;
      }
      olives[i] = { x: o.x + (BASIN.x - o.x) * k, y: o.y! + (836 - o.y!) * k - Math.sin(k * Math.PI) * 60, gone: false };
    });
  }
  if (t > beat("e1").start) olives.forEach((_, i) => (olives[i] = { gone: true }));
  return { olives, hand: hand as { x: number; y: number; open: number } | null, focus: focus as Pt | null };
}

function drawCultivation(ctx: Ctx, t: number, hair: number, labels: Label[]) {
  const labelsOut = 1 - progress(t, "r1");
  // Strategy: the stake.
  const stake = progress(t, "c1");
  const stakeOut = 1 - progress(t, "r4", "r5");
  if (stake > 0 && stakeOut > 0) {
    const drop = (1 - stake) * 220;
    ctx.globalAlpha = stakeOut;
    ctx.fillStyle = C.travertine;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.beginPath();
    ctx.rect(624, 380 - drop, 7, 220);
    ctx.fill();
    ctx.stroke();
    // The tie.
    const tie = progress(t, "c2");
    if (tie > 0) {
      ctx.strokeStyle = C.gold;
      ctx.lineWidth = hair * 1.6;
      ctx.beginPath();
      ctx.ellipse(613, 505, 16, 4, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * tie);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    labels.push({ text: "Strategy", ax: 631, ay: 392, lx: 700, ly: 360, align: "left", alpha: Math.min(stake, labelsOut) });
  }

  // Brand identity: the name tag and its mark.
  const tag = progress(t, "c3");
  const tagOut = 1 - progress(t, "e1", "e2");
  if (tag > 0 && tagOut > 0) {
    const push = smooth(0, 0.5, tag);
    const drawMark = smooth(0.45, 1, tag);
    const dy = (1 - push) * -90;
    ctx.globalAlpha = tagOut;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair * 1.4;
    line(ctx, 548, 520 + dy, 548, 596 + dy);
    ctx.fillStyle = C.ivory;
    ctx.lineWidth = hair;
    ctx.beginPath();
    ctx.rect(522, 490 + dy, 52, 30);
    ctx.fill();
    ctx.stroke();
    if (drawMark > 0) {
      ctx.strokeStyle = C.gold;
      ctx.lineWidth = hair * 1.3;
      ctx.beginPath();
      ctx.arc(536, 505 + dy, 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * drawMark);
      ctx.stroke();
      if (drawMark > 0.6) leaf(ctx, 536, 510 + dy, 0.4, 9, 3, false, hair);
      ctx.strokeStyle = C.espresso;
      ctx.lineWidth = hair;
      line(ctx, 549, 500 + dy, 568, 500 + dy, smooth(0.6, 1, drawMark));
      line(ctx, 549, 507 + dy, 563, 507 + dy, smooth(0.7, 1, drawMark));
      line(ctx, 549, 514 + dy, 566, 514 + dy, smooth(0.8, 1, drawMark));
    }
    ctx.globalAlpha = 1;
    labels.push({ text: "Brand identity", ax: 522, ay: 498 + dy, lx: 470, ly: 448, align: "right", alpha: Math.min(tag, labelsOut) });
  }

  // SEO and GEO: direct light, and light reflected from the wall.
  const rays = progress(t, "c5");
  const raysOut = 1 - progress(t, "r2", "r3");
  const plantTop = { x: PX, y: SOIL - trunkHeight(growth(t)) + 12 };
  if (rays > 0 && raysOut > 0) {
    ctx.globalAlpha = raysOut;
    ctx.strokeStyle = C.gold;
    ctx.lineWidth = hair * 1.2;
    for (const dx of [-12, 0, 12]) {
      const from = { x: sunPos.x + 18, y: sunPos.y + 14 };
      line(ctx, from.x, from.y, plantTop.x + dx, plantTop.y + 6, rays);
    }
    ctx.globalAlpha = 1;
    labels.push({ text: "Found in search (SEO)", ax: sunPos.x + 60, ay: sunPos.y + 46, lx: sunPos.x - 10, ly: sunPos.y + 80, align: "right", alpha: Math.min(rays, labelsOut) });
  }
  const wall = progress(t, "c6");
  const wallOut = 1 - progress(t, "e1", "e2");
  if (wall > 0 && wallOut > 0) {
    const build = smooth(0, 0.5, wall);
    ctx.globalAlpha = wallOut;
    ctx.fillStyle = C.travertine;
    ctx.fillRect(WALL.left, GROUND - (GROUND - WALL.top) * build, WALL.right - WALL.left, (GROUND - WALL.top) * build);
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.strokeRect(WALL.left, GROUND - (GROUND - WALL.top) * build, WALL.right - WALL.left, (GROUND - WALL.top) * build);
    for (let y = GROUND - 30; y > GROUND - (GROUND - WALL.top) * build; y -= 30) line(ctx, WALL.left, y, WALL.right, y);
    const reflect = smooth(0.4, 1, wall) * raysOut;
    if (reflect > 0) {
      ctx.strokeStyle = C.gold;
      ctx.lineWidth = hair * 1.2;
      const hits = [380, 430];
      hits.forEach((hy) => line(ctx, sunPos.x + 18, sunPos.y + 10, WALL.left, hy, Math.min(1, reflect * 2)));
      ctx.setLineDash([5 * hair * 2, 4 * hair * 2]);
      hits.forEach((hy) => line(ctx, WALL.left, hy, plantTop.x + 8, plantTop.y + 10, smooth(0.4, 1, reflect)));
      ctx.setLineDash([]);
    }
    ctx.globalAlpha = 1;
    labels.push({ text: "Cited in AI answers (GEO)", ax: WALL.left, ay: 405, lx: 870, ly: 300, align: "right", alpha: Math.min(wall, labelsOut) });
  }

  // Content: watering, week after week.
  const water = progress(t, "c7");
  const canOut = 1 - progress(t, "r2", "r3");
  if (water > 0 && canOut > 0) {
    const tilt = -0.42 * smooth(0, 0.3, water);
    ctx.save();
    ctx.globalAlpha = canOut * smooth(0, 0.2, water);
    ctx.translate(740, 470);
    ctx.rotate(tilt);
    ctx.fillStyle = C.gold;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.beginPath();
    ctx.rect(-26, -18, 52, 36);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -18, 16, Math.PI, 0);
    ctx.stroke();
    ctx.lineWidth = hair * 2.4;
    ctx.strokeStyle = C.gold;
    line(ctx, -26, 6, -70, -16);
    ctx.lineWidth = hair;
    ctx.strokeStyle = C.espresso;
    ellipse(ctx, -72, -17, 4, 6, -0.4, C.gold, C.espresso, hair);
    ctx.restore();
    // Drops from the rose to the soil around the plant.
    const pour = smooth(0.25, 1, water) * canOut;
    if (pour > 0 && pour < 1) {
      const rose = { x: 740 + Math.cos(tilt) * -72 - Math.sin(tilt) * -17, y: 470 + Math.sin(tilt) * -72 + Math.cos(tilt) * -17 };
      for (let k = 0; k < 9; k++) {
        const ph = (t * 6 + k / 9) % 1;
        const x = rose.x - 6 - k * 4 - ph * 20;
        const y = rose.y + 6 + ph * (SOIL - rose.y - 6);
        ellipse(ctx, x, y, 1.8, 2.8, 0, C.travertine, C.espresso, hair * 0.8);
      }
    }
    labels.push({ text: "Content", ax: 760, ay: 455, lx: 790, ly: 410, align: "left", alpha: Math.min(water, labelsOut) });
  }

  // Digital marketing: a breeze that carries it further.
  const breeze = progress(t, "c8");
  const breezeOut = 1 - progress(t, "r2", "r3");
  if (breeze > 0 && breezeOut > 0) {
    ctx.globalAlpha = breezeOut;
    ctx.strokeStyle = C.olive;
    ctx.lineWidth = hair * 1.2;
    const curves = [395, 425, 455];
    curves.forEach((cy, i) => {
      const pts: [number, number][] = [];
      for (let x = 160; x <= 1060; x += 10) pts.push([x, cy + Math.sin((x + i * 60) / 70) * 10]);
      ctx.setLineDash([14 * hair * 2, 10 * hair * 2]);
      ctx.lineDashOffset = -t * 260 * hair * 2;
      polyline(ctx, pts, breeze);
    });
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    // Carried along, outward.
    ctx.fillStyle = C.olive;
    for (let k = 0; k < 12; k++) {
      const ph = (t * 1.6 + k / 12) % 1;
      const x = 300 + ph * 760;
      const y = curves[k % 3] + Math.sin((x + (k % 3) * 60) / 70) * 10 - 4;
      if (x > 160 + 900 * breeze) continue;
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    labels.push({ text: "Digital marketing", ax: 330, ay: 395 + Math.sin(330 / 70) * 10, lx: 330, ly: 330, align: "right", alpha: Math.min(breeze, labelsOut) });
  }
}

function drawHarvest(ctx: Ctx, t: number, hair: number) {
  const basketIn = progress(t, "h5", "h5");
  const propsOut = 1 - progress(t, "e1", "e2");
  if (basketIn > 0 && propsOut > 0) {
    ctx.globalAlpha = Math.min(basketIn, propsOut);
    // Basket.
    ctx.fillStyle = C.travertine;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.beginPath();
    ctx.moveTo(BASKET.x - 34, BASKET.top);
    ctx.lineTo(BASKET.x + 34, BASKET.top);
    ctx.lineTo(BASKET.x + 26, GROUND);
    ctx.lineTo(BASKET.x - 26, GROUND);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = C.gold;
    for (let y = BASKET.top + 8; y < GROUND; y += 8) line(ctx, BASKET.x - 31 + (y - BASKET.top) * 0.18, y, BASKET.x + 31 - (y - BASKET.top) * 0.18, y);
    ctx.globalAlpha = 1;
  }
  // The net, spread over the planter for the rest of the crop.
  const net = progress(t, "h8", "h8");
  const netOut = 1 - progress(t, "h9", "h9");
  if (net > 0 && netOut > 0) {
    ctx.globalAlpha = Math.min(1, net * 2) * netOut;
    ctx.strokeStyle = C.travertine;
    ctx.lineWidth = hair * 2;
    polyline(ctx, [
      [PLANTER.left - 50, 600],
      [PLANTER.left, PLANTER.top - 2],
      [PLANTER.right, PLANTER.top - 2],
      [PLANTER.right + 50, 600],
    ], Math.min(1, net * 1.6));
    ctx.globalAlpha = 1;
  }
  // The press: a stone basin and a millstone that rolls back and forth.
  const press = progress(t, "h10", "h10");
  const pressOut = propsOut;
  if (press > 0 && pressOut > 0) {
    const roll = Math.sin(linear(beat("h10").start, beat("h11").end, t) * Math.PI * 4) * 20;
    ctx.globalAlpha = Math.min(1, press * 2) * pressOut;
    ctx.fillStyle = C.travertine;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.beginPath();
    ctx.rect(BASIN.x - 62, 826, 124, GROUND - 826);
    ctx.fill();
    ctx.stroke();
    ellipse(ctx, BASIN.x + roll, 796, 30, 30, 0, C.travertine, C.espresso, hair);
    for (let k = 0; k < 4; k++) {
      const a = roll / 30 + (k * Math.PI) / 2;
      line(ctx, BASIN.x + roll, 796, BASIN.x + roll + Math.cos(a) * 26, 796 + Math.sin(a) * 26);
    }
    ctx.globalAlpha = 1;
  }
  // The oil fills a vessel.
  const oil = progress(t, "h11");
  if (press > 0 && pressOut > 0) {
    ctx.globalAlpha = Math.min(1, press * 2) * pressOut;
    ctx.fillStyle = C.ivory;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    const vx = VESSEL.x;
    const body = () => {
      ctx.beginPath();
      ctx.moveTo(vx - 10, 770);
      ctx.lineTo(vx - 10, 784);
      ctx.quadraticCurveTo(vx - 30, 792, vx - 30, 812);
      ctx.lineTo(vx - 26, GROUND);
      ctx.lineTo(vx + 26, GROUND);
      ctx.lineTo(vx + 30, 812);
      ctx.quadraticCurveTo(vx + 30, 792, vx + 10, 784);
      ctx.lineTo(vx + 10, 770);
      ctx.closePath();
    };
    body();
    ctx.fill();
    if (oil > 0) {
      ctx.save();
      body();
      ctx.clip();
      ctx.fillStyle = C.gold;
      const level = GROUND - (GROUND - 778) * oil;
      ctx.fillRect(vx - 32, level, 64, GROUND - level);
      ctx.restore();
      if (oil < 1) {
        ctx.strokeStyle = C.gold;
        ctx.lineWidth = hair * 2.4;
        line(ctx, BASIN.x - 62, 836, vx + 6, 768);
      }
    }
    body();
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

// ---------- Reception ----------
const TABLE = { left: -390, right: -110, top: 740 } as const;
/** Where the bottles end up on the table (they are filled at its right end, by the vessel). */
const BOTTLES = [-350, -325, -300] as const;
const DISH = { x: -170 } as const;
const BREAD = { x: -128 } as const;

/** Progress through part [a, b] of a beat, linear in scroll and eased. */
const sub = (t: number, id: string, a: number, b: number) => {
  const bt = beat(id);
  return smooth(bt.start + (bt.end - bt.start) * a, bt.start + (bt.end - bt.start) * b, t);
};
const mix = (a: Pt, b: Pt, k: number): Pt => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });

/** Elbow of a two-segment arm from shoulder s to hand h, bending down and away from `face`. */
const elbow = (s: Pt, h: Pt, l1: number, l2: number, face: number): Pt => {
  const dx = h.x - s.x;
  const dy = h.y - s.y;
  const d = Math.min(Math.max(Math.hypot(dx, dy), 1), l1 + l2 - 0.5);
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const k = Math.sqrt(Math.max(l1 * l1 - a * a, 0));
  const ux = dx / d;
  const uy = dy / d;
  const p = { x: s.x + ux * a, y: s.y + uy * a };
  const e1 = { x: p.x - uy * k, y: p.y + ux * k };
  const e2 = { x: p.x + uy * k, y: p.y - ux * k };
  // The lower elbow, or the one behind the body when level.
  const score = (e: Pt) => e.y - (e.x - s.x) * face * 0.3;
  return score(e1) >= score(e2) ? e1 : e2;
};

type Person = { x: number; face: number; walk: number; near: Pt | null; far?: Pt | null };

/**
 * A standing person in profile, as an Ivory silhouette like the hands: no face or detail, so no
 * one in particular. `walk` > 0 swings the legs (a phase taken from the position). `near` and
 * `far` are hand positions (null: hanging at the side); the near arm is drawn over the body.
 */
const person = (ctx: Ctx, { x, face, walk, near, far = null }: Person, hair: number) => {
  const phase = x / 22;
  const swing = Math.sin(phase) * 15 * walk;
  const hipY = 712;
  const shoulder = { x: x + face * 3, y: 634 };
  const rest = (side: number): Pt => ({ x: x + face * 4 - side * swing * 0.8, y: shoulder.y + 122 });
  const arm = (hand: Pt | null, side: number): Part[] => {
    const h = hand ?? rest(side);
    const e = elbow(shoulder, h, 66, 62, face);
    return [
      { kind: "capsule", a: shoulder, b: e, w: 15 },
      { kind: "capsule", a: e, b: h, w: 12 },
      { kind: "ellipse", c: h, rx: 7.5, ry: 7.5, rot: 0 },
    ];
  };
  const leg = (dx: number): Part[] => [
    { kind: "capsule", a: { x: x + dx * 0.3, y: hipY }, b: { x: x + dx, y: 850 }, w: 19 },
    { kind: "capsule", a: { x: x + dx, y: 852 }, b: { x: x + dx + face * 14, y: 855 }, w: 10 },
  ];
  silhouette(
    ctx,
    [
      ...arm(far, -1),
      ...leg(-5 - swing),
      ...leg(5 + swing),
      { kind: "capsule", a: { x: x + face * 2, y: 640 }, b: { x, y: hipY - 4 }, w: 50 },
      { kind: "capsule", a: { x: x + face * 4, y: 598 }, b: { x: x + face * 3, y: 622 }, w: 15 },
      { kind: "ellipse", c: { x: x + face * 6, y: 576 }, rx: 18, ry: 22, rot: 0 },
    ],
    hair,
  );
  silhouette(ctx, arm(near, 1), hair);
};

/** A bottle standing at (x, y) (its base), `fill` of it oil, with a label once `label` > 0. */
const bottle = (ctx: Ctx, x: number, y: number, fill: number, label: number, hair: number, tilt = 0) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  const body = () => {
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(-8, -38);
    ctx.quadraticCurveTo(-8, -46, -3, -48);
    ctx.lineTo(-3, -58);
    ctx.lineTo(3, -58);
    ctx.lineTo(3, -48);
    ctx.quadraticCurveTo(8, -46, 8, -38);
    ctx.lineTo(8, 0);
    ctx.closePath();
  };
  body();
  ctx.fillStyle = C.ivory;
  ctx.fill();
  if (fill > 0) {
    ctx.save();
    body();
    ctx.clip();
    ctx.fillStyle = C.gold;
    ctx.fillRect(-9, -50 * fill, 18, 50 * fill);
    ctx.restore();
  }
  if (label > 0) {
    ctx.globalAlpha *= label;
    ctx.fillStyle = C.travertine;
    ctx.fillRect(-8, -30, 16, 14);
    leaf(ctx, -1, -18, 0.5, 9, 3, false, hair);
    ctx.globalAlpha /= label;
  }
  body();
  ctx.strokeStyle = C.espresso;
  ctx.lineWidth = hair;
  ctx.stroke();
  ctx.fillStyle = C.espresso;
  ctx.fillRect(-3.5, -62, 7, 4);
  ctx.restore();
};

function drawReception(ctx: Ctx, t: number, hair: number) {
  const out = 1 - progress(t, "e1", "e2");
  if (out <= 0) return;
  ctx.globalAlpha = out;

  // The table.
  const table = sub(t, "h12", 0, 0.3);
  if (table > 0) {
    ctx.globalAlpha = out * table;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.fillStyle = C.travertine;
    ctx.fillRect(TABLE.left, TABLE.top, TABLE.right - TABLE.left, 10);
    ctx.strokeRect(TABLE.left, TABLE.top, TABLE.right - TABLE.left, 10);
    for (const x of [TABLE.left + 18, TABLE.right - 18]) {
      ctx.fillRect(x - 5, TABLE.top + 10, 10, GROUND - TABLE.top - 10);
      ctx.strokeRect(x - 5, TABLE.top + 10, 10, GROUND - TABLE.top - 10);
    }
    ctx.globalAlpha = out;
  }

  // Set out: a dish of the oil, bread and a sprig from the tree.
  const dish = sub(t, "h13", 0.35, 0.6);
  if (dish > 0) {
    ctx.globalAlpha = out * dish;
    ellipse(ctx, DISH.x, TABLE.top - 4, 24, 5, 0, C.travertine, C.espresso, hair);
    ellipse(ctx, DISH.x, TABLE.top - 6, 15, 2.6, 0, C.gold, null, 0);
    ctx.globalAlpha = out;
  }
  const bread = sub(t, "h13", 0.5, 0.75);
  if (bread > 0) {
    ctx.globalAlpha = out * bread;
    ellipse(ctx, BREAD.x, TABLE.top - 11, 22, 11, 0, C.travertine, C.espresso, hair);
    ctx.strokeStyle = C.espresso;
    for (const dx of [-8, 2, 12]) line(ctx, BREAD.x + dx - 3, TABLE.top - 17, BREAD.x + dx + 3, TABLE.top - 7);
    ctx.globalAlpha = out;
  }
  const sprig = sub(t, "h13", 0.65, 0.9);
  if (sprig > 0) {
    ctx.globalAlpha = out * sprig;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    line(ctx, -262, TABLE.top - 2, -222, TABLE.top - 6);
    leaf(ctx, -250, TABLE.top - 3, -1.1, 16, 4, false, hair);
    leaf(ctx, -238, TABLE.top - 5, 1.9, 15, 4, true, hair);
    leaf(ctx, -226, TABLE.top - 6, -0.9, 14, 4, false, hair);
    ellipse(ctx, -244, TABLE.top - 4, 3.2, 4, 0.4, C.olive, null, 0);
    ellipse(ctx, -232, TABLE.top - 4, 3.2, 4, -0.3, C.espresso, null, 0);
    ctx.globalAlpha = out;
  }

  // The people: A comes from the left, B from the right; C arrives later and takes a bottle home.
  const aIn = sub(t, "h14", 0, 0.85);
  const bIn = sub(t, "h14", 0.12, 0.97);
  const cIn = sub(t, "h16", 0, 0.42);
  const cOut = sub(t, "h17", 0.12, 0.9);
  const ax = -760 + (-440 + 760) * aIn;
  const bx = 250 + (-40 - 250) * bIn;
  const cx = cOut > 0 ? -575 - 520 * cOut : -820 + (-575 + 820) * cIn;
  // C fades over the last stretch of the walk home, with the bottle.
  const cAlpha = 1 - smooth(0.65, 1, cOut);
  const walking = (k: number) => Math.sin(Math.PI * Math.min(Math.max(k, 0), 1));

  // A lifts the first bottle to look at it (h15), hands it to C (h16), then takes another (h17).
  const aReach = sub(t, "h15", 0.08, 0.32);
  const aLift = sub(t, "h15", 0.36, 0.7);
  const aGive = sub(t, "h16", 0.42, 0.62);
  const aBack = sub(t, "h16", 0.7, 0.95);
  const aAgain = sub(t, "h17", 0.3, 0.6);
  const aAgainLift = sub(t, "h17", 0.62, 0.92);
  const look: Pt = { x: ax + 50, y: 612 };
  const handoff: Pt = { x: -505, y: 664 };
  let aHand: Pt | null = null;
  if (aBack > 0 && aAgain <= 0) aHand = aBack < 1 ? mix(handoff, { x: ax + 6, y: 756 }, aBack) : null;
  else if (aAgain > 0) aHand = aAgainLift > 0 ? mix({ x: BOTTLES[1], y: TABLE.top - 30 }, { x: ax + 44, y: 650 }, aAgainLift) : mix({ x: ax + 6, y: 756 }, { x: BOTTLES[1], y: TABLE.top - 30 }, aAgain);
  else if (aGive > 0) aHand = mix(look, handoff, aGive);
  else if (aLift > 0) aHand = mix({ x: BOTTLES[0], y: TABLE.top - 30 }, look, aLift);
  else if (aReach > 0) aHand = mix({ x: ax + 6, y: 756 }, { x: BOTTLES[0], y: TABLE.top - 30 }, aReach);

  // B tears some bread, dips it, tastes, and puts a hand to the chest.
  const bReach = sub(t, "h15", 0.05, 0.25);
  const bDip = sub(t, "h15", 0.28, 0.45);
  const bTaste = sub(t, "h15", 0.48, 0.68);
  const bChest = sub(t, "h15", 0.74, 0.92);
  const bDown = sub(t, "h17", 0.2, 0.5);
  const mouth: Pt = { x: bx - 26, y: 588 };
  const chest: Pt = { x: bx - 14, y: 650 };
  const bRest: Pt = { x: bx - 6, y: 756 };
  let bHand: Pt | null = null;
  if (bDown > 0) bHand = bDown < 1 ? mix(chest, bRest, bDown) : null;
  else if (bChest > 0) bHand = mix(mouth, chest, bChest);
  else if (bTaste > 0) bHand = mix({ x: DISH.x + 6, y: TABLE.top - 10 }, mouth, bTaste);
  else if (bDip > 0) bHand = mix({ x: BREAD.x - 12, y: TABLE.top - 18 }, { x: DISH.x + 6, y: TABLE.top - 10 }, bDip);
  else if (bReach > 0) bHand = mix(bRest, { x: BREAD.x - 12, y: TABLE.top - 18 }, bReach);
  const piece = bReach >= 1 && bTaste < 0.9 && bHand ? bHand : null;

  // C reaches for the bottle, takes it, and carries it at the hip.
  const cTake = sub(t, "h16", 0.5, 0.62);
  const cHold = sub(t, "h16", 0.66, 0.9);
  const cFace = cOut > 0 ? -1 : 1;
  const cHip: Pt = { x: cx + cFace * 16, y: 704 };
  let cHand: Pt | null = null;
  if (cOut > 0 || cHold >= 1) cHand = cHip;
  else if (cHold > 0) cHand = mix(handoff, cHip, cHold);
  else if (cTake > 0) cHand = mix({ x: cx + 8, y: 756 }, handoff, cTake);

  // Bottles: filled one by one at the table's end by the vessel, labelled, then set out. One goes
  // from A's hand to C's, and A takes another.
  const setOut = sub(t, "h13", 0.05, 0.4);
  const label = sub(t, "h12", 0.78, 0.95);
  const held: (() => void)[] = [];
  BOTTLES.forEach((home, k) => {
    const filled = sub(t, "h12", 0.25 + k * 0.17, 0.42 + k * 0.17);
    if (filled <= 0) return;
    const start = TABLE.right - 22 - k * 20;
    const hand = k === 0 && aLift > 0 ? (cTake >= 1 ? cHand : aHand) : k === 1 && aAgainLift > 0 ? aHand : null;
    if (hand) {
      const tilt = k === 0 && cTake < 1 ? -0.15 * (aLift - aGive) : 0;
      const alpha = k === 0 && cTake >= 1 ? cAlpha : 1;
      if (alpha <= 0) return;
      held.push(() => {
        ctx.globalAlpha = out * alpha;
        bottle(ctx, hand.x, hand.y + 30, filled, label, hair, tilt);
        ctx.globalAlpha = out;
      });
    } else {
      bottle(ctx, start + (home - start) * setOut, TABLE.top, filled, label, hair);
    }
  });

  if (aIn > 0) person(ctx, { x: ax, face: 1, walk: walking(aIn), near: aHand }, hair);
  if (bIn > 0) person(ctx, { x: bx, face: -1, walk: walking(bIn), near: bHand }, hair);
  if (cIn > 0 && cAlpha > 0) {
    ctx.globalAlpha = out * cAlpha;
    person(ctx, { x: cx, face: cFace, walk: Math.max(walking(cIn), walking(cOut)), near: cHand }, hair);
    ctx.globalAlpha = out;
  }
  // Held things are drawn over the hands.
  held.forEach((draw) => draw());
  if (piece) ellipse(ctx, piece.x, piece.y - 6, 7, 5, 0.3, C.travertine, C.espresso, hair);
  ctx.globalAlpha = 1;
}

// ---------- The grove ----------
type GroveTree = { x: number; y: number; s: number; spec: number; born: string; grown: string; row: number };
const GROVE: GroveTree[] = (() => {
  const out: GroveTree[] = [];
  const r = rng(13);
  // Front row, on the ground beside the planter.
  for (const k of [-3, -2, -1, 1, 2, 3]) out.push({ x: PX + k * 380 + (k > 0 ? 20 : -20), y: GROUND, s: 0.9, spec: (k + 3) % 5, born: "e3", grown: "e4", row: 0 });
  // Rows behind: smaller and higher up the hillside.
  const rows: [number, number, number, string, string][] = [
    [790, 0.72, 300, "e5", "e5"],
    [720, 0.56, 240, "e5", "e6"],
    [655, 0.44, 190, "e6", "e6"],
    [595, 0.34, 150, "e6", "e7"],
    [540, 0.26, 118, "e7", "e7"],
  ];
  rows.forEach(([y, s, gap, born, grown], ri) => {
    for (let x = PX - 2600 + (ri % 2) * gap * 0.5; x <= PX + 2600; x += gap) {
      out.push({ x: x + (r() - 0.5) * gap * 0.2, y, s, spec: Math.floor(r() * 5), born, grown, row: ri + 1 });
    }
  });
  return out;
})();
// Back to front, so nearer rows overlap farther ones.
const GROVE_BACK = GROVE.filter((tr) => tr.row > 0).sort((a, b) => a.y - b.y);
const GROVE_FRONT = GROVE.filter((tr) => tr.row === 0);

const groveGrowth = (t: number, tree: GroveTree) => {
  const born = beat(tree.born);
  const grown = beat(tree.grown);
  const appear = smooth(born.start, born.start + (born.end - born.start) * 0.5, t);
  const g = 0.75 * smooth(born.start, grown.end, t) + 0.15 * smooth(beat("e7").start, beat("e7").end, t);
  return { appear, g };
};

const HILL = (x: number) => 470 - Math.sin(x / 900) * 36 - Math.sin(x / 370) * 10;

type View = { x0: number; y0: number; x1: number; y1: number };

/**
 * Grove trees are drawn from cached bitmaps. A tree with hundreds of leaves costs thousands of
 * canvas calls, and the grove has about 150 of them, so drawing them leaf by leaf every frame took
 * 100–200ms (5–10fps). Every tree in a row shares its growth and size, and there are five tree
 * shapes, so a frame needs at most a few dozen distinct bitmaps: each is drawn once per growth
 * level (1/48 steps) and pixel size (19% steps), then stamped with drawImage.
 */
const SPRITE_LEVELS = 48;
/**
 * Time allowed for building bitmaps per frame (ms). Until a bitmap is built, the nearest one already
 * built (closest growth, then size) stands in, so a frame never stalls on building them all.
 */
const SPRITE_BUILD_MS = 3;
/** Pixel budget for cached bitmaps (about 48MB). */
const SPRITE_BUDGET = 12_000_000;
type Sprite = { canvas: HTMLCanvasElement | OffscreenCanvas; ax: number; ay: number; ppu: number; used: number; px: number };
const spriteCache = new Map<string, Sprite>();
let spriteFrame = 0;
let spriteBuildStart = 0;
/** Trees drawn this frame with a stand-in bitmap. */
let spriteStandIns = 0;
let spritePixels = 0;

/** Each shape's extent at full growth, relative to its base, in tree units. */
const SPEC_BOUNDS = GROVE_SPECS.map((spec) => {
  const posed = pose(spec, 1, 0, 0);
  let x0 = 0, x1 = 0, y0 = 0;
  for (const seg of posed) for (const p of [seg.a, seg.b, seg.c]) {
    x0 = Math.min(x0, p.x);
    x1 = Math.max(x1, p.x);
    y0 = Math.min(y0, p.y);
  }
  const m = 34; // leaves reach beyond the wood
  return { x0: x0 - m, x1: x1 + m, y0: y0 - m, y1: m * 0.5 };
});

function clearSprites() {
  spriteCache.clear();
  spritePixels = 0;
}

const makeCanvas = (w: number, h: number) => {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(w, h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
};

/** The bitmap for a shape at growth level `level` and density bucket `bucket`, built if allowed. */
function sprite(spec: number, level: number, bucket: number, hairPx: number, build: boolean): Sprite | null {
  const key = `${spec}|${level}|${bucket}`;
  const hit = spriteCache.get(key);
  if (hit) {
    hit.used = spriteFrame;
    return hit;
  }
  if (!build) return null;
  const b = SPEC_BOUNDS[spec];
  const ppu = Math.pow(2, bucket / 4); // device pixels per tree unit
  const w = Math.max(1, Math.ceil((b.x1 - b.x0) * ppu));
  const h = Math.max(1, Math.ceil((b.y1 - b.y0) * ppu));
  const canvas = makeCanvas(w, h);
  const sctx = canvas.getContext("2d") as Ctx | null;
  if (!sctx) return null;
  sctx.setTransform(ppu, 0, 0, ppu, -b.x0 * ppu, -b.y0 * ppu);
  sctx.lineJoin = "round";
  // Leaves under about 3px are thinned (see drawTree).
  const leafPx = 15 * ppu;
  const stride = leafPx < 3 ? 3 : leafPx < 6 ? 2 : 1;
  drawTree(sctx, GROVE_SPECS[spec], level / SPRITE_LEVELS, 0, 0, 1, hairPx / ppu, 0, false, stride);
  const made: Sprite = { canvas, ax: -b.x0, ay: -b.y0, ppu, used: spriteFrame, px: w * h };
  spriteCache.set(key, made);
  spritePixels += made.px;
  return made;
}

/** The nearest bitmap already built for this shape (closest growth, then closest density), or null. */
function nearestSprite(spec: number, level: number, bucket: number): Sprite | null {
  for (let d = 0; d <= SPRITE_LEVELS; d++) {
    for (const b of [bucket, bucket + 1, bucket - 1, bucket + 2, bucket - 2]) {
      for (const l of d === 0 ? [level] : [level - d, level + d]) {
        const hit = spriteCache.get(`${spec}|${l}|${b}`);
        if (hit) {
          hit.used = spriteFrame;
          return hit;
        }
      }
    }
  }
  return null;
}

/** Drops the least recently used bitmaps once over budget. */
function trimSprites() {
  if (spritePixels <= SPRITE_BUDGET) return;
  const entries = [...spriteCache.entries()].sort((a, b) => a[1].used - b[1].used);
  for (const [key, sp] of entries) {
    if (spritePixels <= SPRITE_BUDGET * 0.75 || sp.used === spriteFrame) break;
    spriteCache.delete(key);
    spritePixels -= sp.px;
  }
}

function drawGroveBack(ctx: Ctx, t: number, hair: number, scale: number, dpr: number, view: View) {
  spriteFrame++;
  spriteBuildStart = performance.now();
  const field = progress(t, "e5", "e6");
  if (field > 0) {
    // Only the visible stretch of hillside (plus a margin).
    const xa = Math.floor((view.x0 - 160) / 80) * 80;
    const xb = view.x1 + 160;
    ctx.globalAlpha = field;
    ctx.fillStyle = C.travertine;
    ctx.beginPath();
    ctx.moveTo(xa, GROUND);
    for (let x = xa; x <= xb; x += 80) ctx.lineTo(x, HILL(x));
    ctx.lineTo(xb, GROUND);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = hair;
    ctx.beginPath();
    for (let x = xa; x <= xb; x += 80) ctx.lineTo(x, HILL(x));
    ctx.stroke();
    // Furrows along the rows.
    ctx.strokeStyle = C.gold;
    for (const y of [540, 595, 655, 720, 790]) line(ctx, xa, y + 4, xb, y + 4, 1);
    ctx.globalAlpha = 1;
  }
  for (const tr of GROVE_BACK) drawGroveTree(ctx, t, tr, hair, scale, dpr, view);
}

function drawGroveFront(ctx: Ctx, t: number, hair: number, scale: number, dpr: number, view: View) {
  for (const tr of GROVE_FRONT) drawGroveTree(ctx, t, tr, hair, scale, dpr, view);
  trimSprites();
}

function drawGroveTree(ctx: Ctx, t: number, tr: GroveTree, hair: number, scale: number, dpr: number, view: View) {
  const bounds = SPEC_BOUNDS[tr.spec];
  // Off screen: skip.
  if (tr.x + bounds.x1 * tr.s < view.x0 || tr.x + bounds.x0 * tr.s > view.x1 || tr.y + bounds.y0 * tr.s > view.y1 || tr.y + bounds.y1 * tr.s < view.y0) return;
  const { appear, g } = groveGrowth(t, tr);
  if (appear <= 0) return;
  ctx.globalAlpha = appear;
  const heightPx = trunkHeight(g) * tr.s * scale * 1.5;
  if (heightPx < 18) {
    // Far away: a trunk and a canopy mass.
    const h = trunkHeight(g) * tr.s;
    ctx.strokeStyle = C.espresso;
    ctx.lineWidth = Math.max(hair, 3 * tr.s * g);
    line(ctx, tr.x, tr.y, tr.x, tr.y - h * 0.6);
    ellipse(ctx, tr.x, tr.y - h * 0.75, 120 * tr.s * (0.3 + g), 70 * tr.s * (0.3 + g), 0, C.olive, null, 0);
  } else {
    // Device pixels per tree unit, rounded up to the next 19% step so bitmaps are only ever reduced.
    const ppu = scale * dpr * tr.s;
    const bucket = Math.ceil(Math.log2(ppu) * 4);
    const level = Math.round(Math.min(Math.max(g, 0), 1) * SPRITE_LEVELS);
    const hairPx = hair * scale * dpr;
    let sp = sprite(tr.spec, level, bucket, hairPx, performance.now() - spriteBuildStart < SPRITE_BUILD_MS);
    if (!sp) {
      sp = nearestSprite(tr.spec, level, bucket);
      if (sp) spriteStandIns++;
      else sp = sprite(tr.spec, level, bucket, hairPx, true);
    }
    if (sp) {
      const k = tr.s / sp.ppu; // bitmap pixels to world units
      ctx.drawImage(sp.canvas, tr.x - sp.ax * tr.s, tr.y - sp.ay * tr.s, sp.canvas.width * k, sp.canvas.height * k);
    }
  }
  ctx.globalAlpha = 1;
}
