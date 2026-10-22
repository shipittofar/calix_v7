# CALIX — Information Architecture

**Phase:** 2 — UX and information architecture
**Status:** Structure recommended. Some routes have **launch gates** that depend on open decisions from `docs/strategy.md` §11 and on portfolio evidence (`docs/portfolio-inventory.md`, which currently has no verified projects).
**Last updated:** 2026-10-09
**Language / market:** English, international.
**Primary objective:** Qualified direct project enquiries.

**Inputs:** `docs/calix-master-brief.md`, `docs/strategy.md`, `docs/ideal-clients.md`, `docs/portfolio-inventory.md`, `docs/portfolio-content-inventory.md`; skills `conversion-strategist`, `technical-seo`, `calix-geo`, `calix-brand`, `scroll-storytelling`.
**Companions:** `docs/user-journeys.md`, `docs/conversion-strategy.md`

---

## 1. IA principles

1. **Every page has one job in the enquiry path:** help the visitor understand, evaluate or act. A page that does none of these is cut.
2. **No thin pages.** A service page goes live only when it has real substance: scope, process, fit, pricing guidance and relevant work. Pages are never created only to target a keyword.
3. **Evidence decides depth.** Routes that depend on proof (`/work`, `/insights`) launch only when real, approved content exists.
4. **One primary action site-wide:** *Start a project* goes to `/contact`. Everything else is secondary.
5. **Situation before industry.** Until the portfolio supports industry specialisms, pages address client situations (outgrown, launching, underperforming), not sectors (`docs/strategy.md` §3).
6. **Entity clarity.** CALIX is described consistently as a digital branding and growth studio, never in terms that suggest physical-space design (`calix-geo`).

---

## 2. Sitemap

```
/                                       Home
├── /services                           Services overview + engagement models
│   ├── /services/brand-strategy-identity
│   ├── /services/web-design-development
│   ├── /services/digital-marketing     [GATE G2]
│   ├── /services/seo-geo
│   └── /services/growth-conversion
├── /work                               [GATE G1]
│   └── /work/[slug]                    [GATE G1]
├── /studio                             About, team, process, principles
├── /insights                           [GATE G3]
│   └── /insights/[slug]                [GATE G3]
└── /contact                            Project enquiry
    └── /contact/thank-you              (noindex confirmation)

Utility (not in main navigation):
/privacy        Privacy notice (required: forms and analytics for an international audience)
/cookies        Only if non-essential cookies are used; otherwise merged into /privacy
404             Custom page that links to Services, Work and Contact
```

**Total indexable marketing pages at launch:** 9 core routes, plus case studies and articles as the evidence allows.

### 2.1 Pages deliberately not created

| Not created | Reason |
|---|---|
| Separate pricing page | Pricing guidance belongs on each service page, where the buying decision happens. A standalone page invites price comparison without context. |
| Industry pages (`/industries/...`) | No portfolio evidence for any industry yet. Revisit when a priority industry qualifies (`docs/ideal-clients.md` §5). |
| Location or city pages | International positioning with no confirmed offices. These would be thin, doorway-style pages. |
| Sub-service pages (`/services/seo-geo/technical-seo`, `/logo-design` …) | Thin, keyword-driven pages. Sub-services are covered as sections inside their parent service page. |
| Separate `/process` page | Process lives on `/studio`, summarised on each service page. One source avoids duplicate content. |
| Separate Digital Diagnostic page | The Diagnostic is presented on `/services` and in relevant service pages, and is an enquiry type on `/contact`. Revisit if it becomes a significant product with its own demand. |
| `/careers`, `/press`, `/awards`, `/clients` logo wall | No supplied content. Publishing them empty damages credibility. |
| Separate FAQ page | FAQs sit on the page whose questions they answer (service pages, contact). |

### 2.2 Launch gates

| Gate | Route(s) | Condition to publish | If not met at launch |
|---|---|---|---|
| **G1 — Work** | `/work`, `/work/[slug]` | At least **two** P1/P2 projects with E2+ evidence and assets (`docs/portfolio-inventory.md` §5–6) | Remove "Work" from the navigation. Service pages show a "Selected work available on request" line pointing to `/contact`. **Strongly not recommended:** a launch without work makes the credibility step of every journey empty (`docs/strategy.md` §7). |
| **G2 — Digital Marketing** | `/services/digital-marketing` | Capability confirmed in-house or through a named accountable partner (`docs/strategy.md` §9). At least one supporting project, or a documented method. | Fold the confirmed marketing scope (for example campaign strategy and analytics) into `/services/growth-conversion` as a section, and redirect the slug there if it was ever published. Campaign creatives and banners stay in Brand. |
| **G3 — Insights** | `/insights`, `/insights/[slug]` | At least **three** substantive articles by named CALIX authors, plus a realistic publishing cadence | Hide from the navigation and don't publish an empty index. Add later. |
| **G0 — Studio** | `/studio` | Named team members with real roles, and company facts (brief D8) | Publish with process and principles only, and mark team details as pending. Don't use placeholder people. |

