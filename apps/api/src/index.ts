import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { authMiddleware } from "./auth/auth.middleware";
import type { AppContext } from "./context";
import { AuthController } from "./controller/auth/auth.controller";
import { GoogleCalendarController } from "./controller/calendar/google-calendar.controller";
import { UserController } from "./controller/user/user.controller";
import { initalizeDB } from "./database/db";
import { installTable } from "./database/installs";

const app = new Hono<AppContext>();

app
  .use(logger())
  .use((c, next) => {
    const handler = cors({ origin: [env(c).WEB_DOMAIN, env(c).API_DOMAIN], credentials: true });
    return handler(c, next);
  })
  .use((c, next) => {
    initalizeDB(c);
    return next();
  })
  .post("/installed", (c) => {
    fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-66S48YMB7K&api_secret=hkMQzGhVRJSdF1ZvmTwtBA`, {
      method: "POST",
      body: JSON.stringify({
        client_id: "xyz",
        events: [
          {
            name: "install",
          },
        ],
      }),
    });
    c.get("db")
      .insert(installTable)
      .values({
        id: "xyz",
        user: c.get("user")?.id || "anonymous",
        installedOn: Date.now(),
      });
    return c.json({ status: "ok" });
  })
  .get("/health", (c) => {
    return c.json({ status: "ok" });
  })
  .use(authMiddleware);

const routes = app
  .route("/auth", AuthController)
  .route("/user", UserController)
  .route("/calendar/google", GoogleCalendarController);

export type AppType = typeof routes;
export default app;
