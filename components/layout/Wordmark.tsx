import Image from "next/image";
import wordmarkEspresso from "@/public/brand/wordmark-espresso.png";
import wordmarkIvory from "@/public/brand/wordmark-ivory.png";

/**
 * The CALIX wordmark, from the founder's artwork (calix-logo skill). Never set
 * "CALIX" in a web font as a stand-in. The PNG includes its own padding; at
 * these heights the letters stay above the 90 px minimum width.
 */
export function Wordmark({
  tone = "espresso",
  heightClass = "h-[34px] lg:h-[40px]",
}: {
  tone?: "espresso" | "ivory";
  heightClass?: string;
}) {
  return (
    <Image
      src={tone === "ivory" ? wordmarkIvory : wordmarkEspresso}
      alt="CALIX"
      sizes="140px"
      loading="eager"
      className={`w-auto ${heightClass}`}
    />
  );
}
