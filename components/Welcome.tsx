"use client";

/**
 * What the visitor sees when a provider hands them back.
 *
 * Supabase has already done the work by the time this renders: the person
 * exists in auth.users and the founders can read the list in the dashboard.
 * Nothing here has to create anything, hold a session, or call an API. A
 * marketing page has nobody to be logged in as.
 *
 * So this does two things.
 *
 * It reads the outcome. Supabase returns it in the URL fragment, which never
 * leaves the browser: `#access_token=...` when it worked, `#error=...` with
 * `error_description` when it did not. A refused consent screen is the
 * common case and deserves a sentence rather than a blank page.
 *
 * And it clears the fragment. An access token sitting in the address bar
 * gets copied into chat windows, pasted into tickets and read over
 * shoulders. history.replaceState takes it out without adding an entry, so
 * Back still goes where the visitor expects.
 */
import { useEffect, useState } from "react";
import styles from "./Welcome.module.css";

type Outcome = "waiting" | "in" | "refused";

export default function Welcome() {
  const [outcome, setOutcome] = useState<Outcome>("waiting");
  const [why, setWhy] = useState("");

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const error = hash.get("error_description") || hash.get("error");

    if (error) {
      setWhy(error.replace(/\+/g, " "));
      setOutcome("refused");
    } else if (hash.get("access_token")) {
      setOutcome("in");
    } else {
      /* No fragment at all: someone typed the address, or came back to it
         later after it was cleared. Treat that as arrived rather than
         failed, because by then it almost certainly was. */
      setOutcome("in");
    }

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  if (outcome === "waiting") {
    /* One frame, before the effect runs. Reserving the space stops the page
       jumping as the answer arrives. */
    return <p className={styles.quiet}>One moment.</p>;
  }

  if (outcome === "refused") {
    return (
      <div className={styles.block}>
        <p className={styles.lede}>That did not go through.</p>
        <p className={styles.body}>
          {why || "The sign-in was cancelled before it finished."} Nothing was
          saved. You can try again whenever you like.
        </p>
        <a className="btn btn-primary" href="/trial">
          Try again
        </a>
      </div>
    );
  }

  return (
    <div className={styles.block}>
      <p className={styles.lede}>You are on the list.</p>
      <p className={styles.body}>
        We will write to you at the address you signed up with when early
        access opens. Nothing else happens in the meantime, and there is
        nothing to install.
      </p>
      <a className="btn btn-quiet" href="/">
        Back to the home page
      </a>
    </div>
  );
}
