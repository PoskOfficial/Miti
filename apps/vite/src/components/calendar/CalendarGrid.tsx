import { CalendarEvent, NewCalendarData } from "@miti/types"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import NepaliDate from "nepali-datetime"
import { isSameDay } from "date-fns"
import { DayDialog } from "./DayDialog"
import { DayDetail } from "./DayDetails"
import { useQuery } from "@tanstack/react-query"
import { fetchUserEvents } from "@/helper/api"
import colors from "@/constants/colors"
import { getEventsOfSelectedDay } from "@/helper/events"
import useLanguage from "@/helper/useLanguage"
import nepaliNumber from "@/helper/nepaliNumber"

type CalendarGridProps = {
  monthData: NewCalendarData[]
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ monthData }) => {
  const [dayDialogOpen, setDayDialogOpen] = useState(false)
  const [dayDialogData, setDayDialogData] = useState<NewCalendarData | null>(
    null
  )
  const { isNepaliLanguage } = useLanguage()

  const handleDayClick = (dayData: NewCalendarData) => {
    setDayDialogData(dayData)
    setDayDialogOpen(true)
  }

  const { data: userEventsData } = useQuery<{ events: CalendarEvent[] }>({
    queryKey: [
      "userEvents",
      monthData[0]?.calendarInfo.dates.bs.year.en,
      monthData[0]?.calendarInfo.dates.bs.month.en,
    ],
    queryFn: () =>
      fetchUserEvents(
        monthData[0]?.calendarInfo.dates.ad.full.en ?? "",
        monthData[monthData.length - 1]?.calendarInfo.dates.ad.full.en ?? ""
      ),
    enabled: monthData.length > 0,
  })

  const userEvents = userEventsData?.events || []

  const dayNames = {
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    np: ["आ", "सो", "मं", "बु", "बि", "शु", "श"],
  }

  const days = isNepaliLanguage ? dayNames.np : dayNames.en

  return (
    <div className="rounded-xl max-w-4xl shadow-md overflow-hidden border dark:border-gray-700">
      <div className="grid grid-cols-7 bg-indigo-50 dark:bg-indigo-950/30">
        {days.map((day, index) => (
          <div
            key={day}
            className={cn(
              "py-3 text-center text-xs sm:text-sm font-medium border-b border-indigo-100 dark:border-indigo-900/30 dark:text-gray-300",
              index === 6 && "text-red-600 dark:text-red-400"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px sm:p-2 bg-white dark:bg-gray-900 sm:gap-2">
        {monthData.map((day) => {
          console.log(day.calendarInfo.dates.bs.full.en)
          const dayDate = new NepaliDate(
            day.calendarInfo.dates.bs.full.en || ""
          ).getDateObject()

          const isToday = isSameDay(new Date(), dayDate)
          const isHoliday =
            day.eventDetails.filter((event) => event.isHoliday).length > 0 ||
            day.calendarInfo.days.codes.en === "7"
          const singleDayUserEvents = Array.from(
            new Set(
              getEventsOfSelectedDay(
                userEvents,
                new Date(day.calendarInfo.dates.ad.full.en ?? new Date())
              ).map((event) => {
                return event?.colorId || false
              })
            )
          )
          const eventsCount = singleDayUserEvents.length

          return (
            <button
              key={day.calendarInfo.dates.bs.day.np}
              className={cn(
                "h-auto min-h-[60px] sm:aspect-square sm:min-h-[80px] p-1 sm:p-2 transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 group sm:rounded-lg",
                isHoliday &&
                  "bg-red-50/80 hover:bg-red-100/80 dark:bg-red-950/30 dark:hover:bg-red-950/50",
                isToday && "bg-indigo-50 dark:bg-indigo-950/30",
                isHoliday && isToday && "bg-red-100 dark:bg-red-950/50"
              )}
              style={
                monthData.indexOf(day) === 0
                  ? { gridColumnStart: day.calendarInfo.days.codes.en! }
                  : {}
              }
              onClick={() => handleDayClick(day)}
            >
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5",
                      isHoliday
                        ? "text-red-700 dark:text-red-400"
                        : "text-gray-600 dark:text-gray-300"
                    )}
                  >
                    {isNepaliLanguage
                      ? day.calendarInfo.dates.ad.day.np
                      : day.calendarInfo.dates.ad.day.en}
                  </span>

                  <span className="text-[10px] sm:text-xs text-gray-500 hidden md:block truncate max-w-[60%]">
                    {day.tithiDetails?.title.np}
                  </span>
                </div>

                <div className="flex justify-center items-center md:my-2">
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300",
                      isHoliday && "text-red-600 dark:text-red-400",
                      isToday &&
                        "text-indigo-700 dark:text-indigo-400 font-bold",
                      isToday &&
                        isHoliday &&
                        "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400"
                    )}
                  >
                    {isNepaliLanguage
                      ? day.calendarInfo.dates.bs.day.np
                      : day.calendarInfo.dates.bs.day.en}
                  </span>
                </div>

                <div className="mt-auto">
                  {eventsCount > 0 && (
                    <div className="flex justify-center items-center gap-1 mt-1">
                      {singleDayUserEvents
                        .splice(0, Math.min(eventsCount, 2))
                        .map((color, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: color
                                ? colors[color]
                                : "#475569",
                            }}
                            className="inline-block size-2 rounded-full dark:opacity-90"
                          ></span>
                        ))}
                      {eventsCount > 2 && (
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          +
                          {isNepaliLanguage
                            ? nepaliNumber((+eventsCount - 2).toString())
                            : +eventsCount - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {day.eventDetails.length > 0 && (
                    <p className="text-[10px] mt-1 sm:text-xs text-center hidden sm:block truncate text-indigo-700 dark:text-indigo-400">
                      {isNepaliLanguage
                        ? day.eventDetails[0]?.title.np
                        : day.eventDetails[0]?.title.en}
                    </p>
                  )}
                </div>
                <p className="md:hidden text-[10px] text-gray-500 dark:text-gray-400 truncate">
                  {day.tithiDetails?.title.np}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {dayDialogData && (
        <DayDialog
          open={dayDialogOpen}
          setOpen={setDayDialogOpen}
          children={<DayDetail dayData={dayDialogData} />}
        />
      )}
    </div>
  )
}

export default CalendarGrid
