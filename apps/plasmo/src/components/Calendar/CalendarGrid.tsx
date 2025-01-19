import React from "react"

import { CalendarDay } from "./CalendarDay"
import type { ProcessedDay } from "./types/types"

interface CalendarGridProps {
  calendarData: ProcessedDay[][]
  selectedDay: ProcessedDay | null
  onDaySelect: (day: ProcessedDay) => void
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  calendarData,
  selectedDay,
  onDaySelect
}) => {
  return (
    <div className="plasmo-grid plasmo-grid-cols-7 plasmo-gap-1 plasmo-auto-rows-fr">
      {calendarData.flat().map((day, index) => (
        <CalendarDay
          key={index}
          day={{ ...day, index }}
          isSelected={selectedDay?.index === index}
          onDayClick={onDaySelect}
        />
      ))}
    </div>
  )
}
