/**
 * The home page.
 *
 * The block order follows the reference landing page kept in /hoplite:
 *
 *   hero            badge, one heading, one line, one button
 *   steps           the four tools that are built, numbered
 *   use cases       hydraulics: the model built, and the same model solved
 *   coming soon     the three that are not drawn yet, as an exploded stack
 *   faq             native disclosure list
 *   final cta       one heading, one button
 *
 * What changed from the previous structure: the six long feature sections
 * each had a heading, a task note, a copy column and an evidence column. The
 * generator became the four-step rail, the other five became the use-cases
 * bento, and the task notes were cut. They described the reader's own job
 * back to them six times over, which is five times more than it earns.
 *
 * Nothing on this page simulates the product. Where a screenshot or
 * recording belongs there is a placeholder carrying the file name and its
 * alt text, and the files are still absent. The sections that depend on a
 * recording do not launch without it.
 *
 * Headline options: A3 offers two or three per section. Option 1 is used
 * throughout, being the plainest, and the founders choose at review.
 *
 * Every component here is a Server Component except NextSheets, which is the
 * one Client Component on the page. Its opening is CSS, but the latch that
 * holds a sheet lit after the pointer leaves is state, and the trigger that
 * opens the stack once is an observer. Neither is reachable without it.
 *
 * What that costs, measured by building the page with and without it: about
 * 3 kB gzipped. This file used to say the export shipped no client
 * JavaScript at all. That was never true of an App Router build, which
 * ships a hydration runtime either way; the measured baseline without
 * NextSheets is already about 166 kB gzipped.
 */
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import UseCases from "@/components/UseCases";
import Anatomy from "@/components/anatomy/Anatomy";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <UseCases />
      {/* The sheets board that used to sit here is replaced by the exploded
          sheet, which now names the same three unbuilt pieces the board did.
          components/NextSheets.tsx and components/sheets/plan.ts are left in
          the tree unused, so the old board is one import away if this is not
          the right call. The id is kept, because that anchor may be linked
          from outside the site. */}
      <Anatomy id="next-sheets" headingLevel="h2" />
      <Faq />
      <FinalCta />
    </>
  );
}
