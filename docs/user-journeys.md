# CALIX — User Journeys

**Phase:** 2 — UX and information architecture
**Last updated:** 2026-10-09
**Related:** `docs/information-architecture.md` (routes and gates), `docs/conversion-strategy.md` (CTAs and forms), `docs/ideal-clients.md` (profiles)

Each journey shows how a qualified prospect moves from first contact to an enquiry, which questions each step must answer, and where the evidence gaps are. Evidence slots stay empty until verified projects exist (`docs/portfolio-inventory.md`).

**Entry points considered for every journey:** referral (direct or brand search), organic search, AI assistant answers (ChatGPT, Perplexity, AI Overviews), and social or professional networks. Referrals are likely the main source for a new studio `[TO CONFIRM, strategy A11]`, so every journey assumes some visitors arrive already knowing the name.

---

## Journey 1 — A business seeking a new brand identity

**Who:** Primary ICP (outgrown business repositioning) or Secondary A (launching a new venture).
**Trigger:** Repositioning, a new market, a launch, or losing work to competitors who look more credible.

| Step | Page | Visitor question | What the page must provide | Action |
|---|---|---|---|---|
| 1. Arrive | `/` (referral or brand search) or `/services/brand-strategy-identity` (search such as "brand identity studio") | "Is this a brand studio, and is it the right level for us?" | A clear positioning statement. Brand shown as the first service. Premium visual quality as proof in itself. | Clicks to the Brand service |
| 2. Check fit | `/services/brand-strategy-identity` | "What exactly do we get? How does it work? Is it for a business like ours?" | Scope (positioning → identity → guidelines → applications), process and timeline, fit and not-fit statement, investment guidance | Opens a brand case study |
| 3. Evaluate proof | `/work/[slug]` (brand case) | "Is the work good? Did it solve a real problem?" | The strategic decision behind the identity. Identity system visuals. Applications. [EVIDENCE: P1/P2 identity project] | Checks the studio, or goes straight to contact |
| 4. Build trust | `/studio` (optional) | "Who would we work with?" | Named team and roles. Full process. | Clicks "Start a project" |
| 5. Enquire | `/contact?service=brand` | "What happens after we send this?" | The form with Brand pre-selected, budget and timeline bands, and the reply promise | Sends the project details |

**Main objections and where they're answered**

| Objection | Answered on |
|---|---|
| "Will the identity work beyond a logo?" | Service page scope; case study applications |
| "Who builds the website afterwards?" | Service page "How it connects", which leads into the Brand & Website offer |
| "Cost?" | Service page investment section |

**Cross-sell moment:** On the service page and the case study, Brand leads into Web Design & Development as the natural continuation. That's the Brand & Website engagement.
**Evidence gap:** Without identity case studies, step 3 is empty. This is the biggest risk to this journey.

---

## Journey 2 — A company needing a website or custom development

**Who:** Primary ICP (outdated site holding the business back) or Secondary A. Includes e-commerce and custom builds.
**Trigger:** The site underperforms, is technically outdated or hard to manage, a platform has reached end of life, or there's a launch deadline.

| Step | Page | Visitor question | What the page must provide | Action |
|---|---|---|---|---|
| 1. Arrive | `/services/web-design-development` (search such as "custom website development studio") or `/` | "Do they build websites, and to what standard?" | Clear service name, outcome statement, technical standards (accessibility, performance, security, SEO foundations) | Reads the scope |
| 2. Check capability | `/services/web-design-development` | "Can they handle e-commerce or custom backend work? Which platforms?" | **Confirmed** scope and stacks only `[decision 3]`. Process and timeline range. What the client needs to provide. | Opens a website case study |
| 3. Evaluate proof | `/work/[slug]` (web case) | "Does the site look and work well? Did it improve anything?" | Desktop and mobile screens, a live URL, technical notes, an E3 outcome if approved. [EVIDENCE: P1/P2 website project] | Checks the brand question |
| 4. Brand question | `/services/brand-strategy-identity` (optional) | "Our brand is weak too. Should we fix that first?" | "How it connects" explains the Brand & Website engagement | Clicks "Start a project" |
| 5. Enquire | `/contact?service=web` | "Will they understand the technical scope?" | A form with a project description field and a current website URL field. FAQ about NDAs and technical requirements. | Sends the project details |

**Main objections**

| Objection | Answered on |
|---|---|
| "Will it bring enquiries, or just look good?" | Service page (conversion built in); case study outcomes |
| "Can we update it ourselves?" | Service page FAQ (CMS and handover) |
| "Who maintains it after launch?" | Service page FAQ; the Search & Growth Programme `[maintenance offer TO CONFIRM]` |
| "Is custom backend really in-house?" | Honest capability statement `[decision 3]` |

**Risk:** Claiming backend or e-commerce capability that isn't confirmed would draw enquiries CALIX can't serve well. Scope copy must wait for the capability check.

---

## Journey 3 — A business seeking digital marketing

**Who:** A business with a reasonable brand and site that wants campaigns, social or content.
**Trigger:** A new marketing budget, a product launch, or disappointing results from a previous agency.

**Path A — if gate G2 is met** (`/services/digital-marketing` is live)

| Step | Page | Visitor question | What the page must provide | Action |
|---|---|---|---|---|
| 1. Arrive | `/services/digital-marketing` (search) or `/` | "Do they run campaigns, and on which platforms?" | Confirmed channels and scope, and how campaigns connect to the brand and site | Reads the approach |
| 2. Check readiness | Same page | "Is our site good enough to send traffic to?" | A section on "fixing what the traffic lands on", with a Diagnostic option | Chooses a route |
| 3a. Ready for campaigns | `/work/[slug]` (campaign case) → `/contact?service=marketing` | "Have they produced results?" | [EVIDENCE: campaign creatives and E3 results, approved] | Sends the project details |
| 3b. Unsure | `/contact?enquiry=diagnostic` | "What should we fix first?" | The Diagnostic offer | Requests a Diagnostic |

