/**
 * The two small legal pages: /privacy and /legal.
 *
 * PlainPage already gives them the band, the measure, the eyebrow and the
 * one h1. All this adds is the prose underneath, and it takes the prose as
 * data rather than as markup because the pages are the same page with
 * different words in it.
 *
 * A section's body is a list. A string in it is a paragraph, an array of
 * strings is a bulleted list. That is the whole format, and it is enough for
 * every one of these pages.
 *
 * A Server Component: these pages ship no client JavaScript.
 */
import PlainPage from "./PlainPage";
import styles from "./Legal.module.css";

export type Section = {
  h: string;
  body: Array<string | string[]>;
};

export default function Legal({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  /** Written out, e.g. "22 September 2026". */
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <PlainPage eyebrow={eyebrow} title={title}>
      <div className={styles.prose}>
        <p className={`mono-label ${styles.updated}`}>Last updated {updated}</p>

        <p className={styles.lede}>{intro}</p>

        {sections.map((s) => (
          <section key={s.h} className={styles.section}>
            <h2 className={styles.h2}>{s.h}</h2>
            {s.body.map((b, i) =>
              Array.isArray(b) ? (
                <ul key={i} className={styles.list}>
                  {b.map((li) => (
                    <li key={li} className={styles.item}>
                      {li}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={i} className={styles.p}>
                  {b}
                </p>
              )
            )}
          </section>
        ))}

        {/* The one place on these pages with a link in the running text, so
            it is rendered here rather than smuggled into the data. There is
            no published address to write: the question form on the home page
            is how everything else reaches us, and it is how this does too. */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Getting in touch</h2>
          <p className={styles.p}>
            Anything on this page, including a request to delete what we hold
            about you, goes through the{" "}
            <a className="link" href="/#faq">
              question form
            </a>{" "}
            on the home page. We answer as soon as we can.
          </p>
        </section>

        <p className={styles.back}>
          <a className="link" href="/">
            Back to the home page
          </a>
        </p>
      </div>
    </PlainPage>
  );
}
