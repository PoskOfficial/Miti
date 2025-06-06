import React, { useState } from "react"
import { cn } from "@/lib/utils"
import EventIcon from "../icons/EventIcon"
import ListIcon from "../icons/ListIcon"
import YearMonthPicker from "../YearMonthPicker"
import NepaliDate from "nepali-datetime"
import { useTranslation } from "react-i18next"

type CalendarHeaderProps = {
  currentNepaliDate: NepaliDate
  setCurrentNepaliDate: (date: NepaliDate) => void
  view: "calendar" | "event"
  setView: (view: "calendar" | "event") => void
  scope: "week" | "day"
  setScope: (scope: "week" | "day") => void
}
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentNepaliDate,
  setCurrentNepaliDate,
  view,
  setView,
  scope,
  setScope,
}) => {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-4 place-content-center  items-center my-2">
      <div className="flex gap-2">
        {/* <div className="bg-gray-200 w-fit h-fit rounded-lg">
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
        </div> */}
        <div>
          <button
            className="flex py-2 px-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 items-center gap-1.5 text-xs font-medium text-gray-900 dark:text-gray-100 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setCurrentNepaliDate(new NepaliDate())}
          >
            {t("navbar.today")}
          </button>
        </div>
      </div>
      <YearMonthPicker
        className="col-span-2 w-full md:w-fit"
        currentNepaliDate={currentNepaliDate}
        setCurrentNepaliDate={setCurrentNepaliDate}
      />
      {/* <div className="col-start-2 row-start-1 md:row-start-1 md:col-start-4">
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
            </div>
          )}
          <button
            className="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
            aria-label="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>{" "}
        </div>
      </div> */}
    </div>
  )
}

export default CalendarHeader
