# CALIX — Conversion Strategy

**Phase:** 2 — UX and information architecture
**Status:** Specification for the design and build phases. Values marked `[TO CONFIRM]` need business decisions.
**Last updated:** 2026-10-09
**Supersedes in detail:** `docs/strategy.md` §8, which keeps the strategic summary.
**Related:** `docs/information-architecture.md`, `docs/user-journeys.md`, `docs/ideal-clients.md` §6 (qualification criteria)

---

## 1. Goal and definitions

| Term | Definition |
|---|---|
| **Conversion** | A completed project enquiry or Diagnostic request through `/contact`, or a booked introductory call (if a scheduling tool is adopted). |
| **Qualified enquiry** | Meets the criteria in `docs/ideal-clients.md` §6: a matching need, budget at or above the minimum, a timeline within `[X]` months, a decision-maker involved, and not on the disqualifier list. |
| **Primary KPI** | Qualified enquiries per month. |
| **Not KPIs** | Traffic volume, page views, time on site, social followers, newsletter sign-ups. |

The aim is the **right** conversations, not the most form submissions. Friction that filters (budget bands, fit statements) is kept. Friction that only gets in the way is removed.

---

## 2. CTA system

### 2.1 Hierarchy

| Level | Action | Visual treatment (from `calix-brand`) | Where |
|---|---|---|---|
| **Primary** | Start a project | Solid Olive, Ivory label, uppercase tracked Jost, square corners. In the header: compact outline style, so only one solid button shows per viewport (`docs/design-system.md` §6.1). | Header (every page), hero of every marketing page, end of every page |
| **Secondary** | Request a Digital Diagnostic | 1px Espresso outline, Espresso label | `/services`, SEO & GEO, Growth & Conversion, Marketing, the end of articles |
| **Tertiary** | Book an introductory call / email us | Text link with underline | `/contact`, next to the primary CTA at the end of pages |
| **Navigational** | See the work, See the project, See the process | Underlined text link, no appended arrow (`docs/art-direction.md` §2) | Inside page content |

Only **one** primary-styled button is visible in any single viewport. Secondary and tertiary actions stay visually quieter.

### 2.2 Labels

Generic labels ("Learn more", "Read more", "Submit", "Get started", "Contact us", "Click here") are **not used** anywhere (`conversion-strategist` §7).

| Context | Label | Destination |
|---|---|---|
| Header, Home, Services, Studio, Work | Start a project | `/contact` |
| Brand service | Start a brand project | `/contact?service=brand` |
| Web service | Start a website project | `/contact?service=web` |
| Marketing service (G2) | Discuss a campaign | `/contact?service=marketing` |
| SEO & GEO / Growth | Request a Digital Diagnostic | `/contact?enquiry=diagnostic` |
| Case study end | Start a similar project | `/contact?ref=[slug]` |
| Work cards | See the project | `/work/[slug]` |
| Process link | See how we work | `/studio#process` |
| Form submit (project) | Send my project details | — |
| Form submit (Diagnostic) | Request my Diagnostic | — |

### 2.3 Microcopy next to CTAs

Only true statements. Placeholders until confirmed.

- Next to "Start a project": *"We reply within `[X]` working days."*
- Next to "Request a Digital Diagnostic": *"Fixed scope, `[price]`, delivered in `[N]` weeks."*
- Next to "Book an introductory call": *"`[20]` minutes, to see whether we're the right fit."*

---

## 3. Objection handling by page type

Objections are answered **where they arise**, usually near the CTA.

| Page type | Main objections | Answer placed |
|---|---|---|
| Home | "Is this for us?" "Is it any good?" | Client situations section; featured work; proof quote before the final CTA |
| Service page | Scope, fit, cost, process, "will it bring results?" | Included-scope list; fit and not-fit block; investment section directly above the final CTA; process; relevant work; FAQ |
| Case study | "Was it really their work? Did it work?" | The CALIX role stated explicitly; outcome only from E3; approved quote |
| Studio | "Who are they? Can they deliver all of this?" | Named team; full process; honest partner model |
| Contact | "What happens next? Will I be pressured? Is my information safe?" | Three-step next-step explainer above the form; reply time; NDA FAQ; privacy note next to submit |

