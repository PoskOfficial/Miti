import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { AppContext } from "../../context";
import { getAccessToken } from "../auth/google";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
  getUserCalendarList,
} from "./google-calendar.helper";

const GoogleCalendarController = new Hono<AppContext>()
  .get(
    "/events",
    zValidator(
      "query",
      z.object({ timeMin: z.string(), timeMax: z.string(), calendarId: z.array(z.string()).optional() })
    ),
    async (c) => {
      try {
        const accessToken = await getAccessToken(c);
        const { timeMax, timeMin, calendarId } = c.req.valid("query");
        const events = await getCalendarEvents(accessToken, timeMin, timeMax, calendarId);
        return c.json({ events });
      } catch (err) {
        return c.json({ message: "internal server error" }, 500);
      }
    }
  )
  .get("/calendars", async (c) => {
    const accessToken = await getAccessToken(c);

    try {
      const calendars = await getUserCalendarList(accessToken);
      return c.json({ calendars });
    } catch (err) {
      return c.json({ message: "internal server error" }, 500);
    }
  })
  .post("/create", async (c) => {
    const accessToken = await getAccessToken(c);

    try {
      const requestBody = await c.req.json();
      const event = await createCalendarEvent(accessToken, requestBody);
      return c.json({ event });
    } catch (err) {
      return c.json({ message: "internal server error" }, 500);
    }
  })
  .delete(
    "/events/:eventId",
    zValidator(
      "param",
      z.object({
        eventId: z.string(),
      })
    ),
    async (c) => {
      const accessToken = await getAccessToken(c);

      try {
        const { eventId } = c.req.valid("param");
        await deleteCalendarEvent(accessToken, eventId);
        return c.json({ message: "event deleted" }, 200);
      } catch (err) {
        console.log(err);
        return c.json({ message: "internal server error" }, 500);
      }
    }
  );
export { GoogleCalendarController };
