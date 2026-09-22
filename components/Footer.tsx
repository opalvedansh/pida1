/**
 * Footer. Three columns as the reference sets them: the mark and one line of
 * description on the left, then two short link columns.
 *
 * The anchor list used to carry nine entries, one per old section. The
 * restructure merged five of those into the use-cases block, so the list is
 * grouped rather than lengthened: the five capabilities keep their ids and
 * are reachable, they just no longer each get a footer row.
 *
 * Open decisions that change this block:
 *   D3  legal entity. Until it is known the staging site shows "(c) {year} PIDA."
 *   D4  the role-based contact address. Unanswered, so the contact line is
 *       omitted. Do not invent an address and do not use a personal one.
 *   D8  the "Cookie settings" link appears only once analytics ship.
 *
 * No team names, social icons, newsletter field or badges.
 */
import styles from "./Footer.module.css";

const product = [
  { href: "/#pid-making", label: "P&ID Generator" },
  { href: "/#connectivity", label: "Connectivity" },
  { href: "/#hydraulics", label: "Hydraulics" },
  { href: "/#answers", label: "Engineering Answers" },
];

const company = [
  { href: "/#faq", label: "Questions" },
  { href: "/trial", label: "Sign up for trial" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Trial terms" },
  { href: "/legal", label: "Legal and accessibility" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.cols}>
          <div className={styles.brand}>
            <span className={styles.wordmarkLink}>
              <span className={styles.mark} aria-hidden="true" />
              <span className={styles.wordmark}>PIDA</span>
            </span>
            <p className={styles.tagline}>
              Early process design for pharma plants, automated and traceable.
            </p>
          </div>

          <nav className={styles.col} aria-label="Product">
            <h2 className={`mono-label ${styles.colHead}`}>Product</h2>
            <ul className={styles.list}>
              {product.map((a) => (
                <li key={a.href}>
                  <a href={a.href}>{a.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Company">
            <h2 className={`mono-label ${styles.colHead}`}>Company</h2>
            <ul className={styles.list}>
              {company.map((a) => (
                <li key={a.href}>
                  <a href={a.href}>{a.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Legal">
            <h2 className={`mono-label ${styles.colHead}`}>Legal</h2>
            <ul className={styles.list}>
              {legal.map((a) => (
                <li key={a.href}>
                  <a href={a.href}>{a.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className="mono-label">&copy; {year} PIDA.</p>
          <p className={`mono-label ${styles.standards}`}>
            Standards named on this site belong to their respective publishers.
            PIDA is not affiliated with or endorsed by them.
          </p>
        </div>
      </div>
    </footer>
  );
}
