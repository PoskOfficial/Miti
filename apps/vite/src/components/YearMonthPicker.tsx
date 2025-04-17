import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import useLanguage from "../helper/useLanguage"
import { availableYears } from "../constants/availableYears"
import { cn } from "@/lib/utils"
import DropDown from "./DropDown"
import NepaliDate from "nepali-datetime"
import { nepaliMonths } from "../constants/mahina"

const YearMonthPicker = ({
  currentNepaliDate,
  setCurrentNepaliDate,
  className,
}: {
  currentNepaliDate: NepaliDate
  setCurrentNepaliDate: (date: NepaliDate) => void
  className?: string
}) => {
  const { isNepaliLanguage } = useLanguage()
  const currentYear = currentNepaliDate.getYear()
  const currentMonth = currentNepaliDate.getMonth()

  const handleNextMonth = () => {
    if (currentMonth == 11) {
      setCurrentNepaliDate(new NepaliDate(currentYear + 1, 0, 1))
    } else {
      setCurrentNepaliDate(new NepaliDate(currentYear, currentMonth + 1, 1))
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth == 0) {
      setCurrentNepaliDate(new NepaliDate(currentYear - 1, 11, 1))
    } else {
      setCurrentNepaliDate(new NepaliDate(currentYear, currentMonth - 1, 1))
    }
  }

  const isPrevDisabled =
    currentMonth === 0 && currentYear === availableYears[0]?.en
  const isNextDisabled =
    currentMonth === 11 &&
    currentYear === availableYears[availableYears.length - 1]?.en

  return (
    <div className={cn("", className)}>
      <div className={cn("flex items-center justify-between  p-2 ")}>
        {/* Previous Month Button */}
        <button
          type="button"
          disabled={isPrevDisabled}
          className={cn(
            "flex items-center justify-center rounded-lg p-2 transition-all duration-200",
            isPrevDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          )}
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Month and Year Selector */}
        <div className="flex items-center justify-center gap-3 px-2">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Current Month Display/Dropdown */}
            <div className="relative">
              <DropDown
                selected={currentMonth}
                setSelected={(selectedMonth) =>
                  setCurrentNepaliDate(
                    new NepaliDate(currentYear, selectedMonth as number, 1)
                  )
                }
                items={nepaliMonths.map((month, index) => ({
                  label: isNepaliLanguage ? month.np : month.en,
                  value: index,
                }))}
                className="min-w-[120px] font-semibold text-indigo-800 border-indigo-200"
              />
            </div>

            {/* Current Year Display/Dropdown */}
            <div className="relative">
              <DropDown
                selected={currentYear}
                setSelected={(selectedYear) =>
                  setCurrentNepaliDate(
                    new NepaliDate(selectedYear as number, currentMonth, 1)
                  )
                }
                items={
                  isNepaliLanguage
                    ? availableYears.map((year) => ({
                        value: year.en,
                        label: year.np,
                      }))
                    : availableYears.map((year) => ({
                        value: year.en,
                        label: `${year.en}`,
                      }))
                }
                className="min-w-[120px] font-semibold text-indigo-800 border-indigo-200 "
              />
            </div>
          </div>

          {/* Optional: AD Month Display */}
          {nepaliMonths[currentMonth]?.ad && (
            <span className="hidden sm:inline-block text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {nepaliMonths[currentMonth]?.ad}
            </span>
          )}
        </div>

        {/* Next Month Button */}
        <button
          type="button"
          disabled={isNextDisabled}
          className={cn(
            "flex items-center justify-center rounded-lg p-2 transition-all duration-200",
            isNextDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          )}
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default YearMonthPicker
