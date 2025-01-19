import React, { useEffect, useState } from "react"

import DateWithEvents from "~components/DateWithEvents"
import { MITI_API_ROUTE } from "~constant"

import { CalendarGrid } from "./CalendarGrid"
import MonthYearSelect from "./CalendarMonthYear"
import NepaliWeekdays from "./DayIndex"
import { processCalendarData } from "./helpers/calendarUtils"
import { getNepaliMonthAndYear } from "./helpers/dateUtils"
import type { CalendarDayData, ProcessedDay } from "./types/types"

const CalendarBody: React.FC = () => {
  const [calendarData, setCalendarData] = useState<ProcessedDay[][]>([])
  const [selectedDay, setSelectedDay] = useState<ProcessedDay | null>(null)
  const [todayBSDay, setTodayBSDay] = useState<string | null>(null)
  const { currentYear, currentMonth } = getNepaliMonthAndYear()
  // Use current Nepali date for initial year and month values
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch(
          MITI_API_ROUTE(selectedYear, selectedMonth)
        )
        const data: CalendarDayData[] = await response.json()
        const weeks = processCalendarData(data)
        setCalendarData(weeks)

        const today = weeks.flat().find((day) => day.isToday)
        if (today) {
          setSelectedDay(today)
          setTodayBSDay(today.NepaliNum || null)
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error)
      }
    }

    fetchCalendarData()
  }, [selectedYear, selectedMonth])

  const handleDaySelect = (day: ProcessedDay) => {
    setSelectedDay(day)
  }

  return (
    <div className="plasmo-bg-gray-900 plasmo-p-4 plasmo-w-full">
      <div className="plasmo-space-y-4">
        <MonthYearSelect
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
        />

        <DateWithEvents
          selectedDay={selectedDay}
          todayBSDay={todayBSDay}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
        <NepaliWeekdays />
        <CalendarGrid
          calendarData={calendarData}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
        />
      </div>
    </div>
  )
}

export default CalendarBody
