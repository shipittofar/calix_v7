# CALIX — Implementation Plan

**Phase:** 5 — Technical architecture
**Status:** Plan for approval. No production files have been created or changed.
**Last updated:** 2026-10-09

**Inputs:**
- Strategy: `docs/calix-master-brief.md`, `docs/strategy.md`
- Structure and conversion: `docs/information-architecture.md`, `docs/user-journeys.md`, `docs/conversion-strategy.md`
- Design: `docs/art-direction.md`, `docs/design-system.md`, `docs/imagery-direction.md`, `docs/scroll-narrative.md`
- Portfolio: `docs/portfolio-inventory.md`
- Skills: `technical-seo`, `web-performance`, `accessibility-audit`, `scroll-storytelling`, `calix-geo`

Several of these documents are still awaiting sign-off on open decisions (§16). The plan is designed so those decisions change configuration and content, not architecture.

---

## 1. Current repository state

| Item | Finding |
|---|---|
| Application code | None. The repository holds only `docs/`. |
| Existing stack | None, so there is nothing to preserve or migrate. |
| Runtime available | Node 22 in the development container. Chromium plus Playwright 1.56 preinstalled (for local QA). |
| Current registry versions (checked 2026-10-09) | `next` 16.4.0 · `tailwindcss` 4.3.3 · `zod` 4.6.5 · `@playwright/test` 1.64.0 |

**Conclusion:** The preferred stack is adopted as a new project. Exact versions are pinned at install time (no `^` ranges for framework packages).

---

## 2. Technology decisions

| Concern | Choice | Why | Rejected alternatives |
|---|---|---|---|
| Framework | **Next.js (App Router)**, current stable, pinned | Preferred. Server Components keep JavaScript minimal. Built-in metadata, sitemap, image, font and Server Action support cover SEO, performance and the form without extra libraries. | Astro (a fine fit, but not preferred and offers no decisive gain); static export only (would push the form to a third-party service) |
| Language | **TypeScript**, `strict: true` | Typed content model enforces publication rules at compile time | — |
| Styling | **Tailwind CSS v4**, CSS-first `@theme` | Preferred. The theme is **reset to the five CALIX colours only**, so off-palette utilities can't exist. | CSS Modules alone (fine, but loses token enforcement); CSS-in-JS (runtime cost) |
| Validation | **Zod** | One schema shared by the enquiry form (client hints and server authority) and content validation at build | Hand-written validators; react-hook-form (unnecessary with Server Actions) |
| Animation | **CSS + IntersectionObserver** (`docs/scroll-narrative.md` §6.1) | The approved spec needs triggered state changes (S1), a CSS scroll-driven clip (S2) and once-only reveals (S3). JS budget: 3KB or less. | **GSAP + ScrollTrigger: not added.** Kept only as a documented contingency if QA criterion 9 or 8 fails (§9.5). Lenis and Motion are avoided. |
| Content | **Typed TypeScript content files in the repository**, validated with Zod at build | Small, slow-changing content with strict evidence rules. Git provides review history and approval trail. | Headless CMS (no requirement: one studio team, few pages, no non-technical editors identified); database (nothing to store) |
| Long-form articles | **MDX via `@next/mdx`**, added **only when gate G3 is met** | Insights are not launched yet | — |
| Email delivery | **Mail adapter**, default **SMTP through CALIX's existing mailbox** (`nodemailer`) | Enquiries must reach CALIX (a hard requirement) without a new paid service | A transactional email API (Resend, Postmark): allowed later behind the same adapter if deliverability needs it |
| Analytics | **Provider-agnostic `track()` layer**; provider **to be decided** (§13) | Measurement is required by `docs/conversion-strategy.md` §7, but the provider choice has cost and consent implications | A tag manager (third-party weight), GA4 by default (consent banner, privacy) |
| Hosting | **Host-agnostic Next.js server output**; host **to be decided** (§15) | Needs a Node or serverless runtime for Server Actions | — |

---

## 3. Dependencies

### 3.1 Add

