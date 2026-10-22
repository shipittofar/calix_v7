# CALIX — Scroll Narrative

**Phase:** 4 — Scroll storytelling
**Status:** S1 and S3 **implemented** in Phase 6B (see §9). S2 is not built: it is blocked on gate G1 (no approved project imagery).
**Last updated:** 2026-10-09
**Applies to:** Home page (`/`). Other pages use only the ambient plate behaviour (S3) and no sequences.

**Inputs read:**
- `docs/art-direction.md`, `docs/design-system.md`, `docs/information-architecture.md`, `docs/conversion-strategy.md`, `docs/portfolio-inventory.md`
- Skills: `scroll-storytelling` (installed version; no project copy exists at `.claude/skills/`), `accessibility-audit`, `web-performance`, `frontend-design`
- `docs/scroll-narrative.md` did not exist before this phase.

**Portfolio status:** No approved projects (`docs/portfolio-inventory.md`). The PROOF beat and interaction S2 are therefore **conditional on gate G1** (`docs/information-architecture.md` §2.2). The narrative is designed to work without them, but is weaker for it.

---

## 1. The story in one line

> **Most brands are built in pieces. CALIX carries one idea through every piece, from the first mark to the enquiry it brings in.**

The page doesn't list five services. It follows **one illustrative brand** (a specimen labelled "Your brand") as it moves through each discipline, so the visitor *sees* the connection instead of being told about it. This is the differentiation in `docs/strategy.md` §4.2, made visible.

```
HERO ─► (the problem) ─► BRAND ─► DIGITAL ─► MARKETING ─► DISCOVERABILITY ─► GROWTH ─► PROOF ─► START A PROJECT
 static    ╰──────────────── one sticky plate, one specimen, six states ───────────────╯   S2 opening    static band
```

### Why a specimen, not a client project

There's no approved project to follow. Using the visitor's own brand ("Your brand") as the subject is honest, as it's clearly an illustration, and persuasive, because the prospect imagines their own case. When approved work exists, the PROOF beat immediately shows the real version of the same journey.

---

## 2. Section narrative map

Format from `scroll-storytelling` §3.2.

### 2.1 HERO

```
PURPOSE:            Establish what CALIX is and offer the primary action immediately.
ENTRY STATE:        Headline (cols 1–8), lead, primary CTA, reply note, service index (cols 8–12).
                    The top edge of the sequence plate is visible at the bottom of the first viewport.
SCROLL BEHAVIOR:    None. Static.
TRANSFORMATION:     None.
EXIT STATE:         The service index leaves. The plate (in its "problem" state) arrives.
CONNECTION TO NEXT: Shared typography. The service index lists the disciplines in the same order as the
                    sequence's stage rail, so the list the visitor just read becomes the route they
                    are about to follow.
MOTION LEVEL:       None. The headline is the LCP element and is visible on first paint.
```

### 2.1a STORY: from one seed to an entire ecosystem (preview builds only)

```
PURPOSE:            Make "one idea, carried through" physical before the services sequence names it:
                    a founder's decision, planted, tended and grown into a working grove.
ENTRY STATE:        Section label, heading and a "Skip to our services" link below the hero;
                    stage 1 (founder at the desk, with the idea sketched on a clean page) arrives.
SCROLL BEHAVIOR:    Pinned stage driven directly by scroll position (docs/olive-story.md):
                    one 28.5-unit timeline of 82 beats, about 20 viewports on desktop and 18 on phones.
TRANSFORMATION:     A continuous 2D section drawing shows each of the 82 actions happen (the plan is
                    sketched; a hand picks up the pit; the soil is levelled, opened, planted, covered and
                    pressed; the pit splits and roots; the shoot breaks through; stake, name tag, base,
                    light, reflected light, water and breeze stand for the seven disciplines; branches,
                    canopy, flowers; olives set, ripen, are picked, netted, gathered and pressed; the oil
                    is bottled, set out, tasted, passed on and carried home; new
                    trees, rows, the hillside grove). The nine photographs sit in a reference window
                    beside it, one per chapter. The caption names the current step.
EXIT STATE:         The overhead grove photograph opens out to fill the stage and the last caption returns
                    on a solid Espresso band at its foot; the stage releases into the bridge line.
CONNECTION TO NEXT: Shared idea. "One idea, planted once. What follows is how we carry it through
                    every piece." leads into "Most brands are built in pieces."
MOTION LEVEL:       Signature. Eight static stages, each listing its steps, under reduced motion or
                    without JavaScript.
```

