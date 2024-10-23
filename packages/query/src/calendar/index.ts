import { useQuery } from "@tanstack/react-query"
import NepaliDate from "nepali-datetime"
import { CalendarData } from "@miti/types"

export const useYearlyData = (currentNepaliDate: NepaliDate) =>
  useQuery<CalendarData>({
    queryKey: ["calendar", currentNepaliDate.getYear()],
    queryFn: () => fetchYearlyData(currentNepaliDate.getYear()),
    networkMode: "offlineFirst",
  })

export const useCalendarList = (apiBaseUrl: string) =>
  useQuery({
    queryKey: ["calendarList"],
    queryFn: () => getCalendarList(apiBaseUrl),
    networkMode: "offlineFirst",
  })

export async function fetchYearlyData(year: number) {
  const res = await fetch(`/data/${year}-calendar.json`, {
    credentials: "include",
  })
  const data = await res.json()
  return data
}

export const getCalendarList = async (apiBaseUrl: string) => {
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