| Package | Type | Purpose |
|---|---|---|
| `next`, `react`, `react-dom` | runtime | Framework |
| `zod` | runtime | Form and content validation |
| `nodemailer` | runtime (server only) | SMTP adapter for enquiry email |
| `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `@types/nodemailer` | dev | Types |
| `tailwindcss`, `@tailwindcss/postcss` | dev | Styling |
| `eslint`, `eslint-config-next` | dev | Linting, including `jsx-a11y` rules shipped with the Next config |
| `prettier`, `prettier-plugin-tailwindcss` | dev | Formatting and class ordering |
| `vitest` | dev | Unit tests: schemas, content rules, spam checks, utilities |
| `@playwright/test`, `@axe-core/playwright` | dev | End-to-end, accessibility and visual capture tests |
| `schema-dts` | dev (types only) | Typed JSON-LD, with no runtime cost |

### 3.2 Add later, only when triggered

| Package | Trigger |
|---|---|
| `@next/mdx`, `@mdx-js/react` | Gate G3 (Insights) is met |
| Analytics provider script or SDK | Provider decision (§13) |
| `gsap` (includes ScrollTrigger) | S1 or S2 fails QA criteria 8 or 9 with the native approach, and the failure is shown to be fixed by scrubbing (§9.5) |
| Cloudflare Turnstile | Measured spam gets past the honeypot and timing checks (§11.3) |
| A transactional email API SDK | SMTP deliverability problems are observed |

### 3.3 Avoid

| Avoid | Reason |
|---|---|
| Lenis or any smooth-scroll layer | Forbidden by the narrative spec (normal scrolling) |
| Framer Motion / Motion, AOS, ScrollReveal | Duplicate the native approach. Encourage generic fade-ups. |
| UI component kits (MUI, Chakra, shadcn/ui, Radix) | Off-brand defaults and extra weight. The few interactive patterns (menu, disclosure, form) are built natively. |
| Icon packs | The design system avoids icons. The few needed are inline SVG. |
| react-hook-form, Formik | Server Actions plus Zod cover the form |
| CSS-in-JS libraries | Runtime cost and Server Component friction |
| Headless CMS, database, ORM | No requirement (§2) |
| Tag managers, chat widgets, heatmaps, A/B tools | Conflict with performance and the conversion anti-patterns (`docs/conversion-strategy.md` §9) |
| reCAPTCHA | Privacy and accessibility costs |
| lodash, moment and date libraries, classnames-style helpers beyond a tiny local `cx()` | Not needed |

---

## 4. Project structure

```
/
├── app/
│   ├── layout.tsx                 Root layout: fonts, header, footer, skip link, Organization JSON-LD
│   ├── page.tsx                   Home
│   ├── services/
│   │   ├── page.tsx               Services overview
│   │   └── [service]/page.tsx     Five service pages (static params from content; gated)
│   ├── work/
│   │   ├── page.tsx               Work index (gate G1)
│   │   └── [slug]/page.tsx        Case study (gate G1)
│   ├── studio/page.tsx
│   ├── insights/                  Created only when gate G3 is met
│   ├── contact/
│   │   ├── page.tsx               Enquiry form
│   │   ├── actions.ts             Server Action: submitEnquiry
│   │   └── thank-you/page.tsx     noindex confirmation
│   ├── privacy/page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css                Tailwind import, @theme tokens, base styles
├── components/
│   ├── layout/                    SiteHeader, MobileMenu*, ServicesMenu*, SiteFooter, Breadcrumbs, SkipLink
│   ├── ui/                        ButtonLink, Button, TextLink, Section, Container
│   ├── plate/                     Plate, BrowserFrame, DeviceFrame, Annotation, PlateCaption, plate types
│   ├── content/                   ServiceIndex, DefinitionList, ProcessSteps, Quote, OutcomeFigure,
│   │                              Faq, CtaBand, Chart
│   ├── home/                      Hero, Sequence, SequenceController*, ProofOpening
│   ├── motion/                    AnnotationObserver*, useMotionAllowed
│   ├── form/                      EnquiryForm*, Field, ChoiceGroup, ErrorSummary
│   └── seo/                       JsonLd, schema builders
├── content/
│   ├── site.ts                    Entity facts, navigation, gates, contact details
│   ├── services.ts                The five services
│   ├── sequence.ts                S1 stage copy and state definitions
│   ├── work/                      One folder per approved project: index.ts + approved assets
│   └── schema.ts                  Zod schemas for all content
├── lib/
│   ├── enquiry/                   schema.ts, spam.ts, mail.ts (adapter), format.ts
│   ├── analytics.ts               track() abstraction
│   ├── seo.ts                     Metadata helpers, canonical URLs
│   └── env.ts                     Validated environment variables (server only)
├── scripts/
│   └── validate-content.ts        Build-time publication-rule checks
├── tests/
│   ├── unit/                      Vitest
│   └── e2e/                       Playwright
└── docs/
```

`*` marks client components (§8). Everything else is a Server Component.

---

## 5. Routing and page templates

| Route | Template | Rendering | Gate | Notes |
|---|---|---|---|---|
| `/` | Home | Static | — | Hero, Sequence (S1), Proof (S2, G1), CtaBand |
| `/services` | ServicesOverview | Static | — | Engagement models and Digital Diagnostic |
| `/services/[service]` | ServicePage (shared, `docs/information-architecture.md` §5.3) | Static, `generateStaticParams` from `services.ts` | `digital-marketing` only if G2 | `dynamicParams = false`. Unknown slugs return 404. |
| `/work` | WorkIndex | Static | G1 | The route returns `notFound()` and is removed from navigation and sitemap while G1 is unmet |
| `/work/[slug]` | CaseStudy | Static, params from published projects | G1 | P3 projects never exist in the repo. C (concept) projects render with the concept label. |
| `/studio` | Studio | Static | G0 for the team section | The team section renders only with real entries |
| `/insights`, `/insights/[slug]` | Not created | — | G3 | Added with MDX when met |
| `/contact` | Contact | Static shell plus Server Action | — | Query params prefill the form on the client. The canonical has no query string. |
| `/contact/thank-you` | ThankYou | Static, `robots: noindex` | — | Fires the conversion event |
| `/privacy` | Legal | Static | — | Content requires legal input |
| 404 | NotFound | Static | — | Links to Services, Work (if live) and Contact |

**Gates** live in `content/site.ts` and are **derived from content where possible**: G1 is true when two or more published P1/P2 projects exist. G2, G0 and G3 are explicit flags. Navigation, sitemap, internal links and home sections all read the same gate values, so a gated page never appears anywhere.

**URL conventions:** lowercase, no trailing slash (`trailingSlash: false`). Redirects in `next.config` for any retired slug (for example, if `digital-marketing` is ever withdrawn it redirects to `growth-conversion`).

---

## 6. Design tokens (Tailwind v4)

All tokens come from `docs/design-system.md`. They're defined once in `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Remove every default colour, so only CALIX colours exist as utilities */
  --color-*: initial;
  --color-espresso: #2E1E14;
  --color-ivory: #F6F1E8;
  --color-travertine: #D9C9A8;
  --color-gold: #B08D57;
  --color-olive: #4B5236;

  --font-display: var(--font-cormorant), Garamond, "Times New Roman", serif;
  --font-text: var(--font-jost), Futura, "Helvetica Neue", Arial, sans-serif;

  --radius-*: initial;          /* no rounded utilities */
  --shadow-*: initial;          /* no shadow utilities */
  --inset-shadow-*: initial;
  --drop-shadow-*: initial;
  --text-shadow-*: initial;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1200px;
  --breakpoint-xl: 1600px;

  --spacing: 4px;               /* the 4px base unit; spacing tokens map to multiples */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- **Type scale** is implemented as component classes in an `@layer components` block (`.type-display`, `.type-h1` … `.type-label`) using the fluid `clamp()` values from `docs/design-system.md` §2.2. Headings get element-level defaults in `@layer base`, which avoids the specificity bug found in Phase 3.
