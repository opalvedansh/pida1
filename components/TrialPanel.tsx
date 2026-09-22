/**
 * TrialPanel: the content of /trial (C3.6, words final in A7.2).
 *
 * The two sign-in buttons are the one place on the site where a sign-in
 * provider may be named (0.1, exemption (a)). Their labels, their marks and
 * their colours follow each provider's own brand rules, which is why the two
 * colour values in the style sheet sit outside the token palette of C4.1.
 * Before launch: replace the two marks with each provider's official asset
 * and confirm that the second provider's rules permit the label written here;
 * if they do not, use their stock wording (0.4, A6.8).
 *
 * The buttons are plain <a> elements, so the page works with JavaScript off
 * and the browser leaves the page at once: no working state, no spinner and
 * no pop-up (A7.2). There is no checkbox, no email field and no password
 * field.
 *
 * Phase 2 adds one small script (C3.6): it copies utm_source, utm_medium and
 * utm_campaign from the page URL onto the two addresses, sends
 * signup_start {provider} on press, and swaps the panel for the withdrawal
 * view of A7.5 on ?state=withdrawn. It reads the provider from
 * data-provider, so no provider name is ever written in the script.
 *
 * Nothing here says what the trial delivers, how long it lasts or when the
 * person will hear back: that decision is open (0.6, D1).
 */
import styles from "./TrialPanel.module.css";

type Props = {
  /** Where the first provider button goes (C3.6). */
  googleHref: string;
  /** Where the second provider button goes (C3.6). */
  linkedinHref: string;
};

export default function TrialPanel({ googleHref, linkedinHref }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.buttons} data-pida="provider-group">
        <a
          className={styles.provider}
          href={googleHref}
          data-pida="provider"
          data-provider="google"
        >
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 48 48" width="20" height="20" focusable="false">
              <path
                fill="#ea4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285f4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#fbbc05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.97-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34a853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
          </span>
          Continue with Google
        </a>

        <a
          className={styles.provider}
          href={linkedinHref}
          data-pida="provider"
          data-provider="linkedin"
        >
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
              <rect width="24" height="24" rx="2" fill="#ffffff" />
              <path
                fill="#0a66c2"
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45z"
              />
            </svg>
          </span>
          Continue with LinkedIn
        </a>
      </div>

    </div>
  );
}
