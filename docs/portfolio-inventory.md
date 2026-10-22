# CALIX — Portfolio Inventory

**Status:** No verified portfolio projects identified. One unidentified candidate needs clarification (§3).
**Last inspected:** 2026-10-09
**Related:**
- `docs/portfolio-content-inventory.md`: publication levels (P1/P2/P3/C), evidence grades (E1–E3, Q), per-project question bank, and the rules for turning projects into strategy.
- `docs/strategy.md` §5.4 and §7: how the inventory decides the entry service and the credibility evidence.

This file is the **record of what actually exists**. Nothing is added here unless it was found in a file or supplied by CALIX, with its source noted.

---

## 1. Inspection log

| Location | What was searched | Result |
|---|---|---|
| Repository `saba787/calix_v1`, all branches (only `claude/quirky-cannon-o525ld` exists) | Every file | 4 files, all strategy documents in `docs/`. **No** logos, identity files, screenshots, designs, creatives, guidelines, project descriptions, testimonials, analytics or code. |
| `docs/project-audit.md` | Referenced in Phase 1 | Does not exist. |
| Session upload locations (`/mnt/user-data/uploads`, `/mnt/attach`, working directory) | Any attached files | Empty. |
| Container filesystem | File names containing "calix" or "portfolio" | Only CALIX's own docs and a stock LibreOffice template (not relevant). |
| Installed `calix-geo` entity profile | `evidence.supplied` | Empty list. |
| Other repositories on the connected GitHub account | Repository list | One other repo: **`saba787/Greeni`** (public fork). **Not inspected:** attaching it to this session was refused by the session's permission policy. See §3. |
| Live client websites | — | No URLs have been supplied, so none were visited. |

### Asset search results

| Asset type | Found |
|---|---|
| Logos and brand identity files | None |
| Website screenshots and URLs | None |
| Mobile and desktop designs | None |
| Campaigns, banners and advertising creatives | None |
| Brand guidelines | None |
| Project descriptions | None |
| Client-approved testimonials | None |
| Verified analytics or performance reports | None |
| Development and technical work | None identified. `saba787/Greeni` is unconfirmed (§3). |

---

## 2. Verified projects

**None.** No project can be recorded yet, because no project information or assets have been found or supplied.

---

## 3. Unidentified candidates (clarification needed)

| # | Candidate | What is known | What is not known | Question for CALIX |
|---|---|---|---|---|
| U1 | GitHub repository `saba787/Greeni` | A public **fork** on the same GitHub account, last pushed 2026-10-09. | Contents, and whether it is CALIX client work, a CALIX concept, personal work, or an unrelated fork. A fork usually means the original code came from someone else. | Is Greeni a CALIX project? If yes: who is the client, what did CALIX build, and may it be shown publicly? If you want me to inspect it, allow this session to attach the repository. |

---

## 4. Project record template

Copy this block for each project once its information is supplied. Every field must name its **evidence source** or say "Not supplied".

```markdown
### [Project #] — [Project name]

| Field | Value | Evidence source |
|---|---|---|
| Project name | | |
| Client name | [Only if approved for publication, otherwise "Withheld (P2/P3)"] | Written approval: [where it is stored, not the document itself] |
| Publication level | P1 / P2 / P3 / C | |
| Industry | | |
| Services delivered | BR / WEB / MKT / SEO / GRO | |
| CALIX role | Lead / sub-contractor / partner | |
| Project objective | [As stated by the client or the brief, not inferred] | |
| Actual deliverables | | |
| Available visual assets | [File names or locations, rights holder] | |
| Verified outcomes | [E3 metrics only: baseline → result, period, source. Otherwise "None verified"] | |
| Evidence grade | E1 / E2 / E3 (+ Q if a quote exists) | |
| Testimonial | [Exact wording, attribution, and where the permission is recorded] | |
| Confidentiality / restrictions | [NDA, embargo, items that must not be shown] | |
| Missing information | | |
| Recommended case-study structure | [Full / Short / Visual-only / Not publishable. See §5] | |
```

