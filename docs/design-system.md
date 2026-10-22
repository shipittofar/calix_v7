# CALIX — Design System

**Phase:** 3 — Art direction
**Status:** Token and component specification for implementation. Tokens are framework-agnostic and written as CSS custom properties.
**Last updated:** 2026-10-09
**Related:** `docs/art-direction.md` (concept and compositions), `docs/imagery-direction.md`, `docs/conversion-strategy.md` (CTA hierarchy and forms)

All values here were checked in the Phase 3 preview (`docs/art-direction.md` §9) at 1440 and 390 widths, unless marked *(not yet validated)*.

---

## 1. Colour

### 1.1 Primitives (the only colour values in the system)

```css
--color-espresso:   #2E1E14;
--color-ivory:      #F6F1E8;
--color-travertine: #D9C9A8;
--color-gold:       #B08D57;
--color-olive:      #4B5236;
```

No tints, shades, `rgba()` variants, `#FFFFFF` or `#000000`. Photography is the only exception (`calix-brand` §1).

### 1.2 Semantic tokens

| Token | Value | Use |
|---|---|---|
| `--surface-page` | ivory | Default background |
| `--surface-plate` | travertine | Plate fields, secondary panels |
| `--surface-inverse` | espresso | Process band, footer, emphasis sections |
| `--surface-action` | olive | Primary buttons, final CTA band |
| `--text-primary` | espresso | Body and headings on ivory or travertine |
| `--text-secondary` | olive | Secondary text and descriptors on ivory or travertine |
| `--text-inverse` | ivory | Text on espresso or olive |
| `--text-inverse-secondary` | travertine | Secondary text on espresso |
| `--text-accent-inverse` | gold | Numerals and labels **on espresso only** |
| `--rule-strong` | espresso | Plate caption rules, index top rule, input borders |
| `--rule-subtle` | travertine | Dividers between list rows (decorative) |
| `--rule-accent` | gold | Hairlines on espresso; decorative marks on light grounds |
| `--focus-ring` | espresso (light grounds) / ivory (espresso and olive grounds) | Keyboard focus |

### 1.3 Measured contrast (WCAG 2.x)

| Pair | Ratio | Allowed for |
|---|---|---|
| Espresso / Ivory | 14.23 | All text |
| Espresso / Travertine | 9.81 | All text |
| Ivory / Olive | 7.29 | All text, buttons |
| Espresso / Gold | 5.18 | All text (Gold text on Espresso; Espresso text on Gold) |
| Olive / Travertine | 5.03 | All text |
| Gold / Ivory | 2.75 | **Decoration only.** Fails 3:1, even for large text. |
| Gold / Olive | 2.65 | Decoration only |
| Espresso / Olive | 1.95 | Never |
| Gold / Travertine | 1.89 | Decoration only |
| Ivory / Travertine | 1.45 | Never |

**Non-text contrast (WCAG 1.4.11):** Form field borders and focus indicators must reach 3:1. Use Espresso or Olive borders on light grounds, never Travertine. Travertine hairlines are allowed only where they are decorative, such as list dividers next to clearly separated text.

### 1.4 States without new colours

| State | Treatment |
|---|---|
| Hover, primary button | Olive → Espresso fill |
| Hover, secondary button | Espresso outline → Espresso fill, Ivory label |
| Hover, link | Underline thickness 1px → 2px |
| Focus | 2px solid ring, 3px offset, using `--focus-ring` |
| Error | Espresso text, an "Error:" prefix, a 2px Espresso left rule on the field, `aria-describedby` and `aria-invalid`. Colour is never the only signal. |
| Success | Confirmation text plus the `/contact/thank-you` page. No green. |
| Disabled | Avoided. Buttons stay enabled and validation explains what's missing. |

---

## 2. Typography

### 2.1 Families

```css
--font-display: "Cormorant Garamond", Garamond, "Times New Roman", serif;   /* 500, 600 */
--font-text:    Jost, Futura, "Helvetica Neue", Arial, sans-serif;          /* 400, 500 */
```

- Load only these four weights. Use `font-display: swap`, preconnect, and preload Cormorant 500 and Jost 400 (the LCP-critical faces). Self-hosting is preferred at build time for performance and privacy.
- **No third family.** Technical annotations use Jost with `font-variant-numeric: tabular-nums`.

