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
        plasmo-p-2 plasmo-rounded-lg plasmo-tabular-nums
        ${day.empty ? "" : "plasmo-bg-white/5"}
        ${
          day.isHoliday || day.isWeekend
            ? "plasmo-text-rose-400"
            : "plasmo-text-slate-100"
        }
        ${isSelected ? "!plasmo-bg-indigo-600 plasmo-text-white" : ""}
        ${
          day.isToday && !isSelected
            ? "plasmo-border-2 plasmo-border-indigo-400"
            : "plasmo-border-2 plasmo-border-transparent"
        }
        plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center
        plasmo-transition-colors plasmo-duration-200
        ${day.empty ? "" : "plasmo-cursor-pointer hover:plasmo-bg-white/10 focus-visible:plasmo-outline-none focus-visible:plasmo-ring-2 plasmo-ring-indigo-500 active:plasmo-scale-[0.98]"}
        plasmo-aspect-square
        relative
      `}>
      {!day.empty && (
        <>
          <span className="plasmo-text-2xl plasmo-font-medium plasmo-font-mukta plasmo-leading-none">
            {day.NepaliNum}
          </span>
          <span
            className={`plasmo-text-xs plasmo-tabular-nums ${
              isSelected
                ? "plasmo-text-indigo-200"
                : day.isHoliday || day.isWeekend
                  ? "plasmo-text-rose-400"
                  : "plasmo-text-slate-400"
            }`}>
            {day.date}
          </span>
        </>
      )}
    </div>
  )
}