- **Semantic tokens** (`--surface-plate`, `--text-secondary`, `--focus-ring`) are CSS variables on `:root` and on `.surface-inverse` / `.surface-action`, so components use roles rather than raw colours.
- **Enforcement:**
  1. The `@theme` reset makes off-palette utilities impossible.
  2. `check_palette.py` runs on the built CSS and HTML in CI.
  3. ESLint bans hex literals in `.tsx` files outside `content/` diagrams (a `no-restricted-syntax` rule).
- **Motion tokens** (`--dur-micro` … `--dur-reveal`) live in `:root`. A single `@media (prefers-reduced-motion: reduce)` block sets them to `0ms`.

---

## 7. Content model

### 7.1 Principles

- **The type system enforces evidence rules** (`docs/portfolio-inventory.md`). A project that breaks a rule fails `npm run build`.
- **P3 (private) projects are never stored in the repository.** P2 projects store no client-identifying fields.
- Approval references point to where CALIX keeps the approval (for example, "email 2026-11-02, filed in /approvals"). The approval documents themselves are never committed.

### 7.2 Services (`content/services.ts`)

```ts
type ServiceKey = "brand" | "web" | "marketing" | "seo" | "growth";

interface Service {
  key: ServiceKey;
  slug: string;                       // "brand-strategy-identity" …
  name: string;                       // canonical, from the master brief
  published: boolean;                 // marketing: tied to gate G2
  outcome: string;                    // one-sentence value proposition
  forWhom: string[]; notFor: string[];
  problems: string[];
  included: { heading: string; items: string[] }[];
  process: { title: string; description: string }[];   // a real sequence
  investment?: string;                // omitted until decision 4 is made
  faqs: { q: string; a: string }[];
  plateType: "identity" | "device" | "formats" | "answer-anatomy" | "journey" | "system";
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  related: ServiceKey[];
}
```

### 7.3 Case study (`content/work/[slug]/index.ts`)

```ts
type Publication = "P1" | "P2" | "C";          // P3 is unrepresentable by design
type EvidenceGrade = "E1" | "E2" | "E3";

interface Project {
  slug: string;
  title: string;                                 // a codename for P2
  publication: Publication;
  client?: { name: string; url?: string; approvalRef: string };   // required for P1, forbidden otherwise
  industry: string;                              // a descriptor only for P2
  services: ServiceKey[];
  role: "lead" | "subcontractor" | "partner";
  year: number;
  summary: string;
  objective: string;
  deliverables: string[];
  evidenceGrade: EvidenceGrade;
  featured?: { rank: 1 | 2 | 3; score: number };   // from the portfolio scoring method
  structure: "full" | "short" | "visual" | "concept";
  blocks: Block[];                               // ordered page content
  outcomes?: Outcome[];                          // E3 only
  quote?: Quote;
  capturedAt?: string;                           // screenshot capture date
}

type Block =
  | { type: "plate"; plate: PlateSpec }
  | { type: "text"; heading?: string; body: string }
  | { type: "decision"; statement: string }      // the key strategic decision
  | { type: "deliverables" };                    // renders `deliverables`

interface PlateSpec {
  kind: "device" | "identity" | "formats" | "system" | "measurement" | "journey" | "image";
  caption: string;                               // "Responsive website"
  fact?: string;                                 // caption-bar fact
  annotations?: { text: string; x: number; y: number }[];   // max 3, facts only
  media: ImageRef[];                             // static imports → width/height known
  alt: string;
}

interface Outcome {
  value: string; label: string;
  baseline: string; period: string; source: string;
  approvalRef: string;
}

interface Quote {
  text: string; name: string; role: string; company?: string;
  approvalRef: string;
}
```

