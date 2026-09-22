/**
 * /legal. The short page that the other two do not have a home for:
 * who runs this, the accessibility position, and the third-party names.
 */
import type { Metadata } from "next";
import Legal, { type Section } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Legal and accessibility | PIDA",
  description:
    "Who runs this site, where it stands on accessibility, and whose names appear on it.",
  openGraph: {
    siteName: "PIDA",
    type: "website",
    title: "Legal and accessibility | PIDA",
    description:
      "Who runs this site, where it stands on accessibility, and whose names appear on it.",
  },
};

const SECTIONS: Section[] = [
  {
    h: "Who runs this",
    body: [
      "PIDA is a small team building process design automation for pharmaceutical plants. The product is not released. This site exists to describe what is being built and to let people ask about it.",
    ],
  },
  {
    h: "Accessibility",
    body: [
      "We build this site to be usable with a keyboard, with a screen reader, at high zoom, and with animation turned off. Every moving thing on the site stops when your system is set to reduce motion, and nothing on it depends on colour alone to make sense.",
      "We aim at WCAG 2.2 AA. We are not claiming a perfect score. If something here is hard to use, tell us what it was and what you were using, and we will fix it rather than argue about which level it falls under.",
    ],
  },
  {
    h: "Names that are not ours",
    body: [
      "Standards, guidelines, file formats and software named anywhere on this site belong to whoever publishes them. They are mentioned so engineers know what we work with. None of them are affiliated with PIDA and none of them have endorsed it.",
    ],
  },
  {
    h: "Copyright",
    body: [
      "The words, drawings, code and design on this site are ours unless stated otherwise. If you think something here infringes your copyright, tell us what and where, and we will take it down while we look at it.",
    ],
  },
];

export default function LegalPage() {
  return (
    <Legal
      eyebrow="Legal"
      title="Legal and accessibility."
      updated="22 September 2026"
      intro="The short page. Who is behind this site, how we try to make it usable, and whose names appear on it."
      sections={SECTIONS}
    />
  );
}
