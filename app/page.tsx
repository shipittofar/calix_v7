import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Sequence } from "@/components/home/Sequence";
import { StorySlot } from "@/components/home/story/StorySlot";
import { Credibility, FinalCta, Process, SelectedWork } from "@/components/home/HomeSections";

export const metadata: Metadata = pageMetadata({
  title: "CALIX — Brand identity, web design and growth studio",
  absoluteTitle: true,
  description:
    "CALIX connects brand strategy and identity, website design and development, digital marketing, SEO and GEO, and conversion optimisation for growing brands.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* The olive story: renders only in preview builds (next.config.ts, docs/olive-story.md). */}
      <StorySlot />
      <Sequence />
      <SelectedWork />
      <Process />
      <Credibility />
      <FinalCta />
    </>
  );
}
