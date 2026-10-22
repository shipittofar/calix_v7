# CALIX — Art Direction

**Phase:** 3 — Art direction
**Status:** Direction chosen and validated with a throwaway browser preview (§9). Ready for design-system implementation once the decisions in §10 are confirmed.
**Last updated:** 2026-10-09
**Companions:** `docs/design-system.md` (tokens and components), `docs/imagery-direction.md` (images, devices, assets)
**Inputs:** `docs/calix-master-brief.md`, `docs/strategy.md`, `docs/information-architecture.md`, `docs/conversion-strategy.md`, `docs/portfolio-inventory.md`; skills `calix-brand`, `frontend-design`, `scroll-storytelling`, `calix-visual-qa`, `conversion-strategist`, `accessibility-audit`.

---

## 1. The direction: "The Working Set"

> **Monograph composition, specification detail.**

An architect presents a project as a *working set*: numbered drawings, each on its own plate, measured and annotated so a builder can construct it exactly. CALIX presents digital work the same way.

- **Creative sophistication** comes from the monograph: large Cormorant headlines, generous space, tactile material photography, and work shown big and calm.
- **Technical competence** comes from the specification: the work sits on **plates**, with precise frames and hairline annotations stating real facts about how it was built (breakpoints, grid, type, accessibility level, performance, structured data).

The architectural reference is about **method**, not subject. CALIX draws digital things (identities, interfaces, search structures, journeys), never buildings. This keeps the brief's "architectural" direction without letting CALIX be mistaken for an architecture or interiors firm (`calix-geo` classification rule).

### Why this direction, and not others

| Considered | Rejected because |
|---|---|
| Pure editorial magazine (large type, mood photography) | Looks sophisticated but hides technical competence. Reads as a branding-only studio, which is the competitor type CALIX differentiates from (`docs/strategy.md` §4). |
| Tech or product UI aesthetic (dark dashboards, code, data panels) | Shows competence but contradicts the palette, the restraint and the premium positioning. Reads as SaaS. |
| Architectural photography-led (stone, light, space) | On-palette, but it replaces evidence of digital work with mood. The brief forbids that explicitly, and it risks misclassification. |
| **The Working Set** | Holds both qualities in one system. Every capability gets an honest visual form. Annotations can only state real facts, so the style itself enforces the evidence rules. |

### What it must never become

- A blueprint pastiche: blue lines, grid paper everywhere, fake technical noise.
- Annotation as decoration: a label that states nothing, or a number that isn't true.
- A drawing of buildings, rooms or furniture standing in for client work.

---

## 2. Brief-fixed choices vs. free choices

`frontend-design` warns that some of the brief's fixed traits are also common generated-site defaults: a cream background with a serif display, hairline rules, square corners and uppercase eyebrows. **The brief wins where it fixes a choice.** Distinctiveness is spent on the axes it leaves free.

| Axis | Fixed by | Decision |
|---|---|---|
| Palette | Brief | Exactly five colours. No tints. |
| Type families | `calix-brand` (proposed, brief D5) | Cormorant Garamond and Jost. No third family, so no monospace for technical labels: annotations use Jost with tabular figures. |
| Straight edges, hairlines, no shadows | `calix-brand` | Kept. The hairline gets a **job**: it's the annotation leader and plate frame, not newspaper-column decoration. |
| Uppercase tracked labels | `calix-brand` | Restricted to **plate captions and buttons**. No eyebrow above every heading. Headings stand alone. |
| Signature element | Free | **The annotated plate** (§3). |
| Composition | Free | Asymmetric plate-and-text pairings on a 12-column grid. Work is shown large and always sits on a plate. |
| Numbering | Free | Numerals only for real sequences: plate numbers within a case study, process steps. Never for the list of services. |
| Meta information | Free | Presented as definition lists (label, then value). No "A · B · C" strings. |
| Link treatment | Free | Underline. No "→" appended to link text. Supersedes "text link with arrow" in `docs/conversion-strategy.md` §2.1. |

---

## 3. The signature element: the plate

A plate is a framed field that presents **one piece of work or one idea**, with a caption bar beneath and optional annotations.

