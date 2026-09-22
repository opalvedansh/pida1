/**
 * Where the two sign-up buttons of /trial point (C10.3, C10.6).
 *
 * The sign-in service runs on its own host, `auth.` in front of the site
 * domain, and the two entry points are fixed paths on it. Neither the host
 * nor the paths name a provider: the provider is the last path segment, and
 * it is the value that C3.6 also puts in `data-provider`.
 *
 * The production domain is an open decision (0.6, D3), so the origin is read
 * from the environment and falls back to a reserved address that cannot
 * resolve. Set NEXT_PUBLIC_SIGNUP_ORIGIN for every environment before the
 * site is built: the staging host until D3 is answered, the production host
 * after it. Nothing secret belongs here; secrets live only in the secret
 * store of the function host (C10.6).
 */
const FALLBACK_ORIGIN = "https://auth-staging.pida.invalid";

const origin = (
  process.env.NEXT_PUBLIC_SIGNUP_ORIGIN ?? FALLBACK_ORIGIN
).replace(/\/+$/, "");

/** The address of one provider's sign-in start (C10.3). */
export function signupHref(provider: "google" | "linkedin"): string {
  return `${origin}/login/${provider}`;
}
