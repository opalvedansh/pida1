/**
 * Questions. Sits before the final call to action, as it does in the
 * reference.
 *
 * THE SIX WRITTEN ANSWERS ARE GONE
 *
 * This was a list of six native <details> items with the answers already
 * written. The section is now the question box alone: the heading asks for
 * questions and the form takes them, rather than the page guessing which six
 * a reader would have had.
 *
 * If they are wanted back, the copy is not lost: it is in the history of
 * this file, and the styles it needs (.list, .item, .q, .sign, .answer) were
 * removed from Faq.module.css in the same change.
 *
 * Two of those answers said things the rest of the site no longer says
 * anywhere. "Your documents stay yours" survives on /trial. The byte-
 * identical claim survives in the product rail's step 03. The formats
 * answer survives in the compatibility band. So nothing that was load
 * bearing left the page with the list.
 */
import AskQuestion from "./AskQuestion";
import styles from "./Faq.module.css";

export default function Faq() {
  return (
    <section id="faq" className={`${styles.faq} band`}>
      <div className={`container ${styles.inner}`}>
        {/* No eyebrow. It read "FAQs" directly above a heading that already
            says "Questions, answered", which is the same word twice, and the
            page carries three of these labels in total rather than one above
            every section. The heading does the work on its own. */}
        <header className={styles.head}>
          <h2 className="display-m wash" data-pida-reveal="text">
            Please leave your questions here. Our team will reach out to you
            as soon as <span className="accent-word">possible</span>.
          </h2>
        </header>

        {/* The whole right column now. The one Client Component in this
            section; the heading beside it stays on the server. */}
        <div className={styles.column}>
          <AskQuestion />
        </div>
      </div>
    </section>
  );
}
