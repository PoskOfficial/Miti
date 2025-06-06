import useLanguage from "@/helper/useLanguage"
import { cn } from "@/lib/utils"
import { EventDetail } from "@miti/types"
import { CalendarFold } from "lucide-react"
import { useTranslation } from "react-i18next"
interface CalendarEventsProps {
  events: EventDetail[]
}
const CalendarEvents = ({ events }: CalendarEventsProps) => {
  const { t } = useTranslation()
  const { isNepaliLanguage } = useLanguage()
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-indigo-600 dark:text-indigo-400">
          <CalendarFold />
        </span>

        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {t("modal.Calendar_Events")}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={index}
              className={cn(
                "p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm",
                event.isHoliday && "bg-red-100 dark:bg-red-900/50"
              )}
            >
              <div>
                <h4
                  className={cn(
                    "text-sm font-semibold text-gray-800 dark:text-gray-100",
                    event.isHoliday && "text-red-600 dark:text-red-400"
                  )}
                >
                  {isNepaliLanguage
                    ? event.title.np
                    : event.title.en ?? event.title.np}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isNepaliLanguage
                    ? event.details.np
                    : event.details.en ?? event.details.np}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No events available
          </p>
        )}
      </div>
    </div>
  )
}

export default CalendarEvents
