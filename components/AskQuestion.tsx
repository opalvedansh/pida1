"use client";

/**
 * Ask your own question. Sits at the foot of the FAQ list.
 *
 * WHY IT IS A REAL FORM AND NOT A FETCH
 *
 * The element is an ordinary <form> with an action and a method, so with
 * JavaScript off the browser posts it itself and the visitor's question
 * still arrives. That is the same decision TrialPanel makes about its two
 * buttons: the plain element first, the script only as an improvement on
 * top of it.
 *
 * With the script running the submit is intercepted so the visitor stays on
 * the page and gets a confirmation in place, and so a failure can say so
 * instead of stranding them on an endpoint's own error page. The body is
 * url-encoded either way, so the endpoint sees one shape of request whether
 * the script ran or not.
 *
 * WHAT IT DOES NOT SAY
 *
 * Nothing about how long a reply takes. D1 is open and the site may not
 * state a duration or a delivery time anywhere, so this says who the
 * question reaches and what the address is used for, and stops there.
 *
 * STATES
 *
 * idle, sending, sent, failed. The failed state keeps what was typed, says
 * the send failed rather than blaming the visitor, and retries on the next
 * press.
 *
 * WHY THE RETRY IS NOT A NATIVE SUBMIT
 *
 * It used to be: a second press deliberately skipped preventDefault so the
 * browser would post the form the ordinary way. That was wrong twice over.
 * The endpoint that had just failed a fetch was not going to accept a
 * navigation either, so the visitor was thrown onto a browser error page
 * with their question gone, which is measurably worse than staying here with
 * it still in the box. And it was the one path in the component that let a
 * real form submission reach the App Router, which is the only plausible way
 * anything here could dispatch a router action.
 *
 * So the script now always cancels the submit. The action and method below
 * are still real and still correct, because with the script absent this
 * handler never runs and the browser posts the form itself.
 */
import { useRef, useState } from "react";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { askEndpoint } from "@/lib/ask";
import styles from "./AskQuestion.module.css";

type State = "idle" | "sending" | "sent" | "failed";

export default function AskQuestion() {
  const [state, setState] = useState<State>("idle");
  const done = useRef<HTMLParagraphElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;

    /* Always. See "WHY THE RETRY IS NOT A NATIVE SUBMIT" above: letting one
       through strands the visitor on a browser error page and is the only
       way a form submission here could reach the router. */
    event.preventDefault();
    setState("sending");

    try {
      const res = await fetch(askEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams(
          Array.from(new FormData(form), ([k, v]) => [k, String(v)])
        ),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
      /* Move the reader to the confirmation: the form they were in has just
         been replaced, so focus would otherwise fall back to the body. */
      requestAnimationFrame(() => done.current?.focus());
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className={styles.ask}>
        <p
          ref={done}
          className={styles.sent}
          tabIndex={-1}
          role="status"
          data-pida-reveal="text"
        >
          <span className={styles.sentMark} aria-hidden="true" />
          That reached us. We will reply to the address you gave.
        </p>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setState("idle")}
        >
          Ask another
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.ask}
      action={askEndpoint}
      method="post"
      onSubmit={onSubmit}
    >
      {/* No heading of its own. It used to read "Not on the list?", which
          stopped meaning anything when the six written answers were removed
          and this became the whole of the section. The section's own heading
          asks for the question; this only has to say where it goes. */}
      <p className={styles.lede}>
        Your question reaches the team, and your address is used to reply to
        it and nothing else.
      </p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="ask-question">
          Your question
        </label>
        <textarea
          id="ask-question"
          name="question"
          className={styles.textarea}
          rows={4}
          required
          maxLength={1200}
          disabled={state === "sending"}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="ask-email">
          Where to reply
        </label>
        <input
          id="ask-email"
          name="email"
          type="email"
          className={styles.input}
          autoComplete="email"
          required
          aria-describedby="ask-privacy"
          disabled={state === "sending"}
        />
        <p id="ask-privacy" className={styles.help}>
          We keep it only to answer you. See the{" "}
          <a className="link" href="/privacy">
            Privacy notice
          </a>
          .
        </p>
      </div>

      {/* Which surface the question came from, for whoever reads them. */}
      <input type="hidden" name="source" value="faq" />

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
              : "Send question"}
          <PaperPlaneTiltIcon size={15} weight="bold" aria-hidden="true" />
        </button>
      </div>

      {/* One live region for both states, so a screen reader is told once. */}
      <p className={styles.status} role="status" aria-live="polite">
        {state === "failed"
          ? "That did not send, and your question is still here. Check your connection and try again."
          : ""}
      </p>
    </form>
  );
}
