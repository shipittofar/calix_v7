import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Fact } from "@/components/ui/Pending";
import { TrackSubmission } from "@/components/analytics/TrackSubmission";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Thank you",
  description: "Your project brief has been received.",
  noindex: true,
  follow: false,
});

export default function ThankYouPage() {
  return (
    <div className="container-calix grid-calix pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="col-span-4 md:col-span-7 lg:col-span-7">
        <TrackSubmission />
        <h1>Thank you. Your brief is with us.</h1>
        <p className="type-lead mt-6 measure">
          <Fact
            value={site.replyTime}
            render={(v) => <>We will reply within {v} with next steps.</>}
            fallback="We will reply with next steps."
          /> If we are a good fit, the next step is a short introductory call.
        </p>
        <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/#process" className="link">
            See how we work
          </Link>
          <Link href="/" className="link">
            Back to the home page
          </Link>
        </p>
      </div>
    </div>
  );
}