---

## 3. Navigation

**Header (desktop):** CALIX wordmark (links to `/`) · Services · Work · Studio · Insights · **[Start a project]** (primary button, links to `/contact`)

- "Services" opens a simple panel listing the five services with one-line descriptions, plus links to the "All services" overview and "Not sure where to start? Digital Diagnostic". No mega-menu imagery.
- Gated items are omitted until their gate is met.
- The header CTA is visible on every page, including on mobile as a persistent button in the menu bar.

**Mobile:** wordmark, "Start a project" button, and a menu button. The menu lists the same items in the same order. No hidden CTAs.

**Footer:** short positioning line · the five services · Work · Studio · Insights · Contact · email address `[TO CONFIRM]` · official profiles `[TO CONFIRM]` · Privacy · Cookies (if applicable) · legal entity name `[TO CONFIRM]`.

**Breadcrumbs:** on service detail, case study and article pages (visible, with matching `BreadcrumbList` structured data).

---

## 4. URL and content conventions

- Lowercase, hyphenated, no trailing slash (configure one canonical form), no dates in slugs.
- `/work/[slug]`: `[client-or-codename]-[short-descriptor]`, e.g. `/work/project-a-brand-website`. Use the client name only if it's approved for publication (P1).
- `/insights/[slug]`: descriptive slugs taken from the article topic.
- CTA query parameters (e.g. `/contact?enquiry=diagnostic`) only prefill the form. `/contact` keeps a single self-referencing canonical.
- Service names match `docs/calix-master-brief.md` exactly in headings, navigation and structured data.

---

## 5. Route specifications

Evidence notation: **[EVIDENCE: type]** describes the proof the slot needs. There are no verified projects yet, so no real project is named anywhere below.

### 5.1 `/` — Home

| Aspect | Definition |
|---|---|
| **Audience & intent** | All ICPs. Mostly referral and brand-name visitors, and visitors arriving from AI assistants or search. Their question: *"What is CALIX, is it for a business like mine, and is it good?"* |
| **Core message** | CALIX connects strategy, design, technology and growth to build stronger brands and better digital experiences, with one team carrying a single strategy from positioning to enquiry. |
| **Content hierarchy** | Updated in Phase 4 (`docs/scroll-narrative.md`): 1. **Hero:** positioning statement, one-line clarification, primary CTA, service index · 2. **Connected sequence:** the problem (pieces) then Brand → Digital → Marketing → Discoverability → Growth, each stage linking to its service page and ending with a link to the process on `/studio` (replaces the separate services and "how we work" sections) · 3. **Proof:** two or three featured projects and an approved client quote (G1) · 4. **Start a project:** the final CTA band, with a "best suited to" qualifying line (replaces the separate "who it's for" section) and what happens next |
| **Portfolio evidence** | [EVIDENCE: the 3 featured projects from `docs/portfolio-inventory.md` §6, at least one multi-service]. [EVIDENCE: Q-grade client quote]. **None available yet.** |
| **Primary CTA** | Start a project → `/contact` |
| **Secondary CTA** | See the work → `/work` (G1). Not sure where to start? → Digital Diagnostic section on `/services`. |
| **Internal links** | All five service pages, `/services`, featured `/work/[slug]`, `/studio`, `/contact` |
| **Search intent** | Navigational (the brand name "CALIX"). Entity definition for AI systems. Not targeting generic head terms. |
| **Conversion objective** | Route each visitor to the right service or proof page within one click. Capture ready visitors directly. |
| **Scroll narrative** | Hero → problem → brand → digital → marketing → discoverability → growth → proof → start a project. Marketing has its own stage, removed if gate G2 is not met (brief D3, resolved in Phase 4). Spec in `docs/scroll-narrative.md`. |

### 5.2 `/services` — Services overview

