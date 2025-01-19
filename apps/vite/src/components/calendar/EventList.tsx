import React from "react"
import UpcomingEvent from "./UpcomingEvent"
import { EventDetail, NewCalendarData } from "@miti/types"
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
  const newEventDetails: Event[] = []

  data.forEach((day) => {
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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg min-w-80 ">
      <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">
        {title}
      </h2>
      <div className="space-y-4">
        {isHoliday && (
          <>
            {newEventDetails
              .filter(
                (event) =>
                  event.isHoliday &&
                  !isBefore(new Date(event.enDate), new Date())
              )
              .map((event, index) => (
                <UpcomingEvent key={index} event={event} isHoliday />
              ))}
          </>
        )}

        {!isHoliday &&
          newEventDetails
            .filter(
              (event) =>
                !event.isHoliday &&
                !isBefore(new Date(event.enDate), new Date())
            )
            .map((event, index) => <UpcomingEvent key={index} event={event} />)}
      </div>
    </div>
  )
}

export default EventList
