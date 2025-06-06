import nepaliNumber from "@/helper/nepaliNumber"
import { cn } from "@/lib/utils"
import { EventDetail } from "@miti/types"
import NepaliDate from "nepali-datetime"

export default function TodayEventList({ data }: { data: EventDetail[] }) {
  return (
    <div className="p-4 shadow-lg dark:bg-gray-900">
      <h1 className="text-center text-xl font-semibold mb-2 dark:text-gray-100">
        आजको ईभेन्टहरु
      </h1>

      {data.length === 0 ? (
        <p className="text-center p-2 bg-rose-200 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg text-sm font-semibold">
          आज ईभेन्टहरु छैनन्।
        </p>
      ) : (
        <div>
          {data.map((event) => (
            <SingleEvent event={event} key={event.id} />
          ))}
        </div>
      )}
    </div>
  )
}

const SingleEvent = ({ event }: { event: EventDetail }) => (
  <div className="flex items-center space-x-4 border dark:border-gray-700 rounded-lg p-2">
    <div
      className={cn(
        "rounded-lg text-center w-12 h-12 flex items-center justify-center",
        event.isHoliday
          ? "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30"
          : "text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800"
      )}
    >
      <p className="text-xl font-semibold">
        {nepaliNumber(new NepaliDate().format("DD"))}
      </p>
    </div>
    <div className="flex-1">
      <span className="flex flex-row">
        <p
          className={cn(
            "font-bold text-left flex-1",
            event.isHoliday
              ? "text-red-500 dark:text-red-400"
              : "text-gray-700 dark:text-gray-300"
          )}
        >
          {event.title.np}
        </p>
      </span>
    </div>
  </div>
)