**Path B — if gate G2 is not met**

A search for marketing services finds `/services/growth-conversion`, which includes a Campaigns section with the confirmed scope only. The journey then continues as Journey 4 (step 2 onward).

**Main objections:** "Will this just burn ad spend?" (answered by the fix-the-foundation-first approach and honest measurement) · "Who creates the ads?" (Brand service: campaign creatives and banners).
**Risk:** This is the most crowded and most outcome-driven service. Without E3 campaign evidence, it should guide visitors toward the Diagnostic rather than compete head-on with performance agencies.

---

## Journey 4 — A company struggling with search visibility

**Who:** Secondary B: a credible brand that isn't being found or isn't converting.
**Trigger:** Falling enquiries, declining organic traffic, competitors appearing in AI answers, or a board asking for measurable digital results.

| Step | Page | Visitor question | What the page must provide | Action |
|---|---|---|---|---|
| 1. Arrive | `/insights/[slug]` (informational search or AI answer, G3), or `/services/seo-geo` | "Why aren't we visible, including in AI search?" | A useful, specific explanation by a named author, with a link to the service | Clicks through to the service |
| 2. Check approach | `/services/seo-geo` | "Is this a credible SEO and GEO team, or another agency promising rankings?" | Scope (technical, content, IA, GEO), the **"What we don't promise"** block, how progress is measured | Considers the Diagnostic |
| 3. Low-commitment step | `/services/seo-geo` → Diagnostic section | "Can we find out what's wrong before committing to a retainer?" | What the Diagnostic covers, the deliverable, price and timing `[TO CONFIRM]` | Clicks "Request a Diagnostic" |
| 4. Evaluate proof (optional) | `/work/[slug]` | "Have they improved visibility for anyone?" | [EVIDENCE: E3 search results with baseline, period and source]. CALIX's own site's technical quality. | — |
| 5. Enquire | `/contact?enquiry=diagnostic` | "What do you need from us?" | A form with website URL required, and a short note on access needed later (e.g. Search Console) | Sends the request |

**Main objections**

| Objection | Answered on |
|---|---|
| "We've been burned by SEO promises before." | The "What we don't promise" block, and honest measurement |
| "Is GEO real or hype?" | A plain explanation on the service page and in articles. Responsible-practice framing. |
| "Do we need a new website?" | The Diagnostic answers this. The service page says a rebuild is not assumed. |

**Follow-on:** Diagnostic → Search & Growth Programme (retainer) → possibly a Website project if the Diagnostic shows structural problems.
**Evidence gap:** Without E3 search results, this journey relies on clear method and honest positioning. That's credible, but weaker than results.

---

## Journey 5 — A prospect interested in several integrated services

**Who:** Primary ICP, the core commercial target. They need brand, website and growth handled together.
**Trigger:** Tired of coordinating several suppliers. A significant repositioning. A new marketing lead fixing the foundations.

| Step | Page | Visitor question | What the page must provide | Action |
|---|---|---|---|---|
| 1. Arrive | `/` (referral, brand search or AI recommendation) | "Do they really do all of this, or is it a list?" | The hand-off problem and the "one strategy, carried all the way through" message. Services shown as one connected system. | Scrolls through the narrative |
| 2. Understand the model | `/services` | "How would an engagement with several services work?" | The Brand & Website engagement and the Search & Growth Programme explained, with how phases connect | Opens a multi-service case |
| 3. Evaluate proof | `/work/[slug]` (multi-service case) | "Have they delivered it end-to-end?" | A full case-study structure covering several services. [EVIDENCE: P1/P2 project with three or more services] | Checks the studio |
| 4. Build trust | `/studio` | "Is the team set up to deliver all of this? Who does what?" | Named team, process, an honest partner model | Clicks "Start a project" |
| 5. Enquire | `/contact` | "Can we describe something broad?" | A multi-select service field including "Not sure yet", and an open project description | Sends the project details |

**Main objections**

| Objection | Answered on |
|---|---|
| "A jack of all trades?" | Process on `/studio`, multi-service case study, honest capability statement |
| "Single point of failure?" | Named team and partner accountability (`docs/strategy.md` §9) |
| "Big commitment" | Phased engagements. The Diagnostic as an entry. |

**Critical dependency:** This journey depends on the integrated-delivery claim (`docs/strategy.md` §4.3). Without a multi-service case study, step 3 fails. The home page would then need the softer message: "Strategy, design, technology and growth, planned together."

---

## Cross-journey summary

| Journey | Main entry route | Primary CTA | Low-commitment alternative | Most important missing evidence |
|---|---|---|---|---|
| 1 Brand | Brand service page / Home | Start a brand project | Book an introductory call | Identity case studies |
| 2 Website | Web service page | Start a website project | Book an introductory call | Website cases with screens and a live URL |
| 3 Marketing | Marketing page (G2) or Growth page | Discuss a campaign | Request a Diagnostic | Campaign results (E3) |
| 4 Search | SEO & GEO page / Insights | Request a Diagnostic | — | Search results (E3) |
| 5 Integrated | Home | Start a project | Request a Diagnostic | A multi-service case study |

**Shared pattern:** every journey reaches a proof step (`/work/[slug]`). With no verified projects in the inventory, this is the single largest weakness across all five journeys.
