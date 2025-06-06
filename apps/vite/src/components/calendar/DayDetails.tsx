import { cn } from "@/lib/utils"
import { NewCalendarData } from "@miti/types"
import Panchang from "./Panchang"
import CalendarEvents from "./CalendarEvents"
import UserEvents from "./UserEvents"

import { useUser } from "@miti/query/user"
import { apiBaseUrl } from "@/helper/api"
import useLanguage from "@/helper/useLanguage"

export function DayDetail({ dayData }: { dayData: NewCalendarData }) {
  const { status } = useUser(apiBaseUrl)
  const isHoliday =
    dayData.eventDetails.filter((event) => event.isHoliday).length !== 0 ||
    dayData.calendarInfo.days.codes.en === "7"
  const calendarEvents = dayData.eventDetails

  const { isNepaliLanguage } = useLanguage()
  return (
    <div className="scrollbar-thin-transparent overflow-y-auto">
      <div className="flex items-center space-x-4 rounded-lg">
        <div
          className={cn(
            "flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg bg-gray-200 text-center dark:bg-gray-700",
            isHoliday &&
              "bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-400"
          )}
        >
          <div>
            <p className="text-2xl font-semibold dark:text-gray-100">
              {isNepaliLanguage
                ? dayData.calendarInfo.dates.bs.day.np
                : dayData.calendarInfo.dates.ad.day.en}
            </p>
            <p className="text-xs dark:text-gray-300">
              {/* {dayData.calendarInfo.days.dayOfWeek.np} */}
              {isNepaliLanguage
                ? dayData.calendarInfo.days.dayOfWeek.np
                : dayData.calendarInfo.days.dayOfWeek.en}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <span className="flex flex-row">
            <p className="flex-1 text-left text-2xl font-bold dark:text-gray-100">
              {isNepaliLanguage
                ? dayData.calendarInfo.dates.bs.month.np
                : dayData.calendarInfo.dates.ad.month.en}
              ,
              {isNepaliLanguage
                ? dayData.calendarInfo.dates.bs.year.np
                : dayData.calendarInfo.dates.ad.year.en}
            </p>
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {dayData.tithiDetails?.title.np},{" "}
            {dayData.panchangaDetails?.pakshya.np}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            ने.सं. {dayData.calendarInfo.nepaliEra.nepalSambat.year.np},{" "}
            {dayData.calendarInfo.nepaliEra.nepalSambat.month.np}
          </p>
        </div>
        <div className="my-4 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/color/48/000000/sunrise.png"
              alt="sunrise"
              className="size-8"
            />
            <p className="text-md text-gray-600 dark:text-gray-400">
              {dayData.panchangaDetails?.times.sunrise}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/color/48/000000/sunset.png"
              alt="sunrise"
              className="size-8"
            />
            <p className="text-md text-gray-600 dark:text-gray-400">
              {dayData.panchangaDetails?.times.sunset}
            </p>
          </div>
        </div>
      </div>
      <div className="my-4">
        {status === "LOGGED_IN" && (
          <UserEvents
            selectedDate={dayData.calendarInfo.dates.ad.full.en ?? ""}
          />
        )}
        <CalendarEvents events={calendarEvents} />
      </div>
      <div>
        <Panchang data={dayData} />
      </div>
    </div>
  )
}