### 7.4 Build-time content rules (`scripts/validate-content.ts`, run before `next build`)

| Rule | Failure |
|---|---|
| `publication === "P1"` requires `client` with `approvalRef` | Build fails |
| `publication !== "P1"` forbids `client` | Build fails |
| `outcomes` present requires `evidenceGrade === "E3"`, and every outcome needs baseline, period, source and approvalRef | Build fails |
| `publication === "C"` forbids `outcomes` and `quote`, and forces the concept label | Build fails |
| More than 3 annotations on a plate | Build fails |
| Every plate has non-empty `alt` | Build fails |
| `quote` requires `approvalRef` | Build fails |
| Plate images over the size budget (`docs/imagery-direction.md` §7) | Warning in development, failure in CI |
| Hex colours in content outside the five palette values | Build fails |

---

## 8. Server/client boundaries

**Default: Server Components.** Client components are leaf-level and small.

| Client component | Why it needs the client | Approx. size target |
|---|---|---|
| `MobileMenu` | Open and close state, focus trap, Escape, `aria-expanded` | < 2KB |
| `ServicesMenu` | Disclosure state on desktop. Without JS it falls back to a link to `/services`. | < 1KB |
| `SequenceController` | Media conditions, IntersectionObserver, writes `data-active-stage` | < 1.5KB |
| `AnnotationObserver` | One shared observer for S3 | < 0.5KB |
| `EnquiryForm` | `useActionState` for inline errors and pending state. Prefill from query params. Works without JS through the Server Action. | < 3KB |
| `Analytics` | Loads the provider script after consent (if a consent model is needed) and exposes `track()` | Provider-dependent |

- The S2 proof opening is **pure CSS** (no client code).
- Content, layout, plates, charts and JSON-LD all render on the server.
- Server-only modules (`lib/env.ts`, `lib/enquiry/mail.ts`) import `server-only`, so they can never be bundled for the client.

---

## 9. Animation lifecycle and responsive behaviour

### 9.1 Mode switching

`useMotionAllowed(query)` wraps `matchMedia` for:
- `(min-width: 1200px) and (min-height: 700px)`
- `(prefers-reduced-motion: no-preference)`

It subscribes to changes, so modes switch live on resize or a preference change.

### 9.2 S1 sequence (`SequenceController`)

1. The Server Component renders the **static layout** (`docs/scroll-narrative.md` §4.1.1): every stage with its own static plate. This is the no-JS and reduced-motion experience.
2. On mount, if motion is allowed: add `data-motion="on"` to the section (CSS then shows the sticky plate and hides the static plates), compute the initial stage from the current scroll position, and create **one** IntersectionObserver with `rootMargin: "-50% 0px -50% 0px"`.
3. On intersection: write `plateRef.current.dataset.activeStage = n`. No React state, no re-render.
4. On `transitionstart`, add `will-change`; on `transitionend`, remove it.
5. **Cleanup** (unmount, route change, mode switched off): disconnect the observer, remove listeners, remove `data-motion`. Implemented as an idempotent effect, so React Strict Mode double-invocation is safe.

### 9.3 S2 proof opening

CSS only:
```css
@supports (animation-timeline: view()) {
  @media (min-width: 768px) and (prefers-reduced-motion: no-preference) { … }
}
```
Without support, the static end state shows. No lifecycle to manage.

### 9.4 S3 annotations

`AnnotationObserver` is mounted once in the root layout. It observes `[data-annotate]` elements, adds `.is-drawn` once at 50% visibility, then calls `unobserve`. It disconnects on unmount. The hidden initial state is scoped under `[data-motion-ready]`, which is set on `<html>` by the same component, so content is visible without JS.

### 9.5 GSAP contingency (not planned)

GSAP + ScrollTrigger is added only if the native S1 or S2 fails QA criteria 8 or 9 (`docs/scroll-narrative.md` §7), and the failure is specifically one that scrubbing fixes. If added: use `gsap.matchMedia()` for distinct desktop, mobile and reduced-motion branches, `useGSAP()` (or `gsap.context()` with `revert()`) for cleanup, and dynamic import so GSAP only loads on the home page on desktop.

### 9.6 Responsive rules

| Width | Grid | Header | S1 | S2 | S3 |
|---|---|---|---|---|---|
| < 768 | 4 col | Sticky, compact CTA plus menu | Static stacked | Static | On |
| 768–1199 | 8 col | Sticky, compact CTA plus menu | Static stacked | On | On |
| ≥ 1200 (and ≥ 700 tall) | 12 col | Sticky, full navigation | Sticky sequence | On | On |
| Any width with reduced motion | — | — | Static | Static | Off |

---

## 10. Images and fonts

### 10.1 Images

