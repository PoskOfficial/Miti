import type { Context } from "hono";
import { env } from "hono/adapter";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import type { AppContext } from "../context";
import { generateSessionToken, validateSessionToken } from "./oslo-auth";

export const authMiddleware = createMiddleware<AppContext>(async (c, next) => {
  if (c.req.path.startsWith("/auth")) {
    return next();
  }

  const originHeader = c.req.header("Origin") ?? c.req.header("origin");
  const hostHeader = c.req.header("Host") ?? c.req.header("X-Forwarded-Host");
  if (
    (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader, env(c).WEB_DOMAIN])) &&
    env(c).WORKER_ENV === "production" &&
    c.req.method !== "GET"
  ) {
    return new Response(null, {
      status: 403,
    });
  }

  const sessionToken = getCookie(c, "session");
  if (!sessionToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { session, user } = await validateSessionToken(c, sessionToken);
  if (!session || !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // previously session?.fresh checked if the session was created within the last how many days?
  // it is now handled in the validateSessionToken function

  c.set("user", user);
  c.set("session", session);
  await next();
});

// this is copy pasted from lucia github `https://github.com/lucia-auth/lucia/blob/v3/packages/lucia/src/request.ts`
function verifyRequestOrigin(origin: string, allowedDomains: string[]): boolean {
  if (!origin || allowedDomains.length === 0) {
    return false;
  }
  const originHost = safeURL(origin)?.host ?? null;
  if (!originHost) {
    return false;
  }
  for (const domain of allowedDomains) {
    let host: string | null;
    if (domain.startsWith("http://") || domain.startsWith("https://")) {
      host = safeURL(domain)?.host ?? null;
    } else {
      host = safeURL("https://" + domain)?.host ?? null;
    }
    if (originHost === host) {
      return true;
    }
  }
  return false;
}

function safeURL(url: URL | string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}
