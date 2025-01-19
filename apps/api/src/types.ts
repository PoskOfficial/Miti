import type { InferInsertModel } from "drizzle-orm";

import type { userTable } from "./database/users";

export type DatabaseUserAttributes = InferInsertModel<typeof userTable>;

export interface Session {
  id: string;
  userId: string;
  expiresAt: number;
}

export interface SessionValidationResult {
  session: Session | null;
  user: (DatabaseUserAttributes & { id: string }) | null;
}
