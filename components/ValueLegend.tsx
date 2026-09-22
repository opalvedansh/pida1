/**
 * Value legend, A3.5. Four chips built as a real interface element, reused in
 * the trust block (A3.10, card 3).
 *
 * The four states differ by fill and outline, not by hue alone, so they
 * survive greyscale printing (A3.5). Amber is not used here, because amber is
 * for dark bands only (0.4).
 */
import styles from "./ValueLegend.module.css";

export default function ValueLegend({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`${styles.legend} ${compact ? styles.compact : ""}`}>
      <li className={`${styles.chip} ${styles.given}`} data-pida="chip">
        Given
      </li>
      <li className={`${styles.chip} ${styles.sourced}`} data-pida="chip">
        Sourced
        <sup aria-hidden="true">1</sup>
      </li>
      <li className={`${styles.chip} ${styles.assumed}`} data-pida="chip">
        Assumed
      </li>
      <li className={`${styles.chip} ${styles.empty}`} data-pida="chip">
        Empty
      </li>
    </ul>
  );
}
