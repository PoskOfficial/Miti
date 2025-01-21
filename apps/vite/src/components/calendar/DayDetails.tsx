import { cn } from "@/lib/utils"
import { NewCalendarData } from "@miti/types"
import Panchang from "./Panchang"

export function DayDetail({ dayData }: { dayData: NewCalendarData }) {
  const isHoliday =
    dayData.eventDetails.filter((event) => event.isHoliday).length !== 0 ||
    dayData.calendarInfo.days.codes.en === "7"
  return (
    <div className="overflow-y-auto">
      <div className="flex items-center space-x-4 rounded-lg">
        <div
          className={cn(
            "rounded-lg bg-gray-200 text-center w-16 h-16 flex flex-col gap-1 items-center justify-center",
            isHoliday && "text-red-500 bg-red-100"
          )}
        >
          <div>
            <p className="text-2xl font-semibold ">
              {dayData.calendarInfo.dates.bs.day.np}
            </p>
            <p className="text-sm font-semibold ">
              {dayData.calendarInfo.days.dayOfWeek.np}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <span className="flex flex-row">
            <p className="font-bold text-left flex-1 text-2xl">
              {dayData.calendarInfo.dates.bs.month.np},
              {dayData.calendarInfo.dates.bs.year.np}
            </p>
          </span>
          <p className="text-sm text-gray-600">
            {dayData.tithiDetails?.title.np},{" "}
            {dayData.panchangaDetails?.pakshya.np}
          </p>
          <p className="text-xs text-gray-500">
            ने.सं. {dayData.calendarInfo.nepaliEra.nepalSambat.year.np},{" "}
            {dayData.calendarInfo.nepaliEra.nepalSambat.month.np}
          </p>
        </div>
        <div className="flex flex-col my-4 justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/color/48/000000/sunrise.png"
              alt="sunrise"
              className="size-8"
            />
            <p className="text-md text-gray-600">
              {dayData.panchangaDetails?.times.sunrise}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/color/48/000000/sunset.png"
              alt="sunrise"
              className="size-8"
            />
            <p className="text-md text-gray-600">
              {dayData.panchangaDetails?.times.sunset}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Panchang data={dayData} />
      </div>
    </div>
  )
}
