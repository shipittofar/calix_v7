import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { services } from "@/content/services";
import { servicePages } from "@/content/service-pages";
import { CtaBand, PageHeader, SectionTitle } from "@/components/ui/PageParts";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata({
  title: "Services: brand, web, marketing, SEO and conversion",
  description:
    "Brand strategy and identity, website design and development, digital marketing, SEO and GEO, and growth and conversion. Alone or planned together.",
  path: "/services",
});

const situations = [
  {
    title: "Your business has outgrown its brand and website",
    body: "Start with Brand Strategy & Identity and Web Design & Development, planned as one project, with search and measurement built in.",
    links: ["brand", "web"] as const,
  },
  {
    title: "You are launching something new",
    body: "An identity, a website and a launch plan, developed together so you look credible from the first day.",
    links: ["brand", "web", "marketing"] as const,
  },
  {
    title: "Your brand is sound, but you are not found or not chosen",
    body: "Start with an assessment of search visibility and conversion, then improve what brings qualified enquiries.",
    links: ["seo", "growth"] as const,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Services", href: "/services" }]}
        title="Services"
        intro="Five services that work on their own or together. Most clients come to us for one, and benefit from the others being planned with it."
      />

      <section aria-labelledby="services-list" className="container-calix pb-24">
        <h2 id="services-list" className="visually-hidden">
          All services
        </h2>
        <ul className="rule-list">
          {services.map((s) => (
            <li key={s.key} className="grid-calix gap-y-4 py-10">
              <div className="col-span-4 md:col-span-8 lg:col-span-5">
                <h3>
                  <Link href={`/services/${s.slug}`} className="no-underline hover:underline">
                    {s.name}
                  </Link>
                </h3>
                <p className="type-small mt-2 text-secondary">{s.descriptor}</p>
              </div>
              <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
                <p className="measure">{servicePages[s.key].definition}</p>
                <p className="mt-4">
                  <Link href={`/services/${s.slug}`} className="link font-medium">
                    See {s.name}
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="where-to-start" className="surface-inverse section-pad">
        <div className="container-calix">
          <SectionTitle id="where-to-start">Not sure where to start?</SectionTitle>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {situations.map((item) => (
              <li key={item.title} className="border-t border-gold pt-6">
                <h3 className="text-[26px]">{item.title}</h3>
                <p className="type-small mt-3 text-secondary">{item.body}</p>
                <p className="type-small mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {item.links.map((k) => {
                    const s = services.find((x) => x.key === k)!;
                    return (
                      <Link key={k} href={`/services/${s.slug}`} className="link">
                        {s.name}
                      </Link>
                    );
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteUrl}/services/${s.slug}`,
            name: s.name,
          })),
        }}
      />
    </>
  );
}
