# CALIX final QA report (Phase 8)

Date: 16 October 2026. Scope: the whole site, built for production (`next build` + `next start`, Next.js 16.4.0), tested in Chromium through Playwright, with Lighthouse 12.8.2. Nothing was deployed and no production infrastructure was touched.

## Recommendation

**Ready for launch after the specified fixes** (§7). The code, layouts, accessibility, performance and analytics are launch-quality. What remains is configuration and content:
- the live mail credentials and one real test enquiry;
- the reviewed legal privacy notice;
- a few supplied facts.

The site must not go public until the first two are done. Publishing approved case studies is the most important business improvement. It does not block launch, but the site will convert below its potential until they exist.

---

## 1. Quality scores

Each score is 0–10, as judged after this phase's fixes. Where a fix changed the score, the "before" column shows it.

| # | Category | Before | Score | Basis |
|---|---|---|---|---|
| 1 | Brand consistency | 9 | **9** | Only the five palette colours render on any page; both brand fonts load on every page; no shadows, gradients or radius; Antique Gold at most 0.1% of any page. Small body text at 15px in some secondary paragraphs (P2) |
| 2 | Service clarity | 9 | **9** | Each service page opens with a one-sentence definition, then "who it is for / not for", deliverables, process and FAQs. Investment and timeline fall back to process statements until supplied |
| 3 | Real portfolio accuracy | 9 | **9** | Nothing invented. No client names, metrics, testimonials or awards appear anywhere, including JSON-LD. Concept illustrations carry "Illustration, not client work". **There is no portfolio content yet** (gate G1), which is a business gap, not an accuracy fault |
| 4 | Desktop, tablet, mobile layouts | 9 | **9** | 14 pages × 3 viewports: no horizontal overflow, no clipped content, no broken images, CLS 0 on all content pages |
| 5 | Navigation and CTA functionality | 8 | **9** | All 12 crawled routes return 200; all six CTA destinations open a working form with the right service ticked. Header tap targets raised to 44px |
| 6 | Scroll narrative continuity | 8 | **8** | Desktop: one sticky plate steps through all six stages in order, one layer active at a time, captions and rail in sync, cleaned up on navigation and resize. Tablet and mobile use the static sequence by design |
| 7 | Reduced-motion behaviour | 9 | **9** | `prefers-reduced-motion: reduce` turns the sticky mode off, shows all six static plates, disables the scroll-driven annotation reveals and zeroes micro-transitions |
| 8 | Keyboard navigation and accessibility | 9 | **9** | Skip link first and working; visible focus ring on every tab stop tested; mobile menu opens with Enter, closes with Escape and returns focus; Lighthouse accessibility 100 on every page tested |
| 9 | Forms and submission states | **5** | **9** | Before: three routes to a false "thank you" that silently lost the enquiry (§3, F1–F3). After: every state tested, with and without JavaScript |
| 10 | SEO and metadata | 9 | **9** | Unique titles and descriptions, a canonical, Open Graph image, valid JSON-LD and one h1 on every page. Sitemap lists the 10 indexable pages; thin pages are noindexed on purpose |
| 11 | GEO content clarity | 8 | **8** | Quotable service definitions, FAQ schema, a stable entity graph. Limited by missing entity facts: legal name, team, location, case studies |
| 12 | Performance and layout stability | 9 | **9** | Lighthouse mobile performance 92–100, CLS 0 everywhere, about 280 KB total transfer on the home page |
| 13 | Console errors and broken links | 10 | **10** | No console errors on any page (except the expected 404 on the not-found page); no broken internal links or anchors |
| 14 | Security and environment configuration | 6 | **7** | Security headers, no secrets in client bundles or the repository, no production dependency vulnerabilities. Fixed: log transport accepted in production; undocumented variables. Open: CSP lacks `script-src`; the in-memory rate limit is per instance |
| 15 | Analytics events | 8 | **8** | All five events fire exactly once, carry no personal data, and are not duplicated on reload or spam. No provider is connected (a pending decision), so nothing is measured yet |

---

## 2. Method

| Area | How it was tested |
|---|---|
| Visual | `calix-visual-qa` capture script: 14 routes (including the 404 page) × 1440, 768 and 390. Fold, full-page and slice screenshots, plus checks for overflow, fonts, palette, contrast, headings, tap targets, CLS and LCP. Two rounds (before and after fixes). Screenshots are in `.visual-qa/<page>/round-1` and `round-2` (gitignored) |
| Scroll narrative | Real viewport scrolling (full-page screenshots cannot show sticky behaviour). 9 positions through the sequence, plus the page end, at 1440 (normal and reduced motion), 768 and 390. Checked: active stage, active layer count, caption, traveller placement; teardown after client navigation; resize from 1440 to 900 and back |
| Functional | A Playwright suite: crawl from `/` following every internal link; metadata and JSON-LD on each page; 404 handling; keyboard tab order and focus rings; skip link; mobile menu by keyboard and pointer; every form state (§5) |
| Performance | Lighthouse 12.8.2, simulated mobile, on 6 pages; desktop preset on the home page. **Lab data only** |
| Accessibility | Lighthouse accessibility; the `accessibility-audit` static scanner; the keyboard tests above |
| Brand | The `calix-brand` palette checker on source CSS/TSX and the built CSS |
| Security | Response headers; grep of client bundles for secrets; tracked files; `npm audit`; review of the server action |