Only built when the story preview is enabled (`next.config.ts`). In the public build the hero hands
straight to stage 0 as described in §2.1.

### 2.2 The problem (sequence stage 0)

```
PURPOSE:            Name the business problem: brand, website, campaigns and search bought from
                    different suppliers drift apart.
ENTRY STATE:        Plate shows five small fragments (an identity sheet, a web page, an ad, a search
                    listing, a form), each with the specimen name set differently (different weight,
                    case and spacing), sitting off the grid.
SCROLL BEHAVIOR:    Text block scrolls normally; plate is sticky (S1).
TRANSFORMATION:     None within the stage. This is the starting state.
EXIT STATE:         Fragments are still scattered.
CONNECTION TO NEXT: Entering BRAND, the fragments align and merge into one construction plate.
MOTION LEVEL:       Narrative (part of S1).
Copy (draft):       "Most brands are built in pieces." / "A logo from one studio, a website from
                    another, campaigns and search from someone else. Each piece drifts further from
                    the last."
```

### 2.3 BRAND (stage 1)

```
PURPOSE:            Brand is the first decision: what you stand for, made visible.
ENTRY STATE:        Scattered fragments.
TRANSFORMATION:     Fragments move onto the grid and resolve into one specimen wordmark on an identity
                    construction plate (clear-space and proportion annotations).
EXIT STATE:         A single specimen on its construction grid.
CONNECTION TO NEXT: The specimen itself carries into DIGITAL.
Copy (draft):       "Brand." / "Decide what you stand for, then make it unmistakable."
Link:               "See Brand Strategy & Identity" → /services/brand-strategy-identity
```

### 2.4 DIGITAL (stage 2)

```
PURPOSE:            The website carries the same idea, on every screen.
TRANSFORMATION:     The construction grid withdraws. The specimen scales down into the header slot of
                    a browser frame that draws around it. A simplified page structure (headline line,
                    proof block, CTA block, as palette fields) appears. A mobile frame shows the same
                    page.
EXIT STATE:         Desktop and mobile frames of one page carrying the specimen.
CONNECTION TO NEXT: The page's headline line and specimen lift out into MARKETING.
Copy (draft):       "Digital." / "A website that carries the same idea on every screen, built to be
                    fast, accessible and easy to act on."
Link:               "See Web Design & Development" → /services/web-design-development
```

### 2.5 MARKETING (stage 3), conditional on gate G2

```
PURPOSE:            One message, adapted to every format and channel.
TRANSFORMATION:     The browser frame divides into a format set: 1:1, 4:5, 9:16 and a 728×90 banner,
                    each holding the specimen and the same headline line at true relative scale.
EXIT STATE:         Four formats, one message.
CONNECTION TO NEXT: The formats collapse into a single line of text: how the brand appears when
                    someone searches.
Copy (draft):       "Marketing." / "One message, adapted to every format and channel, and pointed at
                    the people most likely to enquire."
Link:               "See Digital Marketing" → /services/digital-marketing
If G2 is not met:   This stage is removed. DIGITAL moves straight to DISCOVERABILITY (states are
                    independent, see §6.3). The stage rail shows four items.
```

### 2.6 DISCOVERABILITY (stage 4)

```
PURPOSE:            Clear structure, so search engines and AI systems understand what you do.
TRANSFORMATION:     The formats collapse into the answer-anatomy plate: a query field, a result title,
                    an opening definition, and structured-data tags. The specimen becomes the
                    "Entity: Organization" tag.
EXIT STATE:         The answer-anatomy diagram, labelled "Diagram, not a real result".
CONNECTION TO NEXT: The result line connects by hairline to the next state's journey.
Copy (draft):       "Discoverability." / "Clear structure and useful content, so search engines and AI
                    systems understand what you do and who it is for. No promised rankings."
Link:               "See SEO & GEO" → /services/seo-geo
```

### 2.7 GROWTH (stage 5)