### 2.2 Scale (fluid between 390 and 1440)

| Token | Family / weight | Mobile → Desktop | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `--type-display` | Cormorant 500 | 48 → 112px | 1.0 | -0.02em | Home hero only |
| `--type-h1` | Cormorant 500 | 40 → 80px | 1.05 | -0.015em | Page titles (service, case study, studio) |
| `--type-h2` | Cormorant 500 | 34 → 60px | 1.08 | -0.01em | Section headings |
| `--type-h3` | Cormorant 500 | 26 → 34px | 1.15 | 0 | Sub-sections, process step titles |
| `--type-h4` | Cormorant 600 | 21 → 24px | 1.25 | 0 | Small headings, quote attribution |
| `--type-lead` | Jost 400 | 19 → 21px | 1.55 | 0 | Intro paragraphs |
| `--type-body` | Jost 400 | 17 → 18px | 1.6 | 0 | Body text |
| `--type-small` | Jost 400 | 15px | 1.5 | 0 | Secondary text, descriptors, footer |
| `--type-annotation` | Jost 500, tabular | 13px | 1.35 | 0 | Plate annotations and facts |
| `--type-label` | Jost 500, uppercase | 12px | 1.3 | 0.14em | **Plate captions and buttons only** |
| `--type-numeral` | Cormorant 500, lining | 36 → 44px | 1.0 | 0 | Process step numerals (Gold on Espresso) |

Implementation: each `clamp()` is derived from the two endpoints, e.g. `--type-display: clamp(48px, 24.2px + 6.1vw, 112px)` *(exact formula set in the build phase)*.

### 2.3 Rules

- Body measure is 60–75 characters (`max-width: 34–40rem`). Lead text has a maximum of 34 characters per line in the hero.
- Headings are set at **element level** (`h1`–`h4`), not inside section classes. The preview showed that a scoped selector let a heading fall back to Jost bold.
- No single highlighted word in headlines (no italic, colour or bold accent on one word).
- Headlines are short (2–8 words). Avoid single-word orphans on the last line: use `text-wrap: balance` on headings.
- Sentence case everywhere, except labels and buttons.
- No exclamation marks. Voice rules follow `calix-brand` §4.

---

## 3. Layout grid

| Breakpoint | Range | Columns | Outer margin | Gutter |
|---|---|---|---|---|
| Mobile | < 768px | 4 | 20px | 16px |
| Tablet | 768–1199px | 8 | 40px | 20px |
| Desktop | 1200–1599px | 12 | 72px (5vw, capped) | 24px |
| Wide | ≥ 1600px | 12 | Content centred at a maximum width of 1456px; plate fields may run full-bleed | 24px |

```css
--margin: clamp(20px, 5vw, 72px);
--gutter: clamp(16px, 1.7vw, 24px);
--content-max: 1456px;
```

### Common spans (desktop)

| Pattern | Spans | Use |
|---|---|---|
| Statement | 1–8 | Hero headline and section statements |
| Plate + note | Plate 1–8, note 10–12 | Lead plates with commentary |
| Asymmetric pair | 1–5 and 7–12, or 1–7 and 9–12 | Text and plate pairings, alternated down the page |
| Reading column | 2–8 | Long-form text in articles and case studies |
| Index | 8–12 | Hero service index, summary bars |

- Alignment is left-aligned throughout. No centred body text. Centring is reserved for content inside a plate.
- Tablet rule: collapse 12-column patterns to 8 columns with the same proportions where possible. Otherwise stack *(not yet validated)*.

---

## 4. Spacing

The base unit is 4px.

| Token | px | Typical use |
|---|---|---|
| `--space-1` | 4 | Icon or text nudges |
| `--space-2` | 8 | Label to value |
| `--space-3` | 12 | Caption bar padding |
| `--space-4` | 16 | Inside small components |
| `--space-5` | 24 | Between related elements |
| `--space-6` | 32 | Heading to body |
| `--space-7` | 48 | Between groups within a section |
| `--space-8` | 64 | Between stacked plates on mobile; plate padding (desktop) |
| `--space-9` | 96 | Section padding (mobile) |
| `--space-10` | 128 | Section padding (desktop) |
| `--space-11` | 192 | Rare: before the final CTA band on long pages |

**Rhythm rule:** space inside a group is always clearly smaller than space between groups.

---

## 5. Lines, edges, surfaces

| Property | Value |
|---|---|
| Border radius | `0` everywhere. Up to 2px allowed on form controls only if a browser default needs it. |
| Shadows | None |
| Gradients | None. This includes CSS gradient tricks for grid patterns: construction grids are SVG. |
| Hairline | 1px solid. Strong = Espresso, subtle = Travertine, accent = Gold. |
| Plate frame | 1px Espresso around browser and device frames. The plate field itself has no border. |
| Overlays on photos | Solid palette fields only, used beside an image rather than over it where possible |

---

## 6. Components

### 6.1 Header and navigation

| Part | Desktop | Mobile |
|---|---|---|
| Height | 80px | 64px |
| Wordmark | Cormorant 600, 26px, tracking 0.18em *(stand-in until the logo is supplied)* | 22px |
| Links | Jost 400, 15px, sentence case. Hover and active: 1px Espresso underline at a 6px offset. Current page: `aria-current="page"` plus a persistent underline. | Inside the menu panel |
| CTA | **Compact secondary:** 1px Espresso outline, label style, 40px high | Same, beside "Menu" |
| Bottom rule | 1px Travertine (decorative) | Same |
| Behaviour | Sticky without shrinking or changing colour (required on the home page by `docs/scroll-narrative.md` §5; recommended site-wide) | Sticky. The menu opens as a full-height Ivory panel, focus is trapped while open, Escape closes it, and the trigger has `aria-expanded`. |
| Services menu | A disclosure panel listing the five services with one-line descriptors, plus "All services" and "Not sure where to start? Digital Diagnostic". Text only, no images. | Listed in the menu panel |

The header CTA uses the outline style so that the solid primary button in the hero or section is the only solid button in a viewport (`docs/conversion-strategy.md` §2.1, refined by the preview).

### 6.2 Buttons and links

| Variant | Spec | Used for |
|---|---|---|
| **Primary** | Olive fill, Ivory label (Jost 500, 13px, uppercase, 0.14em), 48px minimum height, 28px horizontal padding, no radius | "Start a project" in heroes and section ends, form submit |
| **Primary on Olive band** | Ivory fill, Olive label | The final CTA band |
| **Secondary** | 1px Espresso outline, Espresso label | Request a Diagnostic, header CTA (compact: 40px) |
| **Secondary on Espresso** | 1px Ivory outline, Ivory label | CTAs inside dark bands |
| **Text link** | Inherit colour, 1px underline at a 4px offset; 2px on hover | In-content navigation: "See the project", "See how we work" |

- Labels follow `docs/conversion-strategy.md` §2.2. No "→" appended, no generic labels.
- Touch targets are at least 44×44px. On mobile, primary CTAs in heroes are full width.
- CTA microcopy (reply time and similar) sits next to or under the button in `--type-small`.

### 6.3 Plate

| Part | Spec |
|---|---|
| Field | `--surface-plate` (Travertine), or Ivory with a 1px Espresso frame when it sits on a Travertine panel |
| Padding | 64px desktop (88px bottom when annotations sit inside), 24px mobile |
| Content | One subject. Browser frame, device frame, construction drawing, diagram or photograph. |
| Browser frame | 1px Espresso border. A 32px top bar with three 8px square outline markers and an address field (1px Travertine, real domain only if approved). |
| Device frame (mobile) | 1px Espresso border, 8px inner padding, 9:19.5 ratio. Kept fully inside the plate. |
| Annotation | Leader: 1px Espresso line, 40px, drawn with `transform: scaleX` when animated. Text: `--type-annotation`. Maximum three per plate. Facts only. |
| Caption bar | 1px Espresso top rule, 12px padding. Left: `--type-label` ("PLATE 2 — RESPONSIVE WEBSITE"). Right: one fact in `--type-annotation`. Stacked on mobile. |
| Media | `<img>` with explicit `width` and `height`, `srcset`, `sizes` and `alt` (`docs/imagery-direction.md` §8) |

### 6.4 Service index (hero)