---

## 4. Forms

### 4.1 Project enquiry form (`/contact`)

Designed to take about two minutes. Fields are pre-filled from query parameters.

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Enquiry type | Radio: *A project* / *A Digital Diagnostic* | Yes | Set from `?enquiry=`. Switches the field set (§4.2). |
| 2 | Name | Text | Yes | `autocomplete="name"` |
| 3 | Work email | Email | Yes | `autocomplete="email"` |
| 4 | Company | Text | Yes | `autocomplete="organization"` |
| 5 | Current website | URL | No (project) / Yes (Diagnostic) | Lets CALIX review before replying |
| 6 | What do you need? | Checkboxes: the five services (four if G2 isn't met), plus "Not sure yet" | Yes | Set from `?service=` |
| 7 | Tell us about the project | Textarea | Yes | Prompt: "What's prompting this, and what would a good outcome look like?" |
| 8 | Budget range | Select, bands `[TO CONFIRM, currency TO CONFIRM]` | Yes | Includes a band below the minimum, so those enquiries can be handled honestly |
| 9 | Ideal start | Select: within 1 month / 1–3 months / 3–6 months / exploring | Yes | Qualification |
| 10 | How did you hear about CALIX? | Select + other | No | Attribution |
| 11 | Privacy consent | Checkbox, or a notice if the legal basis allows | Per legal advice | Links to `/privacy` |
| — | Hidden | `ref` (case study slug), landing page, UTM parameters | — | First-party only. See §7. |

### 4.2 Diagnostic variant

When the enquiry type is *A Digital Diagnostic*: field 5 becomes required, field 6 is replaced by "Main concern" (brand / website / search visibility / conversion / not sure), and field 8 is hidden if the Diagnostic has a fixed published price.

### 4.3 Form UX and accessibility requirements

- Visible labels (no placeholder-only labels). Each field's purpose is clear.
- Errors are shown inline in text, with an icon or prefix, never by colour alone. The palette has no error colour (`calix-brand` §1), so errors use Espresso text plus a marker and `aria-describedby`.
- An error summary at the top on submit, with focus moved to it.
- Keyboard-operable throughout. Visible focus states. Touch targets of at least 44px.
- No CAPTCHA puzzles. Use a honeypot field, server-side rate limiting and validation. Add an accessible bot check only if spam becomes a real problem.
- The form works without JavaScript (progressive enhancement), and data survives a failed submission.
- Single column on mobile. Correct input types (`email`, `url`).

### 4.4 After submission

1. Redirect to `/contact/thank-you` (noindex): confirms receipt, restates the reply time, describes the next steps, and links quietly to one case study and to `/studio`.
2. Send an automatic confirmation email to the prospect with a summary of what they sent and the reply time `[TO CONFIRM email service]`.
3. Notify CALIX by email, or create a CRM record `[TO CONFIRM destination, brief D7]`.

---

## 5. Lead handling (operational)

| Step | Standard |
|---|---|
| First reply | Within `[X]` working days `[TO CONFIRM, strategy A12]`, in a human voice, never an auto-reply alone |
| Qualification | Score each enquiry against the qualification criteria |
| Qualified | Offer an introductory call with two or three time options, across time zones |
| Below minimum or poor fit | A polite, useful reply: suggest the Diagnostic, or a referral if appropriate. Never ignore an enquiry. |
| Tracking | Record each lead: source → enquiry → qualified → call → proposal → won/lost (reason) `[TO CONFIRM tool]` |

---

## 6. Trust elements near conversion points

Use only what's real. Each item is placed only once it exists.

| Element | Placement | Status |
|---|---|---|
| Approved client quote | Home (before the final CTA), next to the contact form | Not supplied |
| Featured case studies | Home, service pages | Not supplied (G1) |
| Named team | Studio; optionally "who you'll speak to" on contact | Not supplied (G0) |
| Process summary | Service pages, Studio | To be written from the team's real practice |
| Reply-time promise | Next to every primary CTA, and on contact | To confirm |
| Investment guidance | Service pages | To confirm (decision 4) |
| CALIX's own site quality (accessibility, speed) | Implicit, demonstrated by the site itself | Built in |

**Never used:** fake counters, invented scarcity ("only 2 slots left") unless literally true and maintained, logo walls of companies that aren't approved clients, award badges that don't exist, stock testimonials.

---

## 7. Measurement plan

### 7.1 Events

> **Superseded naming (Phase 7C).** The implemented events are `primary_cta_clicked`, `service_page_viewed`, `case_study_opened`, `project_form_started` and `project_form_submitted`, specified in `docs/conversion-audit.md` §6 and `lib/analytics.ts`. `form_submit_attempt`, `form_error` and `call_booked` below are not implemented. The table is kept as the original plan.

| Event | Trigger | Properties |
|---|---|---|
| `cta_click` | Any CTA click | label, location (header / hero / section / end), page |
| `form_start` | First interaction with the form | enquiry type |
| `form_submit_attempt` | Submit pressed | — |
| `form_error` | Validation error shown | field name (never the value) |
| `enquiry_submitted` | `/contact/thank-you` loads | enquiry type, services selected, budget band, referring case study |
| `call_booked` | Scheduling confirmation (if a tool is used) | — |
| `case_study_view` | `/work/[slug]` view | slug |

### 7.2 Funnel reports

- Landing page → `primary_cta_clicked` → `project_form_started` → `project_form_submitted`, by entry page and source.
- Form abandonment by field (from `form_error` and the drop-off between `project_form_started` and submit).
- Qualified rate by source and by landing page. This needs CRM outcomes joined back to the source, recorded manually if no CRM is used.

### 7.3 Privacy

- **No personal data** (name, email, message content) is sent to analytics.
- Choose a privacy-respecting analytics setup. Where non-essential cookies or tracking are used, get consent under GDPR, UK GDPR and equivalent rules before they load `[TO CONFIRM analytics tool and legal review]`.
- Form submissions are stored only as long as needed. The retention period is stated in `/privacy`.

---

## 8. Mobile conversion

- "Start a project" stays reachable from the header on every page.
- No sticky bottom bars that cover content or conflict with browser UI. The header CTA is enough.
- Case-study and service pages repeat the CTA after the proof sections, not every few screens.
- Scroll storytelling never delays, hides or animates in a CTA (`scroll-storytelling` §1, ground rule 5). With reduced motion, everything is immediately visible.

---

## 9. Anti-patterns (not allowed)

- Exit-intent popups, newsletter modals or chat widgets on service, case-study or contact pages.
- Several equally weighted CTAs in one section.
- Social icons or blog links next to the contact form.
- Generic CTA labels (§2.2).
- Guarantees of rankings, AI mentions, traffic or return on ad spend.
- Collecting more form data than the reply needs.

---

## 10. Launch readiness checklist (conversion)

| # | Requirement | Status |
|---|---|---|
| 1 | Minimum engagement and budget bands confirmed (decision 4) | ✗ |
| 2 | Reply-time promise confirmed and resourced | ✗ |
| 3 | Enquiry destination (email / CRM) and confirmation email set up (brief D7) | ✗ |
| 4 | Digital Diagnostic: scope, price and timing confirmed (strategy A9) | ✗ |
| 5 | At least two approved case studies (G1) | ✗ |
| 6 | Named team on `/studio` (G0) | ✗ |
| 7 | Privacy notice and consent approach reviewed | ✗ |
| 8 | Analytics events implemented and tested end-to-end | Build phase |
| 9 | Form tested: keyboard, screen reader, no-JS, mobile, error states, spam protection | Build phase |
| 10 | Every CTA label checked against §2.2 | Build phase |
