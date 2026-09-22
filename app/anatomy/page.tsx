/**
 * The sheet, exploded.
 *
 * A standalone route, not part of the landing page's block order. It exists
 * to show one thing: that the printed sheet, the routed model, the flow
 * paths and the P&ID underneath them are four faces of one artifact rather
 * than four files that have to be kept in step.
 *
 * It is a Server Component. The scene and the scroll binding are the one
 * Client Component below it, and Three.js is imported from inside that
 * component's effect, so this route is the only one on the site that ever
 * downloads it.
 */
import type { Metadata } from "next";
import Anatomy from "@/components/anatomy/Anatomy";

export const metadata: Metadata = {
  title: "PIDA | One sheet, four layers",
  description:
    "The printed sheet, the routed model, the flow paths and the P&ID underneath them are one artifact, not four files kept in step by hand.",
  openGraph: {
    siteName: "PIDA",
    type: "website",
    title: "One sheet, four layers",
    description:
      "The printed sheet, the routed model, the flow paths and the P&ID underneath them are one artifact.",
  },
};

export default function AnatomyPage() {
  return <Anatomy />;
}
