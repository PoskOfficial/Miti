import { CalendarPayload } from "../components/AddEventModal"
import { CalendarEvent } from "@miti/types"

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function fetchYearlyData(year: number) {
  const res = await fetch(`/data/${year}-calendar.json`, {
    credentials: "include",
  })
  const data = await res.json()
  return data
}
export async function checkIfUserIsLoggedInOrOffline(): Promise<{
  status: "LOGGED_IN" | "NOT_LOGGED_IN" | "OFFLINE"
  data?: any
}> {
  const res = await fetch(`${apiBaseUrl}/user/profile`, {
    credentials: "include",
  })

  if (res.status === 200) {
    const data = await res.json()
    return { status: "LOGGED_IN", data }
  }
  if (res.status === 401) {
    return { status: "NOT_LOGGED_IN" }
  }
  return { status: "OFFLINE" }
}

export const fetchUserEvents = async (startDate: string, endDate: string) => {
  const res = await fetch(
    `${apiBaseUrl}/calendar/google/events?timeMin=${startDate}&timeMax=${endDate}`,
    { credentials: "include" }
  )
  const data = await res.json()
  return data
}

export const getCalendarList = async () => {
  const res = await fetch(`${apiBaseUrl}/calendar/google/calendars`, {
    credentials: "include",
  })
  const data = await res.json()
  return (
    data.calendars?.items
      ?.filter(
        (calendar: any) =>
          calendar.accessRole === "owner" || calendar.accessRole === "writer"
      )
      .map((calendar: any) => ({
        label: calendar.summary,
        value: calendar.id,
      })) || []
  )
}
export const createEvent = async (eventData: CalendarPayload) => {
  const res = await fetch(`${apiBaseUrl}/calendar/google/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(eventData),
  })
  return await res.json()
}

export const deleteEvent = async (event: CalendarEvent) => {
  await fetch(`${apiBaseUrl}/calendar/google/delete/${event.id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
