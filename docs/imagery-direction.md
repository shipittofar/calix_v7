# CALIX — Imagery Direction

**Phase:** 3 — Art direction
**Status:** Direction set. **No approved project imagery exists yet** (`docs/portfolio-inventory.md`), so every evidence slot below is specified but empty.
**Last updated:** 2026-10-09
**Related:** `docs/art-direction.md` §3–4 (plates and capability plate types), `docs/design-system.md` §6.3 (plate specification)

---

## 1. Principle

> **Show the work. Atmosphere supports it, never replaces it.**

A prospect judges CALIX by the digital work they can see. Every image on the site is classed by what it proves, and the classes are never swapped.

---

## 2. Image hierarchy

| Rank | Class | What it is | Where it may appear | May fill an evidence slot? |
|---|---|---|---|---|
| 1 | **Project work** | Real, approved screenshots, identity files, campaign assets and product interfaces from client projects (P1/P2) | Plates on Home, Work, case studies, service pages | **Yes.** It's the only class that can. |
| 2 | **Process artefacts** | Real workshop outputs, sitemaps, wireframes, construction drawings and measurement plans from real projects (approved), or from CALIX's own work | Case studies, Studio (process), service pages ("How it works") | Supports evidence. Doesn't replace outcomes. |
| 3 | **Diagrams** | Drawn explanations: search and answer anatomy, system architecture, enquiry journey. Labelled "Diagram". | Service pages, articles | No. They explain method, not results. |
| 4 | **Studio and people** | Real photography of the team and the way they work | Studio, contact (optional), articles (author) | Supports trust only |
| 5 | **Material and architectural atmosphere** | Stone, plaster, timber, linen, paper, light and shadow | Sparingly: section transitions, the Studio opening, article headers | **Never** |

### Atmosphere limits

- At most **one** atmosphere image per page, and none on Contact.
- Never in a plate slot reserved for project work, and never captioned or placed in a way that suggests it shows a client project.
- No images of buildings, interiors, rooms or furniture presented in a way that suggests CALIX designs physical spaces (`calix-geo`). Material close-ups and abstract light are preferred over recognisable architecture.
- If a service page has no project work yet, use a diagram (class 3), not atmosphere.

---

## 3. Presenting digital work

### 3.1 Browser frames

- Drawn flat, as specified in `docs/design-system.md` §6.3: 1px Espresso frame, square markers, an address field.
- The address field shows the **real domain** only when the client is published by name (P1). Otherwise it's left blank or shows a neutral descriptor, never a fake domain.
- **No** tilted perspective mockups, glossy device renders, floating laptops, hands holding phones, or shadows.

### 3.2 Device compositions

| Composition | Use | Rules |
|---|---|---|
| Desktop + mobile pair | Lead website plates on desktop | Same page, same moment. The mobile frame overlaps the desktop frame's lower right and stays inside the plate. |
| Mobile trio | Showing a mobile journey (e.g. landing → proof → form) | Three mobile frames in a row, in sequence order. A plate number or annotation explains the sequence. |
| Breakpoint set | Showing responsive behaviour | 1440 / 768 / 390 frames at true relative scale, annotated with widths |
| Detail crop | UI details: navigation, form, component states | Cropped at 1:1 or 2:1 pixel density, framed without the browser bar, annotated |
| Mobile only | All device plates on screens below 768px | The mobile frame alone, centred, at about 60% of plate width (`docs/art-direction.md` §7) |

### 3.3 Screenshot capture standard

| Item | Standard |
|---|---|
| Source | The live site or a staging build of the real project. Not design files presented as if live, unless they're labelled "Design". |
| Viewports | 1440×900 desktop, 768×1024 tablet, 390×844 mobile. Full-page captures are kept as source files. |
| Density | Capture at 2× device pixel ratio |
| Content | Real content only. No lorem ipsum, no placeholder images left in. |
| Sensitive data | Remove or blur personal data, real customer names, prices under NDA, internal dashboards, account IDs, emails and analytics account details **before** the file enters the asset library |
| State | Cookie banners dismissed. No browser extensions visible. Consistent system fonts. |
| Dating | Record the capture date. If the client has since changed the live site, the case study says "at launch, [year]". |

### 3.4 Identity work

A sequence of plates (`docs/art-direction.md` §5.3):
1. Construction plate: the mark on an SVG construction grid, annotated with clear space and proportions.
2. System plate: colour, type and key graphic elements, laid out flat.
3. Applications plate: real applications (website header, social templates, stationery, signage only if real), photographed or rendered flat.

Use only the client's approved files. Logos are never redrawn or "improved" for the portfolio.

### 3.5 Campaigns and advertising creatives

- The **format set plate:** one campaign shown across its real formats side by side at true relative scale (1:1, 4:5, 9:16, 16:9, leaderboard 728×90, MPU 300×250, as actually produced).
- Annotate format names and the placement or channel, if approved.
- Results (CTR, conversions) appear only as approved E3 figures in the caption or outcome section, never as text inside the creative.

### 3.6 Development and technical work

- **System plate:** a hairline diagram of the project's real architecture (front end, CMS or back end, integrations, hosting), drawn in Espresso and Olive on Ivory, with Jost labels.
- **Standards annotations:** accessibility level tested, performance (field data with period, if approved), security practices. Facts only.
- No code screenshots in a third typeface (see `docs/art-direction.md` §10, decision 4). No stock "code on screen" photography.

### 3.7 Analytics, marketing and SEO visuals

- Charts follow `docs/design-system.md` §6.12: palette-only, direct labels, with a text equivalent.
- Only approved figures. Client analytics screenshots are **never** published raw. They're redrawn as clean charts from approved summary numbers, with baseline, period and source.
- **Answer-anatomy diagrams** may show generic placeholders ("[Page title]", "[domain]"). They must never show:
  - a fabricated search results page or AI answer that names CALIX, a client or a competitor;
  - real competitors' listings;
  - rankings or positions presented as achieved.
- Every diagram is captioned "Diagram, not a real result" or similar.

---

## 4. Photography style

Applies to classes 4 and 5, and to any physical brand applications that are photographed.

| Attribute | Direction |
|---|---|
| Light | Natural, directional, soft shadows. Late-morning or late-afternoon character. No flash look, no studio white sweep. |
| Colour | Warm, desaturated. Grading leans toward the palette (warm whites, umber shadows, olive and stone mid-tones). Never filtered into off-brand hues, and no colour overlays on top. |
| Material | Real texture: plaster, limestone, oak, linen, paper stock, printed matter. Tactile and close. |
| Composition | Architectural: strong verticals and horizontals, generous negative space, deliberate crops. Subject placement leaves room for the grid. |
| People | Real CALIX team members at work: workshop tables, sketching, reviewing printed plates. Candid, not posed handshakes. No stock models. |
| Portraits | Consistent series: same light, background (a plaster or stone wall in Travertine tones), crop (chest up) and framing. Shown in portrait plates. |

### Not allowed

Stock imagery of teams around laptops, handshakes or post-it walls. Abstract "AI" or "tech" imagery (glowing networks, circuit boards, neon). 3D blobs. Isometric illustrations. Flat illustrated people. Emoji. Drone shots of cities. Gradient overlays and scrims.

---

## 5. AI-generated and stock imagery

- **AI-generated images are never used as evidence:** not as project work, people, client products, results or testimonial portraits.
- AI image generation is **not used by default.** If CALIX chooses to use it for class 5 atmosphere, it must not depict identifiable people, real places presented as real, or client work, and the decision is recorded `[decision needed]`.
- **Stock photography** is allowed only for class 5 atmosphere, as a last resort, and must match §4. Licence records are kept with the asset.
- **Concept work** (self-initiated or unrealised) is labelled "Concept" in the plate caption, in alt text and in the case-study summary bar.

---

## 6. Sourcing priority

1. Approved client project assets (class 1). **Currently none.**
2. CALIX's own work: the CALIX identity, this website's build, process artefacts from real projects.
3. A commissioned photography shoot: team portraits, studio and process, material studies. This is the recommended single investment in imagery.
4. Licensed stock, for class 5 only, as a last resort.

---

## 7. Technical specifications

| Item | Spec |
|---|---|
| Formats | AVIF with WebP fallback via `<picture>`. PNG only for UI screenshots that compress badly. SVG for diagrams, construction drawings and logos. |
| Sizes | Generate 480, 768, 1080, 1440, 2160 and 2880px widths. Serve with `srcset` and an accurate `sizes`. |
| Aspect ratios | Plates use 16:10 (desktop frames), 9:19.5 (mobile frames), 4:3 (identity construction) and 3:2 or 4:5 (photography). Always declared, to prevent layout shift. |
| Loading | The first plate in the first viewport loads eagerly with `fetchpriority="high"` only if it's the LCP element. Everything else is lazy-loaded. |
| Budget | Target under 200KB for the largest above-the-fold image at 1440 *(to be checked with `web-performance` in the build phase)*. |
| Colour profile | sRGB, metadata stripped (removes location data and camera information). |
| Naming | `[project-codename]-[subject]-[viewport]-[width].avif`, e.g. `project-a-home-desktop-1440.avif` |

---

## 8. Alt text

| Image class | Alt text approach | Example |
|---|---|---|
| Project screenshot | What the page shows and why it matters in the case | "Project A home page on desktop: the new positioning statement above a single enquiry button." |
| Identity construction | The mark and the construction principle | "The Project A wordmark on a construction grid, showing clear space equal to the cap height." |
| Campaign format set | The campaign and its formats | "One campaign across square, portrait, story and banner formats." |
| Diagram | The relationship it explains, with the full explanation in the adjacent text or caption | "Diagram: how a service page's title, opening definition and structured data are read by search engines and AI systems." |
| Chart | The finding, with the data in a table or caption | "Qualified enquiries per month before and after launch. Full figures in the table below." |
| Team portrait | Name and role | "[Name], [role] at CALIX." |
| Atmosphere | Empty `alt=""` if purely decorative | — |
| Concept | Include "Concept" | "Concept: identity study for a fictional coffee roaster." |

Alt text never describes CALIX as working on physical spaces, and never states results that aren't in the approved evidence.

---

## 9. Per-project asset checklist

For each case study, CALIX supplies (or approves) the following:

| Asset | Required for | Status |
|---|---|---|
| Publication level and written permission | All | — |
| Lead image (the defining view of the project) | All | — |
| Desktop and mobile screenshots per §3.3 | Website projects | — |
| Identity files: mark, construction, system, applications | Identity projects | — |
| Campaign assets in their real formats | Campaign projects | — |
| Architecture notes for the system plate | Development projects | — |
| Approved figures with baseline, period and source | Outcome sections and measurement plates | — |
| Process artefacts (optional) | Full case studies | — |
| Client quote with written permission (optional) | Proof sections | — |
| Image rights confirmation (photography by third parties) | Any third-party photo | — |

There are no entries yet. See `docs/portfolio-inventory.md`.