```
┌───────────────────────────────────────────────┐  ← plate field (Travertine or Ivory)
│   ┌───────────────────────────────┐           │
│   │ □□□  project-domain.com       │  ┌─────┐  │  ← browser frame (1px Espresso)
│   │                               │  │     │  │
│   │   [ real project screenshot ] │  │ 390 │  │  ← device frame, kept inside the plate
│   │                               │  │     │  │
│   └───────────────────────────────┘  └─────┘  │
│   ──── Desktop 1440 and mobile 390, same order │  ← annotation: hairline leader + fact
└───────────────────────────────────────────────┘
──────────────────────────────────────────────────  ← 1px Espresso rule
PLATE 2 — RESPONSIVE WEBSITE          Client, year   ← caption: label + one fact
```

**Rules**
1. One subject per plate. Everything inside the plate stays inside its bounds; nothing overhangs the caption.
2. Plate numbers are used only inside a case study or a sequenced set, where the plates are a real sequence.
3. Annotations state verifiable facts only. Use one to three per plate. Examples: "WCAG 2.2 AA tested", "Breakpoints 390 / 768 / 1440", "LCP 1.6 s, field data, [period]". A performance or results annotation needs the same evidence as any published metric (E3, approved).
4. Plates are flat: no shadows, no tilted 3D device mockups, no perspective.
5. One **lead plate** per section. A second plate is smaller or sits in a different column.
6. Placeholder plates (as in the preview) are a **design-stage device only** and are never published.

---

## 4. Making each capability visually unmistakable

Each capability has a defined plate type, so a visitor recognises it at a glance, and so the evidence it needs is clear.

| Capability | Plate type | What it shows | Evidence required | If no approved evidence yet |
|---|---|---|---|---|
| **Logo and brand identity design** | Identity construction plate | Mark or wordmark on a construction grid with clear-space and proportion annotations, then the identity system (colour, type, applications) on following plates | Approved client identity files | CALIX's own identity construction. Concept work labelled "Concept". |
| **Graphic design and campaign creatives** | Format set plate | One campaign idea across real formats side by side at true relative scale (1:1, 4:5, 9:16, 16:9, a leaderboard banner), annotated with format names | Approved campaign assets | Not shown. No invented campaigns. |
| **Responsive website design** | Device plate | A browser frame (desktop) plus a mobile frame of the same page, with annotations for breakpoints and content order. Mobile-only on small screens (§7). | Real screenshots, live URL | Not shown on service pages. A placeholder on design boards only. |
| **Custom software and web development** | System plate | A hairline diagram of the real architecture (components, data flow, integrations), plus technical-standards annotations (accessibility level, performance, security practices). Optional short real code excerpt (see §10, decision 4). | Technical notes from the actual project | CALIX's own site build, documented honestly. |
| **Digital marketing and analytics** | Measurement plate | Campaign creative beside a palette-only chart of an **approved** result (baseline → result, period, source in the caption) | E3 metrics, approved | The method only: a measurement-plan diagram labelled "How we measure". No numbers. |
| **SEO and AI search visibility** | Answer-anatomy plate | A diagram of how a page is read by search engines and AI systems: query, title, opening definition, structured data, entity. Annotated. | For results: E3 visibility data. The anatomy diagram needs no client data. | The anatomy diagram, labelled "Diagram, not a real result". Never a fabricated results page, never a fake AI answer that names CALIX. |
| **Conversion optimisation** | Journey plate | An enquiry path drawn as a sequence (entry → proof → form → reply), with an annotated form or landing-page detail. Before/after only with approved data. | Approved before/after, or the documented journey from a real project | A journey diagram of CALIX's own enquiry path. |

**Hierarchy rule:** On any page, real project work outranks diagrams, and diagrams outrank atmosphere. Architectural or material photography never fills an evidence slot (`docs/imagery-direction.md` §2).

---

## 5. Page compositions

The grid and tokens are in `docs/design-system.md`. Desktop wireframes use the 12-column grid. Mobile is 4 columns.

### 5.1 Home