---

## 3. Issues found

Severity: P0 broken, P1 major, P2 design-system or moderate, P3 polish.

| # | Issue | Severity | Evidence | Status |
|---|---|---|---|---|
| F1 | An empty form submitted within 3 s of page load reached "Thank you. Your brief is with us." Spam checks ran before validation, and the timing check answered with a silent success | **P0** | Playwright: empty submit → `/contact/thank-you` | **Fixed** |
| F2 | A real prospect whose form token expired (tab open over 24 h), or who submitted within 3 s (autofill), saw "thank you" while the enquiry was dropped | **P0** | Code path in `app/contact/actions.ts` | **Fixed** |
| F3 | A genuine brief with more than three links, such as reference sites, was silently dropped as link spam | **P1** | `looksLikeLinkSpam` → silent redirect | **Fixed** |
| F4 | `MAIL_TRANSPORT=log` set on the live site by mistake would accept enquiries and deliver none | **P1** | `lib/enquiry/mail.ts` | **Fixed** |
| F5 | Header logo link (34px tall) and compact header CTA (40px) below the 44px tap target on tablet and mobile | P2 | Capture: `smallTapTargets` on all 14 pages | **Fixed** |
| F6 | README environment table out of date: "domain not yet confirmed", and four variables undocumented. No `.env.example` | P2 | README §Environment | **Fixed** |
| F7 | `/favicon.ico` returned 404 (requested by some browsers and tools regardless of `<link rel=icon>`) | P3 | `curl` | **Fixed** |
| R1 | CSP has no `script-src`/`style-src` (frame-ancestors, base-uri, form-action, object-src only) | P2 | Response headers | Open, planned (implementation plan §14.1) |
| R2 | Rate limit is in memory, per server instance, keyed on `x-forwarded-for` | P2 | `lib/enquiry/spam.ts` | Open. Use the host's edge rate limiting |
| R3 | Some secondary paragraphs are 15px (`type-small`) | P2 | Capture `smallBodyText` | Open: a design-system choice, not changed without design sign-off |
| R4 | Dev-only lint tooling has 5 high advisories (`braces` via `eslint-config-next`) | P3 | `npm audit` | Open. Not shipped; the fix needs a breaking downgrade |
| R5 | Emblem hairlines are faint at 16–32px favicon sizes | P3 | Phase 7A note | Open, needs a designer-drawn small mark |
| — | Mobile menu links reported as "no accessible name" | — | Capture | False positive: the links sit in a closed `<details>`; keyboard test reads "Services" etc. when open |
| — | `span.sr-only` reported as clipped | — | Capture | Intended (screen-reader-only text) |
| — | Checkbox inputs 20×20 | — | Capture | Each sits in a 44px-tall clickable label row |
| — | Static scanner "no `:focus-visible`" | — | a11y scan | False positive: defined in `app/globals.css`; focus rings confirmed by keyboard test |
| — | Built-CSS palette findings (8) | — | Palette checker | Tailwind preflight: `transparent` minified to `#0000`, plus `@supports` probes. No brand colour affected |

**Specifically checked and not found:**
- generic fade-up animations (the only keyframes are a line draw and an annotation reveal);
- excessive pinned sections (one sticky plate, desktop only);
- image overlays (none: the site uses drawn plates, not photos with text on top);
- horizontal overflow;
- missing CTA destinations;
- unverified case-study claims;
- animation cleanup problems (observers disconnect, `data-motion` is removed on navigation and on resize below 1200px);
- unnecessary dependencies (5 runtime dependencies, all used).

---

## 4. Fixes completed

