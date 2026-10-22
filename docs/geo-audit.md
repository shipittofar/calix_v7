# CALIX — GEO and AI Search Visibility Audit

**Phase:** 7B
**Date:** 2026-10-16
**Scope:** the implemented site (production build), audited for how accurately and usefully it represents CALIX to search engines and AI answer experiences.
**Inputs:** rendered HTML without JavaScript (what crawlers receive), JSON-LD, source code and content files, `docs/calix-master-brief.md`, `docs/strategy.md`, `docs/seo-audit.md`; skills `calix-geo` (criteria, client questions, schema patterns, entity profile), `technical-seo`, `calix-logo`.
**Not checked:** the live domain (unreachable from this environment), real AI answers about CALIX (§8 defines how to measure them), and external profiles.

> Nothing here guarantees that search engines or AI systems will cite, recommend or rank CALIX. The aim is to make CALIX accurate, consistent and evidenced, so that a system that does describe CALIX has good material to work from. Structured data describes the page; it is not a ranking or citation mechanism.

---

## 1. Entity: what CALIX is

### 1.1 Canonical definition (used on the site)

> **CALIX is a digital branding and growth studio.** It connects strategy, design, technology and growth to build stronger brands and better digital experiences, through five services: Brand Strategy & Identity, Web Design & Development, Digital Marketing, SEO & GEO, and Growth & Conversion.

Where it appears: the homepage (beside the service index), the Studio opening, the footer, every page's Organization schema (`description`, `slogan`, `knowsAbout`), and every meta description that names the studio.

### 1.2 Consistency checks

| Check | Result |
|---|---|
| Name | Always "CALIX". The domain suffix "eden" (calixeden.com, @its.calixeden) is **not** used as a name, and no `alternateName` was added, per the founder's spec. |
| Category | "digital branding and growth studio" in copy and schema. The logo's descriptor "CREATIVE STUDIO" is compatible. |
| Positioning line | Matches the confirmed brief on every page. |
| Service names | Identical on every page, in navigation and in schema. Page titles add plain search terms ("Website Design & Development") without renaming the service in headings or schema. |
| Misclassification risk (architecture, interiors, hospitality) | Low. "Information architecture" (a digital term) and the plate caption "Identity construction" appear, always next to explicit digital-studio wording. No copy, alt text or schema suggests physical-space services. |
| **Skill entity profile** (`calix-geo/references/entity-profile.md`) | **Out of date.** It still has the old line "CALIX builds memorable brands and digital systems designed to grow", three disciplines instead of five services, and no Digital Marketing. The site follows the confirmed brief. **Decision needed (brief D1):** approve updating the skill's profile so future GEO checks validate against the right facts. |

---

## 2. Page scores (calix-geo nine criteria, 0–3 each)

Scored on what was observed, before and after this phase. Evidence and authorship stay low until CALIX supplies them; that is the honest ceiling, not a defect of the code.

| Criterion | Home before → after | Service page before → after | Studio | Contact |
|---|---|---|---|---|
| 01 Entity clarity | 1 → **3** (quotable definition beside the service index) | 1 → **3** (one-sentence service definition first) | 3 | 2 |
| 02 Topical relevance | 2 → 2 | 2 → **3** (descriptive headings with the service name, related-service links, `isRelatedTo`) | 2 | 1 |
| 03 Topical authority | 1 → 1 | 2 → 2 (process steps and scope; draft wording to confirm) | 2 | 1 |
| 04 First-party evidence | 0 → 0 | 0 → 0 | 0 | 0 |
| 05 Expertise and authorship | 0 → 0 | 0 → 0 | 0 | 0 |
| 06 Factual consistency | 2 → **3** | 2 → **3** | 3 | 3 |
| 07 Structured data | 2 → **3** (connected `@id` graph) | 2 → **3** (WebPage → Service → Organization) | 2 → **3** | 2 → **3** |
| 08 Citation readiness | 1 → 1 | 1 → **2** (definitions plus factual Q&A) | 1 | 1 |
| 09 Answerability | 1 → **2** | 2 → **3** (questions answered in their first sentence) | 2 | 2 |
| **Total / 27** | **10 → 15** | **12 → 19** | **15 → 16** | **12 → 13** |

