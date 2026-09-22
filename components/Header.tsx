/**
 * Navigation. Built to the reference bar in /hoplite:
 *
 *   a floating pill, 56rem wide, centred, 12px radius, one step up the ramp,
 *   laid out as a three-column grid so the links sit dead centre regardless
 *   of how wide the brand and the actions are;
 *
 *   an accent strip tucked behind it, starting 6px above the pill's bottom
 *   edge and hanging below, so the pill's rounded corner sits over it.
 *
 * TWO THINGS ARE NOT COPIED FROM THE REFERENCE
 *
 * The reference's strip reads "Try Pro free for 14 days". Nothing on this
 * site may state a duration, a delivery time or a payment term until D1 is
 * decided, so the strip carries the one CTA label the site already uses.
 * Do not put a number in it from a guess.
 *
 * The reference's right-hand pair is Login and Start free. There is no login
 * to offer yet, so the pair is Questions and the trial CTA: two different
 * intents, which is the point of having two chips.
 *
 * The menu below 768px is a native <details> disclosure, so it works with no
 * JavaScript and from the keyboard. This is a Server Component: the export
 * ships no client JavaScript.
 */
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import styles from "./Header.module.css";

// Written against the home page so the same bar serves the small pages,
// where these resolve to /#anchor. The ids of the sections that existed
// before the restructure are kept, so old links still land.
const anchors = [
  { href: "/#pid-making", label: "Tools" },
  { href: "/#next-sheets", label: "Coming soon" },
];

export default function Header() {
  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.wrap}>
          <nav className={styles.bar} aria-label="Main">
            {/* The sheen: a half-pixel inner highlight along the top edge,
                which is what makes the pill read as raised rather than as a
                lighter rectangle. */}
            <span className={styles.sheen} aria-hidden="true" />

            <a className={styles.brand} href="/">
              <span className={styles.mark} aria-hidden="true" />
              PIDA
            </a>

            <div className={styles.links}>
              {anchors.map((a) => (
                <a key={a.href} className={styles.link} href={a.href}>
                  {a.label}
                </a>
              ))}
            </div>

            <div className={styles.actions}>
              <a className={styles.chip} href="/#faq">
                Questions
              </a>

              <a
                className={styles.chipPrimary}
                href="/trial"
                data-pida="cta"
              >
                Sign up for early access
              </a>

              <details className={styles.menu}>
                <summary className={styles.menuButton} aria-label="Menu">
                  <span className={styles.burger} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </summary>

                <div className={styles.sheet}>
                  <ul className={styles.sheetAnchors}>
                    {anchors.map((a) => (
                      <li key={a.href}>
                        <a href={a.href}>{a.label}</a>
                      </li>
                    ))}
                    <li>
                      <a href="/#faq">Questions</a>
                    </li>
                  </ul>

                  <ul className={styles.sheetLegal}>
                    <li>
                      <a href="/privacy">Privacy</a>
                    </li>
                    <li>
                      <a href="/legal">Legal and accessibility</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </nav>
        </div>

        {/* The strip. Absolutely positioned and behind the pill, so it adds
            nothing to the header's height and the pill overlaps its top. */}
        <span className={styles.stripWrap}>
          <a className={styles.strip} href="/trial" data-pida="cta">
            <span className={styles.stripGradient} aria-hidden="true" />
            <span className={styles.stripTexture} aria-hidden="true" />
            <span className={styles.stripLabel}>Sign up for early access</span>
            {/* An icon component, not a &rarr; glued to the label. It was
                the one raw arrow character left in the page's copy, and it
                sat at whatever weight the mono face happened to draw it,
                next to Phosphor glyphs everywhere else. */}
            <span className={styles.stripArrow} aria-hidden="true">
              <ArrowRightIcon size={11} weight="bold" />
            </span>
          </a>
        </span>
      </header>
    </>
  );
}
