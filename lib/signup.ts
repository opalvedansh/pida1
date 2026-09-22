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
 * Google is the only provider. LinkedIn was here and is gone: it was never
 * switched on in the project, so the button answered 400 every time it was
 * pressed. The name and email form beside it covers the people who would
 * have used it, and covers everyone with neither account.
 */
export function signupHref(provider: "google"): string {
  const back = encodeURIComponent(`${site}/trial/welcome`);
  return `${supabaseUrl}/auth/v1/authorize?provider=${provider}&redirect_to=${back}`;
}
