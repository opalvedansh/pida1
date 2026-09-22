/**
 * One plate, printed large and held still.
 *
 * A working surface, not part of the landing page's block order: it exists so
 * the engraving can be judged on its own, at a size where the line weights and
 * the cold-to-hot transition are actually visible.
 *
 * Server Component, as /anatomy is. Three.js is imported from inside the
 * client component's effect, so nothing here pulls it into the shared bundle.
 */
import type { Metadata } from "next";
import PlateStudy from "@/components/anatomy/PlateStudy";

export const metadata: Metadata = {
  title: "PIDA | Plate study",
  description: "One engraved plate, on its own, for judging the drawing.",
  robots: { index: false, follow: false },
};

export default function PlatePage() {
  return <PlateStudy />;
}
