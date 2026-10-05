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
    <div className="plasmo-h-[22%] plasmo-w-full plasmo-border plasmo-border-[#252d3d] plasmo-rounded-lg plasmo-bg-[#161b26] plasmo-text-slate-100 plasmo-p-4 plasmo-shadow-sm">
      <div className="plasmo-flex plasmo-items-start plasmo-gap-4">
        {/* Date Circle */}
        <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-gap-2">
          <div
            className={`plasmo-w-12 plasmo-h-12 plasmo-rounded-full plasmo-border plasmo-tabular-nums
            ${selectedDay.isHoliday || selectedDay.isWeekend ? "plasmo-border-rose-400 plasmo-text-rose-400" : "plasmo-border-slate-400 plasmo-text-slate-200"}
            plasmo-flex plasmo-items-center plasmo-justify-center`}>
            <span className="plasmo-text-xl plasmo-font-mukta">{selectedDay.NepaliNum}</span>
          </div>
          <span
            className={`${selectedDay.isHoliday || selectedDay.isWeekend ? "plasmo-text-rose-400" : "plasmo-text-slate-400"} plasmo-text-xs`}>
            {dayName}
          </span>
        </div>

        {/* Date Information */}
        <div className="plasmo-flex plasmo-flex-col plasmo-min-w-0">
          <div className="plasmo-text-xl plasmo-tracking-tight">
            {`${monthName} ${selectedDay.date}, ${year}`}
          </div>
          <div className="plasmo-text-base plasmo-mt-2 plasmo-text-slate-200">
            {selectedDay.holidayTitle || "Regular Day"}
          </div>
          <div className="plasmo-text-sm plasmo-text-slate-400 plasmo-mt-1">
            {selectedDay.tithi || ""}
          </div>
        </div>

        {/* Relative Day Label */}
        <div className="plasmo-ml-auto plasmo-flex-shrink-0">
          <span className="plasmo-text-slate-400 plasmo-text-[1rem] plasmo-tabular-nums">
            {getRelativeDayText(diffDays)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DateWithEvents
