/**
 * Why believe it. In the reference this slot is the security grid: eyebrow,
 * one heading with the accent word, one paragraph, then a two-by-two of
 * short cards with an icon each.
 *
 * Never write that PIDA is compliant, validated or qualified. The body
 * describes the reader's world and then four properties of the software.
 *
 * Determinism is a statement about the drawing. Do not widen it to "files",
 * "outputs" or "results".
 *
 * Both optional notes, the scope line and the 0.265 % proof point, are off by
 * default and stay off until the founders decide.
 */
import {
  ArrowsClockwiseIcon,
  LockKeyIcon,
  QuotesIcon,
  SealCheckIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import ValueLegend from "./ValueLegend";
import styles from "./Trust.module.css";

const cards = [
  {
    Icon: ArrowsClockwiseIcon,
    label: "Deterministic",
    title: "Same specification in, same drawing out.",
    body: "Run the same specification again and the drawing is byte-identical. What was reviewed is what everyone gets.",
  },
  {
    Icon: SealCheckIcon,
    label: "Independently checked",
    title: "An independent check on every drawing.",
    body: "Every generated drawing arrives with an independent check report and a redline, written from the same model the drawing came from.",
  },
  {
    Icon: QuotesIcon,
    label: "Sourced",
    title: "Every value and answer carries its source.",
    body: "Values are marked given, sourced, assumed or empty. Answers cite clause and page, and a number no source contains is flagged “Verify before use.”",
    legend: true,
  },
  {
    Icon: LockKeyIcon,
    label: "Yours",
    title: "Your documents stay yours.",
    body: "PIDA works local first. A document that has not been cleared for use never leaves the PC.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className={`${styles.trust} band`}>
      <div className="container">
        <header className={styles.head} data-pida-reveal="text">
          <p className="eyebrow">
            <ShieldCheckIcon size={15} weight="bold" aria-hidden="true" />
            Why believe it
          </p>

          <h2 className="display-l wash">
            Built To Be <span className="accent-word">Checked</span>,
            <br />
            Not Taken On Trust.
          </h2>

          <p className={`sub-headline ${styles.headSub}`}>
            Engineering for pharma is reviewed, signed and audited under good
            practice (GxP) regulations. A tool that gives a different answer on
            a different day cannot be reviewed once and relied on, and a number
            without a source cannot be signed. The four rules below follow from
            that. They are properties of how the software works.
          </p>
        </header>

        <ul className={styles.cards}>
          {cards.map(({ Icon, label, title, body, legend }) => (
            <li key={label} className={styles.card}
              data-pida-reveal="text" data-pida="card">
              <Icon
                size={22}
                weight="regular"
                aria-hidden="true"
                className={styles.icon}
              />
              <span className={`mono-label ${styles.cardLabel}`}>{label}</span>
              <h3 className="title">{title}</h3>
              <p>{body}</p>
              {legend && (
                <div className={styles.legend}>
                  <ValueLegend compact />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