```
PURPOSE:            Everything is measured against one outcome: qualified enquiries.
TRANSFORMATION:     The result line becomes the first node of a journey: search result → page →
                    proof → enquiry form, joined by hairlines. A small measurement rule (no figures)
                    sits under the form.
EXIT STATE:         The complete journey, ending in a drawn enquiry form. This is the plate's final
                    state, and it stays while the sequence scrolls away.
CONNECTION TO NEXT: The drawing ends at an enquiry. The next section shows real work (PROOF).
Copy (draft):       "Growth." / "Every visit measured against one thing: qualified enquiries. Then we
                    improve what brings more of them."
Link:               "See Growth & Conversion" → /services/growth-conversion
Sequence close:     "One line of thought, from position to enquiry." Then two text links:
                    "See how we work" (/studio#process) and "Start a project" (/contact).
```

### 2.8 PROOF, conditional on gate G1

```
PURPOSE:            Show that the drawn journey is real: approved client work.
ENTRY STATE:        The first featured case plate sits in its column (cols 1–8), aligned with the plate
                    above.
SCROLL BEHAVIOR:    S2: the plate opens to full bleed as it moves through the viewport.
TRANSFORMATION:     Column-width plate → full-bleed image, and the caption bar draws under it.
EXIT STATE:         A full-bleed project image. Then one or two further featured plates (static,
                    alternating 7/5 and 5/7). Then an approved client quote, if one exists.
CONNECTION TO NEXT: The last case plate's caption ends with "Start a similar project"; the CTA band
                    follows directly.
MOTION LEVEL:       Signature (S2) for the first plate only. Others: ambient (S3).
If G1 is not met:   No PROOF section on the home page. GROWTH is followed directly by START A PROJECT,
                    and the sequence close links to /studio for process. (Launching without proof is
                    not recommended: docs/strategy.md §7.)
```

### 2.9 START A PROJECT

```
PURPOSE:            Convert. State the next step and remove the last doubts.
ENTRY STATE:        Olive band, fully present (no reveal). Headline, a "best suited to" qualifying line,
                    three next steps (reply → introductory call → proposal), primary CTA, reply-time note.
SCROLL BEHAVIOR:    None. Static.
CONNECTION:         Closes the journey drawn in GROWTH: the drawing ended at an enquiry form; this is
                    the real one.
MOTION LEVEL:       None. CTAs are never animated in (scroll-storytelling ground rule 5).
```

### 2.10 Changes to the home page hierarchy

This narrative replaces two separate sections from `docs/information-architecture.md` §5.1:

- **"How we work" (process summary):** the sequence *is* the process in narrative form, and it ends with a link to the full process on `/studio`.
- **"Who it's for":** moves into the START A PROJECT band as a qualifying line, where it filters enquiries at the moment of action.

The IA document has been updated to match.

---

## 3. Signature interaction candidates

| # | Candidate | Decision | Reason |
|---|---|---|---|
| **S1** | **One brand, carried through:** a sticky plate beside normally scrolling text. One specimen moves through six states, from problem to growth. | **Selected (signature)** | It's the core differentiation made visible. It replaces a list of five services with one connected story. |
| **S2** | **From drawing to real work:** the first featured case plate opens from its column to full bleed | **Selected (signature), conditional on G1** | It marks the shift from illustration to evidence, and it's the only image-scale moment on the page. |
| **S3** | **Annotations resolve:** plate annotation leaders draw once when a plate settles | **Selected (ambient)** | It shows the precision of the "Working Set" direction at very low cost. Strictly limited (§4.3). |
| C4 | **Page-long gold thread** drawn continuously from hero to CTA (proposed in `docs/art-direction.md` §8, moment A) | Cut, and folded into S1 | It decorates every section, which is exactly what the skill forbids. The continuity is carried by the specimen and the stage rail inside S1 instead. |
| C5 | **Hero index docks into the stage rail:** the hero's service list physically moves into the sequence | Cut, kept as a static typographic bridge | It needs cross-section element movement for little understanding gained. Matching order and typography achieve the bridge. |
| C6 | **CTA field rises out of proof:** the Olive field clips upward from the last case plate | Cut | Ivory CTA text would be unreadable until the field arrives, and the CTA must never depend on animation. |

Selected: three (two signature, one ambient), within the skill's limit of 2–4.

---

## 4. Selected interactions

### 4.1 S1 — One brand, carried through

