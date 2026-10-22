/**
 * Approved portfolio projects (docs/portfolio-inventory.md).
 *
 * Empty until CALIX supplies projects with publication approval. P3 (private)
 * projects must never be added to this repository. Every project is checked by
 * `assertProjectValid` at build time: a project that breaks an evidence rule
 * fails the build rather than publishing.
 */

import type { ServiceKey } from "./services";
import { fixtureProjects, fixturesEnabled } from "./fixtures";

export type Publication = "P1" | "P2" | "C";
export type EvidenceGrade = "E1" | "E2" | "E3";

export interface Outcome {
  value: string;
  label: string;
  baseline: string;
  period: string;
  source: string;
  /** Where CALIX keeps the client's approval to publish this figure. */
  approvalRef: string;
}

export interface Visual {
  /** Path under /public, for example /work/project-a/home-desktop.avif */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  publication: Publication;
  /** Required for P1, forbidden otherwise. */
  client?: { name: string; url?: string; approvalRef: string };
  industry: string;
  services: ServiceKey[];
  role: "lead" | "subcontractor" | "partner";
  year: number;
  summary: string;
  evidenceGrade: EvidenceGrade;
  featured?: 1 | 2 | 3;
  // Case-study sections, in order
  context: string;
  challenge: string;
  objectives: string[];
  strategy: string;
  execution: string;
  deliverables: string[];
  /** Only with evidenceGrade E3 and an approval reference for each figure. */
  results?: Outcome[];
  visuals: Visual[];
  lessons?: string;
  quote?: { text: string; name: string; role: string; company?: string; approvalRef: string };
  /** Test fixtures only: never published, always noindex. */
  fixture?: true;
}

export function assertProjectValid(p: Project): void {
  const fail = (rule: string) => {
    throw new Error(`Project "${p.slug}" breaks a publication rule: ${rule}`);
  };
  if (p.publication === "P1" && !p.client?.approvalRef) fail("P1 projects need a client with an approval reference");
  if (p.publication !== "P1" && p.client) fail("only P1 projects may name the client");
  if (p.results?.length && p.evidenceGrade !== "E3") fail("results require evidence grade E3");
  for (const r of p.results ?? []) {
    if (!r.baseline || !r.period || !r.source || !r.approvalRef) {
      fail(`result "${r.label}" needs a baseline, period, source and approval reference`);
    }
  }
  if (p.publication === "C" && (p.results?.length || p.quote)) fail("concept work cannot carry results or quotes");
  if (p.quote && !p.quote.approvalRef) fail("quotes need an approval reference");
  for (const v of p.visuals) if (!v.alt.trim()) fail(`visual ${v.src} needs alt text`);
}

/** Real, approved projects go here. */
const approvedProjects: Project[] = [];

export const projects: Project[] = [...approvedProjects, ...(fixturesEnabled ? fixtureProjects : [])];
projects.forEach(assertProjectValid);

const publishable = (p: Project) => p.publication === "P1" || p.publication === "P2";

/** Gate G1: at least two publishable client projects (fixtures do not count). */
export const workGateMet = approvedProjects.filter(publishable).length >= 2;

export const featuredProjects = projects
  .filter((p) => p.featured && p.publication !== "C")
  .sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9));

export const projectsForService = (key: ServiceKey) => projects.filter((p) => p.services.includes(key));

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