| # | Change | Files |
|---|---|---|
| F1–F3 | Submission order rebuilt for lead safety, in this order:<ol><li>The honeypot, which people never see, gets the silent outcome.</li><li>Validation runs.</li><li>A forged or missing token is silent.</li><li>A too-fast or expired token returns "Please check your details and press Send again. Nothing has been sent yet." with the input kept. An expired token is replaced with a fresh one.</li><li>The rate limit is checked.</li><li>Delivery runs. Link-heavy briefs are **delivered** with a `[Check: many links]` subject flag instead of being dropped.</li></ol> | `app/contact/actions.ts`, `lib/enquiry/spam.ts` (`checkFormToken` returns a reason), `lib/enquiry/schema.ts` (`token` in state), `lib/enquiry/mail.ts` (`flagged`), `components/form/EnquiryForm.tsx` |
| F4 | In production, the log transport is refused unless `NOINDEX=true` (previews and local QA). The visitor then sees the "could not send" message | `lib/enquiry/mail.ts` |
| F5 | `.btn-compact` min-height 44px; header logo link `min-h-11` (44px) | `app/globals.css`, `components/layout/SiteHeader.tsx` |
| F6 | Environment table rewritten (required/optional, defaults, `NOINDEX` build-time note, new variables); `.env.example` added and un-ignored | `README.md`, `.env.example`, `.gitignore` |
| F7 | `app/favicon.ico` (16/32/48) generated from the existing emblem file, not redrawn | `app/favicon.ico` |
| — | `.visual-qa/` added to `.gitignore` (QA screenshots stay local) | `.gitignore` |

---

## 5. Tests and results

All results below are from runs in this phase on the final build, unless marked "before".

