# CALIX — Technical SEO Audit (International, English)

**Phase:** 7A
**Date:** 2026-10-16
**Scope:** the implemented Next.js site in this repository, production build (`next build` and `next start`), all routes.
**Market:** international, English-language. One language and one site, so there is no `hreflang`.
**Inputs:** `docs/calix-master-brief.md`, `docs/information-architecture.md`, skills `technical-seo`, `web-performance`, `calix-geo`, `calix-logo`.

> This audit reports what was measured on a local production build. It does not claim rankings or indexing. Nothing can be verified in Google or Bing until the site is deployed on its domain and the properties are verified (§6).

---

## 1. Domain

| Item | Finding |
|---|---|
| Configured domain | No `SITE_URL` was set, so every canonical, `og:url`, sitemap entry and structured-data URL pointed to `http://localhost:3000`. **(P0, fixed)** |
| Source of the production domain | The founder's logo specification (calix-logo skill) names the website as **www.calixeden.com**. It is now the production default (`content/site.ts` → `productionUrl`), overridable with `SITE_URL`. |
| Verification | **Not verified.** This environment's network proxy refuses connections to calixeden.com, so DNS, hosting, HTTPS and the www/apex redirect could not be checked. See §6. |
| Contact details | No address or phone number exists in any source, and none was added. The founder's spec also lists an email address. It is **not** published on the site yet; it remains content gap #5 for CALIX to confirm. |

---

## 2. Method and checks run

| Check | Tool | Result |
|---|---|---|
| Per-page title, description, canonical, robots, Open Graph, Twitter, headings, image alt, JSON-LD validity, icons | Playwright script over all 13 routes (before and after) | See §3 |
| Internal links and in-page anchors | Playwright crawl from `/` | 12 crawlable pages, all 200; 0 broken links; 0 missing anchors; unknown slugs return 404 |
| Redirects | `curl -I` | Trailing-slash URLs redirect permanently (308) to the slashless canonical |
| robots.txt and sitemap.xml | `curl` | §3.4 |
| Lighthouse 12.8.2 (simulated mobile, local build) | `npx lighthouse` | §4 |
| Type, lint, build | `npm run typecheck`, `npm run lint`, `next build` | Pass |
| Palette (brand) | `check_palette.py` | HTML clean |

---

## 3. Findings and fixes

### 3.1 Titles and meta descriptions

**Before:** titles were unique but generic for search intent ("SEO & GEO — CALIX", "Studio — CALIX"). The home title had no service intent ("Make your brand impossible to ignore"), and its description was 185 characters, so it would be truncated. The thank-you page inherited the site description.

**After** (all unique; descriptions 37–157 characters; no duplicates):

| Route | Title | Search intent served |
|---|---|---|
| `/` | CALIX — Brand identity, web design and growth studio | Brand: studio type and main services |
| `/services` | Services: brand, web, marketing, SEO and conversion — CALIX | Service overview |
| `/services/brand-strategy-identity` | Brand Strategy & Visual Identity Design — CALIX | Brand identity, logo and identity design |
| `/services/web-design-development` | Website Design & Development — CALIX | Web design and web development |
| `/services/digital-marketing` | Digital Marketing & Campaigns — CALIX | Digital marketing |
| `/services/seo-geo` | SEO & GEO: Search and AI Visibility — CALIX | SEO, GEO, AI search visibility |
| `/services/growth-conversion` | Growth & Conversion Optimisation — CALIX | Conversion optimisation |
| `/studio` | About the studio — CALIX | Brand and entity |
| `/contact` | Start a Project — CALIX | Navigational, conversion |
| `/privacy` | Privacy — CALIX | Legal |
| `/work`, `/insights` | Work — CALIX, Insights — CALIX | noindex until gates met |

On-page headings keep the canonical service names. Titles add plain-language intent words once, with no repetition or stuffing.

### 3.2 Canonicals

Self-referencing canonicals on every indexable page, using the production origin. Query-string variants (`/contact?service=web`) canonicalise to `/contact`. **Fixed:** origin was localhost.

### 3.3 Indexability and robots directives

| Route | Directive | Reason |
|---|---|---|
| `/work`, `/insights` | `noindex, follow` | Gates G1/G3: no approved case studies or articles yet. Indexing becomes automatic when the gates are met. |
| `/contact/thank-you` | `noindex, nofollow` | Confirmation page |
| 404 | `noindex` + HTTP 404 | — |
| Test fixtures | `noindex, nofollow` | Compiled only with `CALIX_FIXTURES=1`; never deployed |
| Preview deployments | `NOINDEX=true` → `noindex` meta and `Disallow: /` | Keeps staging out of the index |
| All other pages | indexable | — |

**Fixed:** robots.txt disallowed `/contact/thank-you`, which would have stopped crawlers from reading its `noindex`. That line was removed.

### 3.4 XML sitemap and robots.txt