- `next/image` with **static imports** from `content/work/[slug]/`, so width and height are known at build (no CLS) and files are content-hashed.
- `images.formats: ["image/avif", "image/webp"]`. Device sizes match the generated widths (480, 768, 1080, 1440, 2160, 2880).
- An accurate `sizes` attribute per plate pattern (for example, an 8-of-12 plate: `(min-width: 1200px) 66vw, 100vw`).
- The LCP element is the hero headline (text), so no hero image is preloaded. If a plate ever becomes the LCP element, it gets `priority`.
- No `remotePatterns`: all images are local and approved.
- Placeholder colour while loading: Travertine background (no blur data URLs).
- Diagrams and construction drawings are inline SVG components using palette CSS variables.
- Raw client assets never enter the repository. Only approved, web-optimised exports (`docs/imagery-direction.md` §3.3, §7).

### 10.2 Fonts

- `next/font/google` for **Cormorant Garamond (500, 600)** and **Jost (400, 500)**, Latin subset, `display: "swap"`. Next.js downloads them at build and serves them from the same origin, so visitors' browsers make **no requests to Google**.
- Exposed as CSS variables (`--font-cormorant`, `--font-jost`) and consumed by the Tailwind theme.
- Automatic fallback metric adjustment, to keep layout shift during font swap minimal.
- The font decision (brief D5) is still pending confirmation. Changing fonts later touches only `app/layout.tsx` and two theme variables.

---

## 11. Enquiry form

### 11.1 Flow

```
/contact (Server Component page)
  └─ <EnquiryForm> (client) ─ <form action={submitEnquiry}>   ← works without JS
         │
         ▼
  submitEnquiry (Server Action, app/contact/actions.ts)
    1. Spam checks (§11.3)          → silent success response if bot
    2. Zod parse (lib/enquiry/schema.ts)
         └ invalid → return { status: "error", fieldErrors, values }
    3. Send notification to CALIX (mail adapter)
    4. Send confirmation to prospect (optional, see §11.4)
    5. redirect("/contact/thank-you?type=project|diagnostic")
```

- **Without JavaScript:** the native form posts to the Server Action, and on error the page re-renders with errors and the submitted values (React's progressive-enhancement path for `useActionState`).
- **With JavaScript:** `useActionState` gives inline errors, a focused error summary and a pending state ("Sending…" on the button, still enabled for screen readers with `aria-disabled` while pending).
- **Fields** exactly as `docs/conversion-strategy.md` §4.1. Budget bands and currency come from `content/site.ts` (still to be confirmed).
- No database. The email is the record. A CRM can be added later as a second adapter target.

### 11.2 Validation (`lib/enquiry/schema.ts`)

- A Zod discriminated union on `enquiryType` (`project` | `diagnostic`). The Diagnostic variant makes `website` required and swaps `services` for `mainConcern`.
- Trims all strings. Email format. URL normalised (adds `https://` if missing). Message length 20–5000 characters. Enumerated values only for selects and checkboxes.
- Error messages written in the interface voice ("Enter your work email, for example name@company.com"), mapped to fields and shown inline and in the summary.
- The same schema drives HTML attributes (`required`, `type`, `maxLength`) for native client hints. **The server is always the authority.**

### 11.3 Spam protection (no third-party service by default)

| Layer | Implementation |
|---|---|
| Honeypot | A visually hidden text field (`tabindex="-1"`, `autocomplete="off"`, its label marked as not for people) |
| Timing | A hidden field holding the render timestamp, HMAC-signed with `FORM_SECRET`. Submissions faster than 3 seconds or older than 24 hours are rejected. |
| Rate limit | Per IP hash: 5 submissions per 10 minutes, kept in memory per instance. This is weak on serverless, so it's backed by the host's edge rate limiting where available. |
| Content heuristics | Reject messages with more than 3 URLs, or with a URL-only body |
| Bot response | Bots get the same success redirect, so they learn nothing. Not emailed, logged as a count only. |
| Escalation | Add Cloudflare Turnstile (free, accessible "managed" mode) **only** if measured spam gets through |

### 11.4 Email

- **The adapter interface** `sendMail({ to, replyTo, subject, text, html })`. Default implementation: SMTP via `nodemailer` using CALIX's existing mailbox credentials.
- **Notification to CALIX:** all fields, plus landing page, referrer case study and UTM values. `Reply-To` is set to the prospect.
- **Confirmation to the prospect:** a short text summary and the reply-time promise. **Abuse risk:** confirmation emails can be triggered to arbitrary addresses. They're sent only after the spam checks pass, contain no user-supplied free text beyond the name, and can be switched off with a config flag. **Decision needed** (§16).
- **Failure handling:** if sending to CALIX fails, the action returns a clear error asking the person to try again or email directly (the address is shown). It never shows success when the enquiry wasn't delivered.
- **Logging:** request ID and outcome only. **No personal data in logs.**

---

## 12. SEO and structured data

| Item | Implementation |
|---|---|
| Metadata | `metadataBase` from `SITE_URL`. `generateMetadata` per route: unique title (`[Page] — CALIX`), description, canonical, Open Graph and Twitter. |
| Canonicals | Self-referencing, without query strings (`/contact?service=web` → `/contact`) |
| Robots | `app/robots.ts`: allow all. Disallow `/contact/thank-you`. Sitemap reference. Preview deployments set `noindex` through an environment flag. |
| Sitemap | `app/sitemap.ts`, generated from content and gates. Gated and noindex routes are excluded automatically. |
| Headings | One `h1` per page. The S1 sequence uses a visually hidden `h2` and `h3` for its stages (`docs/scroll-narrative.md` §6.2). |
| JSON-LD | A `<JsonLd>` Server Component with `schema-dts`-typed builders: `Organization` and `WebSite` (root layout), `Service` (service pages), `BreadcrumbList` (where breadcrumbs show), `CreativeWork` (case studies), `AboutPage` and `Person` (studio, G0), `ContactPage`, and `FAQPage` only for visible FAQs. No `Review`, `AggregateRating`, `award` or unsupplied `sameAs` (`calix-geo`). |
| Entity consistency | All entity facts come from `content/site.ts`. The positioning line and service names are single-sourced. |
| OG images | Static, designed per template (Ivory or Espresso, Cormorant title), generated at build with `next/og`. No runtime image generation. |
| Internationalisation | English only. No `hreflang`. `lang="en"` on `<html>`. |
| Performance for SEO | See §14 targets |

GEO checks (`calix-geo` light check) run on each page template as part of the review step (§15.2).

---

## 13. Analytics

- **`lib/analytics.ts`** exposes `track(event, props)` with the event names from `docs/conversion-strategy.md` §7.1. Until a provider is chosen, it's a no-op (in development it logs to the console).
- **Conversion event:** fired on `/contact/thank-you` load with the enquiry type, services and budget band. These come from the redirect query (no personal data).
- **Personal data:** never passed. A unit test asserts that the `track()` payload types can't include name, email or message fields.
- **Provider decision** (§16):

| Option | Cost | Cookies / consent | Note |
|---|---|---|---|
| Plausible (hosted) | Paid | Cookieless; often usable without a consent banner (legal review required) | Simplest privacy-respecting option |
| Umami (self-hosted) | Hosting plus a database | Cookieless | Adds infrastructure, against the no-database principle |
| GA4 | Free | Cookies, so a consent banner is required in the EU and UK | Heavier script. Consent management is needed. |
| Host-native analytics | Varies by host | Usually cookieless | Depends on the hosting decision |

Recommendation: a cookieless provider. If it's paid, that's a business decision.

---

## 14. Security, performance and accessibility baselines

### 14.1 Security

- Headers in `next.config`: `Content-Security-Policy` (nonce-based scripts; `default-src 'self'`; analytics origin added only once chosen), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone and geolocation off), `frame-ancestors 'none'`.
- Environment variables are validated at startup (`lib/env.ts`, Zod). Secrets are server-only and never prefixed `NEXT_PUBLIC_`.
- Server Action input is treated as untrusted. Email HTML is built with escaped values only.
- `npm audit` runs in CI. Dependabot or Renovate for updates.

