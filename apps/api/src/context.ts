import type { Database } from "./database/db";
import type { Env } from "./env";
import type { DatabaseUserAttributes, Session } from "./types";

type Variables = {
  db: Database;
  user: (DatabaseUserAttributes & { id: string }) | null;
  session: Session | null;
};

export interface AppContext {
  Bindings: Env;
  Variables: Variables;
}
