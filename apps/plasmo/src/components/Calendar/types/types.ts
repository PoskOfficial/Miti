export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"

export interface CalendarDayData {
  calendarInfo: {
    dates: {
      ad: { day: { en: string } }
      bs: { day: { np: string } }
    }
    days: {
      dayOfWeek: {
        en: DayOfWeek
      }
    }
  }
  tithiDetails: {
    title: {
      np: string
      en: string | null
    }
  }
  eventDetails: Array<{
    isHoliday: boolean
    title: {
      np: string
      en: string | null
    }
  }>
}

export interface ProcessedDay {
  empty?: boolean
  date?: string
  NepaliNum?: string
  isWeekend?: boolean
  isHoliday?: boolean
  holidayTitle?: string
  tithi?: string // Added this field
  index?: number
  isToday?: boolean
}
