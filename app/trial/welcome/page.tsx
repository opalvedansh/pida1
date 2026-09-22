/**
 * /trial/welcome. Where a provider hands the visitor back.
 *
 * Not indexed: it is the far side of a sign-in, it says nothing a search
 * result should carry, and half the time it is reached with an access token
 * in the fragment.
 *
 * A Server Component holding one Client Component, so the metadata below can
 * exist. The reading of the fragment is in components/Welcome.tsx.
 */
import type { Metadata } from "next";
import PlainPage from "@/components/PlainPage";
import Welcome from "@/components/Welcome";

export const metadata: Metadata = {
  title: "You are on the list | PIDA",
  description: "Early access sign-up confirmed.",
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return (
    <PlainPage eyebrow="Early access" title="You are on the list." width="signup" quiet>
      <Welcome />
    </PlainPage>
  );
}