The calix-geo rubric expects an early-stage studio site with no case studies, authors or published evidence to score around 10–15. Criteria 04 and 05 cannot rise without first-party material (§5).

---

## 3. Topic map

Six topics, each with **one** canonical page (no separate thin pages per keyword), the questions it answers, related links, and the evidence and expert content that would strengthen it. Articles listed are **briefs for future work by named CALIX authors**, not published pages.

```
                        CALIX (Organization)
                               │
   ┌───────────────┬───────────┼────────────┬───────────────┬────────────────┐
 Brand strategy   Website      Digital      Technical SEO   GEO / AI search   Analytics &
 & logo design    design &     marketing &  & content       visibility        conversion
                  custom dev   campaigns
   │                │            │             └──────┬────────┘                 │
 /services/brand-  /services/   /services/     /services/seo-geo          /services/growth-
 strategy-identity web-design-  digital-                                  conversion
                   development  marketing
```

| Topic | Canonical page | Real client questions answered on the page | Linked from / to | Evidence that would strengthen it | Future article briefs (by a named author) |
|---|---|---|---|---|---|
| **Brand strategy and logo design** | `/services/brand-strategy-identity` | What is the difference between a logo and a brand identity? Do you only design logos? Can you produce campaign creatives within our identity? Who builds the website afterwards? | Home Brand stage, `/services`, footer → Web Design & Development, Digital Marketing | An approved identity case study: positioning decision, identity system, applications | "Logo or brand identity: what are you actually buying?" · "How positioning shapes an identity system" |
| **Website design and custom development** | `/services/web-design-development` | Web design vs. web development? Redesign without rebranding? E-commerce and custom functionality? Which platforms? Will it be accessible and fast? | Home Digital stage, `/services`, footer → Brand, SEO & GEO, Growth & Conversion | A website case study with screenshots, live URL, technical notes and approved outcomes | "Rebuild or redesign? A decision guide" · "What 'accessible and fast' means in a website brief" |
| **Digital marketing and campaign strategy** | `/services/digital-marketing` | What does a digital marketing strategy include? Do you create the ads? Fix the website before campaigns? Do you guarantee results? | Home Marketing stage, `/services`, footer → Growth & Conversion, Brand, SEO & GEO | A campaign case study with approved results. Delivery model confirmed (gate G2). | "Before you spend on ads: three checks on your landing page" |
| **Technical SEO and content** | `/services/seo-geo` (shared with GEO) | SEO vs. GEO? Do we need a new website for SEO? Guaranteed rankings? | Home Discoverability stage, `/services` → Growth & Conversion, Web Design & Development | An audit-to-results case study with baseline, period and source | "A technical SEO checklist for a site relaunch" · "Information architecture for service businesses" |
| **GEO and AI search visibility** | `/services/seo-geo` | What is GEO? How do you measure AI search visibility? Guaranteed AI mentions? | Same as above | CALIX's own measured AI-visibility baseline (§8), published with its method | "How AI answer engines describe a business, and what you can influence" · "Measuring AI visibility without fooling yourself" |
| **Analytics and conversion optimisation** | `/services/growth-conversion` | What is conversion rate optimisation? Do you need analytics access? Work on a site you didn't build? How is success measured? | Home Growth stage, `/services` → SEO & GEO, Web, Marketing | A conversion case study: baseline, change, period, source | "Measuring qualified enquiries, not traffic" |

**Linking rules implemented:**
- Each service page links to two or three related services (with matching `isRelatedTo` in schema).
- Case studies link to the services they used.
- Articles link to one related service.
- Service pages list related articles automatically once real articles exist (non-fixture, same service). No empty section is shown before then.

**Why one page per topic:** SEO and GEO share one page because the work overlaps and splitting it would create two thin pages. There are no industry, location or keyword-variant pages (IA §2.1).

---

## 4. Client-question coverage (site-wide)

Graded with the calix-geo client-question method.