| Aspect | Specification |
|---|---|
| **Narrative purpose** | Show, rather than claim, that CALIX connects brand, website, marketing, search and growth around one idea, and that disconnected suppliers are the problem it solves. |
| **Visual start state** | Stage 0: five off-grid fragments, each carrying a differently set "Your brand". |
| **Visual end state** | Stage 5: the journey diagram (result → page → proof → enquiry form) with the specimen consistent throughout. |
| **States** | 0 Problem → 1 Brand → 2 Digital → 3 Marketing (G2) → 4 Discoverability → 5 Growth (§2.2–2.7). |
| **Scroll behaviour** | **No pin and no scroll-jacking.** A two-column section: the text column (cols 1–5) holds one block per stage in normal document flow; the plate column (cols 7–12) is `position: sticky`. When a stage's text block crosses the viewport's centre line, the plate changes to that stage's state with a **triggered** transition (not scrubbed) of 700ms, using `--ease-out`. Scrolling back reverses the states. |
| **Length** | Each stage block has a minimum height of 60vh (desktop), so the six stages take about 3.6 viewport heights of **readable content**: the text never stops moving. QA must confirm it doesn't feel slow (§7). |
| **Progress** | A stage rail at the top of the plate: a horizontal list of Brand, Digital, Marketing, Discoverability and Growth, separated by spacing (no dots). The active item is Espresso with a 2px Espresso underline; inactive items are Olive. Decorative, so `aria-hidden` (the headings carry the meaning). |
| **Connection to adjacent sections** | In from the hero: the plate's top edge is visible in the first viewport (stage 0), and the hero index matches the rail order. Out to proof: the final journey ends at an enquiry, and the next plate (S2) is real work in the same plate system. |
| **User benefit** | The visitor understands the integrated offer in one pass, can read at their own pace, and can jump to any service page from its stage. |
| **Desktop implementation** | Enabled only when the viewport is at least 1200px wide **and** at least 700px tall, `prefers-reduced-motion` is not set, and JavaScript has run. Otherwise the static layout (§4.1.1) shows. See §6 for the build specification. |
| **Mobile alternative** (< 1200px, or short viewports) | No sticky plate. Each stage is a heading and text, followed by its **own static plate** showing that stage's end state. Continuity comes from the same specimen recurring in every plate. Only S3 annotations animate. |
| **Reduced-motion alternative** | The static layout at every width: on desktop, text and plate side by side per stage (5/7 split); on mobile, stacked. No state transitions. |
| **No-JS** | The same static layout. Base HTML and CSS render it, and JavaScript upgrades it. |
| **Performance risks** | Six state layers in one plate (DOM size). Transitions on many elements at once. The plate's peek into the hero could compete with LCP. **Mitigations:** the plate is SVG plus a few HTML nodes (budget: 150 nodes or fewer); only `transform`, `opacity` and `clip-path` are transitioned; `will-change` is set only while a transition runs; stage 0 renders in its final form on first paint (no entrance animation); IntersectionObserver is used, never scroll listeners; there's no animation library. |
| **Conversion implications** | Positive: it explains the offer and links each stage to its service page. Risk: about 3.6 viewport heights between the hero CTA and the next solid CTA. **Mitigations:** the sticky header keeps "Start a project" visible throughout; the sequence close carries a "Start a project" text link; the plate's drawn form and button are illustrative (`aria-hidden`, not focusable, no pointer cursor), so nobody mistakes the drawing for a working form. |

#### 4.1.1 Static layout (mobile, reduced motion, no JavaScript)

```
DESKTOP (reduced motion / no JS)              MOBILE
┌──────────────────┬───────────────────┐     ┌───────────────┐
│ Stage heading     │ Plate: stage end  │     │ Stage heading │
│ Copy              │ state (static)    │     │ Copy          │
│ Link to service   │                   │     │ Link          │
├──────────────────┼───────────────────┤     │ Plate (static)│
│ … repeated per stage, 64px apart      │     ├───────────────┤
└──────────────────┴───────────────────┘     │ … next stage  │
                                              └───────────────┘
```

### 4.2 S2 — From drawing to real work (conditional on G1)

