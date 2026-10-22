import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { services } from "@/content/services";
import { collaboration, processSteps } from "@/content/process";
import { CtaBand, PageHeader, SectionTitle } from "@/components/ui/PageParts";
import { ContentPlaceholder } from "@/components/ui/Pending";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site-url";
import { showInternalPlaceholders } from "@/lib/display";
import { gates } from "@/content/site";
import { orgId, ref } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About the studio",
  description:
    "CALIX is a digital branding and growth studio. How we work, what we believe, and how we plan brand, website, marketing and search together.",
  path: "/studio",
});

const principles = [
  {
    title: "Strategy first",
    body: "Every design decision traces back to a clear position: who you serve and why they should choose you.",
  },
  {
    title: "Built properly",
    body: "Accessibility, responsive design, security and performance are requirements in every project, not extras.",
  },
  {
    title: "Measured by enquiries",
    body: "We judge work by the qualified conversations it brings, and report results only with their sources.",
  },
];

export default function StudioPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Studio", href: "/studio" }]}
        title="Studio"
        intro="CALIX is a digital branding and growth studio. We connect strategy, design, technology and growth to build stronger brands and better digital experiences."
      />

      <section aria-labelledby="principles" className="border-t border-travertine section-pad">
        <div className="container-calix">
          <SectionTitle id="principles">What we believe</SectionTitle>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="border-t border-espresso pt-6">
                <h3 className="text-[26px]">{p.title}</h3>
                <p className="type-small mt-3">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" aria-labelledby="process-title" className="surface-inverse section-pad">
        <div className="container-calix">
          <SectionTitle id="process-title">How we work</SectionTitle>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, i) => (
              <li key={step.title} className="process-step">
                <span className="process-step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[26px]">{step.title}</h3>
                <p className="type-small mt-2 text-secondary">{step.body}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-16 grid gap-8 border-t border-gold pt-10 md:grid-cols-3">
            {collaboration.map((item) => (
              <li key={item.title}>
                <p className="font-medium">{item.title}</p>
                <p className="type-small mt-2 text-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="disciplines" className="section-pad">
        <div className="container-calix grid-calix gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <SectionTitle id="disciplines">What we do</SectionTitle>
          </div>
          <ul className="rule-list col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            {services.map((s) => (
              <li key={s.key} className="py-5">
                <Link href={`/services/${s.slug}`} className="text-[21px] font-medium no-underline hover:underline">
                  {s.name}
                </Link>
                <p className="type-small mt-1 text-secondary">{s.descriptor}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hidden publicly until real team details exist; no placeholder people. */}
      {showInternalPlaceholders || gates.teamSupplied ? (
      <section aria-labelledby="team" className="border-t border-travertine section-pad">
        <div className="container-calix grid-calix gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <SectionTitle id="team">Who you will work with</SectionTitle>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 grid gap-8">
            <ContentPlaceholder
              title="Team"
              needed={["Names, roles and short biographies of the people clients work with", "Portrait photography"]}
            />
            <ContentPlaceholder
              title="Delivery model and working internationally"
              needed={[
                "Which services are delivered in-house and which through named partners",
                "Locations, time zones and working languages",
              ]}
            />
          </div>
        </div>
      </section>
      ) : null}

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Studio",
          url: `${siteUrl}/studio`,
          about: ref(orgId),
        }}
      />
    </>
  );
}
