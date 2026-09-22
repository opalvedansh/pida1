/**
 * /privacy. Linked from the menu and from anywhere that asks for an address.
 *
 * Kept short on purpose. There is no product yet, so there is very little to
 * hold and almost nothing to say about it, and a long notice describing data
 * we do not collect would be worse than a short one describing what we do.
 */
import type { Metadata } from "next";
import Legal, { type Section } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Privacy | PIDA",
  description: "What PIDA collects, why, and how to ask us to delete it.",
  openGraph: {
    siteName: "PIDA",
    type: "website",
    title: "Privacy | PIDA",
    description: "What PIDA collects, why, and how to ask us to delete it.",
  },
};

const SECTIONS: Section[] = [
  {
    h: "What we collect",
    body: [
      "Only what you hand us, plus the ordinary records a website keeps in order to work.",
      [
        "If you sign up for early access: your name and email address, from the account you choose to sign up with.",
        "If you send us a question: the question, and the address you want the answer sent to.",
        "Whenever anyone visits: standard server records such as the page requested, the time, and a general idea of where in the world the request came from.",
      ],
      "We do not ask for anything else, and there is nothing else on this site that collects anything.",
    ],
  },
  {
    h: "Why we have it",
    body: [
      "To answer you, to let you know when early access opens, and to keep the site running and reasonably secure. That is the whole list.",
      "We do not sell it, rent it, or hand it to anyone for advertising.",
    ],
  },
  {
    h: "Who else sees it",
    body: [
      "The companies that run the things this site is built on. That means whoever hosts the site, whoever carries our email, and the sign-in service you choose when you sign up. Each of them sees only the part they need to do their job.",
      "We may also share something if we are legally required to.",
    ],
  },
  {
    h: "How long we keep it",
    body: [
      "For as long as it is useful for the reason we took it, and then not much longer. Questions and their answers are kept while the conversation is live and for a reasonable period afterwards. Early access details are kept until the programme ends or you ask us to remove them.",
    ],
  },
  {
    h: "What you can ask for",
    body: [
      "A copy of what we hold, a correction, or deletion. Ask and we will do it. You do not need a reason and there is no form to fill in beyond telling us.",
      "If you are somewhere with its own data protection law, that law applies and the rights it gives you are yours regardless of what this page says.",
    ],
  },
  {
    h: "Cookies",
    body: [
      "We do not use cookies to track you, and there are no advertising or analytics trackers on this site. Anything stored in your browser is there to make the page work, and it stays in your browser.",
    ],
  },
  {
    h: "Changes",
    body: [
      "If this changes we will update the page and the date at the top of it. There is no version history to dig through.",
    ],
  },
];

export default function Privacy() {
  return (
    <Legal
      eyebrow="Privacy"
      title="Privacy."
      updated="22 September 2026"
      intro="PIDA is early software and this is an early site. We collect very little, we use it for the reason you gave it to us, and you can have it back or have it deleted whenever you like."
      sections={SECTIONS}
    />
  );
}
