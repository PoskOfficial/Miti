import React from "react"

import type { ProcessedDay } from "./types/types"

interface CalendarDayProps {
  day: ProcessedDay
  isSelected: boolean
  onDayClick: (day: ProcessedDay) => void
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isSelected,
  onDayClick
}) => {
  return (
    <div
      onClick={() => !day.empty && onDayClick(day)}
      className={`
        plasmo-p-2 plasmo-rounded-lg
        ${day.empty ? "" : "plasmo-bg-gray-800/50"}
        ${
          day.isHoliday || day.isWeekend
            ? "plasmo-text-red-500"
            : "plasmo-text-white"
        }
        ${isSelected ? "!plasmo-bg-blue-600" : ""}
        ${
          day.isToday && !isSelected
            ? "plasmo-border-2 plasmo-border-blue-400"
            : ""
        }
        plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center
        plasmo-transition-all plasmo-duration-200
        ${day.empty ? "" : "plasmo-cursor-pointer plasmo-hover:bg-gray-700/50"}
        plasmo-aspect-square
        relative
      `}>
      {!day.empty && (
        <>
          <span className="plasmo-text-2xl plasmo-font-medium">
            {day.NepaliNum}
          </span>
          <span
            className={`plasmo-text-xs ${
              isSelected
                ? "plasmo-text-blue-200"
                : day.isHoliday || day.isWeekend
                  ? "plasmo-text-red-400"
                  : "plasmo-text-gray-400"
            }`}>
            {day.date}
          </span>
        </>
      )}
    </div>
  )
}
