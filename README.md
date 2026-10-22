# CALIX website

The CALIX studio website: Next.js (App Router), TypeScript and Tailwind CSS v4.

Planning and decisions live in `docs/` (start with `docs/calix-master-brief.md` and `docs/implementation-plan.md`). Missing content is tracked in `docs/content-gaps.md`.

## Commands

```bash
npm install
npm run dev         # development server on http://localhost:3000
npm run typecheck   # generate route types, then tsc
npm run lint        # ESLint, including the palette hex-literal rule
npm run build       # production build
npm start           # serve the production build
```

## Environment

Copy `.env.example` to `.env.local` for development. On the host, set these as environment variables (never commit real values).

| Variable | Required | Purpose |
|---|---|---|
| `SITE_URL` | No | Canonical origin. Defaults to `https://www.calixeden.com` |
| `NOINDEX` | Previews | `true` on preview and staging deployments: noindex metadata, a blocking robots.txt, and permission to use the log mail transport |
| `MAIL_TRANSPORT` | No | `smtp` (production default) or `log` (development default: nothing is delivered). In production, `log` is refused unless `NOINDEX=true`, so a live site never shows success for an enquiry it did not deliver |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Production | CALIX mailbox used to deliver enquiries. Port defaults to 587; 465 uses implicit TLS |
| `ENQUIRY_TO`, `ENQUIRY_FROM` | Production (`ENQUIRY_TO`) | Recipient and sender of enquiry emails. The sender defaults to `SMTP_USER` |
| `FORM_SECRET` | Production | Long random string that signs form tokens (`openssl rand -hex 32`). The same value on every server instance |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | No | Search Console and Bing Webmaster verification codes |
| `SHOW_CONTENT_PLACEHOLDERS` | No | `true` on review previews to show the internal content-gap markers. Leave unset on the public site |
| `CALIX_FIXTURES` | Never in production | `1` compiles in test fixtures. Never deploy a fixture build |
| `STORY_PREVIEW` | Review previews only | `true` includes the olive story on the home page in a production build, and the build fails unless `NOINDEX=true` is also set. Without it, the section and its generated imagery are left out of the build. In `next dev` it shows unless set to `false`. See `docs/olive-story.md` |

`NOINDEX`, `SHOW_CONTENT_PLACEHOLDERS`, `CALIX_FIXTURES` and `STORY_PREVIEW` are read when pages are generated, so set them for the **build**, not only at runtime.

In production, if the SMTP variables or `FORM_SECRET` are missing, the form tells the visitor their enquiry could not be sent. It never shows a false success.

## Rules

- Use only the five palette colours (see `app/globals.css`). The Tailwind theme is reset, so other colours don't exist as utilities.
- Don't invent clients, results, testimonials or metrics. Use `pending()` in `content/site.ts` or `ContentPlaceholder`.
- Production deployment requires explicit authorisation.
