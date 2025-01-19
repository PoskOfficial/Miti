import React from "react"

import {
  calculateDaysDifference,
  getFormattedDate,
  getRelativeDayText
} from "./Calendar/helpers/dateUtils"
import type { ProcessedDay } from "./Calendar/types/types"

interface DateWithEventsProps {
  selectedDay: ProcessedDay | null
  todayBSDay: string | null
  selectedYear: string
  selectedMonth: string
}

const DateWithEvents: React.FC<DateWithEventsProps> = ({
  selectedDay,
  todayBSDay,
  selectedYear,
  selectedMonth
}) => {
  console.log(selectedDay)
  if (!selectedDay || selectedDay.empty) {
    return null
  }

  const { dayName, monthName, year } = getFormattedDate(
    selectedDay,
    selectedMonth,
    selectedYear
  )
  const diffDays = calculateDaysDifference(
    todayBSDay,
    selectedDay.NepaliNum,
    selectedYear,
    selectedMonth
  )

  return (
    <div className="plasmo-h-[22%] plasmo-w-full plasmo-border plasmo-border-slate-600 plasmo-rounded-lg plasmo-bg-slate-900 plasmo-text-white plasmo-p-4">
      <div className="plasmo-flex plasmo-items-start plasmo-gap-4">
        {/* Date Circle */}
        <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-gap-2">
          <div
            className={`plasmo-w-12 plasmo-h-12 plasmo-rounded-full plasmo-border 
            ${selectedDay.isHoliday || selectedDay.isWeekend ? "plasmo-border-red-400 plasmo-text-red-400" : "plasmo-border-gray-400 plasmo-text-gray-400"}
            plasmo-flex plasmo-items-center plasmo-justify-center`}>
            <span className="plasmo-text-xl">{selectedDay.NepaliNum}</span>
          </div>
          <span
            className={`${selectedDay.isHoliday || selectedDay.isWeekend ? "plasmo-text-red-400" : "plasmo-text-gray-400"}`}>
            {dayName}
          </span>
        </div>

        {/* Date Information */}
        <div className="plasmo-flex plasmo-flex-col">
          <div className="plasmo-text-xl">
            {`${monthName} ${selectedDay.date}, ${year}`}
          </div>
          <div className="plasmo-text-base plasmo-mt-2">
            {selectedDay.holidayTitle || "Regular Day"}
          </div>
          <div className="plasmo-text-sm plasmo-text-gray-400 plasmo-mt-1">
            {selectedDay.tithi || ""}
          </div>
        </div>

        {/* Relative Day Label */}
        <div className="plasmo-ml-auto">
          <span className="plasmo-text-gray-400 plasmo-text-[1rem]">
            {getRelativeDayText(diffDays)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DateWithEvents
