import { NewCalendarData } from "@miti/types"
import NepaliDate from "nepali-datetime"

type TimelineViewProps = {
  monthData: NewCalendarData[]
  scope: "week" | "day"
}

const currentTime = new Date()

const Day = ({ monthData }: { monthData: NewCalendarData[] }) => {
  return (
    <div className="flex">
      <div className="divide divide-y divide-indigo-200 dark:divide-indigo-800 border-r border-indigo-200 dark:border-indigo-800">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="h-[120px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center px-2 text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            {i === 0
              ? "12:00 AM"
              : i < 12
              ? `${i}:00 AM`
              : i === 12
              ? "12:00 PM"
              : `${i - 12}:00 PM`}
          </div>
        ))}
      </div>
      <div className="flex-1 divide-y divide-indigo-200 dark:divide-indigo-800">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="h-[120px] flex flex-1 items-center justify-center px-2 text-sm font-semibold dark:bg-gray-900"
          >
            {currentTime.getHours() === i && (
              <div className="relative h-full w-full">
                <div
                  className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 origin-center"
                  style={{
                    top: (currentTime.getMinutes() / 60) * 100 + "%",
                  }}
                >
                  <div className="relative flex items-center justify-center size-2">
                    <span className="absolute w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 z-10"></span>
                    <span className="absolute w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 animate-ping z-0"></span>
                  </div>
                </div>
                <div
                  className="absolute h-0.5 w-full bg-red-500 dark:bg-red-400"
                  style={{
                    top: `calc(${
                      (currentTime.getMinutes() / 60) * 100
                    }% - 1px)`,
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const Week = ({ monthData }: { monthData: NewCalendarData[] }) => {
  const currentNepaliDate = new NepaliDate().getDate()

  const weekData = monthData.filter((data) => {
    return (
      Number.parseInt(data.calendarInfo.dates.bs.day.en ?? "") ===
        currentNepaliDate ||
      (Number.parseInt(data.calendarInfo.dates.bs.day.en ?? "") >=
        currentNepaliDate - 3 &&
        Number.parseInt(data.calendarInfo.dates.bs.day.en ?? "") <=
          currentNepaliDate + 3)
    )
  })

  return (
    <div className="flex flex-col divide-y divide-indigo-200 dark:divide-indigo-800">
      {weekData.map((data) => (
        <div className="h-[120px] flex items-center">
          <div className="px-2 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 h-full w-20">
            <p className="dark:text-gray-300">
              {data.calendarInfo.dates.bs.day.np}
            </p>
            <p className="dark:text-gray-400">
              {data.calendarInfo.days.dayOfWeek.np}
            </p>
          </div>
          <div className="flex-1 dark:bg-gray-900">
            {data.eventDetails.map((event) => {
              return (
                <div className="px-2 flex flex-col items-center justify-center h-full w-full">
                  <p className="dark:text-gray-300">{event.title.np}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

const TimelineView = ({ monthData, scope }: TimelineViewProps) => {
  return (
    <div className="rounded-xl overflow-y-auto max-h-[600px] border border-indigo-200 dark:border-indigo-800 overflow-hidden">
      {generateTimeline(scope, monthData)}
    </div>
  )
}

const generateTimeline = (
  scope: TimelineViewProps["scope"],
  monthData: TimelineViewProps["monthData"]
) => {
  switch (scope) {
    case "day":
      return <Day monthData={monthData} />
    case "week":
      return <Week monthData={monthData} />
  }
}

export default TimelineView
