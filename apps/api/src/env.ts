// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Env = {
  DB: D1Database;
  WORKER_ENV: "production" | "development";
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  API_DOMAIN: string;
  WEB_DOMAIN: string;
};
