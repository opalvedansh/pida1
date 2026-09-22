/**
 * Hero.
 *
 * Built to the reference hero at memorable.sh: one full-bleed near-black
 * pane, the copy anchored hard to the top left rather than centred, and the
 * product artefact arriving out of a 3D zoom as the reader scrolls.
 *
 * THE COMPOSITION
 *
 * Two layers share one pinned viewport. The sheet starts oversized, tilted
 * and dim, sitting behind the copy so the first frame is a drawing out of
 * focus rather than an empty black box. As the reader scrolls it settles to
 * its rest size while the copy dollies past the camera and fades out. One
 * move, and it is motivated: the claim is stated, then the artefact that has
 * to back it fills the screen.
 *
 * WHAT IS NOT COPIED FROM THE REFERENCE
 *
 * The reference is pure #000 and sets a 4px radius. Both are refused here:
 * tokens.css forbids pure black (it flattens every edge on the page) and the
 * page has one radius scale that the rest of the sections already use.
 *
 * The reference carries a fifth text element under its buttons, a "Live on"
 * row of repository links. It is dropped. Four text elements is the cap for
 * a hero and this one already spends them on the audience line, the heading,
 * the claim and the actions.
 *
 * STILL FOUR TEXT ELEMENTS AND NO MORE: the audience line, the H1, one line
 * of subtext, the actions. The two speed claims are written in exactly the
 * words of rule 7. Nothing on the page times them.
 *
 * "See what it makes" is a jump, not a second conversion. It sends no
 * cta_click, so the page still carries exactly one conversion label.
 *
 * This stays a Server Component. The layers are annotated with data-pida-*
 * and driven from components/motion/heroStage.ts, which is also the only
 * thing that turns the pinned stage on: with the script absent, with
 * JavaScript off, or under reduced motion, the section is a plain stacked
 * hero with the sheet sitting under the copy and nothing hidden.
 */
import { ArrowDownIcon, CrosshairSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import MediaPlaceholder from "./MediaPlaceholder";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.stage} data-pida-hero-stage="off">
      <div className={styles.viewport}>
        <section id="top" className={styles.copyLayer} data-pida-hero-copy>
          <div className={styles.copy}>
            <p className="eyebrow" data-pida-hero-intro>
              <CrosshairSimpleIcon size={14} weight="bold" aria-hidden="true" />
              Built for pharma process engineers
            </p>

            <h1 className={`wash ${styles.headline}`} data-pida-hero-intro>
              Pharma process design,
              <br className={styles.headlineBreak} />{" "}
              <span className="accent-word">reimagined</span>.
            </h1>

            <p className={styles.sub} data-pida-hero-intro>
              A P&amp;ID in 30 seconds. A hydraulic model in under a minute.
              Every value traceable to its source.
            </p>

            <div className={styles.actions} data-pida-hero-intro>
              <a
                className="btn btn-action btn-block-sm"
                href="/trial"
                data-pida="cta"
              >
                Sign up for trial
              </a>

              <a
                className={`btn btn-quiet btn-block-sm ${styles.ghost}`}
                href="#pid-making"
              >
                See what it makes
                <ArrowDownIcon size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* The scrim sits between the two layers: it darkens the bottom of
            the sheet so the copy stays legible over it at rest, and it hands
            the pane off to the band below without ending on a hard line. */}
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.sheetLayer} data-pida-hero-sheet>
          <div className={styles.bezel}>
            <MediaPlaceholder
              id="M2"
              file="pida-generated-pid-r101.png"
              strip="PIDA / Sheet R-101"
              ratio="4 / 3"
              caption=""
              alt="A generated P&ID sheet for reactor R-101: a reactor with a spark filter train, instruments, valves and a title block."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