```
DESKTOP                                                   MOBILE
┌────────────────────────────────────────────────────┐   ┌──────────────────┐
│ CALIX     Services Work Studio Insights  [Start ▢] │   │ CALIX [Start] Menu│
├────────────────────────────────────────────────────┤   ├──────────────────┤
│ Headline, cols 1–8, max 2–3 lines                  │   │ Headline 3–4 lines│
│                                                    │   │ Lead              │
│ Lead, cols 1–5         │ Service index, cols 8–12  │   │ [START A PROJECT] │
│ [START A PROJECT] note │ name ........ descriptor  │   │ Service index     │
│                        │ (5 rows, hairlines)       │   │ (name / descriptor│
├────────────────────────┴───────────────────────────┤   │  stacked)         │
│ Lead plate peeks into first viewport (featured work)│   │ Plate (mobile)    │
│ Plate cols 1–8        │ Statement + case link 10–12 │   └──────────────────┘
├────────────────────────────────────────────────────┤
│ The hand-off problem: statement, cols 2–8          │
│ Capability sequence: brand → digital → search →    │
│ growth, one plate type per step (signature moment) │
├────────────────────────────────────────────────────┤
│ Selected work: 2–3 plates, alternating 7/5 and 5/7 │
├────────────────────────────────────────────────────┤
│ Espresso band: how we work, 4 real steps, gold      │
│ numerals                                           │
├────────────────────────────────────────────────────┤
│ Who it's for: 3 client situations, hairline columns│
├────────────────────────────────────────────────────┤
│ Proof: approved quote, large Cormorant, cols 2–10  │
├────────────────────────────────────────────────────┤
│ Olive band: final CTA with what happens next       │
└────────────────────────────────────────────────────┘
```

- **Hero:** the headline gets its own columns (1–8), so it never collides with the service index. The primary CTA stays in the first viewport at 1440×900 and at 390×844 (validated, §9).
- **No hero image by default.** Typography opens the page, and the first featured-work plate starts within the first viewport, so digital work is visible before scrolling. If no approved work exists, the plate slot holds the capability sequence instead. Never a mood photograph.

### 5.2 Service page (shared layout for all five)

```
┌──────────────────────────────────────────────────────┐
│ Breadcrumb                                           │
│ Service name (H1), cols 1–7  │ Who it's for, cols 9–12│
│ Outcome sentence             │ [START A … PROJECT]    │
├──────────────────────────────────────────────────────┤
│ Capability plate (from §4), cols 1–8 │ caption        │
├──────────────────────────────────────────────────────┤
│ Problems we solve: 3–4 items in hairline columns     │
├──────────────────────────────────────────────────────┤
│ What's included: definition list, two columns        │
│ (sub-services as sections, no separate pages)        │
├──────────────────────────────────────────────────────┤
│ How it works: numbered phases (real sequence)        │
├──────────────────────────────────────────────────────┤
│ Relevant work: 1–3 plates                            │
├──────────────────────────────────────────────────────┤
│ How it connects: links to related services           │
├──────────────────────────────────────────────────────┤
│ Fit / not for │ Investment guidance                  │
├──────────────────────────────────────────────────────┤
│ FAQ (disclosure list)                                │
├──────────────────────────────────────────────────────┤
│ Olive band: CTA + reply promise                      │
└──────────────────────────────────────────────────────┘
```

Each service page leads with **its own plate type** from §4, so the five pages don't look interchangeable. SEO & GEO opens with the answer-anatomy plate, for example, and Brand with the identity construction plate.

### 5.3 Case study (`/work/[slug]`)

```
┌──────────────────────────────────────────────────────┐
│ Project title (Cormorant display), cols 1–9          │
│ Summary bar: definition list — Client / Industry /   │
│ Services / Year / CALIX role                         │
├──────────────────────────────────────────────────────┤
│ Lead plate, full width (the defining image of the    │
│ project), caption: PLATE 1 — …                       │
├──────────────────────────────────────────────────────┤
│ Situation and objective, cols 2–7 │ Key decision      │
│                                   │ (pull statement)  │
├──────────────────────────────────────────────────────┤
│ Plates 2…n in sequence, one per service delivered:   │
│ identity → website → search → growth                 │
│ Each: plate cols 1–8 + short text cols 10–12         │
├──────────────────────────────────────────────────────┤
│ Outcome: approved figures only, set in Cormorant,    │
│ each with baseline, period and source beneath it.    │
│ If none: "What we delivered" list.                   │
├──────────────────────────────────────────────────────┤
│ Client quote (permissioned only)                     │
├──────────────────────────────────────────────────────┤
│ Services used (links) │ Next project                 │
│ Olive band: Start a similar project                  │
└──────────────────────────────────────────────────────┘
```

