import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { env } from "hono/adapter";

import type { AppContext } from "./../context";
import { sessionTable } from "./../database/sessions";
import { userTable } from "./../database/users";
import type { DatabaseUserAttributes, Session, SessionValidationResult } from "./../types";

type SessionQueryResult = {
  user: DatabaseUserAttributes & { id: string };
  session: {
    id: string;
    userId: string;
    expiresAt: number;
  };
};

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(c: Context<AppContext>, token: string, userId: string): Promise<Session> {
  const db = c.get("db");
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: 60 * 60 * 24 * 30,
  };

  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(c: Context<AppContext>, token: string): Promise<SessionValidationResult> {
  const db = c.get("db");
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const results = await db
    .select({
      session: sessionTable,
      user: userTable,
    })
    .from(sessionTable)
    .where(eq(sessionTable.id, sessionId))
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id));

  const result = results[0] as SessionQueryResult | undefined;
  if (!result) {
    return { session: null, user: null };
  }

  const { user, session } = result;

  if (Date.now() >= Date.now() + session.expiresAt) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  // Extend session if it's close to expiring (15 days before expiration)
  if (session.expiresAt < 60 * 60 * 24 * 15) {
    const newExpiresAt = 60 * 60 * 24 * 30;
    await db
      .update(sessionTable)
      .set({
        expiresAt: newExpiresAt,
      })
      .where(eq(sessionTable.id, session.id));

    session.expiresAt = newExpiresAt;
  }

  return {
    session: session as Session,
    user: user as DatabaseUserAttributes & { id: string },
  };
}

export async function invalidateSession(c: Context<AppContext>, sessionId: string): Promise<void> {
  const db = c.get("db");
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export function setSessionTokenCookie(c: Context<AppContext>, token: string, expiresAt: number): void {
  if (env(c).WORKER_ENV === "production") {
    c.res.headers.set("Set-Cookie", `session=${token}; HttpOnly; SameSite=Lax; Max-Age=${expiresAt}; Path=/; Secure;`);
  } else {
    c.res.headers.set("Set-Cookie", `session=${token}; HttpOnly; SameSite=Lax; Max-Age=${expiresAt}; Path=/`);
  }
}

export function deleteSessionTokenCookie(c: Context<AppContext>): void {
  if (env(c).WORKER_ENV === "production") {
    c.res.headers.set("Set-Cookie", `session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;`);
  } else {
    c.res.headers.set("Set-Cookie", `session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/`);
  }
}
