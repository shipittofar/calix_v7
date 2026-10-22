# CALIX — Content Gaps

**Purpose:** Every fact or asset the website needs that CALIX has not supplied yet. Each item renders on the site as a clearly identified placeholder, either an inline `[… to be confirmed]` marker (`Pending` in `content/site.ts`) or a "Content placeholder" block. Nothing here may be replaced with invented content.
**Last updated:** 2026-10-16 (Phase 7A)

| # | Missing item | Where it appears | Rendered as | Source to update |
|---|---|---|---|---|
| 1 | **Approved client projects** (two or three, P1/P2, with assets, services, year, objective, approval reference) | Home: Selected work (`#work`) | Content placeholder block | `content/work.ts`, `docs/portfolio-inventory.md` |
| 2 | **Verified client outcomes** (figures with baseline, period, source and approval) | Home: Credibility | Content placeholder block | Future case-study content |
| 3 | **Client testimonial** (exact words, name, role, company, written permission) | Home: Credibility | Content placeholder block | Future content |
| 4 | **Enquiry reply time** | Home hero, final CTA, contact page, thank-you page | Inline marker | `content/site.ts` → `replyTime` |
| 5 | **Enquiry email address**: the founder's logo specification lists one. Confirm it should be published as the enquiry address. | Footer, contact page | Inline marker | `content/site.ts` → `email` |
| 6 | **Legal entity name** | Footer | Inline marker | `content/site.ts` → `legalName` |
| 7 | **Legal privacy notice** (controller, lawful basis, retention, rights, legal review) | `/privacy` | Content placeholder block | `app/privacy/page.tsx` |
| 8 | ~~CALIX logo~~ **Resolved (Phase 7A):** founder's wordmark and emblem files now used in the header, footer, favicon and share image | — | — | `public/brand/`, `components/layout/Wordmark.tsx` |
| 9 | **Budget bands and currency** | Contact form | Optional free-text "Budget range" field instead of a select | `lib/enquiry/schema.ts`, `components/form/EnquiryForm.tsx` |
| 10 | **Digital Diagnostic** (scope, price, timing) | Not shown: the offer is unconfirmed (strategy A9) | Omitted | `content/services.ts`, contact form |
| 11 | **Process and collaboration wording**, confirmed against how the team actually works | Home: Process (`#process`) | Shown as draft copy | `content/process.ts` |
| 12 | **Digital Marketing capability** (gate G2: in-house or named partner) | Home: Digital Marketing section | Shown per the confirmed service list; scope needs confirmation | `content/site.ts` → `gates.digitalMarketingConfirmed` |
| 13 | **Production domain**: www.calixeden.com, from the founder's logo specification, set as the production default. **Still to verify** that it serves this site. | Canonical URLs, sitemap, structured data | `content/site.ts` → `productionUrl`, `SITE_URL` override | Hosting and DNS (`docs/seo-audit.md` §6) |
| 14 | **Mail delivery credentials** (SMTP host, user, password, recipient, `FORM_SECRET`) | Enquiry form | Without them, production shows a clear "could not send" message rather than a false success | Deployment environment |
| 15 | **Hero copy casing** | Home hero | Uses the supplied Title Case headline; the design system prefers sentence case | Confirm with CALIX |
| 16 | **Service investment and timeline**: a starting price and typical timeline for each of the five services | Each service page, "How the engagement works" | Inline markers | `content/service-pages.ts` |
| 17 | **Service page process steps and FAQ answers**, confirmed against how the team works | Five service pages | Shown as draft copy | `content/service-pages.ts` |
| 18 | **Team** (names, roles, biographies, portraits) and **delivery model** (in-house vs. named partners, locations, time zones, languages) | `/studio` | Content placeholder blocks | `app/studio/page.tsx` |
| 19 | **Case studies per service** | Each service page, "Relevant work" | Content placeholder block | `content/work.ts` |
| 20 | **Articles** (at least three, by named authors) | `/insights` (noindex until then) | Content placeholder block | `content/insights.ts` |
