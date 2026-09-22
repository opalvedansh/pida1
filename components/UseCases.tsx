/**
 * Use cases. The capabilities that are not the generator.
 *
 * WHY THIS IS NO LONGER A BENTO
 *
 * It was three cells on one fill, and all three were --pida-bg-raised, so
 * the section read as three identical boxes with a hole in the first row.
 * The boxes are gone. Each capability is a full-width plate, divided from
 * the next by a hairline rather than boxed away from it, which is how the
 * rest of the page separates things. No cell can now be short next to a tall
 * one, because no two cells share a row.
 *
 * THE CONNECTIVITY PLATE IS GONE
 *
 * It carried the one asset on the page that was a recording rather than a
 * still, and the recording does not exist. Its room goes to the two solver
 * stills the hydraulics plate always wanted (M6 and M7 of 0.3). The
 * capability itself is untouched and still listed in Pricing.tsx; only the
 * plate that showed an empty video frame has been taken out.
 *
 * WHAT IS IN IT
 *
 * Two frames and nothing else: the model being built on the left, the same
 * model open in the solver on the right. The value plate that used to sit
 * under them, 46 squares with a legend and a caption, was a placeholder and
 * is gone. If a figure returns here it should be one measured off a run, not
 * a chart of one screen's worth of fields.
 *
 * /#hydraulics still lands. /#connectivity and /#answers no longer do: the
 * connectivity plate showed a recording that does not exist, and the
 * Engineer is now the fourth of the four tools in the rail above.
 */
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";
import Media from "./Media";
import styles from "./UseCases.module.css";

export default function UseCases() {
  return (
    <section id="use-cases" className={`${styles.section} band`}>
      <div className="container">
        <header className={styles.head}>
          <h2 className="display-l wash" data-pida-reveal="text">
            Hydraulics,
            <br />
            <span className="accent-word">automated</span>.
          </h2>

          <p
            className={`sub-headline ${styles.headSub}`}
            data-pida-reveal="text"
          >
            A model built in under a minute, and compatible with the
            industrial software already in use, AFT Fathom among them.
          </p>
        </header>

        {/* --------------------------------------------------- hydraulics */}
        <article id="hydraulics" className={styles.plate} data-pida="card">
          {/* Left, the model being built. Right, the same model open in
              the solver. They are one statement in two frames, which is why
              they share a row rather than following each other down. */}
          <div className={styles.pair}>
            <div className={styles.figure} data-pida-reveal="media">
              <Media
                src="/media/pida-hydraulic-automation.png"
                ratio="197 / 100"
                strip="PIDA / Hydraulic modeller"
                alt="The hydraulic modeller: seven steps down the left, the clean-in-place circuit drawn live beside them, and the Engineer panel filling the usual values with citations."
              />
            </div>
            <div className={styles.figure} data-pida-reveal="media">
              <Media
                src="/media/pida-hydraulic-model-solved.png"
                ratio="197 / 100"
                strip="AFT Fathom / The same model"
                alt="The same model opened in AFT Fathom, its junctions and pipes laid out and ready to run, with nothing rebuilt by hand."
              />
            </div>
          </div>

        </article>

      </div>
    </section>
  );
}
