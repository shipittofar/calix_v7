import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { siteUrl } from "@/lib/site-url";
import { palette } from "@/lib/palette";
import { SEQUENCE_MOTION_QUERY, STORY_MOTION_QUERY } from "@/lib/motion";
import { orgId, ref, websiteId } from "@/lib/schema";
import "./globals.css";
import "./components.css";

// Self-hosted at build time by next/font: no requests to Google from visitors.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CALIX — Brand identity, web design and growth studio",
    template: "%s — CALIX",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  robots: process.env.NOINDEX === "true" ? { index: false, follow: false } : undefined,
  // Search Console and Bing Webmaster verification, set per environment when the properties are created.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: palette.ivory,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below may set data-motion on <html> before hydration.
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body>
        {/* Chooses the scroll-sequence layouts before first paint, so enabling them causes no layout shift. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;if(matchMedia(${JSON.stringify(SEQUENCE_MOTION_QUERY)}).matches)d.dataset.motion="on";if(matchMedia(${JSON.stringify(STORY_MOTION_QUERY)}).matches)d.dataset.story="on"}catch(e){}`,
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": orgId,
              name: site.name,
              url: siteUrl,
              description: site.description,
              slogan: site.positioning,
              logo: `${siteUrl}/brand/calix-primary.png`,
              sameAs: site.profiles,
              knowsAbout: services.map((s) => s.name),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": websiteId,
              name: site.name,
              url: siteUrl,
              inLanguage: "en",
              publisher: ref(orgId),
            },
          ]}
        />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <AnalyticsListener />
      </body>
    </html>
  );
}
