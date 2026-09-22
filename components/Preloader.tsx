/**
 * The preloader.
 *
 * A near-black plate over the page while it settles: the wordmark assembles
 * out of four scattered letters, a rule draws under it, one line of mono
 * names the product, and the plate lifts off the top of the screen.
 *
 * IT IS CSS AND NOTHING ELSE, ON PURPOSE
 *
 * A preloader driven by JavaScript is a plate that covers the site until a
 * script says otherwise, and the one thing that must never happen is that
 * the script does not run and the plate stays. So this is a Server Component
 * with no client code at all: the markup is in the first response and a set
 * of keyframes with `forwards` fill takes it off again. There is no state in
 * which it survives past its own timeline.
 *
 * It is also inert from the first frame: `pointer-events: none` throughout,
 * `aria-hidden`, nothing focusable inside it, and it ends at
 * `visibility: hidden`. It cannot take a click, trap a tab or be read out.
 *
 * WHAT IT COSTS
 *
 * About 1.5 seconds, once per full page load. Client-side navigation does
 * not re-run it, because the layout this sits in is not re-mounted.
 *
 * C7.4: under reduced motion it is not displayed at all. A reader who asked
 * for less motion should not be shown an animation before the page they
 * came for, and skipping it costs them nothing, since it carries no
 * information the site does not then state.
 */
import styles from "./Preloader.module.css";

/** The wordmark, one element per letter so each can arrive on its own. */
const LETTERS = ["P", "I", "D", "A"];

export default function Preloader() {
  return (
    <div className={styles.plate} aria-hidden="true">
      <div className={styles.lockup}>
        <p className={styles.word}>
          {LETTERS.map((l, i) => (
            <span key={l} className={styles.letter} data-i={i}>
              {l}
            </span>
          ))}
        </p>

        {/* The rule under the wordmark, drawn rather than faded, which is
            the same figure the title block on every sheet in this site
            carries. */}
        <span className={styles.rule} />

        <p className={styles.line}>Pharma industry design automation</p>
      </div>
    </div>
  );
}
