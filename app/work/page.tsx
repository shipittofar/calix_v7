import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { projects, workGateMet } from "@/content/work";
import { CtaBand, PageHeader } from "@/components/ui/PageParts";
import { ContentPlaceholder } from "@/components/ui/Pending";
import { ProjectList } from "@/components/work/ProjectList";
import { WorkGapNotice } from "@/components/work/WorkGapNotice";

// Gate G1 (docs/information-architecture.md §2.2): until two approved projects
// exist, the archive explains its status and stays out of search results.
export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: "Selected CALIX client work: brand identity, websites and growth projects, published with each client's approval.",
  path: "/work",
  noindex: !workGateMet,
});

export default function WorkPage() {
  const clientWork = projects.filter((p) => p.publication !== "C");
  const concepts = projects.filter((p) => p.publication === "C");

  return (
    <>
      <PageHeader
        trail={[{ label: "Work", href: "/work" }]}
        title="Work"
        intro="Selected projects, chosen for what they show about how we think. Client work is published only with the client's approval, using the facts they have confirmed."
      />

      <section aria-labelledby="client-work" className="container-calix grid-calix gap-y-10 pb-24">
        <h2 id="client-work" className="col-span-4 md:col-span-8 lg:col-span-4 text-[34px]">
          Client projects
        </h2>
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
          {clientWork.length > 0 ? (
            <ProjectList projects={clientWork} />
          ) : (
            <ContentPlaceholder
              title="Client case studies"
              publicFallback={<WorkGapNotice />}
              needed={[
                "At least two approved projects (publication level P1 or P2)",
                "Project facts confirmed by each client",
                "Visual evidence: screenshots, identity files or campaign assets",
                "Written publication approval reference for each client",
              ]}
            >
              No client work is published yet. Case studies appear here once each client has approved what we show.
            </ContentPlaceholder>
          )}
        </div>
      </section>

      {concepts.length > 0 ? (
        <section aria-labelledby="concepts" className="container-calix grid-calix gap-y-10 border-t border-travertine py-24">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <h2 id="concepts" className="text-[34px]">
              Concepts
            </h2>
            <p className="type-small mt-3 text-secondary">Self-initiated work, not commissioned by a client.</p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
            <ProjectList projects={concepts} />
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
