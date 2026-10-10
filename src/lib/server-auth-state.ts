import { cookies } from "next/headers";

/** A display hint only; Better Auth remains responsible for validating sessions. */
export async function hasAuthSessionCookie(): Promise<boolean> {
  const requestCookies = await cookies();
  return requestCookies.getAll().some(({ name, value }) =>
    /^(?:__Secure-)?better-auth\.session_token(?:\.\d+)?$/.test(name) && Boolean(value),
  );
}