### Handling rules
- **Confidential files** (contracts, NDAs, invoices, raw analytics exports, client credentials) must **not** be committed to this repository. Record only that they exist and where CALIX holds them.
- **Analytics** go in here only as approved summary figures with a period and source. Never as raw exports, screenshots of account dashboards, or client account details.
- **Client names** are written only after publication approval is confirmed. Until then, use a working codename (e.g. "Project A").
- **Concept work** is recorded as level C and labelled "Concept" everywhere it appears.

---

## 5. Recommended case-study structures

The structure each project gets depends on its publication level and evidence grade.

| Structure | Use when | Sections |
|---|---|---|
| **Full case study** | P1 or P2, E2 or better, three or more services delivered | 1. Summary (client or descriptor, industry, services, year) · 2. The situation and objective · 3. Strategy: the key decision · 4. Brand / design work · 5. Website / technical work · 6. Search, growth or marketing work · 7. Outcome (E3 metrics only, or "what was delivered" if no metrics) · 8. Client quote (Q, if permitted) · 9. CTA: "Start a similar project" |
| **Short case study** | P1 or P2, E2, one or two services | Summary · Objective · Approach · Deliverables with visuals · Outcome or delivered scope · CTA |
| **Visual-only entry** | P1 or P2, E1–E2, strong visuals but little documented context | Images, project title, services, year, one-paragraph description. No outcome claims. |
| **Concept entry** | Level C | Clearly labelled "Concept". Brief, idea and visuals. No client, no results. |
| **Not publishable** | P3 | Not on the site. Can be described in sales conversations only where the contract allows. |

Outcome sections never use unverified numbers. If there are no E3 metrics, the section describes what was delivered and how it was received, using approved client wording only.

---

## 6. Featured project selection

### Result
**Three featured projects cannot be identified.** No verified projects exist in the inventory. Naming candidates now would mean inventing them.

### Scoring method (to apply once projects are recorded)

| Criterion | Weight | 0 | 1 | 2 | 3 |
|---|---|---|---|---|---|
| **Relevance** to the primary ICP and entry service (`docs/strategy.md`) | ×3 | Unrelated | Partly relevant | Relevant client or service | Primary-ICP client, Brand & Website scope |
| **Visual quality** (judged against CALIX's premium editorial standard) | ×2 | Not presentable | Usable with editing | Good | Flagship-level |
| **Service coverage** (of the five) | ×2 | — | 1 service | 2 services | 3 or more services |
| **Available evidence** | ×3 | E1 / no permission | E2, P2 | E2, P1 | E3 and/or Q, P1 |

Maximum score is 30. Requirements for a featured project: publication level P1 or P2, a total score of 18 or more, and no zero in Relevance or Evidence. At least one of the three should show multi-service work, to support the positioning claim in `docs/strategy.md` §4.3.

| Rank | Project | Relevance | Visual | Coverage | Evidence | Total |
|---|---|---|---|---|---|---|
| 1 | — | — | — | — | — | — |
| 2 | — | — | — | — | — | — |
| 3 | — | — | — | — | — | — |

---

## 7. What CALIX needs to supply

1. **A project list:** every client project you consider portfolio-worthy, with a working name for each.
2. **Assets per project**, in a shared folder or uploaded to this session: logos and identity files, guidelines, website URLs and screenshots (desktop and mobile), designs, campaign creatives and banners, and technical or development notes.
3. **Permission status per client:** named, anonymised, or private.
4. **Outcome data**, only if verified and publishable: as a summary figure with baseline, period and source.
5. **Testimonials**, only with written permission, in the client's exact words.
6. **Clarification on `saba787/Greeni`** (§3).
7. Answers to the per-project questions in `docs/portfolio-content-inventory.md` §5.

**Where to put files:** Upload them to the session or share a folder link. Don't commit raw client assets to the repository until each one's publication level is confirmed. Approved, web-optimised assets can be added during the build phase.