### 14.2 Performance targets

LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms at the 75th percentile. First-load JavaScript for the home page under 100KB compressed (framework included). Motion code 3KB or less. Lighthouse Performance of 90 or more (lab, mobile profile) on every template.

### 14.3 Accessibility

WCAG 2.2 AA. Skip link. Landmarks. Visible focus (`docs/design-system.md` §1.4). Keyboard-complete menu and form. Reduced motion respected. `accessibility-audit` passes on every template before launch.

---

## 15. Testing and deployment

### 15.1 Test layers

| Layer | Tool | Covers |
|---|---|---|
| Types | `tsc --noEmit` | Content model, component props |
| Lint | ESLint (Next, jsx-a11y, the custom hex-literal rule), Prettier check | Code quality, accessibility lint |
| Content | `scripts/validate-content.ts` | Publication and evidence rules (§7.4) |
| Unit | Vitest | Zod schemas (valid and invalid fixtures), spam checks (honeypot, timing, HMAC), URL normalisation, gate derivation, sitemap contents, `track()` payload guard |
| End-to-end | Playwright | Form: success, validation errors, no-JS submission, Diagnostic variant, prefill from query. Navigation and mobile menu keyboard flows. 404. Gated routes return 404. |
| Accessibility | `@axe-core/playwright` on every route at 1440 and 390; manual screen-reader pass before launch | WCAG issues detectable automatically |
| Motion | Playwright with `reducedMotion: "reduce"` and JS disabled; S1 stage assertions on scroll | `docs/scroll-narrative.md` §7 criteria 4–8, 10, 11 |
| Visual | `calix-visual-qa` capture script at 1440, 768 and 390 | Brand, layout, overflow |
| Brand | `check_palette.py` on build output | Palette, gradients, shadows, radius |
| Performance | Lighthouse (CI, lab) and field data after launch | §14.2 targets |

The Playwright version in CI is pinned. Locally, tests can use the preinstalled Chromium through `executablePath` if the pinned version differs.

### 15.2 Continuous integration (GitHub Actions)

On every push and pull request: install (`npm ci`) → typecheck → lint → validate content → unit → build → e2e and axe (against `next start`) → palette check → Lighthouse (on the pull request). Visual captures are uploaded as artefacts for review.

### 15.3 Deployment

