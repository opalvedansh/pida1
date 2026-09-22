/**
 * Where the two sign-up buttons of /trial point.
 *
 * At Supabase Auth's authorize route, which is a plain URL: the button is an
 * anchor, the browser follows it, the provider takes over, and Supabase
 * writes the person into auth.users before handing them back. Nothing on
 * this side has to manage that, which is why there is no client library
 * anywhere in this repository. See lib/supabase.ts.
 *
 * WHERE THEY COME BACK TO
 *
 * /trial/welcome, and the return has to be whitelisted or Supabase refuses
 * it. In the dashboard, under Authentication, URL Configuration, the Site
 * URL and the redirect allow list both need the deployed origin. Until then
 * only localhost works, which is the right way round for something that has
 * not been deployed yet.
 *
 * NEXT_PUBLIC_SITE_URL is what gets sent as redirect_to. It has to be an
 * absolute URL and it has to match what the dashboard allows, so it is a
 * build-time value rather than something read off window.location: the
 * buttons are rendered on the server and a static export has no window to
 * read at that point.
 */
import { supabaseUrl } from "./supabase";

const FALLBACK_SITE = "http://localhost:3000";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE).replace(
  /\/+$/,
  ""
);

/**
 * The address of one provider's sign-in start.
 *
 * `linkedin_oidc` rather than `linkedin`: the older provider is retired and
 * Supabase lists both, but only the OIDC one can still be enabled. Either
 * has to be switched on in the dashboard first, and asking for one that is
 * off answers with an error page rather than a provider.
 */
export function signupHref(provider: "google" | "linkedin"): string {
  const name = provider === "linkedin" ? "linkedin_oidc" : provider;
  const back = encodeURIComponent(`${site}/trial/welcome`);
  return `${supabaseUrl}/auth/v1/authorize?provider=${name}&redirect_to=${back}`;
}
