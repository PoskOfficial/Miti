import NepaliDate from "nepali-datetime"
import dateConverter from "nepali-datetime"

import type { ProcessedDay } from "../types/types"

export const convertNepaliToEnglish = (nepaliNum: string): number => {
  const nepaliDigits: { [key: string]: string } = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9"
  }
  return parseInt(
    nepaliNum
      .split("")
      .map((digit) => nepaliDigits[digit] || digit)
      .join("")
  )
}

export const getNepaliMonthAndYear = () => {
  const currentNepaliDate = new NepaliDate()
  const currentYear = currentNepaliDate.getYear().toString()
  const currentMonth = `${currentNepaliDate.getMonth() + 1}`
    .toString()
    .padStart(2, "0")
  return { currentYear, currentMonth }
}
export const getNepaliDays = (
  year: number,
  month: number,
  day: number
): number => {
  // Create a NepaliDate object for the given date
  const nepaliDate = new NepaliDate(year, month - 1, day) // month is 0-based in NepaliDate
  return Math.floor(nepaliDate.getTime() / (24 * 60 * 60 * 1000))
}

export const calculateDaysDifference = (
  todayNepaliDate: string | null,
  selectedNepaliDate: string | null,
  selectedYear: string,
  selectedMonth: string
): number => {
  if (!todayNepaliDate || !selectedNepaliDate) return 0

  const todayDay = convertNepaliToEnglish(todayNepaliDate)
  const selectedDay = convertNepaliToEnglish(selectedNepaliDate)

  // Get current Nepali date
  const now = new NepaliDate()
  const currentNepaliYear = now.getYear()
  const currentNepaliMonth = now.getMonth() + 1 // getMonth() returns 0-based index

  // Calculate days using NepaliDate objects
  const selectedDate = new NepaliDate(
    parseInt(selectedYear),
    parseInt(selectedMonth) - 1,
    selectedDay
  )
  const todayDate = new NepaliDate(
    currentNepaliYear,
    currentNepaliMonth - 1,
    todayDay
  )

  return Math.floor(
    (selectedDate.getTime() - todayDate.getTime()) / (24 * 60 * 60 * 1000)
  )
}

export const getRelativeDayText = (dayDiff: number): string => {
  if (dayDiff === 0) return "today"
  if (dayDiff === 1) return "tomorrow"
  if (dayDiff === -1) return "yesterday"
  if (dayDiff > 1) return `in ${dayDiff} days`
  return `${Math.abs(dayDiff)} days ago`
}

export const getFormattedDate = (
  selectedDay: ProcessedDay,
  selectedMonth: string,
  selectedYear: string
): {
  dayName: string
  monthName: string
  year: number
} => {
  // Convert Nepali date components to numbers
  const nepaliDay = convertNepaliToEnglish(selectedDay.NepaliNum || "1")
  const nepaliMonth = parseInt(selectedMonth) - 1 // Convert to 0-based index
  const nepaliYear = parseInt(selectedYear)

  // Create NepaliDate object and get its English equivalent
  const nepaliDate = new NepaliDate(nepaliYear, nepaliMonth, nepaliDay)
  const englishDate = nepaliDate.getDateObject()

  return {
    dayName: englishDate.toLocaleString("en-US", { weekday: "long" }),
    monthName: englishDate.toLocaleString("en-US", { month: "long" }),
    year: englishDate.getFullYear()
  }
}