| Test | Result |
|---|---|
| `npx tsc --noEmit` | Pass, no output |
| `npx eslint .` | Pass, no output |
| `npx next build` | Pass: 20 static pages generated, `/contact` dynamic |
| Unit or end-to-end test suite in the repository | **None exists.** The Playwright checks in this report ran from session scripts, not a committed suite (risk R6) |
| Crawl (12 routes from `/`) | 200 on every route; unique titles and descriptions; canonical, OG image and valid JSON-LD on all; one h1 each; `lang="en"`; no missing anchor targets; no images without alt; one external link (official Instagram) |
| 404 | Status 404, `noindex` |
| Visual capture, round 2 (14 routes × 3 viewports) | No overflow, off-palette colour, contrast failure, heading issue, broken image, failed font or console error (apart from the 404 page's own 404). CLS 0 on content pages |
| Scroll, 1440 normal motion | Stages 0→5 in order across 9 positions; exactly 1 active layer each time; traveller placed; no console errors |
| Scroll, 1440 reduced motion | `data-motion` off; sticky plate hidden; 6 static plates shown |
| Scroll, 768 and 390 | Static layout (by design); 6 plates shown; no overflow |
| Animation teardown | Client navigation away removes `data-motion`; returning restores it with 1 active layer; resize 1440→900→1440 switches off then on |
| Keyboard | Tab order: skip link → logo → nav → header CTA → hero CTAs → service index; focus ring on every stop; skip link focuses `<main>` |
| Mobile menu | Enter opens, Escape closes and returns focus to the toggle; a menu link navigates and closes the menu; works without JavaScript |
| Form: empty submit (JS) | Stays on `/contact`; error summary focused; 6 fields marked `aria-invalid`. **Before:** went to "thank you" |
| Form: empty submit (no JS) | Error summary rendered by the server |
| Form: too-fast submit | "Nothing has been sent yet" message, input kept; resend succeeds |
| Form: expired token (25 h) | Same message; fresh token issued; resend succeeds |
| Form: forged token | Silent redirect; **not** counted as `project_form_submitted` |
| Form: honeypot filled | Silent redirect; not counted |
| Form: 4 links in goals | Delivered, subject flagged `[Check: many links]` |
| Form: pending state | Button disabled; live region "Sending your project details." |
| Form: valid, no JS | Delivered; thank-you |
| Form: production without SMTP | "We could not send your enquiry just now…", input kept |
| Form: production with `MAIL_TRANSPORT=log` and no `NOINDEX` | Same honest error (F4 guard) |
| Server logs | Only "log transport: Project enquiry: `<company>`" or a rejection reason. No personal data |
| Analytics | `primary_cta_clicked`, `service_page_viewed`, `project_form_started` and `project_form_submitted` each ×1; `case_study_opened` verified in Phase 7C on a fixture build; no PII in payloads; nothing on reload, direct visit or spam |
| CTA destinations | 6/6 open the form with the right service pre-ticked |
| Lighthouse, mobile (lab) | See the table below |
| Lighthouse, desktop, `/` | 100 / 100 / 100 / 100; LCP 0.6 s; CLS 0 |
| Static a11y scan (9 pages) | P0–P2: 0. P3: 9, all the `:focus-visible` false positive |
| Palette checker | Source CSS and TSX: clean except the known `palette.ivory` token false positive. Built CSS: 8, all Tailwind preflight |
| `npm audit --omit=dev` | 0 vulnerabilities |
| Secrets | No SMTP, `FORM_SECRET` or nodemailer strings in `.next/static`; no `.env` or key files tracked |
| Security headers | HSTS, `nosniff`, Referrer-Policy, Permissions-Policy and a partial CSP on every route; `X-Powered-By` removed |

Lighthouse mobile results (lab, simulated):

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 92 | 100 | 100 | 100 | 2.8 s | 0 |
| `/services` | 100 | 100 | 100 | 100 | 1.9 s | 0 |
| `/services/web-design-development` | 98 | 100 | 100 | 100 | 2.4 s | 0 |
| `/work` | 98 | 100 | 100 | 69 | 2.4 s | 0 |
| `/studio` | 98 | 100 | 100 | 100 | 2.4 s | 0 |
| `/contact` | 99 | 100 | 100 | 100 | 2.0 s | 0 |

- `/work` scores 69 on SEO only because it is deliberately noindexed until case studies exist.
- A repeat home-page run scored 99 with LCP 2.1 s, so treat these as lab variance.
- No field data exists.

**Not tested:**
- real SMTP delivery;
- Safari, Firefox and real mobile devices (Chromium only);
- screen readers (VoiceOver, NVDA);
- field (real-user) performance;
- header and proxy behaviour on the eventual host.

**Observation:** in one early run, a single "404" console message was recorded on the thank-you page after a submission. Four later full runs, and targeted reproduction with request logging, did not show it again. It is recorded as unreproduced.

---

## 6. Remaining risks

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| R0 | **No published case studies** (gate G1) | Prospects can't see proof; "Explore Our Work" leads to a notice | Gather client approvals for at least 2 projects (`docs/portfolio-inventory.md`) |
| R1 | CSP without `script-src` | Weaker XSS defence-in-depth (no user HTML is rendered, and JSON-LD is escaped) | Add a nonce-based CSP via `proxy.ts` before or soon after launch |
| R2 | In-memory, per-instance rate limit; `x-forwarded-for` is trusted | Limits are bypassable at scale | Enable the host's edge rate limiting or WAF |
| R3 | 15px secondary text | Slightly small for some readers | Design decision |
| R6 | No committed automated tests | Regressions in the form or sequence could go unnoticed | Add `@playwright/test` with this report's form, CTA and scroll checks to CI (implementation plan §15) |
| R7 | Honeypot silently drops a submission if a browser autofills the hidden field | Rare lost lead | Field is `autocomplete="off"`, off-screen and `tabindex=-1`; monitor enquiry volume after launch |
| R8 | Analytics not connected | No measurement of the funnel | Choose a provider and consent approach (`docs/conversion-audit.md` §6.3) |
| R9 | Content gaps (`docs/content-gaps.md`) | Generic fallbacks for reply time, email, legal name, investment, team | Supply the facts; each renders automatically |

---

## 7. Required before launch

### Must have (blocking)
1. **Mail delivery on the host:**
   - Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ENQUIRY_TO` and `FORM_SECRET` (`openssl rand -hex 32`). `ENQUIRY_FROM` is optional; it defaults to `SMTP_USER`.
   - Do not set `MAIL_TRANSPORT=log` or `NOINDEX` on the live site.
   - Then send **one real test enquiry** and confirm it arrives, and that Reply-To is the sender.
2. **Legal privacy notice**, reviewed by a qualified adviser. The placeholder is deliberately visible on `/privacy` until it is supplied.
3. **Domain and hosting:**
   - `www.calixeden.com` pointed at the host, with HTTPS.
   - `SITE_URL` left unset or set to that origin.
   - Deployment needs explicit authorisation; none was given or performed in this phase.
4. **GitHub access:** the repository currently refuses pushes from this session. Three phases of commits are local only until the connection is restored.

### Strongly recommended
5. Supply the reply time, contact email and legal entity (`content/site.ts`).
6. Publish at least two approved case studies.
7. Choose an analytics provider and consent approach, and update the privacy notice to match.
8. Turn on edge rate limiting on the host.
9. Add the committed Playwright suite to CI.

### Optional
10. Set `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`, then submit the sitemap.
11. A nonce-based CSP.
12. A designer-drawn small favicon.

### Configuration reference
See `README.md` §Environment and `.env.example`.

| Variable | Notes |
|---|---|
| `NOINDEX` | Must be set at **build** time on previews, because robots and metadata are generated during the build |
| `SHOW_CONTENT_PLACEHOLDERS` | Must also be set at **build** time on previews |
| `CALIX_FIXTURES` | Must never be set on a production build |

---

## 8. Deployment readiness

| Area | Ready? |
|---|---|
| Code quality (types, lint, build) | Yes |
| Layout, brand, accessibility, performance | Yes |
| Enquiry flow logic | Yes, every state verified |
| Enquiry delivery in production | **No.** Needs SMTP credentials, `FORM_SECRET` and a real test |
| Legal (privacy notice) | **No.** Needs the reviewed text |
| Content proof (case studies) | No. Not a technical blocker, but the main commercial weakness |
| Analytics | Instrumented; provider pending |
| Infrastructure | Not provisioned in this phase (needs authorisation) |

**Verdict: ready after the specified fixes**, items 1–4 in §7.
