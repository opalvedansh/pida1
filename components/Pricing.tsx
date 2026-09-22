/**
 * Pricing.
 *
 * The layout follows the reference: two plans side by side, the paid one
 * raised and carrying the accent, and a monthly/yearly switch above them.
 *
 * WHAT IS REAL HERE AND WHAT IS NOT
 *
 * Every line in the two feature lists is a capability this page already
 * demonstrates further up. None of it is invented.
 *
 * The figures are NOT set. Open decision D1 is still unanswered, and the
 * standing rule is that nothing on this site states a duration, a delivery
 * time or a payment term until it is. So the price slots render a marked
 * placeholder rather than a number. Do not fill them in from a guess: a
 * wrong price on a live page is a commercial problem, not a layout one.
 * When the founders set them, replace `price` and `priceNote` below and
 * delete the notice.
 *
 * The switch is two radio inputs and a CSS sibling selector, so it works
 * with no JavaScript and from the keyboard. The export ships no client
 * JavaScript.
 */
import { CheckIcon, TagIcon } from "@phosphor-icons/react/dist/ssr";
import styles from "./Pricing.module.css";

const trial = [
  "P&ID generation with an independent check on every drawing",
  "The project connectivity graph",
  "Hydraulic model automation with every value marked",
  "Safety answers built from the drawing's own facts",
  "Flow path and isolation views, in two scenarios",
  "The PIDA Engineer: 94 documents, 1,772 design rules, 67 vendor datasheets",
  "Open formats out: DXF, DEXPI, PDF, XLSX",
];

const team = [
  "Shared projects across a review team",
  "Checking of drawings made elsewhere, with planted-defect proof runs",
  "Hashed revision chain on every generated sheet",
];

export default function Pricing() {
  return (
    <section id="pricing" className={`${styles.pricing} band`}>
      <div className="container">
        <header className={styles.head} data-pida-reveal="text">
          <p className="eyebrow">
            <TagIcon size={15} weight="bold" aria-hidden="true" />
            Pricing
          </p>

          <h2 className="display-l wash">
            One Tool, Priced To Be
            <br />
            <span className="accent-word">Argued</span> For.
          </h2>

          <p className={`sub-headline ${styles.headSub}`}>
            What you get is the same in both plans. The difference is how many
            people review the work.
          </p>
        </header>

        {/* The notice is deliberately loud. It is the only thing standing
            between an unset figure and a live page. */}
        <p className={styles.notice} data-pida="placeholder">
          <strong>Staging notice.</strong> The figures below are not set.
          Pricing is blocked on decision D1 and this section must not go live
          with a placeholder in the price slot.
        </p>

        <fieldset className={styles.switch}>
          <legend className="visually-hidden">Billing period</legend>

          <input
            type="radio"
            name="billing"
            id="billing-monthly"
            className={styles.switchInput}
            defaultChecked
          />
          <label htmlFor="billing-monthly" className={styles.switchLabel}>
            Monthly
          </label>

          <input
            type="radio"
            name="billing"
            id="billing-yearly"
            className={`${styles.switchInput} ${styles.yearlyInput}`}
          />
          <label htmlFor="billing-yearly" className={styles.switchLabel}>
            Yearly
          </label>
        </fieldset>

        <div className={styles.plans}>
          {/* ---------------------------------------------------- trial */}
          <article className={styles.plan} data-pida="card" data-pida-reveal="text">
            <h3 className={`display-m ${styles.planName}`}>Trial</h3>

            <p className={`${styles.price} ${styles.priceUnset}`}>Not set</p>
            <p className={`caption ${styles.priceNote}`}>
              <span className={styles.monthlyOnly}>
                Monthly figure to be confirmed.
              </span>
              <span className={styles.yearlyOnly}>
                Yearly figure to be confirmed.
              </span>
            </p>

            <p className={styles.planBody}>
              Sign up with an account you already have. There is no password to
              create. We will email you with the next step.
            </p>

            <a
              className={`btn btn-primary ${styles.planCta}`}
              href="/trial"
              data-pida="cta"
            >
              Sign up for trial
            </a>

            <ul className={styles.features}>
              {trial.map((f) => (
                <li key={f} className={styles.feature}>
                  <CheckIcon size={15} weight="bold" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </article>

          {/* ----------------------------------------------------- team */}
          <article
            className={`${styles.plan} ${styles.planFeatured}`}
            data-pida-reveal="text"
            data-pida="card"
          >
            <h3 className={`display-m ${styles.planName}`}>Team</h3>

            <p className={`${styles.price} ${styles.priceUnset}`}>Not set</p>
            <p className={`caption ${styles.priceNote}`}>
              <span className={styles.monthlyOnly}>
                Monthly figure per seat to be confirmed.
              </span>
              <span className={styles.yearlyOnly}>
                Yearly figure per seat to be confirmed.
              </span>
            </p>

            <p className={styles.planBody}>
              For a group that reviews and signs each other&rsquo;s drawings,
              working on the same projects.
            </p>

            <a
              className={`btn btn-action ${styles.planCta}`}
              href="/trial"
              data-pida="cta"
            >
              Sign up for trial
            </a>

            <ul className={styles.features}>
              <li className={`mono-label ${styles.featuresHead}`}>
                Everything in Trial, plus
              </li>
              {team.map((f) => (
                <li key={f} className={styles.feature}>
                  <CheckIcon size={15} weight="bold" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
