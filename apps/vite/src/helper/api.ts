export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchUserEvents = async (startDate: string, endDate: string) => {
  const res = await fetch(
    `${apiBaseUrl}/calendar/google/events?timeMin=${startDate}&timeMax=${endDate}`,
    { credentials: "include" }
  )
  const data = await res.json()
  return data
}

export const getCalendarList = async () => {
  const res = await fetch(`${apiBaseUrl}/calendars`)
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

export const deleteEvent = async (id: string) => {
  await fetch(`${apiBaseUrl}/calendar/google/events/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
