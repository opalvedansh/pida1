/**
 * What is coming, exploded.
 *
 * A standalone route, not part of the landing page's block order. It exists
 * to show one thing: that the three pieces PIDA does not do yet come out of
 * the model it already builds, rather than being three more files that have
 * to be kept in step.
 *
 * It is a Server Component. The scene and the scroll binding are the one
 * Client Component below it, and Three.js is imported from inside that
 * component's effect, so this route is the only one on the site that ever
 * downloads it.
 */
import type { Metadata } from "next";
import Anatomy from "@/components/anatomy/Anatomy";

export const metadata: Metadata = {
  title: "PIDA | Coming soon",
  description:
    "Three more pieces out of the same model as the drawing: the routed 3D model, relief scenario analysis with PSV calculation, and assisted engineering documentation.",
  openGraph: {
    siteName: "PIDA",
    type: "website",
    title: "Coming soon",
    description:
      "Three more pieces out of the same model as the drawing: the routed 3D model, relief scenario analysis with PSV calculation, and assisted engineering documentation.",
  },
};

export default function AnatomyPage() {
  return <Anatomy />;
}
