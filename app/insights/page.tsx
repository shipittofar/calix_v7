import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { articles, insightsGateMet } from "@/content/insights";
import { serviceByKey } from "@/content/services";
import { CtaBand, PageHeader } from "@/components/ui/PageParts";
import { ContentPlaceholder } from "@/components/ui/Pending";

// Gate G3: until three real articles exist, the archive is not indexed.
export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Practical thinking on brand, websites, search and growth from the people at CALIX who do the work.",
  path: "/insights",
  noindex: !insightsGateMet,
});

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Insights", href: "/insights" }]}
        title="Insights"
        intro="Practical thinking on brand, websites, search and growth, written by the people who do the work."
      />

      <section aria-labelledby="articles" className="container-calix grid-calix gap-y-10 pb-24">
        <h2 id="articles" className="visually-hidden">
          Articles
        </h2>
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
          {articles.length > 0 ? (
            <ul className="rule-list">
              {articles.map((a) => (
                <li key={a.slug} className="py-8">
                  <article>
                    <p className="type-small text-secondary">
                      <time dateTime={a.published}>{formatDate(a.published)}</time>, {a.author.name}
                    </p>
                    <h3 className="mt-2">
                      <Link href={`/insights/${a.slug}`} className="no-underline hover:underline">
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-2 measure">{a.summary}</p>
                    <p className="type-small mt-3 text-secondary">
                      {a.services.map((k) => serviceByKey(k).name).join(", ")}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <ContentPlaceholder
              title="Articles"
              publicFallback={<p className="measure border-t border-espresso pt-6">Articles are in preparation.</p>}
              needed={[
                "At least three substantive articles",
                "Each by a named CALIX author with their real role",
                "A realistic publishing cadence",
              ]}
            >
              No articles are published yet.
            </ContentPlaceholder>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