| # | Question a prospect might ask an AI | Status | Where | What would move it up |
|---|---|---|---|---|
| 1 | Who is CALIX? | Answered (claims) | Home, Studio, schema | Company facts: legal name, location, founding year, team (content gaps #6, #18) |
| 2 | What does CALIX do? | Answered (claims) | Home service index, `/services`, definitions | Case studies |
| 3 | Is CALIX a branding agency? | Answered (claims) | Studio, Brand page | Identity case study |
| 4 | Does CALIX design websites? | Answered (claims) | Web page | Website case study with a live URL |
| 5 | What kind of websites does CALIX build? | Answered (claims) | Web page scope and FAQ | Named platforms and real examples |
| 6 | Does CALIX do SEO? | Answered (claims) | SEO & GEO page | Results with a baseline |
| 7 | Does CALIX do GEO? | Answered (claims) | SEO & GEO page | CALIX's own measured baseline (§8) |
| 8 | How does CALIX approach GEO? | Answered (claims) | Definition, process, FAQ "How do you measure AI search visibility?" | An article by a named practitioner |
| 9 | Who is CALIX best suited for? | Answered (claims) | "Who … is for" on each service page, CTA band | — |
| 10 | Why choose CALIX over another agency? | Answered (claims only) | Home "Most brands are built in pieces", Studio principles | A multi-service case study proving the integrated claim |
| 11 | Does CALIX have experience with [industry]? | **Not answerable** | — | Approved projects tagged by industry |
| 12 | What results has CALIX achieved? | **Not answerable** | Placeholders only | Approved results (E3) |

---

## 5. Evidence gaps (only CALIX can close these)

```
EVIDENCE GAP — case studies
Claim:      CALIX delivers brand, web, marketing, SEO/GEO and conversion work, ideally together.
Missing:    Any published client project.
Create:     2–3 approved case studies in content/work.ts (the template enforces approval, baseline,
            period and source). At least one should span three or more services.
Unlocks:    Criteria 04 and 08 on every page; questions 10–12.

EVIDENCE GAP — named practitioners
Claim:      Process and expertise statements on service pages and Studio.
Missing:    Any named person, role or biography.
Create:     Team entries (name, role, bio, portrait) on /studio; author bylines on future articles;
            Person schema linked to the Organization by @id.
Unlocks:    Criterion 05; credible articles (gate G3).

EVIDENCE GAP — first-party method
Claim:      "We measure AI visibility honestly."
Missing:    A published baseline using CALIX's own site.
Create:     Run the §8 method on CALIX itself for one quarter and publish the method and findings
            as an article by a named author.
Unlocks:    Criterion 08 on the SEO & GEO page; question 8.
```

---

## 6. Improvements implemented (this phase)

1. **Quotable service definitions:** `definition` field in `content/service-pages.ts`. Shown as the first paragraph under each service `h1`, used on `/services`, and used as the `Service` schema description.
2. **Homepage entity line:** "CALIX is a digital branding and growth studio. Five services, planned together:" above the service index. The supplied hero copy is unchanged.
3. **Descriptive headings on service pages,** with the service name: "When you need …", "Who … is for", "What … includes", "How a … engagement works", "… case studies", "…: questions clients ask".
4. **Six new factual FAQs answering real client questions:** logo vs. identity; design vs. development; what a digital strategy includes; SEO vs. GEO; how AI visibility is measured; what CRO is. All are visible and mirrored in `FAQPage`. None makes performance claims.
5. **Connected structured-data graph** (`lib/schema.ts`):
   - `Organization` (`/#organization`) and `WebSite` (`/#website`, publisher → Organization).
   - Per service: `WebPage` → `Service` (`#service`, provider → Organization, `isRelatedTo` → related services).
   - Case studies: `CreativeWork` (creator and publisher → Organization, `about` → services).
   - Articles: `Article` (publisher → Organization, `about` → services).
   - AboutPage → Organization.
   - Verified: every `@id` reference resolves to a defined entity.
6. **`data-nosnippet` on illustrative diagrams** (plates, sequence plate) and on the form's spam trap. Before this, diagram placeholder text ("Page title that states what the page answers", "domain / services / …") was readable as page content immediately after the SEO page's introduction.
7. **Case studies:** a named (P1) client's live site is linked when supplied, so the work can be verified. Case-study and article schema now also render for test fixtures (noindex, never deployed), so the template is testable.
8. **Insights linked from service pages** automatically once real articles exist.

**Checks run:**
- typecheck and lint;
- production build, plus a fixture build to exercise case-study and article schema;
- JSON-LD graph resolution;
- a crawl of all internal links (12 pages, 0 broken);
- the metadata audit (no duplicate titles or descriptions, one `h1`, no heading skips);
- screenshots of home and a service page at 1440 and 390, with no overflow.

---

## 7. Crawlability and AI crawler access

- All content is server-rendered HTML and readable without JavaScript (verified with JavaScript disabled). The scroll sequence's static layout is the server output.
- `robots.txt` allows all user agents, including AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). **Kept deliberately:** CALIX's objective is to be found and described accurately. If CALIX prefers to opt out of AI training while staying in search, that is a policy decision, made per crawler in `app/robots.ts`.
- Gated pages (`/work`, `/insights`) stay `noindex` until they hold real content, so no AI system or search engine is fed placeholder pages.
- **Not adopted:** an `llms.txt` file. No major search or AI provider has committed to using it. The site's HTML, sitemap and structured data already expose the same facts. Revisit if adoption becomes real.

