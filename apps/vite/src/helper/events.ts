import { CalendarEvent } from "@miti/types"
import {
  parseISO,
  startOfDay,
  endOfDay,
  addDays,
  subMilliseconds,
  isBefore,
  isAfter,
  differenceInCalendarDays,
} from "date-fns"

export const getEventsOfSelectedDay = (
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] => {
  if (!events?.length) return []

  const dayStart = startOfDay(day)
  const nextDayStart = addDays(dayStart, 1)

  return events.filter((event) => {
    const rawStart = event.start.dateTime ?? event.start.date
    const rawEnd = event.end.dateTime ?? event.end.date
    if (!rawStart || !rawEnd) return false

    let startDate = parseISO(rawStart)
    let endDate = parseISO(rawEnd)

    const isAllDay = !!(event.start.date && event.end.date)

    if (isAllDay) {
      const spanDays = differenceInCalendarDays(endDate, startDate)

      if (spanDays > 0) {
        endDate = subMilliseconds(endDate, 1)
      } else {
        endDate = endOfDay(startDate)
      }
    }
    return isBefore(startDate, nextDayStart) && isAfter(endDate, dayStart)
  })
}