| Aspect | Specification |
|---|---|
| **Narrative purpose** | Mark the moment the story moves from illustration to evidence: "here is the real work." |
| **Visual start state** | The first featured case image, clipped to the plate column (cols 1–8), aligned with the S1 plate rhythm. The caption bar has not yet drawn. |
| **Visual end state** | The same image at full bleed. The caption bar (project, services, year) is drawn beneath it, plus "See the project". |
| **Scroll behaviour** | **Scrubbed** by the image's own progress through the viewport (CSS scroll-driven animation, `animation-timeline: view()`), over the range from entering to 40% of the viewport. The clip goes from `inset(0 [right offset] 0 [left offset])` to `inset(0)`. No pin. Scrolling back reverses it. |
| **Connection to adjacent sections** | In: S1 ends with a drawn enquiry, and S2 opens onto the real project that such a journey produced. Out: further case plates are static, then the quote, then the CTA band. |
| **User benefit** | The real work gets the most space at the moment the visitor is most curious. It signals that proof follows the promise. |
| **Desktop implementation** | Pure CSS. The image element is full-bleed in layout from the start (so there's no layout shift), and only its `clip-path` animates. The caption rule draws with `transform: scaleX` in the same timeline. The `@supports (animation-timeline: view())` fallback is the static end state. |
| **Mobile alternative** | No opening. The plate is shown at full width from the start (the mobile column is already full width). The caption is static. |
| **Reduced-motion alternative** | The static end state (full bleed, caption visible). |
| **Performance risks** | A large image below the fold, and clip-path repainting. **Mitigations:** the image is lazy-loaded with declared dimensions, AVIF, and `sizes` matching the full-bleed width; only one S2 per page; clip-path is animated on a single layer only, and its paint cost is measured in QA (criterion 9). If it drops frames, S2 falls back to the static end state. |
| **Conversion implications** | It strengthens the proof step before the final CTA. The case link and "Start a similar project" are visible in both start and end states, never revealed by the animation. |

### 4.3 S3 — Annotations resolve (ambient)

| Aspect | Specification |
|---|---|
| **Narrative purpose** | Show precision: every plate is specified, not decorated. |
| **Visual start state** | Annotation leaders at `scaleX(0)` and annotation text at `opacity: 0`. Applied **by JavaScript only**. |
| **Visual end state** | Leaders drawn and text visible, the same as the static design. |
| **Scroll behaviour** | Triggered once, when a plate is at least 50% visible. 800ms for the leader, and the text follows 200ms later over 400ms. Never repeats, never reverses. |
| **Limits** | Only plates that carry annotations. At most 3 annotations per plate and about 6 animated plates per page. In S1, annotations resolve with each state change instead (they're part of the state). |
| **Connection to adjacent sections** | None. Ambient. |
| **User benefit** | Draws the eye to the factual notes (breakpoints, standards) that carry the technical-competence message. |
| **Desktop and mobile** | Identical. It's cheap enough for mobile. |
| **Reduced-motion alternative** | No animation. Annotations are always visible. |
| **Performance risks** | Negligible: transforms on 1px elements, one shared IntersectionObserver. |
| **Conversion implications** | Neutral. Annotations never contain CTAs. |

---

## 5. Global motion rules for this page

1. **Normal scrolling always.** No scroll snapping, no smooth-scroll layer (Lenis is not used), no wheel or touch interception.
2. **Keyboard:** Tab order follows the DOM. Focusing a stage link scrolls its block into view, which updates the plate through the same observer. Anchor links and Home/End/Page keys behave natively.
3. **Visible CTAs:** the header (with "Start a project") is **sticky on the home page at every width** (`docs/design-system.md` §6.1 updated). No CTA is ever hidden, delayed or animated in.
4. **Screen readers:** S1's plate is `aria-hidden="true"`, with all meaning in the stage headings and text. S2's image has descriptive alt text. Annotations are real text in the DOM in static plates.
5. **Content without JS:** every animation's initial state is applied by a class that JavaScript adds (`.js-motion`), never in base CSS.
6. **Contrast at every point:** text never sits over a transitioning surface. Plate state changes affect only illustrative content, never readable copy.
7. **No repeated fade-ups.** Body content, headings and sections have no entrance animation.

---

## 6. Implementation specification

Framework-agnostic until the stack is decided (brief D7). Component names are indicative.

### 6.1 Toolset decision

| Need | Tool | Reason |
|---|---|---|
| S1 stage detection | `IntersectionObserver` (about 1KB of JS) | Triggered state changes are enough. Scrubbing isn't needed, so no animation library. |
| S1 transitions | CSS transitions on `[data-stage]` attribute selectors | Declarative, interruptible, GPU-friendly |
| S2 opening | CSS scroll-driven animation (`animation-timeline: view()`) with an `@supports` fallback | No JavaScript. Browsers without support show the static end state. |
| S3 annotations | One shared `IntersectionObserver` and CSS transitions | Minimal |
| **Not used** | GSAP, ScrollTrigger, Lenis, Motion | Not needed for this plan (`scroll-storytelling` §12). Revisit only if QA shows triggered transitions feel disconnected. |

**JS budget for all home-page motion:** 3KB or less, minified and compressed.

### 6.2 S1 structure

```html
<section class="sequence" id="how-it-connects" aria-labelledby="seq-title">
  <h2 id="seq-title" class="visually-hidden">How CALIX connects brand, digital, marketing, search and growth</h2>
  <div class="sequence__text">
    <article class="stage" data-stage="0" id="stage-problem">
      <h3>Most brands are built in pieces.</h3> <p>…</p>
      <figure class="stage__plate-static" aria-hidden="true">…stage 0 end state…</figure>
    </article>
    <article class="stage" data-stage="1" id="stage-brand">
      <h3>Brand.</h3> <p>…</p> <a href="/services/brand-strategy-identity">See Brand Strategy &amp; Identity</a>
      <figure class="stage__plate-static" aria-hidden="true">…</figure>
    </article>
    … stages 2–5 …
    <p class="sequence__close">One line of thought, from position to enquiry.
       <a href="/studio#process">See how we work</a> <a href="/contact">Start a project</a></p>
  </div>
  <div class="sequence__plate" aria-hidden="true" data-active-stage="0">
    <!-- one SVG plate; layers per state; the shared specimen is a single <g> -->
  </div>
</section>
```

- **Static mode** (default, with no `.js-motion` on the root): `.sequence__plate` is `display: none`, and every `.stage__plate-static` is shown.
- **Enhanced mode** (JS has run, the media conditions in §6.4 hold): the root gets `.js-motion`. `.sequence__plate` is shown and sticky (`top: calc(header height + 32px)`, height `min(80svh, 720px)`), and the `.stage__plate-static` figures are hidden.
- Static plate figures and the sticky plate are generated from **the same state definitions**, so they can never diverge.

### 6.3 S1 states and transitions

- Each state defines **absolute end positions** for every layer (as CSS custom properties per `[data-active-stage="n"]`). Transitions don't depend on which state came before, so:
  - fast scrolling or skipping stages always lands correctly;
  - removing the MARKETING stage (gate G2) needs no new choreography.
- Animated properties: `transform` (translate and scale of the specimen and layers), `opacity` (layer visibility), `clip-path` (frames drawing). No layout properties, no SVG attribute animation.
- Duration 700ms, `--ease-out`. Annotation leaders inside the plate follow with a 200ms delay.
- `will-change: transform, opacity` is added to moving layers when the stage changes, and removed on `transitionend`.

### 6.4 Activation conditions

```
Enhanced S1 if ALL:  (min-width: 1200px) and (min-height: 700px)
                     and not (prefers-reduced-motion: reduce)
                     and JavaScript executed
Otherwise:           static layout
S2 if:               G1 met, (min-width: 768px), supports animation-timeline: view(),
                     and not reduced motion
S3 if:               JavaScript executed and not reduced motion
```

A `matchMedia` listener switches modes live if the window is resized or the preference changes, with no reload.

### 6.5 Stage detection

- One `IntersectionObserver` on `.stage` elements, with `rootMargin: "-50% 0px -50% 0px"` (a centre line).
- When a stage intersects, set `data-active-stage` on the plate. No React state updates per scroll (if built in React, write the attribute through a ref).
- On load, the initial stage is computed from the current scroll position, so deep links and reloads land in the right state.

### 6.6 Content requirements before build

| Item | Status |
|---|---|
| Final copy for stages 0–5 and the close (drafts in §2) | Draft, needs approval |
| Specimen wordmark treatment ("Your brand" in Cormorant 600) and the five fragment variants | To design in the plate artwork step |
| Gate G2 decision (MARKETING stage) | Open (`docs/strategy.md` §9) |
| Gate G1: at least one approved featured project with a full-bleed-quality image for S2 | Open, no projects |
| Approved quote for PROOF | Open |

---

## 7. Acceptance criteria and QA

The build is accepted only when all of these pass.

| # | Criterion | Method |
|---|---|---|
| 1 | Primary CTA visible in the first viewport at 1440×900, 768×1024 and 390×844, and the header CTA visible at every scroll position | `calix-visual-qa` captures; manual scroll |
| 2 | Hero headline is the LCP element and is painted without animation. LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms (lab: TBT) | `web-performance` audit |
| 3 | No horizontal overflow at any width | `calix-visual-qa` |
| 4 | Reduced motion: no transforms or transitions on the page except opacity changes of 150ms or less; static layout shown | Emulated `prefers-reduced-motion` |
| 5 | JavaScript disabled: all content, plates and CTAs visible in the static layout | JS-off capture |
| 6 | Keyboard: every stage link reachable in DOM order, visible focus, and the plate shows the focused stage | Manual |
| 7 | Screen reader: the sequence reads as heading + text per stage; the plate isn't announced | `accessibility-audit` |
| 8 | Fast scroll (one flick from hero to footer) and reverse scroll land S1 in the correct state, with no stuck layers | Manual on desktop |
| 9 | 60fps during S1 transitions and S2 scrub on a mid-range laptop with 4× CPU throttling | DevTools performance profile |
| 10 | Mobile (390): no sticky plate, no scrubbed animation; only S3 annotations animate | Device emulation and one real device |
| 11 | Removing the MARKETING stage (G2 not met) leaves a valid four-stage sequence | Toggle test |
| 12 | Palette checker reports 0 issues; no tints appear mid-transition (layers fade by element opacity only) | `check_palette.py` |
| 13 | Motion review score (`scroll-storytelling` §14) of at least 7 in every category, with Accessibility and Performance at least 8 | Self-critique pass, results recorded |

---

## 8. Approval

This specification needs sign-off on:

1. **The narrative device:** the "Your brand" specimen carried through six states, as an illustration of the integrated method (not client work).
2. **The selected interactions:** S1 (sticky plate, triggered), S2 (proof plate opening, conditional on G1), and S3 (ambient annotations). Plus the cuts in §3.
3. **The home page hierarchy changes in §2.10:** the process summary and "who it's for" are absorbed into the sequence and the CTA band.
4. **The sticky header at every width** on the home page.
5. **Draft stage copy** (§2), or a request to revise it in the content phase.

Once approved, implementation follows `scroll-storytelling` §3, step 4: build the static page first, then S3, then S1, then S2, verifying each layer before adding the next.


---

## 9. Implementation record (Phase 6B)

| Interaction | Status | Implementation |
|---|---|---|
| **S1** One brand, carried through | Implemented | `components/home/Sequence.tsx` (server-rendered static layout plus sticky plate) and `components/home/SequenceController.tsx` (one IntersectionObserver at the centre line, one ResizeObserver, a `matchMedia` listener; no React state). A single "Your brand" traveller is measured onto each drawing's `data-specimen-anchor` and moved with `transform` only. |
| **S2** From drawing to real work | Not built | Requires approved client imagery (gate G1). The Growth stage now ends with a text bridge to the work section instead. |
| **S3** Annotations resolve | Implemented, CSS only | `animation-timeline: view()` on static plates, inside `@supports` and `prefers-reduced-motion: no-preference`. In the sticky plate, leaders draw as their layer activates. |

**Changes from the specification, found in QA:**
- The stage rail is real navigation (links to each stage, with `aria-current="step"`), placed before the stages in DOM order, not a decorative `aria-hidden` list. It looked clickable, so it now is.
- The "System structure" plate (custom development) moves into the Digital stage's text column in sticky mode, so engineering evidence is not lost when the plate column shows one drawing at a time.
- The sequence closes with "Every enquiry journey runs through proof", linking to the work section, as the GROWTH → PROOF bridge.
- The layout mode is chosen by an inline script before first paint (`app/layout.tsx`, query in `lib/motion.ts`), so switching to the sticky layout causes no layout shift.
- No GSAP, ScrollTrigger or Lenis was added (§6.1). There are therefore no GSAP contexts to clean up; observers and listeners are disconnected on unmount, on mode switch-off, and on client-side navigation.

**Measured (Playwright and Chromium, production build):** CLS 0 at 1440, 768 and 390. Correct stage after fast scroll, reverse scroll, keyboard focus, anchor links, rail clicks and deep links. Live switch to the static layout below 1200px wide, and back. Cleanup verified after client-side navigation. Reduced motion: static layout, 0 running animations. No JavaScript: static layout, annotations visible. At 4× CPU throttle: median frame 16.7 ms, p95 16.7 ms, no frames over 33 ms. No horizontal overflow and nothing clipped at 1200×700 or 1920×1080. Plate DOM: 160 nodes (budget 150).

**Not yet tested:** real touch devices, Safari and Firefox (S3 falls back to static where `view()` timelines are unsupported), screen readers, and the motion review score (§7, criterion 13).
