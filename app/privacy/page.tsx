import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContentPlaceholder } from "@/components/ui/Pending";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How CALIX handles the information you send through this website, including the enquiry form.",
  path: "/privacy",
});

/**
 * Facts below describe what this website actually does today. The legal
 * notice itself needs legal review (docs/content-gaps.md).
 */
export default function PrivacyPage() {
  return (
    <div className="container-calix grid-calix pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="col-span-4 md:col-span-8 lg:col-span-7">
        <h1>Privacy</h1>

        <div className="mt-10">
          <ContentPlaceholder
            title="Legal privacy notice"
            alwaysShow
            needed={[
              "Legal entity name and contact details of the data controller",
              "Lawful basis for processing enquiries",
              "Retention period for enquiry emails",
              "Rights of individuals and how to exercise them",
              "Review by a qualified adviser for the markets CALIX serves",
            ]}
          />
        </div>

        <h2 className="mt-16 text-[34px]">What this website does today</h2>
        <ul className="rule-list mt-6">
          <li className="py-4">
            <p className="font-medium">Enquiry form</p>
            <p className="type-small">
              Collects your name, business email, company, optional website, the services you are interested in, your
              project goals, an optional budget range, your desired timeline and optional additional context. It is
              sent to CALIX by email so we can reply. It is not stored in a database.
            </p>
          </li>
          <li className="py-4">
            <p className="font-medium">Spam protection</p>
            <p className="type-small">
              To limit automated submissions, the server briefly uses a one-way hash of your connection address. The
              address itself is not stored or emailed.
            </p>
          </li>
          <li className="py-4">
            <p className="font-medium">Cookies and analytics</p>
            <p className="type-small">This website does not currently set cookies or use analytics.</p>
          </li>
          <li className="py-4">
            <p className="font-medium">Fonts</p>
            <p className="type-small">Fonts are served from this website, so no request is made to a font provider.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
