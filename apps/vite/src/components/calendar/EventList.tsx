import React, { useMemo } from "react"
import UpcomingEvent from "./UpcomingEvent"
import { EventDetail, NewCalendarData } from "@miti/types"
import { ArrowRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import NepaliDate from "nepali-datetime"
import { isBefore } from "date-fns"

export type Event = {
  date: string
  enDate: string
  isHoliday: boolean
  day: string
  title: string
  fullDate: string
}

const EventList: React.FC<{
  data: NewCalendarData[]
  isHoliday?: boolean
  title?: string
}> = ({ data, isHoliday, title }) => {
  const { BSYear, BSMonth } = useParams()

  const today = new NepaliDate()
  const isThisMonth = useMemo(
    () =>
      today.getMonth() + 1 === Number(BSMonth) &&
      today.getYear() === Number(BSYear),
    [BSMonth, BSYear]
  )

  const newEventDetails: Event[] = []
  data.forEach((day) => {
    if (
      isThisMonth &&
      isBefore(
        new Date(day.calendarInfo.dates.ad.full.en ?? new Date()),
        new Date()
      )
    ) {
      return
    }
    if (day.eventDetails.length > 0) {
      day.eventDetails.forEach((event: EventDetail) => {
        newEventDetails.push({
          date: day.calendarInfo.dates.bs.day.np ?? "",
          enDate: day.calendarInfo.dates.ad.full.en ?? "",
          isHoliday: event.isHoliday,
          day: day.calendarInfo.days.dayOfWeek.np ?? "",
          title: event.title.np ?? "",
          fullDate: day.calendarInfo.dates.bs.full.np ?? "",
        })
      })
    }
  })
  const router = useNavigate()

  return (
    <div className=" bg-white min-w-80 ">
      <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">
        {title}
      </h2>
      {isHoliday && (
        <div className="space-y-2">
          {newEventDetails
            .filter((event) => event.isHoliday)
            .splice(0, 5)
            .map((event, index) => (
              <UpcomingEvent key={index} event={event} isHoliday />
            ))}
          <div className="flex justify-end">
            <button
              className="gap-1 flex items-center justify-center"
              onClick={() => {
                router(`/events/${BSYear}/${BSMonth}/?onlyHolidays=true`)
              }}
            >
              view all
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
      {!isHoliday && (
        <div className="space-y-2">
          {newEventDetails.splice(0, 5).map((event, index) => (
            <UpcomingEvent key={index} event={event} />
          ))}
          <div className="flex justify-end">
            <button
              className="gap-1 flex items-center justify-center"
              onClick={() => {
                router(`/events/${BSYear}/${BSMonth}`)
              }}
            >
              view all
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventList
