# CALIX — Master Project Brief

**Status:** Confirmed business decisions (briefing step). No production website code has been written.
**Last updated:** 2026-10-09
**Precedence:** This brief overrides any conflicting assumption in earlier planning prompts. Where it conflicts with an installed skill, this brief wins and the conflict is listed in [§10 Reconciliation](#10-reconciliation-with-installed-skills) for resolution.

---

## 1. Roles

Claude acts as lead strategist, creative director and technical partner for CALIX.

## 2. Confirmed business decisions

| Decision | Value |
|---|---|
| Brand name | CALIX |
| Market | International |
| Website language | English |
| Primary business objective | Generate qualified direct project enquiries |
| Portfolio status | Real client work exists |
| Visual direction | Premium editorial, architectural, cinematic, tactile, restrained |
| Business model | Digital branding, web design and development, digital marketing, SEO/GEO, growth optimization |

## 3. Positioning

> "CALIX connects strategy, design, technology and growth to build stronger brands and better digital experiences."

## 4. Services

1. **Brand Strategy & Identity:** brand positioning, logo design, visual identity, graphic design, campaign creatives and advertising banners.
2. **Web Design & Development:** UX/UI, corporate websites, landing pages, e-commerce, custom frontend and backend development.
3. **Digital Marketing:** digital strategy, paid campaigns, social media, content marketing and analytics.
4. **SEO & GEO:** technical and content SEO, search visibility, useful information architecture and responsible AI search visibility practices.
5. **Growth & Conversion:** analytics, conversion optimization, landing-page improvement and lead-generation journeys.

## 5. Business objective, applied

Every major page must help a prospective client to:

1. **Understand** the service.
2. **Evaluate** credibility, using real and verified evidence only.
3. **Take a clear next step** toward discussing a project.

## 6. Brand colors

| Name | Hex |
|---|---|
| Espresso | `#2E1E14` |
| Ivory | `#F6F1E8` |
| Travertine | `#D9C9A8` |
| Antique Gold | `#B08D57` |
| Olive | `#4B5236` |

Contrast constraints (WCAG ratios, from the `calix-brand` skill):

- Espresso on Ivory: 14.2. Espresso on Travertine: 9.8. Ivory on Olive: 7.3. Espresso on Gold: 5.2. Olive on Travertine: 5.0. These pairs may carry body text.
- Antique Gold on Ivory is 2.75, so use it only for large display type (32px or larger) and decoration. Never use it for body text, captions or small labels.
- Espresso on Olive and Ivory on Travertine must never carry text.

## 7. Non-negotiable rules

- Read `CLAUDE.md` and the relevant installed skills before working.
- Inspect existing code before modifying it.
- Do not replace existing work without a clear reason.
- **Do not invent** clients, testimonials, awards, metrics or case-study outcomes.
- Use only verified information for real client projects.
- Preserve confidentiality, and get approval before publishing sensitive client information.
- Label concept work explicitly.
- Do not guarantee SEO rankings or AI recommendations.
- Accessibility, responsive design, security and performance are core requirements, not polish.
- Scroll storytelling supports the narrative. It does not decorate every section.
- Do not deploy or alter production infrastructure without authorization.

## 8. Working method

Execute the approved project phases in order.

**Before each phase:**

1. Read the relevant project documents.
2. Inspect the existing implementation.
3. Identify dependencies and risks.
4. State the planned changes.

**After each phase:**

1. Run appropriate checks.
2. Summarize files changed.
3. Report what was actually tested.
4. List blockers and decisions needed.
5. Do not claim completion while essential work remains.

---

## 9. Repository audit (2026-10-09)

| Item | Finding |
|---|---|
| Repository | `saba787/calix_v1` |
| Commits / branches | None. The repository is empty, with no commits on any remote branch. Work branch: `claude/quirky-cannon-o525ld`. |
| Application code | None. There is no framework, `package.json`, components or styles. |
| `CLAUDE.md` | Does not exist. |
| Existing design tokens | None in the repo. The palette exists only in this brief and the `calix-brand` skill. |
| Portfolio / case-study material | None in the repo. |
| Deployment / infrastructure config | None. |

**Implication:** There is no existing implementation to preserve or reconcile. The current sources of truth are this brief and the installed CALIX skills (`calix-brand`, `calix-geo`, `scroll-storytelling`, `calix-visual-qa`, `conversion-strategist`, `technical-seo`, `accessibility-audit`, `web-performance`).

## 10. Reconciliation with installed skills

| # | Topic | Installed skill says | This brief says | Resolution |
|---|---|---|---|---|
| R1 | Positioning line | `calix-geo` entity profile: "CALIX builds memorable brands and digital systems designed to grow." | "CALIX connects strategy, design, technology and growth to build stronger brands and better digital experiences." | **Brief wins.** The skill's entity profile is out of date and needs updating (see D1). |
| R2 | Service architecture | Three disciplines: Brand, Digital, Growth. | Five services, including Digital Marketing. | **Brief wins on the five services.** Still to decide: whether the five services group under three pillars for navigation and schema (D2). |
| R3 | Digital Marketing scope | Not in the `calix-geo` disciplines (no paid campaigns, social media or content marketing). | Digital Marketing is a core service. | The entity profile must add these disciplines. |
| R4 | Brand Identity scope | Lists strategy, positioning, visual identity, creative and art direction. | Adds logo design, graphic design, campaign creatives and advertising banners. | The entity profile must add these. |
| R5 | Development scope | Web development (unspecified). | Custom frontend **and backend** development. | The entity profile must add these. |
| R6 | Homepage narrative | `scroll-storytelling` default: Hero → Brand → Digital → Discoverability → Growth → Work → Proof → CTA. | Five services. | Marketing has no beat yet. Decide whether to merge it into Growth or give it a separate beat when the homepage narrative is mapped (D3). |
| R7 | Evidence status | `calix-geo`: no first-party evidence supplied, so placeholders are used everywhere. | Real client work exists. | No verified project material has been provided yet. Placeholders stay until each project is supplied and approved (D4). |
| R8 | Typography | `calix-brand`: Cormorant Garamond plus Jost, labelled "proposed". | Not specified. | Use Cormorant Garamond plus Jost as the working default until confirmed (D5). |
| R9 | Palette strictness | `calix-brand`: only the five exact hexes; no tints, `rgba()`, white or black, including for states. | Five colors confirmed. | Consistent. Error and success states must use palette colors plus non-color cues (icon or text) to stay accessible. |
| R10 | Classification guardrail | `calix-geo`: CALIX must not read as an architecture, interior or hospitality firm. "Architectural" is a visual metaphor only. | Visual direction is "architectural". | Consistent. Copy, alt text and schema must not imply physical-space services. |

## 11. Decisions needed

| ID | Decision | Why it blocks |
|---|---|---|
| D1 | Approve updating the `calix-geo` entity profile (positioning line plus the added disciplines in R3–R5). Otherwise keep a project-local profile in `docs/`. | Every GEO check validates against that profile. While it is out of date, it will flag correct copy as inconsistent. |
| D2 | Should the five services be grouped under pillars (for example Brand / Digital / Growth), or presented as five peers? | Sets the navigation, URL structure, schema and homepage narrative. |
| D3 | ~~Where Digital Marketing sits in the homepage scroll narrative.~~ **Resolved (Phase 4):** its own stage, removed if gate G2 is not met. See `docs/scroll-narrative.md`. | — |
| D4 | The list of real client projects, and for each one: client approval to name it, which facts are verified, which metrics may be published, and available imagery. | Case studies and proof sections cannot be built without verified material. |
| D5 | Confirm fonts (Cormorant Garamond and Jost) or supply alternatives. | Needed before design tokens are set. |
| D6 | The approved project phase list. The brief refers to "approved project phases", but no phase document exists in the repo. | Phases must run in order, so the order needs to exist. |
| D7 | Technical stack (for example Next.js or Astro), hosting target, and how enquiries are delivered (email, CRM, form service). | Needed before any build phase. Deployment needs explicit authorization. |
| D8 | Missing entity facts: legal name, founding year, location or service area, founders and team, official profile URLs. | Needed for the About page, Organization schema and E-E-A-T. Placeholders are used until supplied. |
| D9 | Enquiry qualification criteria (for example budget ranges, project types, timelines) to ask for on the contact form. | The objective is *qualified* enquiries, so the form has to be designed around these criteria. |

## 12. Risks

- **Evidence gap.** Credibility is the second step of the business objective. Without approved case studies the site can explain services but cannot prove them. Gathering client approvals takes time, so start it early.
- **Scope breadth.** Five services, from logo design to backend development to paid media, can read as a generalist agency. Positioning must show how they connect, not just list them.
- **Brand constraints vs. accessibility.** The strict five-color palette leaves few compliant text pairs (§6). Every component must be checked against them.
- **Motion vs. performance and accessibility.** Cinematic scroll storytelling must be progressive enhancement, respect `prefers-reduced-motion`, and never delay CTAs.
- **Skill drift.** Installed skills encode older assumptions (R1–R6). Until they are updated, follow this brief where they conflict.
