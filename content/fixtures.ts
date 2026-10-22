/**
 * TEST FIXTURES: fictional content used only to verify templates.
 *
 * Included only when the build runs with CALIX_FIXTURES=1. Fixture pages render
 * a visible "Test fixture" banner, are noindex, and are excluded from the
 * sitemap and from every gate. Never deploy a build made with fixtures enabled.
 */

import type { Project } from "./work";
import type { Article } from "./insights";

export const fixturesEnabled = process.env.CALIX_FIXTURES === "1";

export const fixtureProjects: Project[] = [
  {
    fixture: true,
    slug: "fixture-full-case-study",
    title: "Fixture: full case study",
    publication: "P2",
    industry: "Test fixture",
    services: ["brand", "web", "seo"],
    role: "lead",
    year: 2026,
    summary: "Fictional project that exercises every case-study section, including results.",
    evidenceGrade: "E3",
    featured: 1,
    context: "Fixture text for the client and project context section.",
    challenge: "Fixture text for the challenge section.",
    objectives: ["Fixture objective one", "Fixture objective two"],
    strategy: "Fixture text for the strategy section.",
    execution: "Fixture text for the execution section.",
    deliverables: ["Fixture deliverable one", "Fixture deliverable two"],
    results: [
      {
        value: "0",
        label: "Fixture figure (not real)",
        baseline: "Fixture baseline",
        period: "Fixture period",
        source: "Fixture source",
        approvalRef: "fixture",
      },
    ],
    visuals: [],
    lessons: "Fixture text for lessons and next steps.",
    quote: { text: "Fixture quote text.", name: "Fixture Name", role: "Fixture role", approvalRef: "fixture" },
  },
  {
    fixture: true,
    slug: "fixture-no-results",
    title: "Fixture: no published results",
    publication: "P2",
    industry: "Test fixture",
    services: ["web"],
    role: "lead",
    year: 2025,
    summary: "Fictional project without approved results, to verify the template does not invent any.",
    evidenceGrade: "E2",
    context: "Fixture context.",
    challenge: "Fixture challenge.",
    objectives: ["Fixture objective"],
    strategy: "Fixture strategy.",
    execution: "Fixture execution.",
    deliverables: ["Fixture deliverable"],
    visuals: [],
  },
  {
    fixture: true,
    slug: "fixture-concept",
    title: "Fixture: concept work",
    publication: "C",
    industry: "Test fixture",
    services: ["brand"],
    role: "lead",
    year: 2024,
    summary: "Fictional concept, to verify the concept label.",
    evidenceGrade: "E1",
    context: "Fixture context.",
    challenge: "Fixture challenge.",
    objectives: ["Fixture objective"],
    strategy: "Fixture strategy.",
    execution: "Fixture execution.",
    deliverables: ["Fixture deliverable"],
    visuals: [],
  },
];

export const fixtureArticles: Article[] = [
  {
    fixture: true,
    slug: "fixture-article",
    title: "Fixture: article template",
    summary: "Fictional article used to verify the article template.",
    author: { name: "Fixture Author", role: "Fixture role" },
    published: "2026-10-01",
    services: ["seo"],
    body: [
      { type: "p", text: "Fixture paragraph." },
      { type: "h2", text: "Fixture heading" },
      { type: "list", items: ["Fixture item one", "Fixture item two"] },
      { type: "quote", text: "Fixture quote.", source: "Fixture source" },
    ],
  },
];
