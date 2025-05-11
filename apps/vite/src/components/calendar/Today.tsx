import useLanguage from "@/helper/useLanguage"
import { NewCalendarData } from "@miti/types"
import { useTranslation } from "react-i18next"

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
        <div className="flex border rounded-xl min-w-80  shadow-md">
          <div className=" bg-gradient-to-br from-indigo-400 to-blue-500 p-3 px-6 rounded-l-xl shadow-inner flex flex-col items-center justify-center">
            <div className="text-3xl font-semibold text-white">
              {/* {data.calendarInfo.dates.ad.day.np} */}
              {isNepaliLanguage
                ? data.calendarInfo.dates.bs.day.np
                : data.calendarInfo.dates.ad.day.en}
            </div>
            <div className="text-sm text-white tracking-wide">
              {/* {data.calendarInfo.days.dayOfWeek.np} */}
              {isNepaliLanguage
                ? data.calendarInfo.days.dayOfWeek.np
                : data.calendarInfo.days.dayOfWeek.en}
            </div>
          </div>

          {/* Right content area */}
          <div className="p-4 flex-grow bg-white rounded-r-2xl">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-bold text-gray-800">
                  {/* {data.calendarInfo.dates.bs.month.np},{" "}
                  {data.calendarInfo.dates.bs.year.np} */}
                  {isNepaliLanguage
                    ? data.calendarInfo.dates.bs.month.np
                    : data.calendarInfo.dates.ad.month.en}{" "}
                  {isNepaliLanguage
                    ? data.calendarInfo.dates.bs.year.np
                    : data.calendarInfo.dates.ad.year.en}
                </div>
                <div className="text-sm text-gray-600">
                  ने.सं. {data.calendarInfo.nepaliEra.nepalSambat.year.np},{" "}
                  {data.calendarInfo.nepaliEra.nepalSambat.month.np}
                </div>
              </div>

              <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700">
                {t("navbar.today")}
              </div>
            </div>

            {/* Sun/Moon times with custom styling */}
            <div className="mt-4 flex items-center gap-8">
              <div className="flex items-end gap-2">
                <img
                  src="https://img.icons8.com/color/48/000000/sunrise.png"
                  alt="sunrise"
                  className="size-6"
                />
                <div className="text-sm text-gray-500 font-medium">
                  {data.panchangaDetails?.times.sunrise ?? "--:--"}
                </div>
              </div>

              <div className="flex items-end gap-2">
                <img
                  src="https://img.icons8.com/color/48/000000/sunset.png"
                  alt="sunset"
                  className="size-6"
                />
                <div className="text-sm text-gray-500 font-medium">
                  {data.panchangaDetails?.times.sunset ?? "--:--"}
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
  <div className="flex flex-col rounded-lg">
    <div className="flex items-center space-x-4">
      <div className="animate-pulse rounded-lg bg-gray-200 text-center w-16 h-16 flex flex-col gap-1 items-center justify-center">
        <div>
          <div className="h-6 w-8 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-10 bg-gray-300 rounded-md mt-1"></div>
        </div>
      </div>
      <div className="flex-1">
        <span className="flex flex-row">
          <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
        </span>
        <div className="h-4 w-24 bg-gray-300 rounded-md mt-2"></div>
        <div className="h-3 w-20 bg-gray-300 rounded-md mt-1"></div>
      </div>
    </div>
    <div className="py-8"></div>
  </div>
)

export default Today
