/**
 * Service page content (docs/information-architecture.md §5.3–5.8).
 *
 * Scope comes from the confirmed service list (docs/calix-master-brief.md §4).
 * Problems and audiences come from docs/ideal-clients.md. Process wording is a
 * draft to be confirmed against how the team works (docs/content-gaps.md).
 * Facts not yet supplied (prices, timelines, platforms) are Pending, never invented.
 */

import { pending, type Pending } from "./site";
import type { ServiceKey } from "./services";

export interface ServicePage {
  /** Page title with search intent, shown before " — CALIX". */
  seoTitle: string;
  /** One quotable sentence: what the service is and what it includes (docs/geo-audit.md). */
  definition: string;
  metaDescription: string;
  intro: string;
  problems: string[];
  forWhom: string[];
  notFor: string[];
  deliverables: { heading: string; items: string[] }[];
  process: { title: string; body: string }[];
  investment: Pending | string;
  timeline: Pending | string;
  faqs: { q: string; a: string }[];
  related: ServiceKey[];
}

export const servicePages: Record<ServiceKey, ServicePage> = {
  brand: {
    seoTitle: "Brand Strategy & Visual Identity Design",
    definition:
      "Brand Strategy & Identity is CALIX's brand positioning and visual identity service: positioning and messaging, logo design, visual identity systems, brand guidelines, graphic design, campaign creatives and advertising banners.",
    metaDescription:
      "Brand strategy and visual identity from CALIX: positioning, messaging, logo design, identity systems, guidelines, campaign creatives and advertising banners.",
    intro:
      "A brand that undersells the business costs pitches and pricing power. We decide what you stand for and who you are for, then build an identity that makes the quality of your work visible before the first conversation.",
    problems: [
      "Your work is better than your brand suggests, and prospects can't tell.",
      "You are moving upmarket, launching a new line or entering a new market, and the current identity no longer fits.",
      "Different suppliers have produced different versions of your brand, and nothing feels consistent.",
      "You are launching something new and need to look credible from the first day.",
    ],
    forWhom: [
      "Established businesses whose offer has outgrown their brand",
      "New ventures and sub-brands that need an identity from the start",
      "Teams that need campaign creatives produced consistently within an identity",
    ],
    notFor: [
      "A logo on its own at a commodity price",
      "Template identities with no positioning work behind them",
    ],
    deliverables: [
      { heading: "Strategy", items: ["Brand positioning", "Messaging and tone of voice", "Audience and competitor review"] },
      { heading: "Identity", items: ["Logo design", "Visual identity system: colour, typography, graphic elements", "Brand guidelines"] },
      { heading: "Applications", items: ["Graphic design", "Campaign creatives", "Advertising banners"] },
    ],
    process: [
      { title: "Discover", body: "Workshops and research to understand the business, the audience and the competition." },
      { title: "Position", body: "A written positioning and messaging framework, agreed before any design starts." },
      { title: "Design", body: "Identity routes developed from the positioning, refined into one system." },
      { title: "Apply", body: "Guidelines and the first applications, ready for your team and other suppliers to use." },
    ],
    investment: pending("Brand project starting price"),
    timeline: pending("Typical brand project timeline"),
    faqs: [
      {
        q: "What is the difference between a logo and a brand identity?",
        a: "A logo is a single mark. A brand identity is the whole system that makes a business recognisable: its positioning and messaging, the logo, colour, typography, graphic elements and the rules for applying them.",
      },
      {
        q: "Do you only design logos?",
        a: "No. A logo is one part of an identity. We start with positioning and messaging, because the design needs a clear idea to express.",
      },
      {
        q: "Can you produce campaign creatives and banners within our existing identity?",
        a: "Yes. Graphic design, campaign creatives and advertising banners are part of this service, whether or not we created the identity.",
      },
      {
        q: "Who builds the website once the identity is ready?",
        a: "We can, through Web Design & Development, so the identity carries into the site without being diluted. You can also hand the guidelines to another team.",
      },
    ],
    related: ["web", "marketing"],
  },

  web: {
    seoTitle: "Website Design & Development",
    definition:
      "Web Design & Development is CALIX's website service: UX and UI design, corporate websites, landing pages, e-commerce, and custom front-end and back-end development, built to be accessible, fast, secure and readable by search engines.",
    metaDescription:
      "Website design and development from CALIX: UX/UI, corporate websites, landing pages, e-commerce and custom front-end and back-end development.",
    intro:
      "Your website is where most prospects decide whether to contact you. We design it around how your clients decide, and build it to be fast, accessible, secure and easy to act on.",
    problems: [
      "The site gets visits but few enquiries, or enquiries from the wrong clients.",
      "It is slow, hard to update, or built on a platform that is reaching the end of its life.",
      "It looks dated next to competitors and undersells the business.",
      "You need functionality a template can't provide.",
    ],
    forWhom: [
      "Businesses whose website no longer reflects the quality of their work",
      "Teams launching a new product, brand or market",
      "Organisations that need e-commerce or custom functionality",
    ],
    notFor: ["Template sites at the lowest possible cost", "Projects that need launch-day delivery with no discovery phase"],
    deliverables: [
      { heading: "Design", items: ["UX: structure, user journeys, content hierarchy", "UI: visual design for desktop, tablet and mobile"] },
      { heading: "Build", items: ["Corporate websites and landing pages", "E-commerce", "Custom front-end and back-end development"] },
      {
        heading: "Built in",
        items: [
          "Accessibility, responsive design, security and performance as requirements",
          "Search and AI-readable structure",
          "Enquiry tracking set up for measurement",
        ],
      },
    ],
    process: [
      { title: "Discover", body: "Goals, audiences, content and technical requirements, agreed in writing." },
      { title: "Structure", body: "Sitemap, journeys and wireframes that put the path to an enquiry first." },
      { title: "Design", body: "Visual design across breakpoints, reviewed with you at each stage." },
      { title: "Build and test", body: "Development, then testing for accessibility, performance and behaviour on real devices." },
      { title: "Launch and measure", body: "Launch, followed by a review of how the site performs against its goals." },
    ],
    investment: pending("Website project starting price"),
    timeline: pending("Typical website project timeline"),
    faqs: [
      {
        q: "What is the difference between web design and web development?",
        a: "Design decides a site's structure, content hierarchy and appearance. Development builds it: the code, content management, integrations and performance. CALIX does both, so design decisions survive the build.",
      },
      {
        q: "Can you redesign our website without changing our brand?",
        a: "Yes. If your brand is sound, we design and build the site within it. If it needs work, we will say so and explain why.",
      },
      {
        q: "Do you build e-commerce and custom functionality?",
        a: "Yes. E-commerce and custom front-end and back-end development are part of this service. We confirm the right platform during discovery.",
      },
      {
        q: "Which platforms and technologies do you use?",
        a: "We choose them per project, based on your content, team and requirements, and explain the reasons in the proposal.",
      },
      {
        q: "Will the site be accessible and fast?",
        a: "Accessibility, responsive design, security and performance are requirements in every build, not extras. We test them before launch.",
      },
    ],
    related: ["brand", "seo", "growth"],
  },

  marketing: {
    seoTitle: "Digital Marketing & Campaigns",
    definition:
      "Digital Marketing is CALIX's campaign service: digital strategy, paid campaigns, social media, content marketing and analytics, planned together with the brand and website the campaigns depend on.",
    metaDescription:
      "Digital marketing from CALIX: digital strategy, paid campaigns, social media, content marketing and analytics, measured against qualified outcomes.",
    intro:
      "Campaigns only work if the brand and the website can convert the attention they buy. We plan marketing together with the brand and site it points to, and measure it against outcomes rather than impressions.",
    problems: [
      "Ad spend brings traffic but few enquiries or sales.",
      "Campaigns, social and content each say something different.",
      "You don't know which channels are worth the investment.",
      "A previous agency reported clicks, not results.",
    ],
    forWhom: [
      "Businesses with a credible brand and website that need more of the right visitors",
      "Teams launching a product or entering a market",
      "Marketing leads who want campaigns measured against business outcomes",
    ],
    notFor: ["Buying traffic towards a site that cannot convert it", "Guaranteed returns on ad spend"],
    deliverables: [
      { heading: "Strategy", items: ["Digital strategy and channel planning", "Audience and message definition"] },
      { heading: "Campaigns", items: ["Paid campaigns", "Social media", "Content marketing"] },
      { heading: "Measurement", items: ["Analytics and reporting against agreed goals"] },
    ],
    process: [
      { title: "Assess", body: "Review the brand, site and current channels before spending more on traffic." },
      { title: "Plan", body: "Agree audiences, messages, channels, budget and how success will be measured." },
      { title: "Run", body: "Produce and launch campaigns, with creatives consistent with your identity." },
      { title: "Improve", body: "Report against the agreed goals and move budget to what works." },
    ],
    investment: pending("Digital marketing starting price or retainer"),
    timeline: pending("Typical campaign set-up time"),
    faqs: [
      {
        q: "What does a digital marketing strategy include?",
        a: "Who you want to reach, what you want them to understand, which channels reach them, the budget, and how results will be measured, agreed before any campaign runs.",
      },
      {
        q: "Do you create the ads as well as run them?",
        a: "Campaign creatives and advertising banners are produced within your identity through Brand Strategy & Identity, so the message stays consistent.",
      },
      {
        q: "Will you fix our website before sending traffic to it?",
        a: "If the site is the real obstacle, we will say so. Sending paid traffic to a page that cannot convert it wastes budget.",
      },
      {
        q: "Do you guarantee results?",
        a: "No. We agree measurable goals at the start and report honestly against them, including what is not working.",
      },
    ],
    related: ["growth", "brand", "seo"],
  },

  seo: {
    seoTitle: "SEO & GEO: Search and AI Visibility",
    definition:
      "SEO & GEO is CALIX's search visibility service: technical SEO, content SEO and information architecture, plus generative engine optimisation (GEO), which helps AI systems understand and accurately describe a business. It never includes guaranteed rankings or AI mentions.",
    metaDescription:
      "SEO and GEO from CALIX: technical and content SEO, information architecture and responsible AI search visibility. No guaranteed rankings.",
    intro:
      "If search engines and AI systems can't understand what you do, the people looking for it won't find you. We make your site clear, useful and well structured, practised responsibly and without promised rankings.",
    problems: [
      "Organic visibility has dropped, or never grew.",
      "Competitors appear in AI answers and you don't.",
      "The site has technical problems nobody has diagnosed.",
      "Previous SEO work promised rankings and delivered reports.",
    ],
    forWhom: [
      "Businesses with a credible brand that aren't being found",
      "Teams launching or rebuilding a site who want search built in from the start",
      "Marketing leads who want an honest assessment before a retainer",
    ],
    notFor: ["Guaranteed rankings or AI mentions", "Keyword stuffing or link schemes"],
    deliverables: [
      { heading: "Technical", items: ["Technical SEO: crawlability, indexing, performance, structured data"] },
      { heading: "Content and structure", items: ["Content SEO", "Information architecture that helps people and search engines"] },
      { heading: "AI search", items: ["GEO: generative engine optimisation", "Entity clarity: who you are, what you do, for whom"] },
    ],
    process: [
      { title: "Audit", body: "Technical, content and AI-visibility review, with findings ranked by impact." },
      { title: "Prioritise", body: "A plan that separates quick fixes from structural work." },
      { title: "Implement", body: "Fixes and content improvements, made by us or with your team." },
      { title: "Measure", body: "Progress reported with its sources, against a baseline taken at the start." },
    ],
    investment: pending("SEO & GEO starting price or retainer"),
    timeline: pending("Typical SEO audit timeline"),
    faqs: [
      {
        q: "What is the difference between SEO and GEO?",
        a: "SEO helps a site be found and ranked in search results. GEO helps AI systems that generate answers understand a business and describe it accurately. Much of the work overlaps: clear structure, useful content and consistent facts.",
      },
      {
        q: "How do you measure AI search visibility?",
        a: "With a fixed set of real client questions, asked in chosen AI tools at agreed intervals, recording whether the business is mentioned, how accurately it is described and which pages are cited. AI answers vary between runs, so results are reported as trends, never as guarantees.",
      },
      {
        q: "Do you guarantee rankings or AI recommendations?",
        a: "No, and nobody honestly can. We improve the things that make a site understandable and useful, and report the results with their sources.",
      },
      {
        q: "What is GEO?",
        a: "Generative engine optimisation: making your site clear and well evidenced enough that AI systems such as ChatGPT, Perplexity or Google's AI features can understand it and cite it accurately.",
      },
      {
        q: "Do we need a new website for SEO?",
        a: "Not necessarily. An audit shows whether the problems can be fixed on the current site or need a rebuild.",
      },
    ],
    related: ["growth", "web"],
  },

  growth: {
    seoTitle: "Growth & Conversion Optimisation",
    definition:
      "Growth & Conversion is CALIX's measurement and conversion service: analytics, conversion optimisation, landing-page improvement and lead-generation journeys, judged by the number of qualified enquiries a site produces.",
    metaDescription:
      "Growth and conversion optimisation from CALIX: analytics, conversion optimisation, landing-page improvement and lead-generation journeys.",
    intro:
      "More traffic doesn't help if visitors don't become enquiries. We measure where enquiries come from and where they are lost, then improve the pages, journeys and forms in between.",
    problems: [
      "The site has traffic but not enough qualified enquiries.",
      "Nobody can say which pages or channels bring the best leads.",
      "Landing pages and forms were never tested.",
      "Analytics are installed but not trusted.",
    ],
    forWhom: [
      "Businesses with steady traffic and too few of the right enquiries",
      "Teams after a relaunch who want to improve what they have",
      "Marketing leads who need reliable measurement",
    ],
    notFor: ["Growth hacks that trade trust for short-term numbers"],
    deliverables: [
      { heading: "Measurement", items: ["Analytics and measurement planning", "Enquiry tracking you can trust"] },
      { heading: "Improvement", items: ["Conversion optimisation", "Landing-page improvement", "Lead-generation journeys"] },
    ],
    process: [
      { title: "Measure", body: "Set up or repair analytics so the baseline is reliable." },
      { title: "Diagnose", body: "Find where qualified visitors drop off, and why." },
      { title: "Improve", body: "Change pages, journeys and forms in reviewable steps." },
      { title: "Report", body: "Show what changed and what it did, with sources." },
    ],
    investment: pending("Growth & Conversion starting price or retainer"),
    timeline: pending("Typical first-improvement timeline"),
    faqs: [
      {
        q: "What is conversion rate optimisation?",
        a: "Improving the share of visitors who take a valuable action, here a qualified enquiry, by measuring how people move through pages and forms and testing changes where they drop off.",
      },
      {
        q: "Do you need access to our analytics?",
        a: "Yes, usually read access to analytics and your enquiry records, so we can see the full path from visit to qualified lead.",
      },
      {
        q: "Can you work on a site you didn't build?",
        a: "Yes. Most conversion work starts on an existing site.",
      },
      {
        q: "How do you measure success?",
        a: "Against qualified enquiries, agreed with you at the start, not page views or time on site.",
      },
    ],
    related: ["seo", "web", "marketing"],
  },
};
