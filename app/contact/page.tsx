import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { Fact } from "@/components/ui/Pending";
import { site } from "@/content/site";
import { serviceOptions } from "@/content/services";
import { HONEYPOT_FIELD, TOKEN_FIELD, createFormToken } from "@/lib/enquiry/spam";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata({
  title: "Start a Project",
  description:
    "Tell CALIX about your brand, website, marketing, SEO or conversion project. A short brief takes about two minutes.",
  path: "/contact",
});


const validServices = new Set<string>(serviceOptions.map((o) => o.value));

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // The form carries a timestamp signed at request time, so this page renders per request.
  await connection();
  const token = createFormToken();
  const params = await searchParams;
  const requested = typeof params.service === "string" ? params.service : undefined;
  const preselectedService = requested && validServices.has(requested) ? requested : undefined;
  const ref = typeof params.ref === "string" && /^[a-z0-9-]{1,80}$/.test(params.ref) ? params.ref : undefined;

  return (
    <div className="container-calix grid-calix gap-y-12 pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="col-span-4 md:col-span-8 lg:col-span-4">
        <h1>Start a Project</h1>
        <p className="type-lead mt-6">Tell us what you are building. A short brief takes about two minutes.</p>

        <h2 className="mt-12 text-[26px]">What happens next</h2>
        <ol className="rule-list mt-4">
          <li className="py-4">
            <p className="font-medium">1. We read your brief</p>
            <p className="type-small">
              <Fact value={site.replyTime} render={(v) => <>And reply within {v}.</>} fallback="And reply with next steps." />
            </p>
          </li>
          <li className="py-4">
            <p className="font-medium">2. Introductory call</p>
            <p className="type-small">To understand the business and check we are the right fit.</p>
          </li>
          <li className="py-4">
            <p className="font-medium">3. Proposal</p>
            <p className="type-small">Scope, timeline and investment, agreed in writing before work starts.</p>
          </li>
        </ol>

        <Fact
          value={site.email}
          render={(v) => (
            <p className="type-small mt-8 text-secondary">
              Prefer email? Write to {typeof v === "string" ? <a href={`mailto:${v}`}>{v}</a> : v}.
            </p>
          )}
        />
      </div>

      <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
        <EnquiryForm
          token={token}
          honeypotField={HONEYPOT_FIELD}
          tokenField={TOKEN_FIELD}
          serviceOptions={serviceOptions}
          preselectedService={preselectedService}
          refSlug={ref}
        />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Start a Project",
          url: `${siteUrl}/contact`,
          about: { "@type": "Organization", name: site.name, url: siteUrl },
        }}
      />
    </div>
  );
}
