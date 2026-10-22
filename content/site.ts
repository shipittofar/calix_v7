/**
 * Entity facts, navigation and launch gates.
 *
 * Values typed as `Pending` are facts CALIX has not supplied yet. They render as
 * clearly identified placeholders and are listed in docs/content-gaps.md.
 * Never replace a Pending value with an invented one.
 */

export type Pending = { pending: true; label: string };

export const pending = (label: string): Pending => ({ pending: true, label });

export const isPending = (value: unknown): value is Pending =>
  typeof value === "object" && value !== null && "pending" in value;

export const site = {
  name: "CALIX",
  /** Confirmed positioning (docs/calix-master-brief.md §3). */
  positioning:
    "CALIX connects strategy, design, technology and growth to build stronger brands and better digital experiences.",
  description:
    "CALIX is a digital branding and growth studio: brand strategy and identity, web design and development, digital marketing, SEO and GEO, and conversion optimisation.",
  replyTime: pending("Reply time"),
  email: pending("Enquiry email address"),
  legalName: pending("Legal entity name"),
  copyrightYear: 2026,
  /** Production origin and official profiles, from the founder's logo specification (calix-logo skill). */
  productionUrl: "https://www.calixeden.com",
  profiles: ["https://www.instagram.com/its.calixeden/"],
} as const;

/**
 * Launch gates (docs/information-architecture.md §2.2).
 * G1 is derived from approved projects in content/work.ts.
 */
export const gates = {
  /** G2: Digital Marketing capability confirmed in-house or via a named partner. */
  digitalMarketingConfirmed: false,
  /** G0: named team members supplied. */
  teamSupplied: false,
} as const;

export type NavItem = { label: string; href: string };

/** Header navigation. Insights is linked from the footer until gate G3 is met. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Start a Project", href: "/contact" } as const;