- **Host: decision needed** (brief D7). Requirements: Next.js server features (Server Actions, image optimisation), environment secrets, preview deployments per branch, HTTPS, and ideally edge rate limiting. Options include Vercel (the Hobby plan **does not permit commercial use**, so a paid plan is needed for CALIX), Netlify, Cloudflare (via the OpenNext adapter) and a container on any Node host.
- **Environments:** local → preview (per branch, `noindex`) → production.
- **Production deployment requires explicit authorisation** (brief rule). No DNS, domain or production changes are made without it.
- **Environment variables:** `SITE_URL`, `ENQUIRY_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FORM_SECRET`, `SEND_CONFIRMATION` (boolean), `ANALYTICS_*` (once chosen), `NOINDEX` (previews).
- **Launch checks:** `docs/conversion-strategy.md` §10, `docs/scroll-narrative.md` §7, a `calix-geo` full audit, and a `technical-seo` review on production URLs.

---

## 16. Decisions that affect implementation

| # | Decision | Affects | Default if undecided |
|---|---|---|---|
| 1 | Hosting provider (brief D7) | Deployment, rate limiting, analytics options | Build host-agnostic. Can't deploy production. |
| 2 | Email route: the existing mailbox's SMTP details, or a transactional API | `lib/enquiry/mail.ts` | SMTP adapter. Development uses a log-only adapter. |
| 3 | Send confirmation emails to prospects (abuse trade-off, §11.4) | The form action | Off until approved |
| 4 | Analytics provider and consent approach (§13) | `Analytics` component, CSP, privacy page | No-op `track()` |
| 5 | Budget bands, currency, reply time, Diagnostic price | Form options, microcopy, service pages | Placeholders. **Blocks launch, not the build.** |
| 6 | Domain name | `SITE_URL`, canonical URLs, email | A placeholder domain in development |
| 7 | Fonts (D5) and logo | `app/layout.tsx`, header | Cormorant and Jost, tracked wordmark stand-in |
| 8 | Gates G0–G3 content (team, work, marketing capability, articles) | Which routes and sections exist | Gated off |

---

## 17. Ordered implementation checklist

Each step ends with its checks passing before the next begins. Steps marked ⛔ are blocked on content or decisions, but don't block the steps before them.

**Foundation**
1. [ ] Scaffold Next.js (App Router, TypeScript strict, ESLint), pin exact versions, add Prettier, Vitest and Playwright. Set up the GitHub Actions CI skeleton (typecheck, lint, unit, build).
2. [ ] Configure Tailwind v4 `@theme` with the five colours only, fonts, breakpoints and the reset of radius and shadow. Add base heading styles and type-scale classes. Add the hex-literal lint rule. Run `check_palette.py` in CI.
3. [ ] Load fonts with `next/font` (Cormorant 500/600, Jost 400/500) as CSS variables.
4. [ ] Add `lib/env.ts` (validated environment) and security headers in `next.config` (CSP without analytics).

**Content and layout**
5. [ ] Write `content/schema.ts` (Zod) and `content/site.ts` (entity facts with placeholders, navigation, gates), `content/services.ts` (four or five services by G2) and `content/sequence.ts` (draft copy). Write `scripts/validate-content.ts` and wire it before build.
6. [ ] Build layout components: SkipLink, SiteHeader (sticky, compact outline CTA), MobileMenu, ServicesMenu, SiteFooter, Breadcrumbs. Keyboard and axe tests.
7. [ ] Build UI primitives (ButtonLink, Button, TextLink, Section, Container) and content components (ServiceIndex, DefinitionList, ProcessSteps, Quote, OutcomeFigure, Faq, CtaBand).
8. [ ] Build the plate system (Plate, BrowserFrame, DeviceFrame, Annotation, PlateCaption) and the illustrative plate types (identity, formats, answer-anatomy, journey, system) as SVG components.

**Pages (static first, no motion)**
9. [ ] Home page with the S1 **static** layout, hero and CTA band. The PROOF section renders only if G1.
10. [ ] Services overview and the shared ServicePage template, generated for the published services.
11. [ ] Studio page (team section gated by G0), Privacy (placeholder pending legal text), 404.
12. [ ] Case study template and Work index (generated, but hidden by G1 until projects exist). Test with a **fixture project marked as a test fixture**, which is excluded from production builds.

**Conversion**
13. [ ] Enquiry schema, spam layer, mail adapter (log-only in development), Server Action, EnquiryForm with no-JS support, and the thank-you page. Unit tests plus e2e tests with JS on and off.
14. [ ] `track()` abstraction (no-op provider) and event wiring (CTA clicks, form start and errors, enquiry submitted).

**SEO**
15. [ ] Metadata helpers, per-route metadata, canonicals, `robots.ts`, `sitemap.ts`, JSON-LD builders and placement, OG images. Run a `technical-seo` review and a `calix-geo` light check per template.

**Motion (progressive enhancement)**
16. [ ] S3 AnnotationObserver. Verify reduced motion and no-JS.
17. [ ] S1 SequenceController (sticky plate, state definitions, IntersectionObserver, mode switching, cleanup). Verify `docs/scroll-narrative.md` §7 criteria 4–11.
18. [ ] S2 proof opening (CSS scroll-driven, with `@supports` fallback). ⛔ Needs gate G1 for real verification.

**Quality gates**
19. [ ] `calix-visual-qa` at 1440, 768 and 390 (up to three rounds). Fix P0–P1 issues.
20. [ ] `accessibility-audit` (axe plus a manual screen-reader and keyboard pass) and a `web-performance` audit against §14.2. Motion review scores recorded.
21. [ ] Lighthouse in CI and a full e2e suite passing.

