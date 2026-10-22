"""Prepare the full eight-stage CALIX olive story from the storyboard frames.

Outputs (in <out_dir>):
  stage-01-plaza.jpg     f1   laptop-lid logo retouched out
  stage-02-hand.jpg      f2b  mirrored (screen direction matches 1 and 3), bezel lettering removed;
                              the pit rests in her palm (no emergence from the laptop)
  stage-03-planting.jpg  f3
  stage-04-soil.jpg      f4   clean plate: sprout and the stray seedlings behind it removed,
                              laptop-lid logo retouched out
  stage-04-sprout.png    f4   the sprout, cut out at its original position (offset in meta)
  stage-05-tending.jpg   f5   laptop-lid logo retouched out
  stage-06-fruit.jpg     f6
  stage-07-harvest.jpg   f7b
  stage-08-terrace.jpg   f8   high oblique (crane)
  stage-08-grove.jpg     f8b  overhead
Every image is partially graded toward the set's shared colour statistics (Lab mean and spread),
so the cuts read as one shoot. Debug crops go to <debug_dir>.

Usage: python3 scripts/prepare_story_assets.py <frames_dir> assets/story <debug_dir>
The storyboard frames are not in the repository (docs/olive-story.md §3).
Requires opencv-python-headless and numpy.
"""
import json
import math
import sys
from pathlib import Path

import cv2
import numpy as np

frames, out, dbg = (Path(p) for p in sys.argv[1:4])
out.mkdir(parents=True, exist_ok=True)
dbg.mkdir(parents=True, exist_ok=True)


def read(name):
    return cv2.imread(str(frames / f"{name}.jpg"))


def box_mask(gray, box, test):
    x0, y0, x1, y1 = box
    m = np.zeros(gray.shape, np.uint8)
    m[y0:y1, x0:x1] = test(gray[y0:y1, x0:x1]).astype(np.uint8) * 255
    return m


def lid_logo(img, box, delta, grow=7):
    """Removes a mark on a flat laptop lid: pixels in box that differ from the lid's median."""
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.int16)
    x0, y0, x1, y1 = box
    med = np.median(g[y0:y1, x0:x1])
    m = box_mask(g, box, lambda r: np.abs(r - med) > delta)
    m = cv2.dilate(m, np.ones((grow, grow), np.uint8))
    return cv2.inpaint(img, m, 4, cv2.INPAINT_TELEA), m


meta = {}
images = {}

# ---------- 1: plaza ----------
f1 = read("f1")
g1 = cv2.cvtColor(f1, cv2.COLOR_BGR2GRAY)
logo_box = (1879, 934, 1901, 980)
lid = np.median(g1[logo_box[1]:logo_box[3], logo_box[0]:logo_box[2]])
m1 = cv2.dilate(box_mask(g1, logo_box, lambda r: r < lid - 6), np.ones((7, 7), np.uint8))
yy, xx = np.mgrid[0:g1.shape[0], 0:g1.shape[1]]
m1[xx < 1844 + 0.406 * (yy - 880)] = 0  # stay inside the slanted lid edge
images["stage-01-plaza"] = cv2.inpaint(f1, m1, 4, cv2.INPAINT_TELEA)

# ---------- 2: hand (mirrored, pit kept in the palm) ----------
f2 = cv2.flip(read("f2b"), 1)
g2 = cv2.cvtColor(f2, cv2.COLOR_BGR2GRAY)
band = np.array([(970, 1076), (1026, 1048), (1030, 1064), (974, 1093)], np.int32)
mt = np.zeros(g2.shape, np.uint8)
cv2.fillPoly(mt, [band], 255)
mt &= ((g2 < 100) * 255).astype(np.uint8)
images["stage-02-hand"] = cv2.inpaint(f2, mt, 3, cv2.INPAINT_TELEA)

# ---------- 3: planting ----------
images["stage-03-planting"] = read("f3")

# ---------- 4: soil plate + sprout ----------
f4 = read("f4")
H4, W4 = f4.shape[:2]
leaves = [((1327, 982), (1385, 1095), 22), ((1447, 975), (1392, 1100), 22), ((1300, 1052), (1385, 1135), 24),
          ((1465, 1055), (1400, 1132), 20), ((1330, 1145), (1387, 1190), 16), ((1432, 1145), (1400, 1185), 22)]
hint = np.zeros((H4, W4), np.uint8)
for a, b, w in leaves:
    cx, cy = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    length = math.hypot(b[0] - a[0], b[1] - a[1])
    cv2.ellipse(hint, ((cx, cy), (length, w), math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))), 255, -1)
cv2.line(hint, (1390, 1205), (1390, 1095), 255, 8)
sx0, sy0, sx1, sy1 = 1240, 940, 1500, 1215
roi = f4[sy0:sy1, sx0:sx1]
h = hint[sy0:sy1, sx0:sx1]
gc = np.full(h.shape, cv2.GC_BGD, np.uint8)
gc[cv2.dilate(h, np.ones((9, 9), np.uint8)) > 0] = cv2.GC_PR_BGD
gc[h > 0] = cv2.GC_PR_FGD
gc[cv2.erode(h, np.ones((7, 7), np.uint8)) > 0] = cv2.GC_FGD
cv2.grabCut(roi, gc, None, np.zeros((1, 65)), np.zeros((1, 65)), 5, cv2.GC_INIT_WITH_MASK)
sm = np.where((gc == 1) | (gc == 3), 255, 0).astype(np.uint8)
sm = cv2.morphologyEx(sm, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8)) & cv2.dilate(h, np.ones((5, 5), np.uint8))
sprout_mask = np.zeros((H4, W4), np.uint8)
sprout_mask[sy0:sy1, sx0:sx1] = sm

