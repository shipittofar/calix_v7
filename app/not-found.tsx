import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-calix grid-calix pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="col-span-4 md:col-span-7 lg:col-span-7">
        <h1>This page does not exist.</h1>
        <p className="type-lead mt-6 measure">It may have moved, or the address may be mistyped.</p>
        <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/" className="link">
            Go to the home page
          </Link>
          <Link href="/#services" className="link">
            See our services
          </Link>
          <Link href="/contact" className="link">
            Start a Project
          </Link>
        </p>
      </div>
    </div>
  );
}