- `robots.txt`: `Allow: /` plus `Sitemap: https://www.calixeden.com/sitemap.xml`.
- `sitemap.xml`: the 10 indexable URLs (home, services overview, five services, studio, contact, privacy). Gated archives, fixtures, the thank-you page and 404 are excluded. Work, insights and their detail pages join automatically when their gates are met.
- `lastmod` is deliberately omitted: there is no reliable per-page modification date, and guessed dates are worse than none.

### 3.5 Open Graph and social metadata

**Before:** no `og:image`, no `og:url`, `og:locale` set to the invalid `en`, and a Twitter `summary` card without an image.
**After:** every page has `og:title`, `og:description`, `og:url`, `og:type` (`article` for articles), `og:locale=en_GB`, `og:site_name`, and a 1200×630 `og:image` with alt text. The Twitter card is `summary_large_image`.

The share image (`public/brand/og-default.png`) is the founder's primary logo on Ivory, placed with the calix-logo script. It is not redrawn and contains no rendered text, because the brand fonts are not installed in this environment.

### 3.6 Semantic headings and HTML

- One `h1` per page. No skipped heading levels on any route (automated check).
- `lang="en"`, landmarks (`header`, `nav` with labels, `main`, `footer`), a skip link, and breadcrumbs as an ordered list with `aria-current`.
- **Fixed (brand and semantics):** the header and footer used "CALIX" set in a web font as a stand-in for the logo. They now use the founder's wordmark PNGs (`alt="CALIX"`, intrinsic dimensions, so no layout shift). This also resolves content gap #8.

### 3.7 Internal links and breadcrumbs

- The header links to Services, Work, Studio and Contact. The footer links to every service page, Work, Studio, Insights, Start a Project and Privacy. The home scroll sequence links each stage to its service page.
- Each service page links to two or three related services, its CTA, and relevant case studies when they exist.
- Visible breadcrumbs with matching `BreadcrumbList` on services, service, studio, work, insights, case-study and article pages.
- Anchor text is descriptive ("See Website Design & Development", "Discuss search visibility"). There is no "click here" or "learn more".

### 3.8 Images and alt text

- The only raster images on pages are the two logo files: real alt text, served through `next/image` (AVIF/WebP), with dimensions known at build time.
- Diagrams are HTML/CSS, `aria-hidden`, with visible captions. The case-study template requires alt text by schema rule, and a build fails without it.
- **Favicon fixed:** the stand-in "C" SVG was replaced with the founder's emblem (`app/icon.png` 512×512, `app/apple-icon.png` 180×180, espresso mono for legibility at small sizes). **Limitation:** the emblem's hairlines are faint at 16–32 px. A dedicated small-size favicon drawn by the designer is recommended.

### 3.9 Structured data