**Launch preparation**
22. [ ] ⛔ Decisions 1–6 (§16) resolved. Production environment variables set. Preview deployment reviewed.
23. [ ] ⛔ Launch content: at least two approved case studies (G1), team (G0), budget bands and reply time, legal privacy text.
24. [ ] ⛔ Pre-launch: `docs/conversion-strategy.md` §10 checklist, a `calix-geo` full audit, an end-to-end enquiry test to the real inbox.
25. [ ] ⛔ **Production deployment only with explicit authorisation.**

---

## 18. Phase 6A deviations (as built)

| Planned | As built | Reason |
|---|---|---|
| Next.js defaults | **`cacheComponents` and `partialPrefetching` off** | With Cache Components on (16.4.0), a no-JavaScript submission of the enquiry form lost its validation state on re-render (reproduced, then fixed by turning it off). The form must work without JS. Revisit when upgrading Next.js. |
| Tailwind scans the whole project | **`@import "tailwindcss" source(none)`** plus explicit `@source` for `app/`, `components/` and `content/` | Words in `docs/*.md` generated unused utilities (`.ring`, `.transition`) carrying off-palette defaults |
| Full nonce-based CSP | Baseline headers only (`frame-ancestors`, `base-uri`, `form-action`, `object-src`, HSTS, nosniff, referrer, permissions) | A nonce CSP forces every page to render dynamically. Decide with the hosting choice. |
| Budget field as a select of bands | Optional free-text field | Bands and currency are unconfirmed (`docs/content-gaps.md` #9) |
| Enquiry type: project or Digital Diagnostic | Project only | The Diagnostic offer is unconfirmed (strategy A9) |
| Navigation to `/services`, `/work`, `/studio` | Home-page anchors plus `/contact` | Those routes are not built yet, and linking them would create dead links |
| Confirmation email to the prospect | Not sent | Pending decision 3 (§16) |
| Vitest, Playwright and axe in the repo, plus CI | Not added yet. QA was run with a scratch Playwright script (see the Phase 6A report). | Scheduled in checklist steps 1, 13 and 21 |
| `content/schema.ts` and the build-time content validator | Typed `content/work.ts` only | No projects exist yet to validate. Add with the first case study. |

**Palette checker on built CSS:** the only remaining findings come from Tailwind's preflight reset (transparent form backgrounds, feature-detection queries such as `color-mix(in lab, red, red)`, and a placeholder colour that `app/globals.css` overrides). None renders as an off-palette colour. They are accepted as framework internals.

## 19. Phase 6B notes (as built)

- **Motion toolset:** CSS transitions, IntersectionObserver, ResizeObserver and CSS scroll-driven animations. GSAP and ScrollTrigger were not needed (§9.5 contingency not triggered).
- **Pre-paint mode script:** `app/layout.tsx` sets `data-motion="on"` on `<html>` when `lib/motion.ts`'s query matches (with `suppressHydrationWarning`). It is an inline script: account for it when the nonce-based CSP is introduced (§14.1).
- **Removed:** `components/home/ServiceSection.tsx` and `ServicesIntro`, replaced by `components/home/Sequence.tsx`.

## 20. Phase 6C notes (as built)

- **Routes added:** `/services`, `/services/[service]` (five, static), `/work`, `/work/[slug]` (case-study template), `/studio`, `/insights`, `/insights/[slug]` (article template).
- **Gated archives:** `/work` and `/insights` exist and are linked (Work in the header, Insights in the footer), but render an honest status and are `noindex` and out of the sitemap until gates G1 and G3 are met. This replaces the IA's "hide until met" for Work (§2.2): the archive gives the "Explore Our Work" and navigation links a real destination. Detail pages are generated only from approved content (`dynamicParams = false`), so with none, every slug returns 404.
- **Evidence rules enforced at build:** `assertProjectValid` in `content/work.ts` fails the build for unapproved client names, results without E3 evidence or approval references, results or quotes on concept work, and images without alt text.
- **Test fixtures:** `content/fixtures.ts`, compiled in only with `CALIX_FIXTURES=1`. Fixture pages show a "Test fixture" banner, are `noindex, nofollow`, carry no CreativeWork/Article schema, and never count toward gates. **Never deploy a fixture build.**
- **Content placeholders (Phase 7C):** internal "[… to be confirmed]" markers and placeholder blocks show in development and in builds with `SHOW_CONTENT_PLACEHOLDERS=true` (use for previews). Production builds without it show honest public fallbacks instead (`lib/display.ts`, `docs/conversion-audit.md` §4). The privacy-notice placeholder always shows.
- **Articles:** typed content blocks in `content/insights.ts` rather than MDX, until real articles exist and their authoring needs are known.
- **Enquiry form fields** now match the Phase 6C list: name, business email, company, website (optional), services, project goals, budget range (optional), desired timeline, additional context (optional). "How did you hear about us" was removed. The submit button is disabled while sending, and a polite live region announces it.
- **Digital Marketing page** is published per the confirmed service list. Gate G2 (delivery model) remains open (`docs/content-gaps.md` #12).
