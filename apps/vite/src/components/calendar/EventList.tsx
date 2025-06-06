import React, { useMemo } from "react"
import UpcomingEvent from "./UpcomingEvent"
import { EventDetail, NewCalendarData } from "@miti/types"
import { ArrowRight, Calendar, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import NepaliDate from "nepali-datetime"
import { isBefore } from "date-fns"
import useLanguage from "@/helper/useLanguage"
import { cn } from "@/lib/utils"

export type Event = {
  date: string
  enDate: string
  isHoliday: boolean
  day: string
  title: string
  fullDate: string
  npDate: string
}

const EventList: React.FC<{
  data: NewCalendarData[]
  isHoliday?: boolean
  title?: string
  isLoading?: boolean
}> = ({ data, isHoliday, title, isLoading }) => {
  const { BSYear, BSMonth } = useParams()
  const { isNepaliLanguage } = useLanguage()
  const navigate = useNavigate()

  const today = new NepaliDate()
  const isThisMonth = useMemo(
    () =>
      today.getMonth() + 1 === Number(BSMonth) &&
      today.getYear() === Number(BSYear),
    [BSMonth, BSYear]
  )

  const newEventDetails: Event[] = []
  data.forEach((day) => {
    if (
      isThisMonth &&
      isBefore(
        new Date(day.calendarInfo.dates.ad.full.en ?? new Date()),
        new Date()
      )
    ) {
      return
    }
    if (day.eventDetails.length > 0) {
      day.eventDetails.forEach((event: EventDetail) => {
        newEventDetails.push({
          date: day.calendarInfo.dates.bs.day.np ?? "",
          enDate: day.calendarInfo.dates.ad.full.en ?? "",
          npDate: day.calendarInfo.dates.bs.full.np ?? "",
          isHoliday: event.isHoliday,
          day: day.calendarInfo.days.dayOfWeek.np ?? "",
          title: event.title.np ?? "",
          fullDate: day.calendarInfo.dates.bs.full.np ?? "",
        })
      })
    }
  })

  const filteredEvents = isHoliday
    ? newEventDetails.filter((event) => event.isHoliday)
    : newEventDetails

  const hasEvents = filteredEvents.length > 0

  const handleViewAll = () => {
    const path = isHoliday
      ? `/events/${BSYear}/${BSMonth}/?onlyHolidays=true`
      : `/events/${BSYear}/${BSMonth}`
    navigate(path)
  }

  const renderEmptyState = () => (
    <div
      className={cn(
        "flex gap-4 items-center p-4 rounded-lg border border-dashed border-gray-200 dark:border-gray-700",
        isHoliday
          ? "bg-rose-50 dark:bg-rose-900/30"
          : "bg-indigo-50 dark:bg-indigo-900"
      )}
    >
      <Calendar
        className={cn(isHoliday ? "text-rose-600" : "text-indigo-600")}
        size={24}
      />
      <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
        {/* {isHoliday ? "No holidays" : "No events"} */}
        {isNepaliLanguage
          ? isHoliday
            ? "छुट्टी छैन"
            : "कार्यक्रम छैन"
          : isHoliday
          ? "No holidays"
          : "No events"}
      </h3>
    </div>
  )

  return (
    <div className="bg-white dark:bg-gray-900 min-w-80 rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4 text-center">
        {title}
      </h2>

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <Loader2
            className="animate-spin text-gray-500 dark:text-gray-400"
            size={32}
          />
        </div>
      )}

      {!isLoading && !hasEvents && renderEmptyState()}

      {!isLoading && hasEvents && (
        <div className="space-y-3">
          {filteredEvents.slice(0, 5).map((event, index) => (
            <UpcomingEvent
              key={index}
              event={event}
              isHoliday={isHoliday && event.isHoliday}
            />
          ))}

          {filteredEvents.length > 5 && (
            <div className="flex justify-end pt-2">
              <button
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium gap-1 flex items-center justify-center transition-colors"
                onClick={handleViewAll}
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventList
