import { useMutation, useQuery } from "@tanstack/react-query"
import { CalendarEvent, CalendarPayload } from "@miti/types"

export const useCreateEvent = (
  apiBaseUrl: string,
  handleSuccess?: () => void
) =>
  useMutation({
    mutationFn: (eventData: CalendarPayload) =>
      createEvent(apiBaseUrl, eventData),
    onSuccess: handleSuccess,
  })

export const useDeleteEvent = (apiBaseUrl: string, handleSuccess: () => void) =>
  useMutation({
    mutationFn: (event: CalendarEvent) => deleteEvent(apiBaseUrl, event),
    onSuccess: handleSuccess,
  })

export const createEvent = async (
  apiBaseUrl: string,
  eventData: CalendarPayload
) => {
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

export const deleteEvent = async (apiBaseUrl: string, event: CalendarEvent) => {
  await fetch(`${apiBaseUrl}/calendar/google/delete/${event.id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
