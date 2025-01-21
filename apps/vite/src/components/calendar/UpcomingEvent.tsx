import React from "react"
import { cn } from "@/lib/utils"
import { Event } from "./EventList"
import { relativeTimeFromDates } from "@/helper/dates"
import NepaliDate from "nepali-datetime"

const UpcomingEvent: React.FC<{
  event: Event
  isHoliday?: boolean
}> = ({ event, isHoliday }) => {
  return (
    <div className="flex items-center space-x-4 border rounded-lg p-2 ">
      <div
        className={cn(
          "rounded-lg text-center w-12 h-12 flex-row items-center justify-center",
          isHoliday ? "text-red-500 bg-red-50" : "text-gray-700 bg-gray-200 "
        )}
      >
        <p className="text-lg font-semibold">{event.date}</p>
        <p className="text-xs font-semibold">{event.day}</p>
      </div>
      <div className="flex-1">
        <span className="flex flex-row">
          <p
            className={cn(
              "font-bold text-left w-10 flex-1 text-ellipsis",
              isHoliday ? "text-red-500" : "text-gray-700"
            )}
          >
            {event.title}
          </p>
          <p className="text-xs text-gray-500 text-right bg-gray-100 rounded-xl px-1 py-[0.1rem]">
            {relativeTimeFromDates(new Date(event.enDate))}
          </p>
        </span>
        <p className="text-xs text-gray-500">{event.fullDate}</p>
      </div>
    </div>
  )
}

export default UpcomingEvent
