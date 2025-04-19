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

type CalendarGridProps = {
  monthData: NewCalendarData[]
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ monthData }) => {
  const [dayDialogOpen, setDayDialogOpen] = useState(false)
  const [dayDialogData, setDayDialogData] = useState<NewCalendarData | null>(
    null
  )

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

  return (
    <div className="rounded-xl max-w-4xl shadow-md overflow-hidden border ">
      <div className="grid grid-cols-7 bg-gray-100">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={day}
            className={cn(
              "py-2 sm:py-3 text-center text-xs sm:text-sm  text-black",
              index === 6 && "text-red-600"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px sm:p-2 bg-white sm:gap-2">
        {monthData.map((day) => {
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
                "h-auto min-h-[60px] sm:aspect-square sm:min-h-[80px] p-1 sm:p-2 transition-all duration-200 hover:bg-indigo-50 group sm:rounded-lg",
                isHoliday && "bg-red-50/80 hover:bg-red-100/80",
                isToday && "bg-indigo-50",
                isHoliday && isToday && "bg-red-100"
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
                  <p
                    className={cn(
                      "text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5",
                      isHoliday ? "text-red-700" : "text-gray-600"
                    )}
                  >
                    {day.calendarInfo.dates.ad.day.np}
                  </p>

                  <p className="text-[10px] sm:text-xs text-gray-500 hidden md:block truncate max-w-[60%]">
                    {day.tithiDetails?.title.np}
                  </p>
                </div>

                <p
                  className={cn(
                    "text-center text-base sm:text-lg md:text-2xl font-medium",
                    isHoliday && "text-red-600",
                    isToday && "text-indigo-700 font-bold",
                    isToday && isHoliday && "text-red-700"
                  )}
                >
                  {day.calendarInfo.dates.bs.day.np}
                </p>

                <div className="mt-auto">
                  {eventsCount > 0 && (
                    <div className="flex justify-center items-center mt-1">
                      <div className="flex justify-center items-center">
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
                              className={`mx-[1px] inline-block size-1 rounded-full`}
                            ></span>
                          ))}
                      </div>
                      {eventsCount > 2 && (
                        <span className="text-[10px] text-gray-500">
                          +{eventsCount - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {day.eventDetails.length > 0 && (
                    <p className="text-[10px] mt-1 sm:text-xs text-center hidden sm:block truncate text-indigo-700 font-medium">
                      {day.eventDetails[0]?.title.np}
                    </p>
                  )}
                </div>
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
