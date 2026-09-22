/**
 * Where a question asked from the FAQ goes.
 *
 * Built to the same shape as lib/signup.ts, and for the same reason: the
 * site is a static export, so there is no server of our own to post to, and
 * the destination differs per environment. It is read from the environment
 * and falls back to a reserved address that cannot resolve.
 *
 * SET NEXT_PUBLIC_ASK_ENDPOINT BEFORE THE SITE IS BUILT. Until it is set the
 * form renders and submits into the fallback, which fails: that is the same
 * behaviour the two sign-in buttons already have, and it is deliberate, so
 * that an unconfigured deploy fails loudly in staging rather than quietly
 * swallowing a visitor's question in production.
 *
 * D4 is still open: the role-based contact address is not decided, and
 * Footer.tsx is explicit that no address may be invented and that a personal
 * one must not be used. So nothing here is a mailto. Whatever receives this
 * post is the founders' choice; this file only needs its URL.
 *
 * WHAT THE ENDPOINT RECEIVES
 *
 * A POST with an application/x-www-form-urlencoded body and these fields:
 *
 *   question   the visitor's question, required
 *   email      where they want the reply, required
 *   source     which surface it came from, currently always "faq"
 *
 * It should answer 2xx on success. With JavaScript running, the response
 * body is ignored and the page shows its own confirmation. With JavaScript
 * off the browser performs the post itself and lands on whatever the
 * endpoint returns, so the endpoint should redirect somewhere sensible.
 *
 * Nothing secret belongs here. This value ships to the browser.
 */
const FALLBACK_ENDPOINT = "https://forms-staging.pida.invalid/questions";

/** The address the question form posts to (C10.3's convention). */
export const askEndpoint = (
  process.env.NEXT_PUBLIC_ASK_ENDPOINT ?? FALLBACK_ENDPOINT
).replace(/\/+$/, "");