| Type | Where | Notes |
|---|---|---|
| `Organization` | All pages | name, url, description, slogan, `logo` (real artwork), `sameAs` (the Instagram profile named in the founder's spec), `knowsAbout` (five services). **No** address, phone, ratings, awards or founding date, because none was supplied. |
| `WebSite` | All pages | Now includes a publisher. No `SearchAction`, because the site has no search. |
| `BreadcrumbList` | Pages with visible breadcrumbs | — |
| `Service` + `FAQPage` | Each service page | FAQ answers are visible on the page (in disclosures). Google currently limits FAQ rich results to authoritative government and health sites, so this markup describes the content but **should not be expected** to produce rich results. |
| `ItemList` | `/services` | — |
| `AboutPage` | `/studio` | — |
| `ContactPage` | `/contact` | **Added.** |
| `CreativeWork` / `Article` | Case studies / articles | Only for real (non-fixture) content |

All JSON-LD blocks parse as valid JSON (automated check). Run Google's Rich Results Test on the live URLs after deployment (§6).

### 3.10 Broken links and redirects

None broken. Trailing slashes redirect permanently (308). There are no redirect chains. HTTP→HTTPS and apex→www (or the reverse) are hosting tasks (§6).

### 3.11 Duplicate and thin content

| Risk | Status |
|---|---|
| Query-string duplicates (`/contact?service=…`, `?ref=…`) | Canonicalised to `/contact` |
| Gated archives with placeholder content (`/work` 124 words, `/insights` 86 words) | `noindex` until real content exists |
| Thank-you page | `noindex` |
| Fixture pages | Never in production builds |
| Service pages (356–443 words each) | Substantive and distinct per service: problem, audience, deliverables, process, FAQs. They still contain visible "to be confirmed" markers (investment, timeline) and case-study placeholders, which read as unfinished to visitors and search engines. **Replace them before launch.** |
| Home vs. service pages | Different copy; home links to service pages rather than duplicating them |
| Privacy page | Indexable, but the legal text is still a placeholder (content gap #7) |

### 3.12 Technical crawlability

- All public pages are server-rendered HTML (static, except `/contact`, which is rendered per request for the form token). Content does not depend on JavaScript: the scroll sequence's static layout is the server output.
- No `nofollow` on internal links. No orphan pages: every indexable page is reachable from the header or footer.
- Security headers do not block crawlers. `X-Robots-Tag` is not used.
- One language and one region, so there is no `hreflang`. British English spelling is used consistently; `og:locale` is `en_GB`.

---

## 4. Core Web Vitals risks (lab only)

Lighthouse 12.8.2, simulated mobile, local production build (`next start`). **These are lab numbers, not field data.** CrUX and Search Console need real traffic.

| Page | Perf | SEO | A11y | Best practices | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 91 | 100 | 100 | 100 | **2.9 s** | 0 | 250 ms |
| `/services/web-design-development` | 98 | 100 | 100 | 100 | 2.5 s | 0 | 60 ms |
| `/contact` | 98 | 100 | 100 | 100 | 2.2 s | 0 | 80 ms |

**Risk, home LCP above 2.5 s (lab):**
- The LCP element is the hero `h1`. TTFB is low; about 1.2 s is element render delay.
- **Causes:** render-blocking CSS (9 KB), the font swap on the display face, and the home page's larger DOM (the scroll sequence renders each drawing twice: once for the static layout, once for the sticky plate).
- **Main-thread work:** about 1.6 s under throttling, and one client chunk with about 29 KB of unused JS.

**Recommended (performance phase):**
- Render the sticky plate's drawings only on the client when the enhanced mode is active, to cut DOM and style work.
- Consider `font-display: optional` or a metric-matched fallback for the display face.
- Inline the critical CSS for the hero.

These are not applied here: they change the motion architecture verified in Phase 6B and need their own testing.

CLS is 0 on all tested pages. Hosting, CDN and TTFB can only be measured after deployment.

---

## 5. Completed fixes (this phase)

1. Production origin set (`https://www.calixeden.com` from the founder's spec, `SITE_URL` override). Canonicals, `og:url`, sitemap, robots and JSON-LD now use it.
2. Shared `pageMetadata()` helper (`lib/seo.ts`) used by every page: unique titles, descriptions, canonical, full Open Graph and Twitter metadata, robots.
3. Service-intent page titles; home title and description rewritten; `og:locale` corrected to `en_GB`.
4. Default 1200×630 share image from the real logo, on every page.
5. robots.txt no longer blocks the noindex thank-you page. 404 marked `noindex`.
6. Organization schema: logo and the official Instagram profile. WebSite publisher. ContactPage schema.
7. Real logo files replace the font stand-in in the header and footer. The favicon and Apple touch icon now use the real emblem. The mobile header CTA was adjusted so it doesn't wrap.
8. Search Console and Bing verification hooks via environment variables (`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`). Nothing is set yet.

---

## 6. External configuration tasks (cannot be done from the code)

| # | Task | Owner | Notes |
|---|---|---|---|
| 1 | **Confirm www.calixeden.com is the production domain**, point DNS at the host, and enable HTTPS | CALIX / hosting | Not reachable from this environment |
| 2 | Choose **www** as canonical and 301-redirect the apex (`calixeden.com`) and all `http://` requests to `https://www.calixeden.com` | Hosting / DNS | The code assumes www |
| 3 | Set `SITE_URL=https://www.calixeden.com` in production, and `NOINDEX=true` plus a preview `SITE_URL` on preview deployments | Hosting | Production falls back to the founder's domain if unset |
| 4 | **Google Search Console:** add a Domain property (DNS TXT record preferred) or a URL-prefix property using `GOOGLE_SITE_VERIFICATION` | CALIX | Then submit `/sitemap.xml` |
| 5 | **Bing Webmaster Tools:** import from Search Console, or set `BING_SITE_VERIFICATION` | CALIX | — |
| 6 | After launch: URL Inspection on the home page and five service pages; Rich Results Test on a service page; check Page indexing and Core Web Vitals reports after field data accumulates | CALIX / SEO | Indexing is not guaranteed and is not claimed here |
| 7 | Confirm the Instagram profile `@its.calixeden` is live and official (used in `sameAs`) | CALIX | From the founder's spec |
| 8 | Replace content placeholders before launch: investment and timelines, case studies, team, privacy text, reply time, contact email | CALIX | `docs/content-gaps.md` |
| 9 | Optional: a small-size favicon variant of the emblem | Designer | §3.8 |
| 10 | Confirm the git remote: `git fetch` from `saba787/calix_v1` returned "repository not found" during this phase | Repository owner | Pushes may fail until access is restored |

---

## 7. Not done, deliberately

- No location, city or industry landing pages: no evidence or offices to support them (IA §2.1).
- No keyword-targeted copy changes beyond titles and descriptions.
- No `LocalBusiness`, address, `Review`, `AggregateRating` or `award` schema: none of it is supplied or true yet.
- No `hreflang`: one language, one site.
- No claims of rankings, indexing or AI citations.
