# CALIX conversion audit (Phase 7C)

Primary objective: **qualified direct project enquiries.** This audit reads the site as an international prospect would, a founder or marketing lead comparing studios, and changes only what the evidence supports.

**There are no measured conversion data.** The site has no analytics provider and no traffic yet. Nothing below is a conversion rate, uplift or business result. "Impact" in §3 is an expected direction, judged from the evidence observed. Real numbers can come only from the events in §6, once a provider is chosen and the site has traffic.

Following the confirmed strategy, no free audit tool, diagnostic quiz or lead magnet was added. Every primary CTA goes to the direct project form.

---

## 1. Method

| Check | How | Where |
|---|---|---|
| Prospect walk-through | Each public page read at 390, 768 and 1440 wide, first viewport and full page | Production build (`next build` + `next start`) |
| Placeholder exposure | Count of `.pending` markers, "to be confirmed" text and placeholder blocks per page | Playwright, 13 public routes |
| CTA destinations | Every `a[data-cta]` collected from every page, then each destination opened: status, form present, service pre-selected | Playwright |
| Events | A `calix:analytics` listener injected before page load; real clicks, form input and a real submission (log mail transport) | Playwright |
| Speed and interaction | Lighthouse 12.8.2, simulated mobile, **lab data only** | `/`, `/contact` |
| Accessibility | Lighthouse accessibility, plus the `accessibility-audit` static scanner | 5 rendered pages |

---

## 2. Findings from a prospect's point of view

### 2.1 Clarity of the offer — strong
- The first viewport answers "what is this?": the fixed headline, a one-line promise, "CALIX is a digital branding and growth studio", and a five-service index with plain descriptors.
- Each service page opens with a quotable definition, then who it is for, who it is not for, deliverables and process. The "not for" lists help qualify enquiries.
- No change needed.

### 2.2 Service differentiation — good, with one dependency
- The five services are clearly separated, and the scroll sequence shows how they connect.
- Investment and timeline were undefined. In production they showed as "[investment to be confirmed]". For a prospect, a visible gap reads as unfinished, which is worse than an honest process statement.
- **Fixed (F1):** see §4.

### 2.3 Portfolio credibility — the largest weakness
- **No approved case studies exist yet** (gate G1, `docs/content-gaps.md`), so `/work`, the home "Selected work" section and service case-study slots have no client proof.
- The hero's second CTA, "Explore Our Work" (fixed copy from the brief), scrolls to a section that cannot show work yet.
- Before 7C, those slots showed internal "Content placeholder" blocks listing what CALIX must supply. A prospect would read that as an unfinished site.
- Proof can't be invented: no clients, metrics or testimonials (master brief).
- **Mitigated (F2):** an honest notice with a path to ask about relevant work (§4).
- **Not solved.** Publishing at least two approved case studies remains the top recommendation (§7).

### 2.4 CTA placement and wording — strong
- "Start a Project" sits in the header on every page, in the hero and page headers, in end-of-page bands, and at the close of the scroll sequence.
- The primary CTA is in the first viewport on every page except `/contact` (where the form is the action), thank-you and privacy.
- Service-page CTAs carry `?service=<key>`, so the form opens with that service already ticked. This was verified for all five services (§5).
- One label, one destination, nowhere a competing "book a call" or "free audit". No wording change needed.
- Old fact copy promised a reply window that is still unconfirmed. It now falls back to "Send a short brief and we will reply with next steps." That is true without inventing a reply time.

### 2.5 Mobile usability — good, one defect fixed
- No horizontal overflow at 390, 768 or 1440 on home, service, work or contact.
- Header CTA stays visible and does not wrap at 390.
- **Defect found (F5):** in the form's service checkboxes, the box sat flush against its label, and the row was not the intended flex layout. The cause was a CSS specificity clash (`.field label {display:block}` overrode `.choice`). This made the tap target and the reading worse. Fixed and re-captured at 390.

