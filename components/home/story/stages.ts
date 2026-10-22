import type { StaticImageData } from "next/image";
import plaza from "@/assets/story/stage-01-plaza.jpg";
import hand from "@/assets/story/stage-02-hand.jpg";
import planting from "@/assets/story/stage-03-planting.jpg";
import soil from "@/assets/story/stage-04-soil.jpg";
import tending from "@/assets/story/stage-05-tending.jpg";
import fruit from "@/assets/story/stage-06-fruit.jpg";
import harvest from "@/assets/story/stage-07-harvest.jpg";
import terrace from "@/assets/story/stage-08-terrace.jpg";
import grove from "@/assets/story/stage-08-grove.jpg";

export type Shot = {
  image: StaticImageData;
  alt: string;
  /** Stage 4 only: the static layout shows the grown sprout over the soil plate. */
  sprout?: boolean;
};

export type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  /** Stage 5: what the cultivation stands for, highlighted one by one. */
  disciplines?: string[];
  /** Stage 7: the two systems behind the outcome, kept distinct. */
  systems?: { term: string; name: string; text: string }[];
  shots: Shot[];
};

/**
 * The eight stages of "From one seed to an entire ecosystem": their words and photographs. The
 * last stage holds two photographs (the terrace, then the grove from above). How the camera moves
 * through them is in film.ts.
 */
export const stages: Stage[] = [
  {
    id: "idea",
    label: "The idea",
    title: "It starts at the desk.",
    body: "An ordinary morning in a busy square. A founder with an idea, and the ground beside her already prepared.",
    shots: [
      {
        image: plaza,
        alt: "A founder works on a laptop at a café table in a sunlit stone plaza, beside an empty planter of dark soil.",
      },
    ],
  },
  {
    id: "decision",
    label: "The decision",
    title: "One idea, chosen.",
    body: "Before any design or code comes a decision about what the brand stands for. Small enough to hold in one hand.",
    shots: [
      {
        image: hand,
        alt: "Close view of the founder looking down at her open hand beside the laptop. A single olive pit rests in her palm.",
      },
    ],
  },
  {
    id: "foundation",
    label: "The foundation",
    title: "Planted with intent.",
    body: "Strategy is the ground a brand grows from: who it serves, what it promises and how it speaks.",
    shots: [
      {
        image: planting,
        alt: "The founder sits on the edge of the planter and presses the olive pit into the soil, her laptop open on the table behind her.",
      },
    ],
  },
  {
    id: "first-signs",
    label: "The first signs",
    title: "Something takes root.",
    body: "A name, a mark, a first page. Small and early, and already recognisably itself.",
    shots: [
      {
        image: soil,
        alt: "Soil-level view of the planter: a young olive sprout with silver-green leaves, the founder working at her laptop out of focus behind it.",
        sprout: true,
      },
    ],
  },
  {
    id: "cultivation",
    label: "Cultivation",
    title: "Tended, every day.",
    body: "Growth is steady work, done in parallel and kept in one direction:",
    disciplines: ["Strategy", "Brand identity", "Web design and development", "SEO", "GEO", "Content", "Digital marketing"],
    shots: [
      {
        image: tending,
        alt: "The founder works at her laptop beside the planter, where the olive is now a young sapling. A brass watering can stands on the planter's edge.",
      },
    ],
  },
  {
    id: "progress",
    label: "Visible progress",
    title: "The work begins to show.",
    body: "Visits that stay, pages that are found, enquiries that arrive: progress you can measure, season by season.",
    shots: [
      {
        image: fruit,
        alt: "Seasons later, the founder stands beside a young olive tree in a stone planter and looks up at its first olives.",
      },
    ],
  },
  {
    id: "outcomes",
    label: "Real outcomes",
    title: "The harvest.",
    body: "Qualified enquiries that become conversations, then clients. Two separate systems keep the harvest working:",
    systems: [
      {
        term: "CMS",
        name: "Content management system",
        text: "Where your team edits the website's pages, articles and offers.",
      },
      {
        term: "CRM",
        name: "Customer relationship management",
        text: "Where every enquiry, contact and follow-up is recorded.",
      },
    ],
    shots: [
      {
        image: harvest,
        alt: "People gather olives from trees in stone planters into woven baskets. The founder stands by her laptop, holding a handful of olives.",
      },
    ],
  },
  {
    id: "ecosystem",
    label: "The ecosystem",
    title: "An entire ecosystem.",
    body: "Each season builds on the last. Content keeps earning, a reputation compounds, and the business grows from its own roots.",
    shots: [
      {
        image: terrace,
        alt: "From high above the terrace, the founder works at her table beside the olive tree, with terraced hillsides of olive trees beyond.",
      },
      {
        image: grove,
        alt: "Overhead view: the stone terrace and its olive tree at the centre of a large grove, with people harvesting between the rows.",
      },
    ],
  },
];

/** The sprout layer of stage 4, positioned in fractions of the 2752×1536 frame (prepare_story_assets.py). */
export const SPROUT = { left: 46.984, top: 62.956, width: 6.541, origin: "53.9% 97%" } as const;
