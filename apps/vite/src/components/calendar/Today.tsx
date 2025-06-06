import useLanguage from "@/helper/useLanguage"
import { NewCalendarData } from "@miti/types"
import { useTranslation } from "react-i18next"
import { CalendarClock, Cloud, Clock, Info, Moon } from "lucide-react"

type TodayProps = {
  data: NewCalendarData | undefined
  isLoading: boolean
}

const Today = ({ data, isLoading }: TodayProps) => {
  const { isNepaliLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <div className="md:mt-14 min-w-full">
      {!isLoading && data ? (
        <div className="border rounded-xl min-w-80 shadow-md overflow-hidden dark:border-gray-700">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-xl p-2 mr-4 shadow-inner flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-white">
                  {isNepaliLanguage
                    ? data.calendarInfo.dates.bs.day.np
                    : data.calendarInfo.dates.bs.day.en}
                </div>
                <div className="text-xs font-medium text-white/90 tracking-wide">
                  {isNepaliLanguage
                    ? data.calendarInfo.days.dayOfWeek.np
                    : data.calendarInfo.days.dayOfWeek.en}
                </div>
              </div>

              <div>
                <div className="text-lg font-bold text-white">
                  {isNepaliLanguage
                    ? data.calendarInfo.dates.bs.month.np
                    : data.calendarInfo.dates.bs.month.en}{" "}
                  {isNepaliLanguage
                    ? data.calendarInfo.dates.bs.year.np
                    : data.calendarInfo.dates.bs.year.en}
                </div>
                <div className="text-sm text-white/80">
                  {isNepaliLanguage ? "ने.सं." : "N.S."}{" "}
                  {data.calendarInfo.nepaliEra.nepalSambat.year.np},{" "}
                  {data.calendarInfo.nepaliEra.nepalSambat.month.np}
                </div>
                <div className="text-xs text-white/80 mt-1">
                  {isNepaliLanguage
                    ? data.calendarInfo.dates.ad.full.np
                    : data.calendarInfo.dates.ad.full.en}
                </div>
              </div>
            </div>

            <div className="bg-white/20 dark:bg-white/10 rounded-full px-3 py-1 text-xs text-white font-medium">
              {t("navbar.today")}
            </div>
          </div>

          {/* Main content area */}
          <div className="p-4 bg-white dark:bg-gray-900">
            {/* Sun/Moon times and astrological info */}
            <div className="gap-4">
              <div className="grid grid-cols-3 gap-3">
                {/* Sun times */}
                <div className="flex items-center gap-2">
                  <img
                    src="https://img.icons8.com/color/48/000000/sunrise.png"
                    alt="sunrise"
                    className="size-6"
                  />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t("today.Sunrise")}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.panchangaDetails?.times.sunrise ?? "--:--"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src="https://img.icons8.com/color/48/000000/sunset.png"
                    alt="sunset"
                    className="size-6"
                  />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t("today.Sunset")}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.panchangaDetails?.times.sunset ?? "--:--"}
                    </div>
                  </div>
                </div>

                {/* Tithi */}
                <div className="flex items-center gap-2">
                  <Clock
                    size={18}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t("today.Tithi")}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {data.tithiDetails?.title?.np}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        Today.skeleton
      )}
    </div>
  )
}

Today.skeleton = (
  <div className="border rounded-xl shadow-md overflow-hidden animate-pulse dark:border-gray-700">
    <div className="bg-gray-200 dark:bg-gray-800 p-4 px-6 flex items-center">
      <div className="bg-gray-300 dark:bg-gray-700 rounded-xl p-3 mr-4 w-16 h-16"></div>
      <div className="space-y-2">
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-3 w-36 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>
    <div className="p-4 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 grid grid-cols-2 gap-3">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 h-32"></div>
        </div>
      </div>
      <div className="mt-4 border-t dark:border-gray-800 pt-3">
        <div className="flex gap-4">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

export default Today
