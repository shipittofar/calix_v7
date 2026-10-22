import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceByKey, services } from "@/content/services";
import { servicePages } from "@/content/service-pages";
import { projectsForService } from "@/content/work";
import { CtaBand, Faq, HeaderCta, PageHeader, SectionTitle } from "@/components/ui/PageParts";
import { ContentPlaceholder, Fact } from "@/components/ui/Pending";
import { ProjectList } from "@/components/work/ProjectList";
import { WorkGapNotice } from "@/components/work/WorkGapNotice";
import { TrackView } from "@/components/analytics/TrackView";
import { Plate } from "@/components/plate/Plate";
import {
  AnswerDrawing,
  DeviceDrawing,
  FormatsDrawing,
  IdentityDrawing,
  JourneyDrawing,
} from "@/components/plate/drawings";
import { JsonLd } from "@/components/seo/JsonLd";
import { orgId, pageUrl, ref, serviceId, websiteId } from "@/lib/schema";
import { articles } from "@/content/insights";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

const drawings = {
  identity: IdentityDrawing,
  device: DeviceDrawing,
  formats: FormatsDrawing,
  answer: AnswerDrawing,
  journey: JourneyDrawing,
};

const findService = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[service]">): Promise<Metadata> {
  const service = findService((await params).service);
  if (!service) return {};
  return pageMetadata({
    title: servicePages[service.key].seoTitle,
    description: servicePages[service.key].metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[service]">) {
  const service = findService((await params).service);
  if (!service) notFound();
  const page = servicePages[service.key];
  const Drawing = drawings[service.plate.kind];
  const work = projectsForService(service.key);
  const relatedArticles = articles.filter((a) => !a.fixture && a.services.includes(service.key)).slice(0, 3);
  const path = `/services/${service.slug}`;

  return (
    <>
      <TrackView event="service_page_viewed" props={{ service: service.key }} />
      <PageHeader
        trail={[
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
        label="Service"
        title={service.name}
        intro={
          <>
            <p>{page.definition}</p>
            <p className="mt-4 text-[17px] text-secondary">{page.intro}</p>
          </>
        }
        aside={<HeaderCta cta={service.cta} />}
      />

      <div className="container-calix grid-calix gap-y-16 pb-24">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <Plate caption={service.plate.caption} fact={service.plate.fact}>
            <Drawing />
          </Plate>
        </div>

        <section aria-labelledby="problems" className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
          <SectionTitle id="problems">When you need {service.name}</SectionTitle>
          <ul className="rule-list mt-6">
            {page.problems.map((p) => (
              <li key={p} className="py-4">
                {p}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="fit" className="border-t border-travertine section-pad">
        <div className="container-calix grid-calix gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionTitle id="fit">Who {service.name} is for</SectionTitle>
            <ul className="rule-list mt-6">
              {page.forWhom.map((p) => (
                <li key={p} className="py-4">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <h3 className="text-[26px] lg:mt-3">Not the right fit for</h3>
            <ul className="rule-list mt-6 type-small">
              {page.notFor.map((p) => (
                <li key={p} className="py-3">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="deliverables" className="border-t border-travertine section-pad">
        <div className="container-calix">
          <SectionTitle id="deliverables">What {service.name} includes</SectionTitle>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {page.deliverables.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[26px]">{group.heading}</h3>
                <ul className="rule-list mt-4 type-small">
                  {group.items.map((item) => (
                    <li key={item} className="py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="process" className="surface-inverse section-pad">
        <div className="container-calix">
          <SectionTitle id="process">How a {service.name} engagement works</SectionTitle>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] lg:gap-6">
            {page.process.map((step, i) => (
              <li key={step.title} className="process-step">
                <span className="process-step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[26px]">{step.title}</h3>
                <p className="type-small mt-2 text-secondary">{step.body}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-16 grid gap-6 border-t border-gold pt-8 md:grid-cols-2">
            <div>
              <dt className="type-label text-gold">Investment</dt>
              <dd className="mt-2">
                <Fact
                  value={page.investment}
                  render={(v) => v}
                  fallback="Agreed in writing after an introductory call, based on your scope."
                />
              </dd>
            </div>
            <div>
              <dt className="type-label text-gold">Timeline</dt>
              <dd className="mt-2">
                <Fact value={page.timeline} render={(v) => v} fallback="Set in the proposal, once scope is agreed." />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="work" className="section-pad">
        <div className="container-calix grid-calix gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <SectionTitle id="work">{service.name} case studies</SectionTitle>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            {work.length > 0 ? (
              <ProjectList projects={work} />
            ) : (
              <ContentPlaceholder
                title={`Case studies for ${service.name}`}
                publicFallback={<WorkGapNotice />}
                needed={["Approved projects that used this service", "Publication approval for each client"]}
              >
                No case studies are published for this service yet. We only show client work with the client&apos;s
                approval.
              </ContentPlaceholder>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="related" className="border-t border-travertine section-pad">
        <div className="container-calix grid-calix gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <SectionTitle id="related">Related services</SectionTitle>
          </div>
          <ul className="rule-list col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            {page.related.map((key) => {
              const r = serviceByKey(key);
              return (
                <li key={key} className="py-5">
                  <Link href={`/services/${r.slug}`} className="text-[21px] font-medium no-underline hover:underline">
                    {r.name}
                  </Link>
                  <p className="type-small mt-1 text-secondary">{r.descriptor}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {relatedArticles.length ? (
        <section aria-labelledby="insights" className="border-t border-travertine section-pad">
          <div className="container-calix grid-calix gap-y-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <SectionTitle id="insights">Insights on {service.name}</SectionTitle>
            </div>
            <ul className="rule-list col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
              {relatedArticles.map((a) => (
                <li key={a.slug} className="py-5">
                  <Link href={`/insights/${a.slug}`} className="text-[21px] font-medium no-underline hover:underline">
                    {a.title}
                  </Link>
                  <p className="type-small mt-1 text-secondary">{a.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {page.faqs.length ? (
        <section aria-labelledby="faq" className="border-t border-travertine section-pad">
          <div className="container-calix grid-calix gap-y-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <SectionTitle id="faq">{service.name}: questions clients ask</SectionTitle>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
              <Faq items={page.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand cta={service.cta} title={`Discuss ${service.name}.`} />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${pageUrl(path)}#webpage`,
            url: pageUrl(path),
            name: page.seoTitle,
            isPartOf: ref(websiteId),
            about: ref(serviceId(path)),
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": serviceId(path),
            name: service.name,
            description: page.definition,
            serviceType: service.name,
            url: pageUrl(path),
            provider: ref(orgId),
            isRelatedTo: page.related.map((k) => ref(serviceId(`/services/${serviceByKey(k).slug}`))),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
    </>
  );
}
