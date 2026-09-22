/**
 * The one template behind the small pages: /privacy, /legal, /trial,
 * /trial/welcome, /trial/error and /404 (A6.16, C6.4).
 *
 * Paper band, full height, the same bar and footer as the home page. One
 * left-aligned column: it starts at column 3 and spans 7 from 1024px, or 5 on
 * the three sign-up pages, and is full width below that. A mono eyebrow, then
 * exactly one h1 at the H2 scale of A6.4 (`display-l`), then the content.
 *
 * It carries id="top" so the skip link of A7.9 lands on the same target here
 * as it does on the home page.
 *
 * A Server Component: phase 1 ships no client JavaScript (C14).
 */
import styles from "./PlainPage.module.css";

type Props = {
  /** Mono eyebrow above the h1. Omitted where the page carries no header. */
  eyebrow?: string;
  /** The one h1 of the page. */
  title: string;
  /** Sign-up pages take the narrower 5-column measure (A6.16). */
  width?: "text" | "signup";
  /** Keep the h1 in the document but out of the page. */
  quiet?: boolean;
  children: React.ReactNode;
};

export default function PlainPage({
  eyebrow,
  title,
  width = "text",
  quiet = false,
  children,
}: Props) {
  return (
    <section
      id="top"
      className={`${styles.page} band`}
      data-theme="paper"
      data-accent="cobalt"
    >
      <div className="container">
        <div className="grid">
          <div
            className={`${styles.column} ${
              width === "signup" ? styles.signup : styles.text
            }`}
          >
            {eyebrow && (
              <p className={`mono-label ${styles.eyebrow}`}>{eyebrow}</p>
            )}
            <h1 className={quiet ? "visually-hidden" : "display-l"}>{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