| Aspect | Definition |
|---|---|
| **Audience & intent** | Visitors comparing what CALIX offers. Their question: *"Which of these do I need, and how do you engage?"* |
| **Core message** | Five services that work alone or together, with clear ways to start. |
| **Content hierarchy** | 1. Intro: how the services connect · 2. The five services, each with a short description, typical problems solved and a link · 3. **Engagement models:** Brand & Website (primary), single-service projects, Search & Growth Programme · 4. **Digital Diagnostic:** what it is, what you receive, price `[TO CONFIRM]`, CTA · 5. "Which service do I need?" guide by client situation · 6. Final CTA |
| **Portfolio evidence** | [EVIDENCE: one multi-service project summary to show integration]. None available yet. |
| **Primary CTA** | Start a project → `/contact` |
| **Secondary CTA** | Request a Digital Diagnostic → `/contact?enquiry=diagnostic` |
| **Internal links** | All five service pages, `/work`, `/studio` (process) |
| **Search intent** | Commercial investigation for broad terms (e.g. "digital branding and web design studio"). Secondary to the individual service pages. |
| **Conversion objective** | Route visitors to the right service page, or capture undecided visitors through the Diagnostic. |

### 5.3 Shared service-page template

All five service pages use one structure, so they stay substantive and consistent:

1. **Hero:** service name (canonical), a one-sentence outcome, and who it's for. Primary CTA.
2. **Problems we solve:** the situations that trigger this purchase (`docs/ideal-clients.md`).
3. **What's included:** the real scope, grouped. Sub-services appear here instead of on separate pages.
4. **How it works:** phases, deliverables, timeline range `[TO CONFIRM]`, client involvement.
5. **Relevant work:** one to three projects that used this service.
6. **How it connects:** how this service links to the others, with links.
7. **Who it's for / not for:** a fit statement plus disqualifiers.
8. **Investment:** starting range or minimum engagement `[TO CONFIRM, decision 4]`.
9. **FAQs:** three to six real buyer questions (timeline, process, ownership, what you need from us). No keyword-stuffed FAQs.
10. **Final CTA** with what happens next.

**Minimum substance to publish:** sections 1–4, 7 and 10 complete with confirmed facts, plus either section 5 or a documented method. Otherwise the page is not published (see gate G2).

### 5.4 `/services/brand-strategy-identity`

| Aspect | Definition |
|---|---|
| **Audience & intent** | Primary ICP repositioning, Secondary A launching. Their question: *"Can CALIX give us a brand that matches the quality of what we do?"* |
| **Core message** | A clear position and an identity that makes the quality of your work visible before the first conversation. |
| **Content hierarchy** | Template (§5.3). Scope: positioning, messaging, logo design, visual identity, guidelines, graphic design, campaign creatives, advertising banners. Highlight how identity carries into the website. |
| **Portfolio evidence** | [EVIDENCE: identity projects with logo, system and application visuals, P1/P2, E2+]. None available yet. |
| **Primary CTA** | Start a brand project → `/contact?service=brand` |
| **Secondary CTA** | See brand work → `/work` (filtered to brand, G1) |
| **Internal links** | `/services/web-design-development` (main continuation), `/work/[slug]` brand cases, `/studio` |
| **Search intent** | Commercial: "brand strategy and identity studio", "rebrand for [situation]", "visual identity design". |
| **Conversion objective** | Brand-only or Brand & Website enquiries, with budget qualification. |

### 5.5 `/services/web-design-development`

| Aspect | Definition |
|---|---|
| **Audience & intent** | Primary ICP and Secondary A. Companies needing a new website, e-commerce or custom development. Their question: *"Can they build what we need, properly, and will it bring enquiries?"* |
| **Core message** | A website built around how your clients decide: clear, fast, accessible, and designed to start conversations. |
| **Content hierarchy** | Template (§5.3). Scope: UX/UI, corporate websites, landing pages, e-commerce, custom frontend, backend development `[scope TO CONFIRM, decision 3]`. Include a technical standards block (accessibility, performance, security, SEO/GEO foundations as standard) and a list of platforms and stacks `[TO CONFIRM]`. |
| **Portfolio evidence** | [EVIDENCE: website projects with desktop and mobile screenshots, live URLs, technical notes, P1/P2]. [EVIDENCE: E3 performance or conversion figures where approved]. None available yet. |
| **Primary CTA** | Start a website project → `/contact?service=web` |
| **Secondary CTA** | See website work → `/work` (G1) |
| **Internal links** | `/services/brand-strategy-identity`, `/services/seo-geo`, `/services/growth-conversion`, relevant `/work/[slug]` |
| **Search intent** | Commercial: "website design and development studio", "custom website development", "e-commerce website design". |
| **Conversion objective** | Website and Brand & Website enquiries, qualified by budget and timeline. |

