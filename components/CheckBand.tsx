/**
 * The wide band. In the reference this is the "Scale To Infinity" moment: one
 * short heading, one claim, one button, full bleed.
 *
 * Here it carries the claim that earns the rest of the page, which is that
 * the checker is not limited to PIDA's own output, and the compatibility
 * sentence that used to have a band of its own.
 *
 * Compatibility is stated once on the whole site, and this is the place. No
 * logo, product icon or file-type icon here or anywhere else.
 */
import styles from "./CheckBand.module.css";

export default function CheckBand() {
  return (
    <section id="compatibility" className={`${styles.band} band`}>
      <div className={`container ${styles.inner}`}>
        <h2
          className={`display-l wash ${styles.heading}`}
          data-pida-reveal="text"
        >
          Point it at a drawing
          <br />
          it never <span className="accent-word">drew</span>.
        </h2>

        <p className={`sub-headline ${styles.sub}`} data-pida-reveal="text">
          PIDA checks drawings made elsewhere. The checker first proves itself
          on planted defects, then reports its findings with positions and a
          redline, so you can see what it caught and what it missed before you
          trust it with yours.
        </p>

        <a
          className={`btn btn-action btn-block-sm ${styles.cta}`}
          href="/trial"
          data-pida="cta"
        >
          Sign up for trial
        </a>

        <hr className={`rule ${styles.rule}`} />

        <p className={styles.formats}>
          The files PIDA generates open in the standard CAD and
          hydraulic-analysis software engineering teams already use.
        </p>

        {/* The four formats arrive as one pill and separate into four.
            See components/motion/formatSplit.ts.

            .fused is the single outline drawn around the closed run; each
            chip carries its own outline as .skin and a hairline seam on its
            leading edge. At rest .fused and .seam are transparent and .skin
            is opaque, which is the row as it has always looked, so with no
            script and under reduced motion nothing here is mid-transition. */}
        <div className={styles.formatWrap} data-pida-formats>
          <span
            className={styles.fused}
            aria-hidden="true"
            data-pida-formats-fused
          />

          <ul className={styles.formatList}>
            {["DXF", "DEXPI", "PDF", "XLSX"].map((f) => (
              <li
                key={f}
                className={`mono-data ${styles.format}`}
                data-pida-formats-chip
              >
                <span className={styles.skin} aria-hidden="true" />
                <span className={styles.seam} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
