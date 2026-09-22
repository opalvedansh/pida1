/**
 * Final call to action. Full width, at least 60vh from 1024px. The reference
 * closes on a short two-word heading with the accent word on its own line,
 * and that is the shape used here.
 *
 * "Reimagined" is allowed in the H1, the section titles, the final call to
 * action and the title tag, and nowhere else.
 *
 * The contact line needs the role-based address of D4. It is unanswered, so
 * the line is omitted. Do not invent an address and do not use a personal
 * one.
 *
 * The two provider-branded buttons are not shown here. They appear on /trial
 * only.
 */
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section id="trial" className={`${styles.final} band`}>
      <div className={`container ${styles.inner}`} data-pida-reveal="text">
        <h2 className={`display-xl wash ${styles.heading}`}>
          Stop redrawing
          <br />
          the <span className="accent-word">same</span> sheet.
        </h2>

        <p className={`sub-headline ${styles.sub}`}>
          A P&amp;ID in 30 seconds. A hydraulic model in under a minute. Every
          value traceable to its source.
        </p>

        <a
          className={`btn btn-action btn-block-sm ${styles.cta}`}
          href="/trial"
          data-pida="cta"
        >
          Sign up for trial
        </a>

        <p className={`mono-label ${styles.note}`}>
          No password to create / Your documents stay yours
        </p>
      </div>
    </section>
  );
}
