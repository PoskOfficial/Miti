import React, { useState } from "react"
import { cn } from "@/lib/utils"
import EventIcon from "../icons/EventIcon"
import ListIcon from "../icons/ListIcon"
import YearMonthPicker from "../YearMonthPicker"
import NepaliDate from "nepali-datetime"

type CalendarHeaderProps = {
  currentNepaliDate: NepaliDate
  setCurrentNepaliDate: (date: NepaliDate) => void
  view: "calendar" | "event"
  setView: (view: "calendar" | "event") => void
  scope: "month" | "week" | "day"
  setScope: (scope: "month" | "week" | "day") => void
}
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentNepaliDate,
  setCurrentNepaliDate,
  view,
  setView,
  scope,
  setScope,
}) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-4 place-content-center items-center my-2">
      <div className="flex gap-2">
        <div className="bg-gray-200 w-fit h-fit rounded-lg">
          <button
            className={cn(
              "p-2 rounded-md bg-gray-200 border-2 border-gray-200 inline-flex",
              view === "calendar" ? "bg-white" : ""
            )}
            onClick={() => setView("calendar")}
          >
            <EventIcon />
          </button>
          <button
            className={cn(
              "p-2 rounded-md bg-gray-200 border-2 border-gray-200 inline-flex",
              view === "event" ? "bg-white" : ""
            )}
            onClick={() => setView("event")}
          >
            <ListIcon />
          </button>
        </div>
        <div>
          <button
            className="flex py-2 px-2 rounded-md bg-gray-50 border border-gray-300 items-center gap-1.5 text-xs font-medium text-gray-900 transition-all duration-500 hover:bg-gray-200"
            onClick={() => setCurrentNepaliDate(new NepaliDate())}
          >
            Today
          </button>
        </div>
      </div>
      <YearMonthPicker
        className="col-span-2 place-self-center w-full md:w-fit"
        currentNepaliDate={currentNepaliDate}
        setCurrentNepaliDate={setCurrentNepaliDate}
      />
      <div className="col-start-2 row-start-1 md:row-start-1 md:col-start-4">
        <div className="flex items-center justify-end gap-2 flex-1">
          {view === "event" && (
            <div className="flex items-center gap-px p-1 rounded-md bg-gray-100">
              <button
                className={cn(
                  "py-2 px-5 rounded-lg  text-xs font-medium text-gray-900 transition-all duration-300 hover:bg-white",
                  scope === "day" ? "bg-white" : "bg-gray-100"
                )}
                onClick={() => setScope("day")}
              >
                Day
              </button>
              <button
                className={cn(
                  "py-2 px-5 rounded-lg  text-xs font-medium text-gray-900 transition-all duration-300 hover:bg-white",
                  scope === "week" ? "bg-white" : "bg-gray-100"
                )}
                onClick={() => setScope("week")}
              >
                Week
              </button>
              <button
                className={cn(
                  "py-2 px-5 rounded-lg  text-xs font-medium text-gray-900 transition-all duration-300 hover:bg-white",
                  scope === "month" ? "bg-white" : "bg-gray-100"
                )}
                onClick={() => setScope("month")}
              >
                Month
              </button>
            </div>
          )}
          <button className="hidden sm:flex p-3 text-gray-500 items-center justify-center transition-all duration-300 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.7501 9.20285C17.4658 8.79486 17.7119 7.89657 17.3012 7.19137L16.559 5.91699C16.1385 5.19489 15.1995 4.94638 14.466 5.36301C13.4469 5.94185 12.1716 5.19438 12.1716 4.03885C12.1716 3.19732 11.4764 2.5 10.6188 2.5H9.17632C8.33949 2.5 7.66111 3.16571 7.66111 3.9869V4.09222C7.66111 5.19157 6.44713 5.8776 5.4782 5.3258C4.78224 4.92946 3.89057 5.16345 3.48911 5.84779L2.70103 7.19113C2.28763 7.89582 2.5327 8.79589 3.24919 9.20432C4.24554 9.77228 4.24337 11.1862 3.24904 11.7576C2.53341 12.1688 2.28715 13.0712 2.7009 13.7764L3.48911 15.12C3.89057 15.8043 4.78478 16.0369 5.48074 15.6406C6.4466 15.0905 7.66111 15.7719 7.66111 16.8677C7.66111 17.6529 8.30976 18.2895 9.10991 18.2895H10.6853C11.5061 18.2895 12.1716 17.6365 12.1716 16.831C12.1716 15.7075 13.4115 15.0058 14.4024 15.5686L14.466 15.6048C15.1995 16.0214 16.1385 15.7729 16.559 15.0508L17.3013 13.7762C17.7124 13.0704 17.4651 12.1699 16.7502 11.7591C15.7547 11.1871 15.7526 9.77146 16.7501 9.20285Z"
                stroke="currentcolor"
                strokeWidth="1.3"
              />
              <path
                d="M12.68 10.3947C12.68 11.8481 11.4794 13.0263 9.99834 13.0263C8.5173 13.0263 7.31668 11.8481 7.31668 10.3947C7.31668 8.94136 8.5173 7.76316 9.99834 7.76316C11.4794 7.76316 12.68 8.94136 12.68 10.3947Z"
                stroke="currentcolor"
                strokeWidth="1.3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarHeader
