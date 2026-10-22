/**
 * Working process and collaboration terms shown on the home page.
 * Status: draft wording that must be confirmed against how the CALIX team
 * actually works (docs/content-gaps.md). These describe method, not results.
 */

export const processSteps = [
  {
    title: "Position",
    body: "We start with the business: who you serve, what you are competing against and what a good enquiry looks like.",
  },
  {
    title: "Design",
    body: "Identity, messaging and page structure are designed together, so every decision traces back to the position.",
  },
  {
    title: "Build",
    body: "Websites and campaigns are built to the design, with accessibility, performance and search structure as requirements.",
  },
  {
    title: "Grow",
    body: "After launch we measure what brings qualified enquiries and improve it, in agreed, reviewable steps.",
  },
] as const;

export const collaboration = [
  {
    title: "Decisions in writing",
    body: "Each phase ends with an agreed deliverable before the next one begins.",
  },
  {
    title: "One connected plan",
    body: "Brand, website, marketing and search are planned together rather than handed between suppliers.",
  },
  {
    title: "Honest reporting",
    body: "Progress is reported with its sources. We do not promise rankings, AI mentions or ad returns.",
  },
] as const;
