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
import { useTranslation } from "react-i18next"
import { Loader2 } from "lucide-react"

const Calendar = () => {
  const { BSYear, BSMonth } = useParams()
  const [view, setView] = useState<"calendar" | "event">("calendar")
  const [scope, setScope] = useState<"week" | "day">("week")
  const { t } = useTranslation()

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

  const { data: calendarData, isLoading: monthDataLoading } =
    useCalendarData(currentNepaliDate)

  const currentMonth = currentNepaliDate.getMonth() + 1

  const monthData = useMemo(() => {
    if (!calendarData) return []
    return calendarData
  }, [calendarData, currentMonth]) as unknown as NewCalendarData[]

  const { data: todayData, isLoading: todayDataLoading } = useTodayData(
    new NepaliDate()
  )

  return (
    <section className="relative bg-white dark:bg-gray-900 container">
      <Debugger />
      <div className="w-full max-w-7xl mx-auto">
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
              <>
                {monthDataLoading ? (
                  <div className="flex justify-center items-center h-[50vh]">
                    <Loader2 className="animate-spin text-gray-500" size={32} />
                  </div>
                ) : (
                  <CalendarGrid monthData={monthData} />
                )}
              </>
            ) : (
              <TimelineView monthData={monthData} scope={scope} />
            )}
          </div>
          <div className="mt-4 mx-2">
            <Today data={todayData} isLoading={todayDataLoading} />
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                {t("navbar.Events")}
              </h2>
              <EventList data={monthData} isLoading={monthDataLoading} />
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                {t("navbar.Holidays")}
              </h2>
              <EventList
                data={monthData}
                isHoliday
                isLoading={monthDataLoading}
              />
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
