import React, { useEffect, useMemo, useState } from "react"
import CalendarHeader from "../components/calendar/CalendarHeader"
import CalendarGrid from "../components/calendar/CalendarGrid"
import EventList from "../components/calendar/EventList"
import Today from "../components/calendar/Today"
import Debugger from "../components/Debugger"
import CurrencyConverterCard from "../components/extras/CurrencyConverterCard"
import DateConverter from "../components/extras/DateConverter"
import MetalPrice from "../components/extras/MetalPrice"
import { useNavigate, useParams } from "react-router-dom"
import NepaliDate from "nepali-datetime"
import { useCalendarData, useTodayData } from "@miti/query/calendar"
import { NewCalendarData } from "@miti/types"
import TimelineView from "@/components/calendar/TimelineView"

const Calendar = () => {
  const { BSYear, BSMonth } = useParams()
  const [view, setView] = useState<"calendar" | "event">("calendar")
  const [scope, setScope] = useState<"month" | "week" | "day">("week")

  const validYearAndMonth = useMemo(() => {
    if (!BSYear || !BSMonth) return new NepaliDate()
    const year = parseInt(BSYear)
    const month = parseInt(BSMonth)
    const isValid = year >= 2075 && year <= 2082 && month >= 1 && month <= 12

    if (isValid) return new NepaliDate(year, month - 1, 1)
    return new NepaliDate()
  }, [BSYear, BSMonth])

  const [currentNepaliDate, setCurrentNepaliDate] =
    useState<NepaliDate>(validYearAndMonth)

  const navigate = useNavigate()

  useEffect(() => {
    navigate(
      `/calendar/${currentNepaliDate.getYear()}/${
        currentNepaliDate.getMonth() + 1
      }`,
      { replace: true }
    )
  }, [currentNepaliDate, navigate])

  const { data: calendarData } = useCalendarData(currentNepaliDate)

  const currentMonth = currentNepaliDate.getMonth() + 1

  const monthData = useMemo(() => {
    if (!calendarData) return []
    return calendarData
  }, [calendarData, currentMonth]) as unknown as NewCalendarData[]

  const { data: todayData, isLoading: todayDataLoading } = useTodayData(
    new NepaliDate()
  )

  return (
    <section className="relative bg-white container">
      <Debugger />
      <div className="w-full pt-4 max-w-7xl mx-auto">
        <div className="flex flex-col  lg:flex-row gap-2">
          <div className="px-2">
            <CalendarHeader
              currentNepaliDate={currentNepaliDate}
              setCurrentNepaliDate={setCurrentNepaliDate}
              view={view}
              setView={setView}
              scope={scope}
              setScope={setScope}
            />
            {view === "calendar" ? (
              <CalendarGrid monthData={monthData} />
            ) : (
              <TimelineView monthData={monthData} scope={scope} />
            )}
          </div>
          <div className="mt-4 mx-2">
            <Today data={todayData} isLoading={todayDataLoading} />
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-700 mb-2 ">Events</h2>
              <EventList data={monthData} />
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-700 mb-2 ">
                Holidays
              </h2>
              <EventList data={monthData} isHoliday />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {/* <MetalPrice /> */}
        {/* <CurrencyConverterCard
          initialAmount={1}
          exchangeRate={134.21}
          fromCurrency="USD"
          toCurrency="NPR"
        /> */}
        {/* <DateConverter /> */}
      </div>
    </section>
  )
}

export default Calendar
