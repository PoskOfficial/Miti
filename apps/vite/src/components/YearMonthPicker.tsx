import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import useLanguage from "../helper/useLanguage"
import { availableYears } from "../constants/availableYears"
import { cn } from "@/lib/utils"
import NepaliDate from "nepali-datetime"
import { nepaliMonths } from "../constants/mahina"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

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
      <div className={cn("flex items-center justify-between p-2")}>
        <Button
          variant="outline"
          size="icon"
          disabled={isPrevDisabled}
          className={cn(
            "flex items-center justify-center flex-shrink-0 disabled:cursor-not-allowed rounded-lg transition-all duration-200",
            isPrevDisabled
              ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
          )}
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Button>

        <div className="flex items-center justify-center gap-3 px-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <Select
              value={currentYear.toString()}
              onValueChange={(value) => {
                setCurrentNepaliDate(
                  new NepaliDate(parseInt(value), currentMonth, 1)
                )
              }}
            >
              <SelectTrigger className="min-w-[120px] font-semibold text-indigo-800 dark:text-indigo-300 outline-none ring-0 focus:ring-0">
                <SelectValue placeholder="Year" className="select-none" />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                {availableYears.map((year) => (
                  <SelectItem key={year.en} value={year.en.toString()}>
                    {isNepaliLanguage ? year.np : `${year.en}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={currentMonth.toString()}
              onValueChange={(value) => {
                setCurrentNepaliDate(
                  new NepaliDate(currentYear, parseInt(value), 1)
                )
              }}
            >
              <SelectTrigger className="min-w-[120px] font-semibold text-indigo-800 dark:text-indigo-300 outline-none ring-0 focus:ring-0">
                <SelectValue placeholder="Month" className="select-none" />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                {nepaliMonths.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {isNepaliLanguage ? month.np : month.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {nepaliMonths[currentMonth]?.ad && (
            <Badge
              variant="secondary"
              className="hidden sm:inline-block text-sm rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              {nepaliMonths[currentMonth]?.ad}
            </Badge>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          disabled={isNextDisabled}
          className={cn(
            "flex items-center justify-center disabled:cursor-not-allowed flex-shrink-0 rounded-lg transition-all duration-200",
            isNextDisabled
              ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
          )}
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

export default YearMonthPicker
