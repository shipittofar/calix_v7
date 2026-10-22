import Link from "next/link";
import { primaryCta, site } from "@/content/site";
import { collaboration, processSteps } from "@/content/process";
import { featuredProjects, workGateMet } from "@/content/work";
import { ContentPlaceholder, Fact } from "@/components/ui/Pending";
import { WorkGapNotice } from "@/components/work/WorkGapNotice";
import { ProjectList } from "@/components/work/ProjectList";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-travertine section-pad">
      <div className="container-calix grid-calix">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <h2 id="work-title">Selected work</h2>
          <p className="mt-6 measure">
            Client projects shown here are published only with the client&apos;s approval, with the facts they have
            confirmed.
          </p>
        </div>

        <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {workGateMet && featuredProjects.length > 0 ? (
            <>
              <ProjectList projects={featuredProjects} />
              <p className="mt-8">
                <Link href="/work" className="link font-medium">
                  See all work
                </Link>
              </p>
            </>
          ) : (
            <ContentPlaceholder
              title="Featured client projects"
              publicFallback={<WorkGapNotice />}
              needed={[
                "Two to three approved projects (publication level P1 or P2)",
                "Desktop and mobile screenshots, identity files or campaign assets for each",
                "Services delivered, year, and the project objective",
                "Written publication approval reference for each client",
              ]}
            >
              No client work is shown until approved projects are supplied.
            </ContentPlaceholder>
          )}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="surface-inverse section-pad">
      <div className="container-calix">
        <h2 id="process-title" className="max-w-[16ch]">
          One line of thought, from position to enquiry.
        </h2>

        <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, i) => (
            <li key={step.title} className="process-step">
              <span className="process-step__n" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4">{step.title}</h3>
              <p className="type-small mt-2 text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-10 border-t border-gold pt-10 lg:grid-cols-12 lg:gap-6">
          <h3 className="lg:col-span-4">How we work together</h3>
          <ul className="grid gap-8 md:grid-cols-3 lg:col-span-8">
            {collaboration.map((item) => (
              <li key={item.title}>
                <p className="font-medium">{item.title}</p>
                <p className="type-small mt-2 text-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Credibility() {
  return (
    <section id="credibility" aria-labelledby="credibility-title" className="section-pad">
      <div className="container-calix grid-calix gap-y-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <h2 id="credibility-title">Proof, with its sources.</h2>
          <p className="mt-6 measure">We would rather show less than claim more. Every result we publish meets three rules:</p>
          <ul className="rule-list mt-8 type-small">
            <li className="py-3">Published only with the client&apos;s written approval.</li>
            <li className="py-3">Stated with a baseline, a time period and a data source.</li>
            <li className="py-3">Concept work is always labelled as concept, never as client work.</li>
          </ul>
        </div>

        <div className="col-span-4 grid gap-8 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <ContentPlaceholder
            title="Verified client outcomes"
            needed={[
              "Approved outcome figures with baseline, time period and source",
              "Client approval to publish each figure",
            ]}
          />
          <ContentPlaceholder
            title="Client testimonial"
            needed={["A client quote in the client's exact words", "Name, role and company as approved", "Written permission to publish"]}
          />
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="start" aria-labelledby="start-title" className="surface-action section-pad">
      <div className="container-calix grid-calix gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <h2 id="start-title">Tell us what you are building.</h2>
          <p className="type-lead mt-6 measure">
            Best suited to established businesses whose brand and website no longer reflect the quality of their work,
            and to new ventures that want to launch properly.
          </p>
          <div className="mt-10">
            <Link href={primaryCta.href} className="btn btn-primary" data-cta="home-final">
              {primaryCta.label}
            </Link>
          </div>
        </div>

        <ol className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 rule-list self-end">
          <li className="py-4">
            <p className="font-medium">1. Send a short brief</p>
            <p className="type-small">About two minutes. Tell us what you need and when.</p>
          </li>
          <li className="py-4">
            <p className="font-medium">2. We reply</p>
            <p className="type-small">
              <Fact value={site.replyTime} render={(v) => <>Within {v}, with next steps.</>} fallback="With next steps, once we have read your brief." />
            </p>
          </li>
          <li className="py-4">
            <p className="font-medium">3. Introductory call, then a proposal</p>
            <p className="type-small">If we are the right fit, we agree scope, timeline and investment in writing.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
