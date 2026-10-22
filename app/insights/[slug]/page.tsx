import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceByKey } from "@/content/services";
import { articleBySlug, articles } from "@/content/insights";
import { Breadcrumbs, CtaBand, FixtureBanner } from "@/components/ui/PageParts";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site-url";
import { orgId, ref, serviceId } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const a = articleBySlug((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.summary,
    path: `/insights/${a.slug}`,
    noindex: Boolean(a.fixture),
    follow: !a.fixture,
    type: "article",
    publishedTime: a.published,
    authors: [a.author.name],
  });
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

/** Article template: title and summary, body, named author, one related service, related articles. */
export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const related = articles.filter((x) => x.slug !== a.slug && x.services.some((s) => a.services.includes(s))).slice(0, 2);
  const service = serviceByKey(a.services[0]);

  return (
    <article>
      {a.fixture ? <FixtureBanner /> : null}
      <header className="container-calix grid-calix gap-y-8 pt-10 pb-12 lg:pt-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <Breadcrumbs
            trail={[
              { label: "Insights", href: "/insights" },
              { label: a.title, href: `/insights/${a.slug}` },
            ]}
          />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-2">
          <h1>{a.title}</h1>
          <p className="type-lead mt-6 measure">{a.summary}</p>
          <p className="type-small mt-6 text-secondary">
            {a.author.name}, {a.author.role}. <time dateTime={a.published}>{formatDate(a.published)}</time>
            {a.updated ? (
              <>
                {" "}
                (updated <time dateTime={a.updated}>{formatDate(a.updated)}</time>)
              </>
            ) : null}
          </p>
        </div>
      </header>

      <div className="container-calix grid-calix pb-24">
        <div className="article-body col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-2">
          {a.body.map((block, i) => {
            switch (block.type) {
              case "h2":
                return <h2 key={i}>{block.text}</h2>;
              case "list":
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              case "quote":
                return (
                  <figure key={i}>
                    <blockquote>{block.text}</blockquote>
                    <figcaption>{block.source}</figcaption>
                  </figure>
                );
              default:
                return <p key={i}>{block.text}</p>;
            }
          })}
        </div>

        <aside className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10 mt-12 lg:mt-0" aria-label="Related">
          <div className="border-t border-espresso pt-4">
            <p className="type-label text-secondary">Related service</p>
            <Link href={`/services/${service.slug}`} className="mt-2 inline-block font-medium link">
              {service.name}
            </Link>
          </div>
          {related.length ? (
            <div className="mt-10 border-t border-espresso pt-4">
              <p className="type-label text-secondary">Related articles</p>
              <ul className="mt-2 grid gap-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/insights/${r.slug}`} className="link">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      <CtaBand
        title={`Talk to us about ${service.name}.`}
        cta={{ label: service.cta.label, href: service.cta.href }}
      />

      {/* Emitted for fixtures too (noindex, never deployed) so the template can be tested. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.summary,
            datePublished: a.published,
            dateModified: a.updated ?? a.published,
            author: { "@type": "Person", name: a.author.name, jobTitle: a.author.role },
            publisher: ref(orgId),
            about: a.services.map((k) => ref(serviceId(`/services/${serviceByKey(k).slug}`))),
            mainEntityOfPage: `${siteUrl}/insights/${a.slug}`,
          }}
        />

    </article>
  );
}