### 5.6 `/services/digital-marketing` — GATE G2

| Aspect | Definition |
|---|---|
| **Audience & intent** | Businesses wanting campaigns, social media or content marketing. Their question: *"Can CALIX run marketing that brings the right customers, not just clicks?"* |
| **Core message** | Campaigns that bring the right people to a brand and site ready to convert them. |
| **Content hierarchy** | Template (§5.3). Scope **only as confirmed:** digital strategy, paid campaigns (platforms `[TO CONFIRM]`), social media (strategy vs. management `[TO CONFIRM]`), content marketing, analytics. Position marketing as building on a strong brand and site, not replacing them. |
| **Portfolio evidence** | [EVIDENCE: campaign creatives, with E3 campaign results approved for publication]. None available yet. |
| **Primary CTA** | Discuss a campaign → `/contact?service=marketing` |
| **Secondary CTA** | Request a Digital Diagnostic (for prospects whose site or brand may be the real issue) |
| **Internal links** | `/services/growth-conversion`, `/services/brand-strategy-identity` (creatives), `/services/seo-geo` |
| **Search intent** | Commercial: "digital marketing studio", "paid social campaigns for [situation]". |
| **Conversion objective** | Marketing enquiries from prospects whose brand and site can support the campaigns, or redirecting them to the Diagnostic. |
| **If G2 is not met** | Not published. Confirmed scope moves into `/services/growth-conversion`. The navigation shows four services. |

### 5.7 `/services/seo-geo`

| Aspect | Definition |
|---|---|
| **Audience & intent** | Secondary B (credible brand, not being found). Their question: *"Why can't people find us, and can you fix it without empty promises?"* |
| **Core message** | Structure and content that help search engines and AI systems understand what you do and who you serve. Practised responsibly, without guaranteed rankings. |
| **Content hierarchy** | Template (§5.3). Scope: technical SEO, content SEO, information architecture, GEO and AI search visibility. Add an explicit **"What we don't promise"** block (no guaranteed rankings or AI mentions) and how progress is measured. |
| **Portfolio evidence** | [EVIDENCE: E3 search visibility figures with baseline, period and source, approved]. CALIX's own site can serve as a technical demonstration once built. None available yet. |
| **Primary CTA** | Request a Digital Diagnostic → `/contact?enquiry=diagnostic` (the natural first step for search problems) |
| **Secondary CTA** | Start a project → `/contact?service=seo` |
| **Internal links** | `/services/growth-conversion`, `/services/web-design-development`, relevant `/insights/[slug]` (G3) |
| **Search intent** | Commercial and informational: "technical SEO agency", "GEO generative engine optimization services", "AI search visibility". |
| **Conversion objective** | Diagnostic requests and retainer enquiries. |

### 5.8 `/services/growth-conversion`

| Aspect | Definition |
|---|---|
| **Audience & intent** | Secondary B and post-launch clients. Their question: *"We have traffic. Why don't we get enough of the right enquiries?"* |
| **Core message** | Measurement and steady improvement that turn more of your existing traffic into qualified enquiries. |
| **Content hierarchy** | Template (§5.3). Scope: analytics setup, conversion optimisation, landing-page improvement, lead-generation journeys. Include the Search & Growth Programme (retainer) explanation. If G2 fails, add a "Campaigns" section with the confirmed marketing scope. |
| **Portfolio evidence** | [EVIDENCE: E3 conversion figures, approved]. None available yet. |
| **Primary CTA** | Request a Digital Diagnostic → `/contact?enquiry=diagnostic` |
| **Secondary CTA** | Start a project → `/contact?service=growth` |
| **Internal links** | `/services/seo-geo`, `/services/web-design-development`, `/services/digital-marketing` (if live) |
| **Search intent** | Commercial: "conversion rate optimization agency", "improve website enquiries". |
| **Conversion objective** | Diagnostic requests and retainer enquiries. |

### 5.9 `/work` — GATE G1

