"use client";

/**
 * The other way onto the list: a name, an address, and no account.
 *
 * The Google button beside this one is fine for people who have a Google
 * account and are willing to use it here. Plenty of engineers at plant
 * operators and EPCs are neither, and a sign-up page with one provider on it
 * turns all of them away. This is the same ask with nothing in the middle.
 *
 * WHY IT LOOKS LIKE ASKQUESTION
 *
 * Because it is the same thing. Two fields, one insert through PostgREST,
 * the same four states, the same live region. It imports AskQuestion's
 * stylesheet rather than carrying a copy: they are the only two forms on the
 * site and they are meant to be indistinguishable, so one of them should own
 * the styles and the other should use them.
 *
 * It does NOT go through Supabase Auth. auth.users is for accounts, and
 * there is no account here: no password, no verification, nothing to sign in
 * to. A row in public.signups is what this is, and it is what the founders
 * will read. The cost is two lists rather than one, which is a dashboard
 * query, not a design problem.
 */
import { useRef, useState } from "react";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { supabaseHeaders, supabaseUrl } from "@/lib/supabase";
import { askHeaders } from "@/lib/ask";
import styles from "./AskQuestion.module.css";

type State = "idle" | "sending" | "sent" | "failed";

const endpoint = `${supabaseUrl}/rest/v1/signups`;

export default function EarlyAccessForm() {
  const [state, setState] = useState<State>("idle");
  const done = useRef<HTMLParagraphElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    event.preventDefault();
    setState("sending");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { ...supabaseHeaders, ...askHeaders },
        body: JSON.stringify(
          Object.fromEntries(
            Array.from(new FormData(form), ([k, v]) => [k, String(v)])
          )
        ),
      });
      /* 409 is the unique index on email doing its job. Someone signing up
         twice has not made a mistake and should not be told they have: they
         are on the list, which is what they wanted to hear. */
      if (!res.ok && res.status !== 409) throw new Error(String(res.status));
      form.reset();
      setState("sent");
      requestAnimationFrame(() => done.current?.focus());
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className={styles.ask}>
        <p ref={done} className={styles.sent} tabIndex={-1} role="status">
          <span className={styles.sentMark} aria-hidden="true" />
          You are on the list. We will write to you when early access opens.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.ask} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="ea-name">
          Your name
        </label>
        <input
          id="ea-name"
          name="name"
          type="text"
          className={styles.input}
          autoComplete="name"
          required
          maxLength={120}
          disabled={state === "sending"}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="ea-email">
          Work email
        </label>
        <input
          id="ea-email"
          name="email"
          type="email"
          className={styles.input}
          autoComplete="email"
          required
          maxLength={320}
          disabled={state === "sending"}
        />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className="btn btn-action btn-block-sm"
          disabled={state === "sending"}
        >
          {state === "sending"
            ? "Sending"
            : state === "failed"
              ? "Try again"
              : "Join the list"}
          <PaperPlaneTiltIcon size={15} weight="bold" aria-hidden="true" />
        </button>
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        {state === "failed" && "That did not send. Please try again."}
      </p>
    </form>
  );
}
