/**
 * /trial, the sign-up page. Words final in A7.2, layout in A6.16 and C6.4,
 * panel in C3.6.
 *
 * A page and not a modal, one action, two providers, one consent line and no
 * checkbox (0.4). It is indexable. Nothing here says what the trial
 * delivers, how long it lasts or when the person hears back (0.6, D1).
 *
 * A Server Component: phase 1 ships no client JavaScript (C14).
 */
import type { Metadata } from "next";
import PlainPage from "@/components/PlainPage";
import TrialPanel from "@/components/TrialPanel";
import { signupHref } from "@/lib/signup";
import styles from "./page.module.css";

export const metadata: Metadata = {
  // A7.2 fixes the title. The description is B15.1. Outside the two button
  // labels, nothing on this page or in its metadata names a sign-in provider.
  title: "Sign up for early access | PIDA",
  description: "Sign up for a PIDA trial with an account you already have.",
  openGraph: {
    siteName: "PIDA",
    type: "website",
    title: "Sign up for early access | PIDA",
    description: "Sign up for a PIDA trial with an account you already have.",
  },
};

export default function Trial() {
  return (
    <PlainPage title="Sign up for early access" width="signup" quiet>
      <TrialPanel
        googleHref={signupHref("google")}
        linkedinHref={signupHref("linkedin")}
      />

      <p className={styles.back}>
        <a className="link" href="/">
          Back to the home page
        </a>
      </p>
    </PlainPage>
  );
}