| Aspect | Definition |
|---|---|
| **Audience & intent** | Evaluators checking quality and relevance. Their question: *"Have they done this well, for someone like us?"* |
| **Core message** | Selected work, chosen for what it shows about how CALIX thinks, not volume. |
| **Content hierarchy** | 1. Short intro · 2. Featured projects (large, editorial) · 3. Other projects · 4. Simple filters by service (and later by industry, when an industry qualifies). Concept work is clearly labelled "Concept" and grouped separately. · 5. CTA |
| **Portfolio evidence** | All P1/P2 projects from `docs/portfolio-inventory.md`. **Currently none.** |
| **Primary CTA** | Start a project → `/contact` |
| **Secondary CTA** | Each card links to its case study (label "See the project", not "Read more") |
| **Internal links** | Every `/work/[slug]`, the service pages |
| **Search intent** | Navigational and evaluative ("CALIX work", "CALIX portfolio"). |
| **Conversion objective** | Move evaluators to a relevant case study, then to an enquiry. |

### 5.10 `/work/[slug]` — GATE G1

| Aspect | Definition |
|---|---|
| **Audience & intent** | High-intent evaluators. Their question: *"How did they approach a problem like mine, and what happened?"* |
| **Core message** | One project: the situation, the key strategic decision, the work, and the outcome. |
| **Content hierarchy** | Structure chosen per project (`docs/portfolio-inventory.md` §5): summary bar (client or descriptor, industry, services, year) → situation and objective → strategy → work by service → outcome (E3 only) → client quote (Q only) → related services → next project → CTA |
| **Portfolio evidence** | The project itself. Only approved facts, assets and metrics. |
| **Primary CTA** | Start a similar project → `/contact?ref=[slug]` |
| **Secondary CTA** | Links to the services used. Next project. |
| **Internal links** | The service pages used, `/work`, one related case |
| **Search intent** | Long-tail evaluative and brand ("[client] rebrand", "CALIX [project]") for P1 work. Supports GEO evidence. |
| **Conversion objective** | Turn proof into an enquiry. This is the highest-intent page after `/contact`. |

### 5.11 `/studio`

| Aspect | Definition |
|---|---|
| **Audience & intent** | Prospects nearing a decision. Their question: *"Who are these people, how do they work, and can I trust them?"* |
| **Core message** | A small, senior studio `[TO CONFIRM: team size and seniority]` with a documented way of working across strategy, design, technology and growth. |
| **Content hierarchy** | 1. What CALIX is (an entity definition: digital branding and growth studio) · 2. Principles (strategy first, built properly, measured by enquiries) · 3. **Process** in full: phases, deliverables, collaboration · 4. Team: names, roles, short bios `[G0]` · 5. Capability and partner model, stated honestly (`docs/strategy.md` §9) · 6. Working internationally: time zones, languages, how remote collaboration works `[TO CONFIRM]` · 7. CTA |
| **Portfolio evidence** | [EVIDENCE: team bios and credentials]. [EVIDENCE: company facts, brief D8]. None supplied yet. |
| **Primary CTA** | Start a project → `/contact` |
| **Secondary CTA** | See the work → `/work` |
| **Internal links** | `/services`, `/work`, `/insights` (G3), `/contact` |
| **Search intent** | Navigational and brand ("about CALIX"). Main source for the Organization entity and E-E-A-T. |
| **Conversion objective** | Remove trust and process objections before contact. |

### 5.12 `/insights` — GATE G3

| Aspect | Definition |
|---|---|
| **Audience & intent** | Problem-aware visitors from search and AI assistants, and evaluators checking expertise. Their question: *"Do they really know this subject?"* |
| **Core message** | Practical thinking on brand, websites, search and growth, from the people who do the work. |
| **Content hierarchy** | Article list (newest first), topic filter by the five services, author names. No newsletter popup. Newsletter is only an option if CALIX commits to one `[TO CONFIRM]`. |
| **Portfolio evidence** | Articles may reference approved projects. Original data only if real. |
| **Primary CTA** | Within the list: links to articles. Page-level: Start a project. |
| **Secondary CTA** | Request a Digital Diagnostic |
| **Internal links** | Articles, related service pages |
| **Search intent** | Informational (topic queries). |
| **Conversion objective** | Build authority, then route readers to service pages. A direct enquiry is a bonus, not the main goal here. |

### 5.13 `/insights/[slug]` — GATE G3