hole = cv2.dilate(sprout_mask, np.ones((13, 13), np.uint8))
upper = np.zeros_like(hole)
cv2.rectangle(upper, (1228, 868), (1404, 1012), 255, -1)  # stray seedlings, out of focus
upper |= hole * (np.arange(H4)[:, None] < 1012).astype(np.uint8)
plate = f4.astype(np.float32)
fill = plate.copy()
for y in np.where(upper.any(1))[0]:  # the blurred background is horizontal bands: interpolate rows
    xs = np.where(upper[y] > 0)[0]
    a, b = xs.min() - 3, xs.max() + 3
    t = np.linspace(0, 1, b - a)[:, None]
    fill[y, a:b] = plate[y, a - 6:a].mean(0) * (1 - t) + plate[y, b:b + 6].mean(0) * t
fill = cv2.GaussianBlur(fill, (0, 0), 4) + np.random.default_rng(3).normal(0, 3.0, (H4, W4))[..., None]
a = np.clip(cv2.GaussianBlur(upper.astype(np.float32) / 255, (0, 0), 3) * 1.4, 0, 1)[..., None]
plate = plate * (1 - a) + fill * a
lower = hole * (np.arange(H4)[:, None] >= 995).astype(np.uint8)
src = np.roll(f4.astype(np.float32), (0, -230), axis=(0, 1))  # soil 230px to the right
ring = cv2.dilate(lower, np.ones((25, 25), np.uint8)) - lower
soil = src + (plate[ring > 0].mean(0) - src[ring > 0].mean(0))
b = np.clip(cv2.GaussianBlur(lower.astype(np.float32) / 255, (0, 0), 3) * 1.5, 0, 1)[..., None]
plate = np.clip(plate * (1 - b) + soil * b, 0, 255).astype(np.uint8)
plate, _ = lid_logo(plate, (2268, 488, 2312, 542), 10)
images["stage-04-soil"] = plate
sprout_rgba = (f4, sprout_mask)

# ---------- 5: tending ----------
images["stage-05-tending"], _ = lid_logo(read("f5"), (1786, 730, 1832, 780), 5, grow=5)

# ---------- 6, 7, 8 ----------
images["stage-06-fruit"] = read("f6")
images["stage-07-harvest"] = read("f7b")
images["stage-08-terrace"] = read("f8")
images["stage-08-grove"] = read("f8b")

# ---------- Shared grade: move each image 50% toward the set's median Lab mean and spread ----------
labs = {k: cv2.cvtColor(v, cv2.COLOR_BGR2LAB).astype(np.float32) for k, v in images.items()}
means = np.array([l.reshape(-1, 3).mean(0) for l in labs.values()])
stds = np.array([l.reshape(-1, 3).std(0) for l in labs.values()])
t_mean, t_std = np.median(means, 0), np.median(stds, 0)
STRENGTH = 0.5
graded = {}
for (k, lab), mu, sd in zip(labs.items(), means, stds):
    goal_mu = mu + (t_mean - mu) * STRENGTH
    goal_sd = sd + (t_std - sd) * STRENGTH
    res = (lab - mu) * (goal_sd / sd) + goal_mu
    graded[k] = cv2.cvtColor(np.clip(res, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
    meta[k] = {"mean_before": mu.round(1).tolist(), "mean_after": goal_mu.round(1).tolist()}

for k, img in graded.items():
    cv2.imwrite(str(out / f"{k}.jpg"), img, [cv2.IMWRITE_JPEG_QUALITY, 88])

# Sprout layer: graded with stage 4's transform, cropped with padding, offset recorded.
lab4 = labs["stage-04-soil"]
mu4, sd4 = means[list(labs).index("stage-04-soil")], stds[list(labs).index("stage-04-soil")]
f4lab = cv2.cvtColor(sprout_rgba[0], cv2.COLOR_BGR2LAB).astype(np.float32)
goal_mu = mu4 + (t_mean - mu4) * STRENGTH
goal_sd = sd4 + (t_std - sd4) * STRENGTH
f4g = cv2.cvtColor(np.clip((f4lab - mu4) * (goal_sd / sd4) + goal_mu, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
ys, xs = np.where(sprout_rgba[1] > 0)
pad = 6
cx0, cy0, cx1, cy1 = xs.min() - pad, ys.min() - pad, xs.max() + pad + 1, ys.max() + pad + 1
rgba = np.zeros((cy1 - cy0, cx1 - cx0, 4), np.uint8)
rgba[..., :3] = f4g[cy0:cy1, cx0:cx1]
rgba[..., 3] = cv2.GaussianBlur(sprout_rgba[1], (0, 0), 0.8)[cy0:cy1, cx0:cx1]
cv2.imwrite(str(out / "stage-04-sprout.png"), rgba)
meta["sprout"] = {
    "box_px": [int(cx0), int(cy0), int(cx1), int(cy1)],
    "left_pct": round(cx0 / W4 * 100, 3),
    "top_pct": round(cy0 / H4 * 100, 3),
    "width_pct": round((cx1 - cx0) / W4 * 100, 3),
    "base_px": [1390, 1205],
}

# Debug: before/after contact sheet of every stage.
thumbs = []
for k in graded:
    src_img = images[k]
    a = cv2.resize(src_img, (550, 307))
    b = cv2.resize(graded[k], (550, 307))
    row = np.hstack([a, np.full((307, 8, 3), 255, np.uint8), b])
    cv2.putText(row, k, (8, 22), 0, 0.6, (255, 255, 255), 2)
    thumbs.append(row)
cv2.imwrite(str(dbg / "grade.jpg"), np.vstack(thumbs), [cv2.IMWRITE_JPEG_QUALITY, 80])
print(json.dumps(meta, indent=1))