### 2.6 Contact form friction — moderate, deliberately kept
- Required: name, business email, company, at least one service, goals (20+ characters), desired timeline.
- Optional: website, budget range, extra context.
- Every required field earns its place for qualifying a direct project enquiry, so none were removed.
- **Friction found (F4):** "Company or organisation" is required, but a founder before launch may have no company name. Help text now reads "Or the project name, if the business is not launched yet." This reduces hesitation without loosening qualification.
- Already in place from 6C:
  - inline errors plus an error summary;
  - submit disabled while sending, with a live "Sending your project details." status;
  - works without JavaScript;
  - spam protection that never asks the prospect for anything (honeypot, signed timing token, rate limit).
- The page states what happens next in three steps before the form.

### 2.7 Trust signals — limited by missing facts
- Available and used: real logo, consistent identity, clear process, privacy page, specific service definitions, the honesty of "approved by the client" wording.
- Missing (supplied facts only, never invented): case studies, client names or testimonials, team, legal entity, contact email, reply time, location. All listed in `docs/content-gaps.md`.
- **Added (F6):** a link to the real CALIX Instagram profile in the footer (from `site.profiles`, the founder's spec), so a prospect can verify the studio exists.
- The studio team section is now hidden in production until the team is supplied (gate G0), rather than showing a placeholder.

### 2.8 Navigation and journeys — clear
- Four primary nav items (Services, Work, Studio, Contact) plus the CTA.
- Every service page links to related services and to the form.
- The footer lists all five services.
- Thank-you confirms receipt, says what happens next and links back to services.
- No dead ends found: every page has a forward path to `/contact`.

### 2.9 Page speed and interaction — good (lab)
Lighthouse 12.8.2, simulated mobile, production build, this phase. These are **lab results**, not field data, and vary between runs.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 | 2.1 s | 120 ms | 0 |
| `/contact` | 97 | 100 | 100 | 100 | 2.7 s | 60 ms | 0 |

- The Phase 7A run measured home LCP at 2.9 s.
- The single runs here can't attribute the difference to any change; treat both as within lab variance.
- Field data (CrUX or RUM) needs live traffic.

---

## 3. Prioritised improvements

- **Impact:** expected effect on qualified enquiries.
- **Effort:** S = hours, M = days, L = needs client or founder input.
- **Confidence:** how strongly the evidence supports the change. It is not a forecast.

| # | Improvement | Impact | Effort | Confidence | Status |
|---|---|---|---|---|---|
| P1 | Publish ≥2 approved, verified case studies (unlocks gate G1, gives "Explore Our Work" a real destination) | High | L (client approvals) | High | **Blocked on content.** Recommendation §7 |
| F1/F2 | Public display mode: hide internal "[… to be confirmed]" markers and placeholder blocks in production; show honest fallbacks | High | S | High (2–6 visible markers per page observed) | **Done** |
| F3 | Event layer for the five conversion events, with no PII | Enables measurement | S | High | **Done**, no provider connected |
| P2 | Confirm reply time, contact email and legal entity (gap items) and let them render | Medium–high | L (founder) | Medium | Blocked on content |
| F4 | Company field help text for pre-launch founders | Medium | S | Medium | **Done** |
| F5 | Fix service checkbox layout and tap target | Medium (mobile) | S | High (observed defect) | **Done** |
| P3 | Confirm investment guidance (e.g. "projects typically start from …") | Medium (pre-qualifies budget) | L (founder) | Medium | Blocked on content. Process-based fallback live |
| F6 | Footer link to the official Instagram profile | Low–medium | S | Medium | **Done** |
| P4 | Choose an analytics provider and consent approach; connect `sendToProvider` | Enables measurement | M | High | Decision needed (§6.3) |
| P5 | Team or founder section (gate G0) | Medium | L | Medium | Blocked on content |
| P6 | Re-check home LCP with field data after launch | Low–medium | S | Low until field data exists | Later |

Rejected: a free audit tool or diagnostic funnel (contradicts the confirmed strategy); a sticky mobile CTA bar (the header CTA is already always visible, and a second persistent bar would compete for space on small screens with no evidence it is needed); removing required fields (each one serves qualification).

---

## 4. Changes implemented

| ID | Change | Files |
|---|---|---|
| F1 | `showInternalPlaceholders`: placeholders show in development and when `SHOW_CONTENT_PLACEHOLDERS=true` (previews), and are hidden in production. `Fact` renders a supplied value, an internal marker or a true public fallback | `lib/display.ts`, `components/ui/Pending.tsx` |
| F1 | Fallback copy that needs no missing fact (exact strings below) | Hero, `PageParts`, `HomeSections`, contact, thank-you, footer, service page |
| F2 | `WorkGapNotice`: "Our client case studies are being prepared with each client's approval…" plus "Ask about relevant work" → `/contact` | `components/work/WorkGapNotice.tsx`, home, `/work`, service pages |
| F2 | Insights fallback "Articles are in preparation."; Studio team hidden until supplied; privacy-notice placeholder **always shown** (legal text must not be hidden) | `app/insights`, `app/studio`, `app/privacy` |
| F3 | Analytics layer and wiring (§6) | `lib/analytics.ts`, `components/analytics/*`, `app/layout.tsx`, `app/contact/actions.ts`, `EnquiryForm.tsx`, service and case-study pages |
| F4 | Company help text | `components/form/EnquiryForm.tsx` |
| F5 | `label.choice` specificity fix | `app/components.css` |
| F6 | Footer Instagram link, `rel="noopener"`, with screen-reader context | `components/layout/SiteFooter.tsx` |

The fallback copy for F1, exactly as shipped:

- **Reply line:**
  - hero: omitted;
  - CTA bands: "Send a short brief and we will reply with next steps.";
  - contact: "And reply with next steps.";
  - thank-you: "We will reply with next steps."
- **Investment:** "Agreed in writing after an introductory call, based on your scope."
- **Timeline:** "Set in the proposal, once scope is agreed."
- **Footer:** legal name falls back to "CALIX"; the email line is omitted.

Hiding a gap doesn't fill it. Every item stays open in `docs/content-gaps.md`, and preview builds still show them.

---

## 5. Verification

Run against a production build with `MAIL_TRANSPORT=log`.

### 5.1 Public mode (13 routes)
- `.pending` markers: **0** on every route.
- "to be confirmed": **0** on every route.
- Placeholder blocks: **0**, except `/privacy` → "Legal privacy notice", which is kept on purpose.
- Preview mode (`SHOW_CONTENT_PLACEHOLDERS=true`): home shows 4 markers and 3 placeholder blocks, so the internal review view still works.

### 5.2 Every primary CTA leads to a working action

| Destination | Marked CTA locations linking to it | Result |
|---|---|---|
| `/contact` | header, hero, page-header, cta-band, home-final, work-gap | 200, form present |
| `/contact?service=brand` | sequence, page-header, cta-band | 200, form present, Brand pre-ticked |
| `/contact?service=web` | sequence, page-header, cta-band | 200, form present, Web pre-ticked |
| `/contact?service=marketing` | sequence, page-header, cta-band | 200, form present, Marketing pre-ticked |
| `/contact?service=seo` | sequence, page-header, cta-band | 200, form present, SEO & GEO pre-ticked |
| `/contact?service=growth` | sequence, page-header, cta-band | 200, form present, Growth pre-ticked |

- The form itself was submitted end-to-end and reached `/contact/thank-you` (log transport).
- In production, the form needs SMTP and `FORM_SECRET`. Without them it returns an error, never a false success (Phase 6C).

### 5.3 Events

| Test | Result |
|---|---|
| Hero CTA click | `primary_cta_clicked` ×1 `{location:"hero", label:"Start a Project"}` |
| Each service page view | `service_page_viewed` ×1 per page; none on other pages |
| Case-study view (fixture build, `CALIX_FIXTURES=1`) | `case_study_opened` ×1 `{slug}` |
| Typing in several form fields | `project_form_started` ×1 `{service:"web"}` |
| Valid submission | `project_form_submitted` ×1 `{services:"web", timeline:"1-month"}`; query string cleared afterwards |
| Reload of thank-you | No second `project_form_submitted` |
| Direct visit to `/contact/thank-you` | No `project_form_submitted` |
| Honeypot-filled (spam) submission | No `project_form_submitted` |
| Name, email, company or goals text in any event payload | None found |

### 5.4 Checks
- `tsc --noEmit` and `eslint .` were clean.
- `next build` succeeded.
- Screenshots were taken at 1440, 768 and 390 (home, service, work, contact), with no horizontal overflow.
- Palette checker on source CSS and the changed files: clean. The one reported line, `palette.ivory` in `app/layout.tsx`, is a token reference to #F6F1E8 (a false positive), and that line did not change.
- Palette checker on built CSS: 8 findings, all from Tailwind preflight. They are `transparent` minified to `#0000`, plus `@supports` feature probes using `red`, `rgb()` and `color-mix()`. None is a brand colour in use.
- Static a11y scan: 0 P0–P2. The P3 "no :focus-visible" is a false positive: the scanner reads inline CSS only, and `:focus-visible` is defined in `app/globals.css`.

---

## 6. Event specification

### 6.1 Events
Implemented in `lib/analytics.ts`. These names supersede the draft names in `docs/conversion-strategy.md` §7.1.

| Event | Fires when | Properties | Duplicate guard |
|---|---|---|---|
| `primary_cta_clicked` | Click on any `a[data-cta]` | `location` (header, hero, page-header, cta-band, home-final, sequence, work-gap), `label`, `service` (from the link's `?service=`) | One delegated document listener, mounted once in the root layout |
| `service_page_viewed` | `/services/[service]` mounts | `service` (key) | Ref guard, once per mount |
| `case_study_opened` | `/work/[slug]` mounts | `slug` | Ref guard, once per mount |
| `project_form_started` | First focus or input in the enquiry form | `service` (pre-selected, if any) | Ref guard, once per form mount |
| `project_form_submitted` | Thank-you loads with `?submitted=1`, set by the server action only after the mail adapter accepted the enquiry | `services` (keys), `timeline` (enum value) | Query removed with `history.replaceState`; spam paths redirect without it |

All events add `path`, the pathname with no query string.

### 6.2 Personal data
- The property set is closed (`AnalyticsProps`). It never includes name, email, company, website, budget or free-text answers.
- The redirect query contains only service keys and a timeline enum.
- No cookies, `localStorage` or `sessionStorage` are used. The submission signal travels in the redirect URL precisely to avoid device storage.

### 6.3 Consent and the provider
- **Today:**
  - no provider is configured;
  - `track()` dispatches a page-local `calix:analytics` DOM event and calls an empty `sendToProvider()`;
  - nothing leaves the browser and nothing is stored;
  - the privacy page's statement "This website does not currently set cookies or use analytics" remains accurate.
- **Decision needed (P4):** choose a provider. Then:
  - if it sets cookies or other identifiers, load it only after opt-in consent (UK GDPR, EU GDPR and ePrivacy);
  - a cookieless, privacy-first tool may not need a banner in some jurisdictions, but confirm that with legal review rather than assume it;
  - update the privacy notice before enabling either.
- **No-JS limitation:** the form works without JavaScript, but events don't fire then. Server-side counting of delivered enquiries (the mail log or inbox) is the reliable total.

### 6.4 Reports to build once data exists
- Funnel: entry page → `primary_cta_clicked` → `project_form_started` → `project_form_submitted`.
- Split the funnel by `location` and `service`.
- Qualified rate needs the outcome of each enquiry recorded by CALIX (CRM or a manual log). Analytics can't judge qualification.

---

## 7. Recommendations and launch blockers

1. **Case studies first (P1).** Proof of work is the main thing a prospect looks for and the main thing missing. Gather approvals for at least two projects, using `docs/portfolio-inventory.md` and the evidence rules in `content/work.ts`.
2. **Supply the small facts (P2, P3).** Reply time, contact email, legal entity, investment guidance. Each one renders automatically once added to `content/site.ts` or `content/service-pages.ts`.
3. **Pick the analytics provider and consent approach (P4)** before launch, so the first real traffic is measured.
4. **Launch blockers (unchanged):**
   - SMTP and `FORM_SECRET` configured;
   - the reviewed legal privacy notice;
   - `docs/content-gaps.md` items marked launch-critical.
5. Re-run this audit with real data about four to six weeks after launch. Judge changes on measured enquiries and their qualification, not on lab scores.
