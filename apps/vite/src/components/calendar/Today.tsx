import React, { useState } from "react"
import { cn } from "@/lib/utils"
import Panchang from "./Panchang"
import { NewCalendarData } from "@miti/types"
import NepaliDate from "nepali-datetime"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"

type TodayProps = {
  data: NewCalendarData | undefined
  isLoading: boolean
}

const Today = ({ data, isLoading }: TodayProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const today = new NepaliDate()

  return (
    <div className=" bg-white shadow-md flex-row items-center border rounded-lg min-w-80 p-4">
      {/* Top Section */}
      <div>
        {!isLoading && data ? (
          <>
            <div className="flex items-center space-x-4 rounded-lg">
              <div
                className={cn(
                  "rounded-lg bg-gray-200 text-center w-16 h-16 flex flex-col gap-1 items-center justify-center",
                  (data.eventDetails.find((event) => event.isHoliday) ||
                    data.calendarInfo.days.codes.en === "7") &&
                    "text-red-500 bg-red-100"
                )}
              >
                <div>
                  <p className="text-2xl font-semibold ">
                    {data.calendarInfo.dates.bs.day.np}
                  </p>
                  <p className="text-sm font-semibold ">
                    {data.calendarInfo.days.dayOfWeek.np}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <span className="flex flex-row">
                  <p className="font-bold text-left flex-1 text-2xl">
                    {data.calendarInfo.dates.bs.month.np},
                    {data.calendarInfo.dates.bs.year.np}
                  </p>
                </span>
                <p className="text-sm text-gray-600">
                  {data.tithiDetails?.title.np},{" "}
                  {data.panchangaDetails?.pakshya.np}
                </p>
                <p className="text-xs text-gray-500">
                  ने.सं. {data.calendarInfo.nepaliEra.nepalSambat.year.np},{" "}
                  {data.calendarInfo.nepaliEra.nepalSambat.month.np}
                </p>
              </div>
            </div>
            <div className="flex my-4 justify-between">
              <img
                src="https://img.icons8.com/color/48/000000/sunrise.png"
                alt="sunrise"
                className="h-6 w-6"
              />
              <p className="text-sm text-gray-600">
                सूर्योदय: {data.panchangaDetails?.times.sunrise}
              </p>
              <img
                src="https://img.icons8.com/color/48/000000/sunset.png"
                alt="sunrise"
                className="h-6 w-6"
              />
              <p className="text-sm text-gray-600">
                सूर्यास्त: {data.panchangaDetails?.times.sunset}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="text-sm rounded-lg flex-1 items-end text-end transition-all duration-300 text-indigo-500 hover:text-indigo-600"
                onClick={() => setIsOpen(!isOpen)}
              >
                आजको पंचांग{" "}
                {isOpen ? (
                  <CaretUpIcon className="inline" />
                ) : (
                  <CaretDownIcon className="inline" />
                )}
              </button>
            </div>
          </>
        ) : (
          Today.skeleton
        )}
      </div>
      {isOpen && data && <Panchang data={data} />}
    </div>
  )
}

Today.skeleton = (
  <div className="flex flex-col rounded-lg">
    <div className="flex items-center space-x-4">
      <div className="animate-pulse rounded-lg bg-gray-200 text-center w-16 h-16 flex flex-col gap-1 items-center justify-center">
        <div>
          <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-10 bg-gray-300 rounded-md mt-1"></div>
        </div>
      </div>
      <div className="flex-1">
        <span className="flex flex-row">
          <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
        </span>
        <div className="h-4 w-24 bg-gray-300 rounded-md mt-2"></div>
        <div className="h-3 w-20 bg-gray-300 rounded-md mt-1"></div>
      </div>
    </div>
    <div className="py-8"></div>
  </div>
)

export default Today