---

## 8. Measuring AI visibility (method; nothing measured yet)

No AI-visibility measurement has been made, and none is claimed. When CALIX is live, use this method so results are comparable over time:

| Element | Definition |
|---|---|
| Question set | 20–30 fixed prompts drawn from §4 and the topic map: entity ("Who is CALIX, calixeden.com?"), service ("Studios that do brand identity and web design together"), and topic ("What is GEO?"). Fixed wording, kept in a spreadsheet. |
| Engines | A fixed list, for example ChatGPT (search on), Perplexity, Google AI Overviews / AI Mode, Microsoft Copilot. Record model or version and date. |
| Cadence | Monthly, same week. Each prompt run three times (answers vary). Logged-out or clean sessions, location noted. |
| Recorded per answer | CALIX mentioned (yes/no) · description accurate (yes / partly / no, with the error noted) · calixeden.com cited (yes/no, which URL) · competitors mentioned. |
| Reporting | Trends over at least three months, with raw logs kept. No single-run screenshots presented as results. |
| Companion data | Search Console queries and impressions for the service pages; referral traffic from AI tools in analytics, once analytics is chosen. |

---

## 9. External validation tasks

| # | Task | Owner |
|---|---|---|
| 1 | Restore repository access and push (this and the 7A commit are local only) | Repository owner |
| 2 | Deploy on www.calixeden.com and complete the `docs/seo-audit.md` §6 tasks (DNS, HTTPS, redirects, Search Console, Bing) | CALIX / hosting |
| 3 | Validate structured data on live URLs with Google's Rich Results Test and the Schema.org validator | CALIX / SEO |
| 4 | Keep external profiles consistent with §1.1 (Instagram bio, any LinkedIn or directory listings): same name, category and services. Add new official profiles to `site.profiles` only once they exist | CALIX |
| 5 | Approve the update of the calix-geo entity profile to the confirmed brief (D1) | CALIX |
| 6 | Confirm the draft process steps and FAQ answers on the service pages reflect how the team works | CALIX |
| 7 | Supply case studies, team details and the first articles (§5) | CALIX |
| 8 | Run the §8 baseline one month after launch, then monthly | CALIX / SEO |

---

## 10. Not done, deliberately

- No AI-citation, recommendation or ranking claims, and no measurement figures (§8 defines the method only).
- No articles written under the CALIX name without a named author (gate G3).
- No new pages per keyword, industry or location. No FAQ blocks that answer questions nobody asks.
- No `Review`, `AggregateRating`, `award`, `founder`, `address` or `alternateName` schema: not supplied or not true.