| Aspect | Definition |
|---|---|
| **Audience & intent** | Visitors researching a specific problem. Their question: *"How should I think about this?"* |
| **Core message** | One useful answer to a real buyer question, written by a named practitioner. |
| **Content hierarchy** | Title and summary answer → body with clear headings → author box (name, role, real credentials) → related service block (one, contextual) → related articles → soft CTA |
| **Portfolio evidence** | Approved project examples only. No invented statistics. External sources are cited. |
| **Primary CTA** | Contextual: e.g. "Talk to us about your search visibility" → `/contact?service=seo` |
| **Secondary CTA** | Link to the related service page |
| **Internal links** | One or two service pages, two related articles |
| **Search intent** | Informational, long-tail. A citable source for AI answers. |
| **Conversion objective** | Move a qualified reader to the relevant service page. |

### 5.14 `/contact`

| Aspect | Definition |
|---|---|
| **Audience & intent** | Ready prospects. Their question: *"How do I start, and what happens after I send this?"* |
| **Core message** | Tell us about your project. We'll reply within `[X]` working days with next steps. |
| **Content hierarchy** | 1. Short heading and what happens next (three steps: reply → introductory call → proposal) · 2. **Project brief form** (`docs/conversion-strategy.md` §4) · 3. Alternative routes: email address, book a call (if a scheduling tool is adopted) · 4. Short FAQ: minimum engagement, timelines, NDAs, working across time zones · 5. Privacy note next to the form |
| **Portfolio evidence** | Optional single approved quote next to the form. None available yet. |
| **Primary CTA** | Send my project details (form submit) |
| **Secondary CTA** | Email us directly / Book an introductory call `[TO CONFIRM tool]` |
| **Internal links** | Minimal, to avoid detours. Only `/privacy` and the header and footer. |
| **Search intent** | Navigational ("contact CALIX"). |
| **Conversion objective** | Complete the form with qualifying information. |

### 5.15 `/contact/thank-you` (noindex)

Confirms receipt, restates the reply time, explains the next steps, and offers two quiet links (a case study and the studio page). It gives a dependable conversion event for analytics. It's excluded from the sitemap and from indexing.

---

## 6. Internal linking matrix

| From ↓ / To → | Home | Services | Service pages | Work | Case study | Studio | Insights | Contact |
|---|---|---|---|---|---|---|---|---|
| Home | — | ✓ | ✓ all | ✓ | ✓ featured | ✓ | — | ✓ primary |
| Services | — | — | ✓ all | ✓ | — | ✓ process | — | ✓ primary |
| Service page | — | ✓ breadcrumb | ✓ related 1–2 | ✓ filtered | ✓ 1–3 relevant | ✓ process | ✓ related (G3) | ✓ primary |
| Work | — | — | ✓ filters | — | ✓ all | — | — | ✓ primary |
| Case study | — | — | ✓ services used | ✓ breadcrumb | ✓ next | — | — | ✓ primary |
| Studio | — | ✓ | — | ✓ | — | — | ✓ (G3) | ✓ primary |
| Insights | — | — | ✓ by topic | — | — | — | ✓ articles | ✓ |
| Article | — | — | ✓ 1–2 contextual | — | ✓ if relevant | — | ✓ 2 related | ✓ contextual |
| Contact | — | — | — | — | — | — | — | — |

Each service page receives links from Home, Services, related service pages, case studies that used it, and relevant articles.

---

## 7. Structured data plan (for the build phase)

| Route | Schema |
|---|---|
| All | `Organization` (from `/studio` facts; no `sameAs`, `award` or `aggregateRating` unless supplied), `WebSite`, `BreadcrumbList` where breadcrumbs are visible |
| Service pages | `Service` (provider: CALIX), `FAQPage` only for FAQs that are visible on the page |
| Case studies | `CreativeWork` or `Article`, with only approved facts. No `Review` unless a permissioned quote is shown. |
| Articles | `Article` with a real `author` (`Person`) |
| Studio | `AboutPage`, `Person` for named team members |
| Contact | `ContactPage` |

---

## 8. Decisions this IA depends on

| Decision (`docs/strategy.md` §11) | IA effect |
|---|---|
| 1. Primary entry offer | Order of services in the navigation and on the Home page. Which service page leads. |
| 2. Situation vs. industry focus | Whether `/work` gets industry filters, and whether industry pages are ever added. |
| 3. In-house capability | Gate G2. The scope sections of the web and marketing pages. Partner wording on `/studio`. |
| 4. Pricing transparency | The "Investment" section on every service page. Budget bands on the form. |
| 5. Publishable work | Gate G1. Every evidence slot on the site. |
| Brief D8 company facts and team | Gate G0, the footer and the Organization schema. |
