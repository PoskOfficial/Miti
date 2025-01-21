import React, { useEffect, useMemo, useState } from "react"
import CalendarHeader from "../components/calendar/CalendarHeader"
import CalendarGrid from "../components/calendar/CalendarGrid"
import EventList from "../components/calendar/EventList"
import Today from "../components/calendar/Today"
import Debugger from "../components/Debugger"
import CurrencyConverterCard from "../components/extras/CurrencyConverterCard"
import DateConverter from "../components/extras/DateConverter"
import MetalPrice from "../components/extras/MetalPrice"
import { useParams } from "react-router-dom"
import NepaliDate from "nepali-datetime"
import {
  useCalendarData,
  useNextMonthData,
  useTodayData,
} from "@miti/query/calendar"
import { NewCalendarData } from "@miti/types"
import TodayEventList from "@/components/calendar/TodayEventList"
import TimelineView from "@/components/calendar/TimelineView"

const Calendar2 = () => {
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

  useEffect(() => {
    history.replaceState(
      null,
      "",
      `/calendar/${currentNepaliDate.getYear()}/${
        currentNepaliDate.getMonth() + 1
      }`
    )
  }, [currentNepaliDate])

  const { data: calendarData } = useCalendarData(currentNepaliDate)

  const currentMonth = currentNepaliDate.getMonth() + 1

  const monthData = useMemo(() => {
    if (!calendarData) return []
    return calendarData
  }, [calendarData, currentMonth]) as unknown as NewCalendarData[]

  const { data: todayData, isLoading: todayDataLoading } = useTodayData(
    new NepaliDate()
  )

  const { data: nextMonthData, isLoading: nextMonthDataLoading } =
    useNextMonthData(currentNepaliDate)

  const combinedData = useMemo(() => {
    if (!nextMonthData || !calendarData) return []
    return [...calendarData, ...nextMonthData]
  }, [calendarData, nextMonthData])

  return (
    <section className="relative bg-stone-50 container">
      <Debugger />
      <div className="w-full relative">
        <div className="w-full px-2 py-2 mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col gap-4 order-2 sm:order-1 flex-wrap md:flex-nowrap">
              <Today data={todayData} isLoading={todayDataLoading} />
              {todayData?.eventDetails && (
                <TodayEventList data={todayData?.eventDetails} />
              )}
            </div>

            <div className="order-1 sm:order-2 px-2.5 py-5 flex-1 sm:p-4 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
              <CalendarHeader
                currentNepaliDate={currentNepaliDate}
                setCurrentNepaliDate={setCurrentNepaliDate}
                view={view}
                setView={setView}
                scope={scope}
                setScope={setScope}
              />
              {view === "calendar" ? (
                <CalendarGrid monthData={monthData} timelineMode={false} />
              ) : (
                <TimelineView monthData={monthData} scope={scope} />
              )}
            </div>
            <div className="flex flex-col gap-4 order-3 ">
              <EventList data={combinedData} title="आगामी इभेन्टहरु" />
              <EventList
                data={combinedData}
                title="आगामी बिदाहरु"
                isHoliday={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <MetalPrice />
        <CurrencyConverterCard
          initialAmount={1}
          exchangeRate={134.21}
          fromCurrency="USD"
          toCurrency="NPR"
        />
        <DateConverter />
      </div>
    </section>
  )
}

export default Calendar2
