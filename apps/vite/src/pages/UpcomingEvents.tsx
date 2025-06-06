import NepaliDate from "nepali-datetime"
import { NewCalendarData } from "@miti/types"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState, useTransition } from "react"
import { useCalendarData } from "@miti/query/calendar"
import { Event } from "@/components/calendar/EventList"
import { Calendar, Calendar1, Clock } from "lucide-react"
import YearMonthPicker from "@/components/YearMonthPicker"
import { nepaliMonths } from "@/constants/mahina"
import { relativeTimeFromDates } from "@/helper/dates"
import useLanguage from "@/helper/useLanguage"
import { useTranslation } from "react-i18next"
function UpcomingEvents() {
  const { BSYear, BSMonth } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const onlyHolidays = searchParams.get("onlyHolidays") === "true"

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
    const baseUrl = `/events/${currentNepaliDate.getYear()}/${
      currentNepaliDate.getMonth() + 1
    }`
    const url = onlyHolidays ? `${baseUrl}?onlyHolidays=true` : baseUrl
    history.replaceState(null, "", url)
  }, [currentNepaliDate, onlyHolidays])

  const toggleHolidayFilter = () => {
    const baseUrl = `/events/${currentNepaliDate.getYear()}/${
      currentNepaliDate.getMonth() + 1
    }`
    if (onlyHolidays) {
      navigate(baseUrl)
    } else {
      navigate(`${baseUrl}?onlyHolidays=true`)
    }
  }

  const { data: calendarData } = useCalendarData(currentNepaliDate)

  const currentMonth = currentNepaliDate.getMonth() + 1

  const monthData = useMemo(() => {
    if (!calendarData) return []
    return calendarData
  }, [calendarData, currentMonth]) as unknown as NewCalendarData[]

  const eventDetails: Event[] = []
  monthData.forEach((day) => {
    if (day.eventDetails.length > 0) {
      day.eventDetails.forEach((event) => {
        eventDetails.push({
          date: day.calendarInfo.dates.bs.day.np ?? "",
          enDate: day.calendarInfo.dates.ad.full.en ?? "",
          isHoliday: event.isHoliday,
          day: day.calendarInfo.days.dayOfWeek.np ?? "",
          title: event.title.np ?? "",
          fullDate: day.calendarInfo.dates.bs.full.np ?? "",
          npDate: day.calendarInfo.dates.bs.full.np ?? "",
        })
      })
    }
  })

  const filteredEvents = useMemo(() => {
    if (onlyHolidays) {
      return eventDetails.filter((event) => event.isHoliday)
    }
    return eventDetails
  }, [eventDetails, onlyHolidays])

  const holidayCount = useMemo(() => {
    return eventDetails.filter((event) => event.isHoliday).length
  }, [eventDetails])

  const currentMonthName = useMemo(() => {
    return nepaliMonths[currentNepaliDate.getMonth()]
  }, [currentNepaliDate])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold dark:text-white">
            {onlyHolidays
              ? t("navbar.Upcoming_Holidays")
              : t("navbar.Upcoming_Events")}
            <span className="ml-2 text-xl font-medium text-gray-600 dark:text-gray-300">
              - {currentMonthName?.np} {currentNepaliDate.getYear()}
            </span>
          </h2>
          <div className="h-1 w-24 rounded bg-indigo-600"></div>
        </div>

        <YearMonthPicker
          className="w-full md:w-96"
          currentNepaliDate={currentNepaliDate}
          setCurrentNepaliDate={setCurrentNepaliDate}
        />

        <div className="mt-4 md:mt-0">
          <label className="inline-flex cursor-pointer items-center">
            <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("navbar.All_Events")}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={onlyHolidays}
                onChange={toggleHolidayFilter}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:bg-gray-700"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("navbar.Holidays_only")}
              {holidayCount > 0 && (
                <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                  {holidayCount}
                </span>
              )}
            </span>
          </label>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center shadow-sm dark:bg-gray-800">
          <div className="mb-3 text-gray-500 dark:text-gray-400">
            <Calendar className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {onlyHolidays
              ? "यस महिनामा कुनै बिदाहरू छैनन्।"
              : "यस महिनामा कुनै कार्यक्रमहरू छैनन्।"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  const { isNepaliLanguage } = useLanguage()
  console.log({ isNepaliLanguage })
  return (
    <div
      className={`overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md`}
    >
      <div className="bg-white p-5 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          <div
            className={`flex size-14 flex-shrink-0 flex-col items-center justify-center rounded-md ${
              event.isHoliday
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            <span className="text-xl font-bold">{event.date}</span>
            <span className="text-xs font-bold">{event.day}</span>
          </div>
          <div className="flex-grow">
            <h3
              className={`mb-1 text-sm font-semibold md:text-base ${
                event.isHoliday
                  ? "text-red-700 dark:text-red-400"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {event.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <Calendar1 className="h-4 w-4" />
              <span>{event.fullDate}</span>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                ({event.enDate})
              </div>
            </div>
          </div>
          <span className="inline-flex items-center text-nowrap rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {relativeTimeFromDates(new Date(event.enDate), isNepaliLanguage)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UpcomingEvents