A list of the five services: a 1px Espresso top rule, 1px Travertine row dividers, the service name in Jost 400 16px, and a descriptor in Olive 14px. Desktop: name and descriptor share a row. Mobile: the descriptor goes below the name. **No numbering.** Each row is a link to its service page, and the whole row is the hit area.

### 6.5 Definition list (summary bars, meta)

Used for case-study summaries and any "label: value" meta. `<dl>` with the label in `--type-label` (Olive on light, Gold on Espresso) and the value in `--type-body`. Laid out in columns on desktop and stacked on mobile. Replaces "A · B · C" meta strings.

### 6.6 Process steps

Used only for real sequences. A Gold hairline on top, the numeral in `--type-numeral` (Gold on Espresso), the title in `--type-h3`, the description in Travertine. Four columns on desktop, a vertical list on mobile.

### 6.7 Quote

Quote text in Cormorant 500, 28 → 40px, Espresso, cols 2–10. Attribution in Jost 15px: name, role and company, exactly as approved. A 1px Gold hairline of 64px above it. Published only with written permission.

### 6.8 Outcome figures

The figure is set in Cormorant 500, 56 → 88px, Espresso on Ivory (never Gold on Ivory). Beneath it, a description plus "Baseline [X], [period], source: [tool]" in `--type-annotation`. **Only approved E3 metrics.** Without them, the section becomes "What we delivered".

### 6.9 Forms

| Part | Spec |
|---|---|
| Label | Jost 500, 15px, Espresso, above the field, always visible |
| Help text | Jost 400, 14px, Olive, linked via `aria-describedby` |
| Input | Ivory fill, 1px Olive border (7.29:1), 48px minimum height, Jost 17px |
| Focus | 2px Espresso ring, 3px offset |
| Checkbox and radio | 20px squares or circles drawn in Espresso, with labels as hit areas (at least 44px rows) |
| Error | See §1.4. Plus a summary at the top of the form that receives focus. |
| Layout | Single column, with a maximum width of 40rem for the form column |

### 6.10 Footer

Espresso ground. Positioning line in Cormorant (Ivory). Link columns in Jost 15px (Travertine, underline on hover). Legal line in Jost 14px. Gold hairline at the top. Focus ring in Ivory.

### 6.11 Breadcrumbs

Jost 14px, Olive, separated by a "/" character, with `aria-label="Breadcrumb"` and `aria-current="page"` on the last item. Paired with `BreadcrumbList` schema.

### 6.12 Charts (measurement plates)

Series order: Espresso, Olive, Gold, Travertine (`calix-brand` §5). Gridlines are 1px Travertine. Labels are in Jost and placed directly on the data where possible. No legends where direct labels work, no 3D, no shadows. Every chart has a text equivalent (a summary sentence plus a data table or `figcaption`). Approved data only. Diagrams without data are labelled "Diagram".

---

## 7. Motion tokens

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveals, hairline drawing |
| `--dur-micro` | 200ms | Hover, focus, underline |
| `--dur-ui` | 400ms | Menu open, disclosure |
| `--dur-draw` | 800ms | Annotation leader or caption rule drawing |
| `--dur-reveal` | 1000ms | Plate opening (when triggered rather than scrubbed) |

Under `prefers-reduced-motion: reduce`, all durations go to 0ms or to a ≤150ms opacity change, and every final state is shown. Principles and signature moments are in `docs/art-direction.md` §8.

---

## 8. Iconography

Avoid icons by default. If one is needed (menu, close, external link, disclosure chevron), use a 1.5px stroke line icon in the current text colour at 20–24px, with an accessible name on its control. No icon sets used as decoration, and no icon-plus-title feature grids.

---

## 9. Implementation guardrails

1. Run `calix-brand/scripts/check_palette.py` on every stylesheet and template. It must report 0 issues.
2. Define colours **only** through the primitives in §1.1. Lint for stray hex values.
3. Set heading styles at element level, and use low-specificity component classes, to avoid the cancellation bug found in the preview.
4. All hidden or initial animation states are applied by JavaScript (or a class it adds), never in base CSS, so content shows without JS.
5. Reserve image space with `width` and `height` or `aspect-ratio` on every plate image to prevent layout shift.
6. Run `calix-visual-qa` at 1440, 768 and 390 before any page is called done.
