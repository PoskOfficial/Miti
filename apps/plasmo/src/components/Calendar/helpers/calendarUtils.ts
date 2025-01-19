import type { CalendarDayData, DayOfWeek, ProcessedDay } from "../types/types"

export const DAY_MAPPING: Record<DayOfWeek, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
}

export const processCalendarData = (
  data: CalendarDayData[]
): ProcessedDay[][] => {
  const firstDay = DAY_MAPPING[data[0].calendarInfo.days.dayOfWeek.en]
  const weeks: ProcessedDay[][] = []
  let currentWeek: ProcessedDay[] = []

  const today = new Date()
  const todayDate = today.getDate().toString()

  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ empty: true })
  }

  data.forEach((dayData) => {
    const englishDate = dayData.calendarInfo.dates.ad.day.en
    const isWeekend = ["Saturday"].includes(
      dayData.calendarInfo.days.dayOfWeek.en
    )
    // Check if any event is marked as holiday
    const isHoliday = dayData.eventDetails.some((event) => event.isHoliday)

    const day: ProcessedDay = {
      date: englishDate,
      NepaliNum: dayData.calendarInfo.dates.bs.day.np,
      isWeekend,
      isHoliday,
      holidayTitle: dayData.eventDetails
        .map((event) => event.title.np)
        .join(" | "),
      tithi: dayData.tithiDetails?.title.np || "", // Add tithi information
      isToday: englishDate === todayDate
    }

    currentWeek.push(day)

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}
