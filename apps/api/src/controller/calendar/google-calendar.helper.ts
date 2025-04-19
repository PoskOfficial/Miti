const googleCalendarBaseURL = "https://www.googleapis.com/calendar/v3";

const getCalendarEvents = async (accessToken: string, timeMin: string, timeMax: string, calendarId?: string[]) => {
  try {
    const calendarList = calendarId?.length
      ? calendarId
      : (await getUserCalendarList(accessToken)).items?.map((calendar: any) => calendar.id);
    if (!calendarList) return [];
    const events = await Promise.all(
      calendarList.map(async (calendarId) => {
        const url = new URL(`${googleCalendarBaseURL}/calendars/${calendarId}/events`);
        url.searchParams.append("timeMin", new Date(timeMin).toISOString());
        url.searchParams.append("timeMax", new Date(timeMax).toISOString());
        url.searchParams.append("orderBy", "startTime");
        url.searchParams.append("maxResults", "10");
        url.searchParams.append("singleEvents", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "GET",
        });
        if (!response.ok) return [];

        const data = (await response.json()) as unknown as { items: any[]; accessRole: string; summary: string };
        // if (!data.items) return;
        return data.items?.map((event) => ({
          ...event,
          calendarId,
          accessRole: data.accessRole,
          calendarSummary: data.summary,
        }));
      })
    );
    return events.flat();
  } catch (error) {
    console.error("Error retrieving calendar events:", error);
    throw error;
  }
};

const getUserCalendarList = async (accessToken: string) => {
  try {
    const response = await fetch(`${googleCalendarBaseURL}/users/me/calendarList`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data as unknown as { items: any[] };
  } catch (error) {
    console.error("Error retrieving calendar list:", error);
    throw error;
  }
};

const deleteCalendarEvent = async (accessToken: string, eventID: string, calendarId?: string) => {
  try {
    await fetch(`${googleCalendarBaseURL}/calendars/${calendarId || "primary"}/events/${eventID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    throw error;
  }
};

const createCalendarEvent = async (accessToken: string, requestBody: any) => {
  try {
    const { calendarId, ...body } = requestBody;
    console.log(body);
    const response = await fetch(`${googleCalendarBaseURL}/calendars/${calendarId || "primary"}/events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
};

export { getCalendarEvents, getUserCalendarList, deleteCalendarEvent, createCalendarEvent };
