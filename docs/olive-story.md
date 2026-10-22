# The olive story: "From one seed to an entire ecosystem"

**Status:** Eight-chapter, scroll-driven story on the home page, between the hero and the services sequence (S1). **Preview builds only** (§7): the photographs are generated and show a person.
**Last updated:** 2026-10-17
**Code:** `components/home/story/`:
- `beats.ts`: the 82-beat timeline.
- `plate.ts`: the section drawing.
- `film.ts`: the photograph window.
- `StoryPlayer.tsx`: layout, scroll follow and layer updates.
- `Story.tsx`: markup and the static fallback.
- `stages.ts`: chapter words and photographs.
- `StorySlot.tsx` / `StorySlot.off.tsx`: the preview gate.

Also `app/components.css` (the olive story block), `lib/motion.ts` (`STORY_MOTION_QUERY`) and `next.config.ts`.
**Assets:** `assets/story/` holds nine graded photographs and `stage-04-sprout.png`, made by `scripts/prepare_story_assets.py`.

> **Policy gate.** `docs/imagery-direction.md` §5 does not allow generated images of people on the public site without a recorded decision. Public builds leave the section out entirely: no markup, no images and no player code in the output (only the section's CSS rules, which match nothing). Before it can ship, CALIX records that decision or replaces the photographs with commissioned photography.

---

## 1. History

1. **2.5D WebGL version** (depth maps, perspective camera): built, then removed on request.
2. **2D photo film** (nine photographs with camera moves and bridges): built next. It showed only nine moments: zooms and pans on the same photograph aren't new states, so most of the story's actions were never shown.
3. **This version** keeps the photographs as a reference and shows every action in a drawing.

## 2. Asset audit: what the photographs show

Each of the nine photographs is one still moment. Everything between them is missing from the photography.

| Chapter | The photograph shows | Not in any photograph |
|---|---|---|
| 1. The idea | Founder at a laptop in a plaza | Considering the idea, notes, a plan |
| 2. The seed | A pit in an open palm | Reaching for the pit, picking it up, holding it |
| 3. Planting | Founder pressing into the soil of a planter | Preparing the soil, forming the hole, placing the pit, covering it, pressing it |
| 4. Germination | A sprout in soil | Swelling, roots, the shoot emerging, the stem rising, leaves opening |
| 5. Cultivation | Founder working beside a sapling | Any of the seven disciplines as an action |
| 6. Growth | A young tree in a planter | Intermediate stages, new branches, new leaves |
| 7. Harvest | People with baskets beside olive trees | Fruit setting and ripening, picking, collecting, pressing, the result |
| 8. Ecosystem | Terrace with planters; the grove from above | The step back from one tree, new trees, rows spreading |

The photographs are also separate generated images: the architecture, the planter, the table and the founder's face differ between them. They can't be cut into consistent intermediate frames. Generating new frames from text alone (no reference images) can't hold the same person, hands or set either.

## 3. How the missing actions are shown

### A continuous section drawing

`plate.ts` draws one world in Canvas 2D, in the five CALIX colours only:
- a planter in cross-section (soil above, roots below);
- a paving line, a wall, the sun;
- later, the basket, the press and the grove.

Every action is drawn as it happens, from one continuous state. Nothing is a photograph with a different crop.

- **Hands:** an Ivory silhouette with an Espresso outline (palm, forearm, finger and thumb). They pinch, point and level.
- **Soil:** a surface profile that is rough, levelled or raked. It then gets a fingertip dent, a hole, a fill, a pressed dent and, finally, a crack where the shoot breaks through.
- **The plant:** a deterministic procedural olive tree, grown by one parameter.
  1. The pit swells, splits and roots.
  2. A hooked shoot breaks through, straightens and opens cotyledons, then its first true leaves.
  3. Branches, trunk thickening, leaves and canopy follow, then buds and flowers.
  4. Fruit sets, swells and ripens from Olive to Espresso.
- **Cultivation without service cards:** each discipline is an object acting on the plant, with a small label:
  - stake: strategy;
  - name tag with a mark: brand identity;
  - drainage base: website;
  - sun rays: found in search (SEO);
  - light reflected from the wall: cited in AI answers (GEO);
  - watering can: content;
  - breeze: digital marketing.
- **Harvest:**
  1. A hand picks five olives one by one into a basket; the camera follows the first one in close-up.
  2. The rest are brought down onto a net and gathered.
  3. They're pressed, and a vessel fills with oil.
- **Reception** (the end of the Harvest chapter, before the grove expands):
  1. The oil is bottled and labelled at the end of a table, then set out with a dish of oil, bread and a sprig from the tree.
  2. Two people walk up to the table. One tears some bread, dips it, tastes it and puts a hand to their chest; the other lifts a bottle to look at it.
  3. A third person arrives and the bottle is passed across. They carry it home while the first reaches for another.

  The people are Ivory silhouettes in the same style as the hands, with no faces or detail, so no one in particular. There are no quotes, figures or endorsements.
- **Ecosystem:** the camera steps back. Six new trees grow along the front row, then five rows rise up a hillside. The final beat hands over to the aerial grove photograph, which opens out to fill the stage.
- **The final reveal:**
  1. As the aerial photograph opens over the stage, the last caption's Ivory panel fades out, so no white block sits over it.
  2. The photograph fills the stage by 60% of the last beat.
  3. A solid Espresso band then rises from the bottom edge: the brand's way of putting text on a photograph, with no gradients or tints.
  4. The caption returns on the band as Ivory text, cut to its label, title and current step.
  5. Scrolling back reverses it.
- **Camera:** a 2D framing per beat (centre and span), interpolated. It frames the action and never reveals or replaces the content.

### The 82 beats

Each beat is a distinct state with its own label. The label is shown as the "now" line in the caption and listed under each chapter in the static layout.

| Chapter | Beats |
|---|---|
| 1. The idea (10) | founder at the desk · clean page · first line · planter sketched · seed mark · outline of what it could become · note: what it stands for · note: who it's for · note: how people will find it · the plan becomes ground |
| 2. The seed (6) | pit on the planter's edge · hand reaches · fingers open · close · lift · hold |
| 3. Planting (12) | rough soil · levelled · raked · fingertip presses · hole forms · hole ready · pit brought over · released · soil falls back · covered · pressed · planted |
| 4. Germination (11) | days pass · pit swells · shell splits · first root · more roots · shoot climbs · surface cracks · breaks through · stem straightens · seed leaves · true leaves |
| 5. Cultivation (9) | stake: strategy · tied in · name tag: brand identity · base: website · light: SEO · reflected light: GEO · watering: content · breeze: digital marketing · tended together, it grows |
| 6. Growth (9) | first branch · second · trunk thickens · new leaves · canopy · roots spread · taller · buds · flowers |
| 7. Harvest (17) | fruit sets · olives swell · ripening · ripe · hand reaches · picked into the basket · one after another · net · gathered · pressed · oil vessel · bottled and labelled · set out on the table · people gather round · a first taste · passed from hand to hand · valued, and carried home |
| 8. Ecosystem (8) | mature tree · stepping back · new trees planted · they grow · rows · hillside · the grove · from above (photograph) |

Each beat's action fills the middle 80% of its scroll span, so every beat starts and ends on a still state you can read.

### The photographs: a reference window

The chapter's photograph sits in a window beside the drawing (landscape) or above it (portrait). Through the chapter it moves slowly between two framings, and it crossfades to the next chapter's photograph. These framings are **not** counted as story states.

### The stage and scrolling

- **Pinned stage:** `.story__stage` is `position: sticky` inside a tall `.story__track`, so one viewport holds the whole story. When the track ends, the stage scrolls away into the services section.
- **One timeline of 28.55 units:**
  - read directly from scroll position, with no triggers, snapping or scroll interception;
  - one unit is 64svh of scrolling on phones, 70svh from 768px and 72svh from 1200px;
  - about 20 viewports on desktop and 18 on a phone; an average beat is about 225px (desktop) or 190px (phone).
- **Follow:** the picture follows scroll position with 90ms of smoothing. It renders only while it's catching up, and not while off screen.
- **Layout:**
  - Landscape (≥820px wide): the drawing is on the left; the photo window and the caption are in a right column.
  - Portrait: photo window, then the drawing, then the caption.
  - Phones and portrait tablets drop the chapter's longer text (disciplines, CMS/CRM definitions) from the panel. It stays in the page for assistive technology and in the static layout.
- **Captions:** real HTML. They fade out, then in, between chapters; the "now" line names the current beat. A gold progress rule has chapter ticks.
- **Access:**
  - "Skip to our services" jumps straight to `#services` and moves focus there.
  - The header's "Start a Project" stays above the stage.

### Performance

The grove (chapter 8) has about 150 trees with hundreds of leaves each. Drawing them leaf by leaf every frame cost up to 222,000 canvas calls and 200ms per frame (about 11fps). These measures keep it at the cost of the other chapters:

- **Cached tree bitmaps** (`plate.ts`): every tree in a grove row shares its growth and size, and there are five tree shapes, so each (shape, growth level in 1/48 steps, pixel size in 19% steps) is drawn once into an offscreen bitmap and stamped with `drawImage`.
  - Building bitmaps is capped at 3ms per frame. Meanwhile the nearest bitmap already built stands in, and the player redraws until no stand-ins remain.
  - The least recently used bitmaps are dropped beyond about 48MB, and the cache is cleared when the reader goes back before chapter 8.
  - Far rows thin their leaves (fewer, slightly larger) where single leaves would be under 3px.
- **Culling:** trees and hillside outside the view aren't drawn. The rows are sorted once, not every frame.
- **Static end:** the drawing doesn't change after e7, so it is drawn once there. It isn't drawn at all once the aerial photograph covers it.
- **Canvas size:** the canvas covers only the drawing's area, not the whole stage.
- **The aerial photograph:**
  - It is laid out once at its full-stage size and opened by transform only, so the image isn't re-rasterized or re-decoded at each size.
  - It starts loading two chapters ahead.
  - If it arrives after it's needed, it fades in over the held terrace photograph instead of cutting in.

### Fallbacks

| Condition | Result |
|---|---|
| `prefers-reduced-motion: reduce` | Eight static stages, each with its photograph, full caption and a list of its steps |
| JavaScript disabled | Same |
| Viewport shorter than 480px | Same |

## 4. Limitations, and what imagery is still needed

1. **The steps are illustrated, not photographed.** The drawing shows each action clearly and continuously, but it's a line-and-fill illustration beside photographs, not a photographic film. The two registers are deliberate: the drawing carries the action and the photographs carry the setting. They don't match frame for frame.
2. **The photographs remain nine separate generated images,** with the inconsistencies described in §2.
3. **Hands are simple silhouettes** with minimal detail, so they don't imply a specific person.

For a photographic version of every step, the following would need to be produced (none of it can be faithfully generated from what's here):

- **One continuous shoot on one set**, with one founder (with a model release), for the idea chapter and the cultivation chapter.
- **Scrubbable hand plates:** a locked-off shoot (or high-frame-rate video) of a hand reaching for, picking up and holding a pit. Then the soil levelled, raked, opened, the pit placed, covered and pressed.
- **A germination time-lapse:** a real olive seedling from first crack to true leaves, from a fixed camera. A cut-away planter would show the roots.
- **A growth series:** the same tree at intervals, or matched shots of trees at successive ages from one viewpoint.
- **Harvest plates:** fruit ripening on one branch (time-lapse); hand-picking into a basket; netting; gathering; pressing; oil.
- **A drone rise:** one continuous move from a single tree up to the grove.

## 5. Running it locally

```bash
npm ci

# Development server: the story is included by default (STORY_PREVIEW=false hides it)
npm run dev                  # http://localhost:3000

# Production-like preview (written to .next-preview, never to .next)
npm run build:preview        # STORY_PREVIEW=true NOINDEX=true next build
npm run start:preview        # STORY_PREVIEW=true NOINDEX=true next start

# Checks
npm run validate             # lint, typecheck (every story file), check:story
npm run verify:builds        # public build (no story, indexable) and preview build (story, noindex)
```

| Command | `STORY_PREVIEW` | `NOINDEX` | Result |
|---|---|---|---|
| `next dev` | unset or `true` | any | Included |
| `next dev` | `false` | any | Left out |
| `next build` / `next start` | unset | any | **Left out**: `@/components/home/story/StorySlot` resolves to `StorySlot.off.tsx`. Output in `.next` |
| `next build` / `next start` | `true` | not `true` | **Refused** with an explanation |
| `next build` / `next start` | `true` | `true` | Preview: included, every page `noindex, nofollow`, `robots.txt` disallows everything. Output in **`.next-preview`** |

Why preview output has its own folder: the pages are prerendered, so a build's story and noindex settings are fixed in its output. Before this, a preview build replaced `.next`, and a plain `next start` (the production process) would then have served the story with noindex on every page.

**Changing the story:**
- To add or retime a beat, edit `beats.ts`, then draw its state in `plate.ts` using `progress(t, id)` or `through(t, …)`.
- Durations are in timeline units. The section's length follows `TOTAL` automatically.

## 6. Building, checking and deploying safely

### What protects the story code

Public builds swap the story for an empty stand-in, so a passing public build says nothing about the story. These checks cover it:

- **`npm run typecheck`:** type-checks every `.ts`/`.tsx` file in the repository, story files included, whatever the build aliases. A stale file that imports exports which no longer exist fails here.
- **`npm run check:story`** (`scripts/check-story.mjs`):
  - `config`: loads `next.config.ts` for each phase and combination of `STORY_PREVIEW` and `NOINDEX`. It checks that public builds leave the story out, that preview builds include it and write to `.next-preview`, and that `STORY_PREVIEW=true` without `NOINDEX=true` is refused by both `next build` and `next start`.
  - `sources`: checks that every story file is in the TypeScript program, and that `app/page.tsx` → `StorySlot` → `Story` → `StoryPlayer` is still wired, with `StorySlot.off.tsx` as the empty stand-in.
  - `output DIR on|off`: checks a finished build's prerendered home page for the story and noindex. A public build must have neither, and no story images.
- **CI** (`.github/workflows/validate.yml`): runs `npm run validate` and `npm run verify:builds` on every push and pull request.

### Story files: what belongs here

The current story is the 2D player: `Story.tsx`, `StoryPlayer.tsx`, `beats.ts`, `plate.ts`, `film.ts`, `stages.ts`, `StorySlot.tsx` and `StorySlot.off.tsx`.

**`StoryFilm.tsx` is not part of it.** It was the WebGL renderer of the 2.5D version and was deleted on purpose in commit 3eed894, together with its depth maps, its seedling atlas and the WebGL parts of `film.ts`. Restoring it on its own fails type-checking (19 errors: missing `BRIDGE`, `SHOTS`, `SPROUT_ATLAS` and others). Reviving it would mean reverting `film.ts`, `Story.tsx` and the assets to that version, which removes the current story.

To restore a story file, take it from the same commit as the rest of the story, then run `npm run validate`:

```bash
git log --oneline -- components/home/story/            # find the commit
git restore --source=<commit> -- components/home/story/<file>
npm run validate
```

### Deploying the public site (PM2)

Production runs `next start` from `.next`, with neither story variable set. Build in the deployment directory only once everything else passes:

```bash
pm2 show calix-web                     # note "exec cwd" (the deployment directory) and the script
pm2 env 0 | grep -E 'STORY_PREVIEW|NOINDEX'   # use calix-web's id; expect no output
cd <deployment directory>
git status --short                     # expect no unexpected changes
npm ci
npm run validate                       # stop here if anything fails: the running site is untouched
cp -a .next ../next-backup-$(date +%Y%m%d%H%M)   # rollback copy of the live build
env -u STORY_PREVIEW -u NOINDEX npm run build
node scripts/check-story.mjs output .next off    # no story, indexable
pm2 restart calix-web                  # keeps the process's own environment
curl -s https://<production-host>/ | grep -c data-story-root      # expect 0
curl -s https://<production-host>/ | grep -c 'content="noindex'   # expect 0
```

**Rollback:** `rm -rf .next && cp -a ../next-backup-<stamp> .next && pm2 restart calix-web`.

Note that `next build` replaces `.next` while the old process is still serving from it. Restart straight after a successful build.

### Reviewing the preview

1. Run `npm run build:preview` and `npm run start:preview` on a separate port or host. Never point the public domain at it.
2. Put the preview behind the host's protection, for example basic auth in the reverse proxy. Even with noindex, the imagery isn't cleared for public viewing.
3. Before promoting anything, confirm the production build had neither variable set: run `node scripts/check-story.mjs output .next off`, and check that `curl -s https://<production-host>/ | grep -c data-story-root` returns 0.
4. To make the story public, record the imagery decision required by `docs/imagery-direction.md` §5 (or replace the photographs), then remove the gate in a separate change.

## 7. Validation (2026-10-17)

Run against the preview build (`STORY_PREVIEW=true NOINDEX=true`, `next start`) in headless Chromium through Playwright.

| Check | Result |
|---|---|
| `npm run typecheck`, `npm run lint`, `npm run build` (preview and public) | Pass |
| Every beat captured at 1440×900 and 390×844, plus a sample at 768×1024 | Each beat shows its action; no labels clipped; no console errors |
| Stage pinned (3%, 50%, 97% of the story) | Top edge fixed under the header: 80px desktop, 64px phone |
| After the end | The stage scrolls away and the services section follows |
| One mouse-wheel notch (100px) | 0.15 units, about half an average beat |
| Trackpad-style burst (20 × 4px) | 0.12 units |
| Ten rapid wheel notches | 1.5 units (5 beats) |
| Touch drag on a phone | 120px: 0.6 of a beat; 250px: 1.3 beats (including momentum) |
| Reload mid-story | The caption and drawing match the restored position |
| Reduced motion (desktop and phone), JavaScript off, 900×440 viewport | Static stages with step lists; no canvas; no horizontal overflow |
| Header "Start a Project" mid-story | On top and clickable |
| "Skip to our services" | Lands on `#services` with focus inside it |
| Palette checker | Source clean; built CSS shows only the 8 known Tailwind preflight findings |
| Public build | No story images, player code or markup |
| Chapter 8 continuous scroll (e1→e8), headless Chromium | Before: 11.6fps desktop, 7.9 tablet, 11.3 phone, 42–55 long tasks (up to 383ms). After: 59.5fps desktop, 53.3 tablet, 58.3 phone, no long tasks |
| Chapters 1–7 after the chapter 8 changes | Pixel-identical at 1440, 768 and 390 (210 of 210 captures) |
| Reception scene, slow scroll from h10 to e3 at 1440, 768 and 390 | Steps in order (pressed → bottled → set out → people gather → taste → passed on → carried home → the tree, mature → stepping back); 60fps, no long tasks |
| Final reveal, e8 sampled every 5% at 1440, 768 and 390 | Ivory share of the stage falls to 0–1% by 55% and stays there; the band rises only after the photograph fills the stage; no panel left over it |
