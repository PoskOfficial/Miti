import { NewCalendarData } from "@miti/types"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import NepaliDate from "nepali-datetime"
import { isSameDay } from "date-fns"
import { DayDialog } from "./DayDialog"
import { DayDetail } from "./DayDetails"

type CalendarGridProps = {
  monthData: NewCalendarData[]
  timelineMode: boolean
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  monthData,
  timelineMode,
}) => {
  const [dayDialogOpen, setDayDialogOpen] = useState(false)
  const [dayDialogData, setDayDialogData] = useState<NewCalendarData | null>(
    null
  )

  const handleDayClick = (dayData: NewCalendarData) => {
    setDayDialogData(dayData)
    setDayDialogOpen(true)
  }

  return (
    <div className="rounded-xl overflow-hidden">
      <div
        className="grid grid-cols-7 border-indigo-200
         bg-indigo-50
      "
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={day}
            className={cn(
              "py-3.5 border-r border-t first:rounded-tl-xl last:rounded-tr-xl border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600",
              index === 0 && "border-l"
            )}
          >
            {day}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 rounded-b-xl overflow-hidden border-indigo-200 border bg-gray-100 gap-0.5 md:gap-1
      "
      >
        {monthData?.map((day, index) => {
          const isToday = isSameDay(
            new Date(),
            new NepaliDate(
              day.calendarInfo.dates.bs.full.en ?? ""
            ).getDateObject()
          )

          const isHoliday =
            day.eventDetails.filter((event) => event.isHoliday).length > 0 ||
            day.calendarInfo.days.codes.en === "7"

          return (
            <button
              key={day.calendarInfo.dates.bs.day.np}
              className={cn(
                "flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white  border-indigo-200 transition-all duration-300 hover:bg-gray-200/80 cursor-pointer relative",
                isHoliday && "text-red-500",
                isToday && " text-indigo-600"
              )}
              style={
                index === 0
                  ? {
                      gridColumnStart: day.calendarInfo.days.codes.en!,
                    }
                  : {}
              }
              onClick={() => handleDayClick(day)}
            >
              <div className="w-full h-full flex flex-col">
                <div className="flex flex-row justify-between">
                  <p className={cn("text-xs")}>
                    {day.calendarInfo.dates.ad.day.np}
                  </p>
                  {!timelineMode && (
                    <p className="text-xs hidden xl:block">
                      {day.tithiDetails?.title.np}
                    </p>
                  )}
                </div>
                <p className="grow w-full flex items-center justify-center text-xl md:text-3xl lg:text-4xl text-center font-semibold my-auto line-clamp-1">
                  {day.calendarInfo.dates.bs.day.np}
                </p>
                {!timelineMode && (
                  <p className="text-xs flex-1 text-center hidden xl:block">
                    {day.eventDetails[0]?.title.np}
                  </p>
                )}
              </div>

              {index % 3 === 0 && (
                <div className="absolute bottom-1 left-1 p-1.5 h-max rounded xl:bg-emerald-50 z-10 flex-row">
                  <p className="hidden xl:block text-xs font-medium text-emerald-600 mb-px whitespace-nowrap">
                    Developer Meetup
                  </p>
                  <p className="xl:hidden w-2 h-2 rounded-full bg-emerald-600" />
                  <p className="hidden xl:block text-xs font-medium text-emerald-600 mb-px whitespace-nowrap">
                    Developer Meetup
                  </p>
                  <p className="xl:hidden w-2 h-2 rounded-full bg-emerald-600" />
                </div>
              )}
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