- The plate sequence follows the services actually delivered, in the order they happened. That's a real sequence, so plate numbers are legitimate here.
- Concept projects use the same layout with a "Concept" label in the summary bar and no outcome section.
- The other case-study structures (short, visual-only) are subsets of this layout (`docs/portfolio-inventory.md` §5).

### 5.4 Studio and Contact

- **Studio:** an entity definition as the opening statement. Principles in hairline columns. The process as a full Espresso section (the same visual language as the Home "how we work" band, at greater depth). Team as portrait plates (real photography only). An honest capability and partner statement.
- **Contact:** a two-column form layout on desktop (what happens next, cols 1–4; form, cols 6–12). Single column on mobile. No imagery competing with the form. Ivory background for maximum form legibility.

---

## 6. Colour in use

| Surface | Use | Text on it |
|---|---|---|
| Ivory | Default page | Espresso (body), Olive (secondary text and links) |
| Travertine | Plate fields, secondary panels | Espresso, Olive |
| Espresso | Process band, footer, emphasis sections | Ivory (body), Travertine (secondary), **Gold for numerals and labels**, which passes at every size (5.18:1) |
| Olive | Final CTA band, primary buttons | Ivory |
| Gold | Hairlines, numerals on Espresso, small marks | Never a text colour on Ivory, Travertine or Olive |

**Correction to `calix-brand`:** The skill allows Gold display type of 32px or more on Ivory. Measured contrast is **2.75:1**, which fails WCAG AA even for large text (3:1). This system therefore uses Gold text **only on Espresso**. On light grounds, Gold is limited to decorative hairlines and marks that carry no information. Proposed as a skill update (§10).

**Proportion target** (unchanged from `calix-brand`): Ivory 60–70%, Espresso 15–20%, Travertine around 10%, Olive 5–10%, Gold under 5%.

---

## 7. Mobile-specific compositions

Mobile has its own compositions, not shrunken desktop layouts.

| Element | Desktop | Mobile (390) |
|---|---|---|
| Header | Wordmark, four links, compact outline CTA | Wordmark, compact CTA, "Menu" button. The CTA stays visible. |
| Hero | Headline cols 1–8, index at the right | Headline, lead, full-width primary CTA, then the index with each descriptor **below** its service name |
| Device plate | Browser and mobile frame together | **Mobile frame only**, centred, about 60% of the plate width. The desktop frame is dropped, because showing it at 350px wide shows nothing. |
| Identity plate | Construction grid with leaders | Same plate, annotations reduced to one, caption stacked |
| Format set plate | All formats side by side | Two formats at a time, vertical sequence. No horizontal scroll. |
| System and journey plates | Horizontal diagrams | Redrawn vertically. Never shrunk until labels fall below 12px. |
| Plate captions | Label left, fact right | Stacked: label, then fact |
| Asymmetric splits (7/5, 8/4) | Side by side | Stacked, with the plate first and text after, plus 64px between stacked plates |
| Process steps | Four columns | A vertical list with gold rules |

Validated in the preview: no horizontal overflow at 390, and the primary CTA is visible in the first viewport.

---

## 8. Motion principles

From `scroll-storytelling`, applied to this direction.

1. **Motion draws, it doesn't decorate.** The motion vocabulary comes from drawing: a hairline extends, an annotation leader reaches its target, a frame resolves, a plate opens. No fade-up on every section.
2. **Most of the page is still.** Text is present on first paint. Motion is reserved for the plates and for two or three signature moments.
3. **Never hijack scrolling.** No snapping, no scroll-locking, no smooth-scroll layer by default.
4. **Reduced motion:** every plate shows its final drawn state. Pinned sequences become stacked plates.
5. **Performance:** animate `transform`, `opacity` and `clip-path` only. Hairline drawing uses `transform: scaleX` on a 1px element, not width animation.

### Signature moments

Candidates considered:

| # | Candidate | Decision |
|---|---|---|
| A | **The thread:** one gold hairline travels from the identity plate into the website header, into the search anatomy, into the enquiry form, showing "one line of thought" | **Selected.** It visualises the core differentiation (`docs/strategy.md` §4.2). |
| B | **Plate opening:** a featured-work plate expands from its column into full width as it enters, and the caption bar draws beneath it | **Selected.** It's the transition from home into proof, and the only image-scale moment. |
| C | **Annotations resolve:** leaders and labels draw in once a plate settles | **Selected, ambient level.** Short, once per plate, never repeated. |
| D | Hero headline lines re-space into the first section heading | Cut. It competes with the hero CTA and adds risk to LCP. |
| E | Horizontal scroll through selected work | Cut. Little benefit, a mobile overflow risk, and the work is better seen vertically and large. |
| F | Cursor-following crosshair "measuring" the page | Cut. A gimmick, and inaccessible. |

**Superseded in detail by `docs/scroll-narrative.md` (Phase 4):** moment A becomes S1 (one specimen carried through a sticky plate) instead of a page-long thread. B becomes S2 and C becomes S3. The expected toolset is CSS plus one small scroll library only if moment A needs scrubbing (`scroll-storytelling` §12).

---

## 9. Validation (browser preview)

A throwaway HTML preview was built in the session scratchpad (not in the repository, not production code), rendered with Playwright and Chromium at 1440×900 and 390×844, and checked with the `calix-brand` palette checker.

| Round | Findings | Changes made to the direction |
|---|---|---|
| 1 | Primary CTA below the fold at 1440. Hero showed no digital work. Services list numbered 01–05 (not a sequence). The device frame and annotation overflowed the plate. One heading lost its font through a scoped selector. On mobile the header CTA was hidden. Desktop and mobile frames overlapped at 390. Captions were cramped. The palette checker flagged a CSS gradient used for the construction grid. | Hero spacing tightened, and the work plate now peeks into the first viewport. Numbers replaced with descriptors. Plate containment rule (§3.1). Heading styles set globally (`docs/design-system.md` §3). Mobile header CTA required. Mobile device composition (§7). Stacked captions. Construction grids drawn with SVG, never gradients. |
| 2 | All round-1 issues resolved. Palette checker: 0 issues. No overflow at either width. Both fonts loaded. **Remaining:** the headline overlaps the index column, there are two solid primary buttons in one viewport, and mobile index descriptors are tight. | Headline restricted to cols 1–8. Header CTA becomes the compact outline style. Mobile descriptors move below names. |

**Confirmed by the preview:** the type scale, the plate concept, the identity-construction and answer-anatomy plates, gold numerals on Espresso, the Olive CTA band, and the hairline service index.
**Not validated yet:** real project imagery (none supplied), motion, tablet (768), and dark-band contrast on real photography.

---

## 10. Decisions needed

| # | Decision | Recommendation |
|---|---|---|
| 1 | **Confirm fonts** (brief D5): Cormorant Garamond and Jost | Confirm. Validated in the preview. |
| 2 | **CALIX logo.** None has been supplied. The preview used a tracked Cormorant wordmark as a stand-in. | Supply the existing logo, or commission a CALIX wordmark as the first identity project. It would also be CALIX's own identity case. |
| 3 | **Update `calix-brand`** to remove "Gold display type of 32px or more on Ivory" (fails AA at 2.75:1), and to state "Gold text on Espresso only" | Approve the update. |
| 4 | **Code excerpts** on development plates would need a monospace face, which is a third family | Avoid at launch. Show development through system diagrams and standards annotations. Revisit if a project needs code shown. |
| 5 | **Photography budget** for team portraits and material photography | Commission a small shoot. Stock material imagery should be a last resort (`docs/imagery-direction.md` §6). |
| 6 | **Approved portfolio assets** | Without them, the plates have nothing to hold. This remains the critical gap (`docs/portfolio-inventory.md`). |
