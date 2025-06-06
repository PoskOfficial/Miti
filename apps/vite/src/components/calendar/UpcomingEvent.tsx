import React from "react"
import { cn } from "@/lib/utils"
import { Event } from "./EventList"
import { relativeTimeFromDates } from "@/helper/dates"

const UpcomingEvent: React.FC<{
  event: Event
  isHoliday?: boolean
}> = ({ event, isHoliday }) => {
  return (
    <div className="flex items-center space-x-4 border dark:border-gray-700 rounded-lg p-2">
      <div
        className={cn(
          "rounded-lg text-center w-12 h-12 flex-row items-center justify-center",
          isHoliday
            ? "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30"
            : "text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800"
        )}
      >
        <p className="text-lg font-semibold">{event.date}</p>
        <p className="text-xs font-semibold">{event.day}</p>
      </div>
      <div className="flex-1">
        <span className="flex flex-row items-start">
          <p
            className={cn(
              "font-bold text-left w-10 flex-1 text-ellipsis",
              isHoliday
                ? "text-red-500 dark:text-red-400"
                : "text-gray-700 dark:text-gray-300"
            )}
          >
            {event.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center px-1.5 py-1 rounded-xl bg-gray-100 dark:bg-gray-800">
            {relativeTimeFromDates(new Date(event.enDate))}
          </p>
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {event.fullDate}
        </p>
      </div>
    </div>
  )
}

export default UpcomingEvent
