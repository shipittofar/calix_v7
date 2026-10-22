/**
 * Insights articles (gate G3: at least three substantive articles by named
 * CALIX authors). Empty until real articles are written. Authors must be real
 * people with their real roles.
 */

import type { ServiceKey } from "./services";
import { fixtureArticles, fixturesEnabled } from "./fixtures";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; source: string };

export interface Article {
  slug: string;
  title: string;
  summary: string;
  author: { name: string; role: string };
  published: string; // ISO date
  updated?: string;
  services: ServiceKey[];
  body: ArticleBlock[];
  fixture?: true;
}

const approvedArticles: Article[] = [];

export const articles: Article[] = [...approvedArticles, ...(fixturesEnabled ? fixtureArticles : [])].sort((a, b) =>
  b.published.localeCompare(a.published),
);

/** Gate G3 (fixtures do not count). */
export const insightsGateMet = approvedArticles.length >= 3;

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
