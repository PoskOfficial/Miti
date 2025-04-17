import { cn } from "@/lib/utils"
import { EventDetail } from "@miti/types"
import { CalendarFold } from "lucide-react"
interface CalendarEventsProps {
  events: EventDetail[]
}
const CalendarEvents = ({ events }: CalendarEventsProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-orange-600">
          <CalendarFold />
        </span>

        <h3 className="text-lg font-bold text-gray-800">Calendar Events</h3>
      </div>
      <div className="flex flex-col gap-2">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={index}
              className={cn(
                "p-4 bg-gray-100 rounded-lg shadow-sm",
                event.isHoliday && "bg-red-100 "
              )}
            >
              <div>
                <h4
                  className={cn(
                    "text-sm font-semibold text-gray-800",
                    event.isHoliday && "text-red-600"
                  )}
                >
                  {event.title.np}
                </h4>
                <p className="text-sm text-gray-600">{event.details.np}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events available</p>
        )}
      </div>
    </div>
  )
}

export default CalendarEvents
