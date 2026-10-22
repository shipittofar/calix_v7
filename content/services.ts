/**
 * The five confirmed services (docs/calix-master-brief.md §4) as presented on
 * the home page. Names are canonical; do not rename per page.
 */

export type ServiceKey = "brand" | "web" | "marketing" | "seo" | "growth";

export type PlateKind = "identity" | "device" | "formats" | "answer" | "journey";

export interface HomeService {
  key: ServiceKey;
  /** URL segment under /services. */
  slug: string;
  /** Anchor id on the home page. */
  anchor: string;
  name: string;
  /** Short descriptor for the hero service index. */
  descriptor: string;
  heading: string;
  body: string;
  included: string[];
  plate: { kind: PlateKind; caption: string; fact: string };
  cta: { label: string; href: string };
}

export const services: HomeService[] = [
  {
    key: "brand",
    slug: "brand-strategy-identity",
    anchor: "brand",
    name: "Brand Strategy & Identity",
    descriptor: "Positioning, identity, campaign creatives",
    heading: "A clear position, made visible.",
    body: "We decide what you stand for and who you are for, then build an identity that makes the quality of your work obvious before the first conversation.",
    included: [
      "Brand positioning and messaging",
      "Logo design and visual identity",
      "Brand guidelines",
      "Graphic design, campaign creatives and advertising banners",
    ],
    plate: { kind: "identity", caption: "Identity construction", fact: "Clear space and proportion, specified" },
    cta: { label: "Discuss a brand project", href: "/contact?service=brand" },
  },
  {
    key: "web",
    slug: "web-design-development",
    anchor: "digital",
    name: "Web Design & Development",
    descriptor: "UX/UI, websites, custom builds",
    heading: "The same idea, on every screen.",
    body: "Websites designed around how your clients decide, and engineered to be fast, accessible and easy to act on. From corporate sites and landing pages to e-commerce and custom front-end and back-end development.",
    included: [
      "UX and UI design",
      "Corporate websites and landing pages",
      "E-commerce",
      "Custom front-end and back-end development",
    ],
    plate: { kind: "device", caption: "Responsive website", fact: "One layout system, every breakpoint" },
    cta: { label: "Discuss a website project", href: "/contact?service=web" },
  },
  {
    key: "marketing",
    slug: "digital-marketing",
    anchor: "marketing",
    name: "Digital Marketing",
    descriptor: "Strategy, campaigns, social, content",
    heading: "One message, every channel.",
    body: "Campaigns that carry the same idea across formats and channels, aimed at the people most likely to enquire, and measured against outcomes rather than impressions.",
    included: [
      "Digital strategy",
      "Paid campaigns",
      "Social media",
      "Content marketing and analytics",
    ],
    plate: { kind: "formats", caption: "Campaign format set", fact: "One message across four formats" },
    cta: { label: "Discuss a campaign", href: "/contact?service=marketing" },
  },
  {
    key: "seo",
    slug: "seo-geo",
    anchor: "discoverability",
    name: "SEO & GEO",
    descriptor: "Search and AI visibility",
    heading: "Understood by search engines and AI.",
    body: "Clear structure and genuinely useful content, so search engines and AI systems can understand what you do, who it is for and why it can be trusted. We practise responsibly and never promise rankings or AI mentions.",
    included: [
      "Technical SEO",
      "Content SEO and information architecture",
      "GEO and AI search visibility",
      "Structured data and entity clarity",
    ],
    plate: { kind: "answer", caption: "Search and AI answer anatomy", fact: "Diagram, not a real result" },
    cta: { label: "Discuss search visibility", href: "/contact?service=seo" },
  },
  {
    key: "growth",
    slug: "growth-conversion",
    anchor: "growth",
    name: "Growth & Conversion",
    descriptor: "Analytics, CRO, enquiry journeys",
    heading: "Measured by qualified enquiries.",
    body: "Measurement that shows where enquiries come from and where they are lost, followed by steady improvement to landing pages, journeys and forms.",
    included: [
      "Analytics and measurement planning",
      "Conversion optimisation",
      "Landing-page improvement",
      "Lead-generation journeys",
    ],
    plate: { kind: "journey", caption: "Enquiry journey", fact: "Each step measured" },
    cta: { label: "Discuss growth and conversion", href: "/contact?service=growth" },
  },
];

/** Values accepted by the enquiry form's service field. */
export const serviceOptions = services.map((s) => ({ value: s.key, label: s.name }));

export const serviceByKey = (key: ServiceKey) => services.find((s) => s.key === key)!;
export const servicePath = (key: ServiceKey) => `/services/${serviceByKey(key).slug}`;
