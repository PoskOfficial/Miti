import { Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

const CustomSelect = ({
  options,
  value,
  onChange,
  label
}: {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState(300)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const buttonRect = dropdownRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const spaceBelow = windowHeight - buttonRect.bottom
      setMaxHeight(Math.min(250, spaceBelow - 10))
    }
  }, [isOpen])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="plasmo-relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-w-full plasmo-px-2 plasmo-py-1.5 plasmo-text-xs plasmo-text-gray-200 plasmo-bg-gray-800 plasmo-border plasmo-border-gray-700 plasmo-rounded-md hover:plasmo-bg-gray-700 focus:plasmo-outline-none focus:plasmo-ring-2 plasmo-ring-blue-500">
        <span>{selectedOption?.label || label}</span>
        <ChevronDown className="plasmo-w-3 plasmo-h-3 plasmo-ml-1.5" />
      </button>

      {isOpen && (
        <div className="plasmo-absolute plasmo-z-10 plasmo-w-full plasmo-mt-1 plasmo-bg-gray-800 plasmo-border plasmo-border-gray-700 plasmo-rounded-md plasmo-shadow-lg">
          <div
            className="plasmo-space-y-0.5 plasmo-overflow-y-auto [&::-webkit-scrollbar]:plasmo-hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ maxHeight: `${maxHeight}px` }}>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="plasmo-flex plasmo-items-center plasmo-w-full plasmo-px-2 plasmo-py-1.5 plasmo-text-xs plasmo-text-left plasmo-text-gray-200 hover:plasmo-bg-gray-700">
                <span className="plasmo-flex-grow">{option.label}</span>
                {option.value === value && (
                  <Check className="plasmo-w-3 plasmo-h-3 plasmo-text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const MonthYearSelect = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange
}: {
  selectedYear: string
  selectedMonth: string
  onYearChange: (year: string) => void
  onMonthChange: (month: string) => void
}) => {
  const yearOptions = Array.from({ length: 21 }, (_, i) => ({
    value: (2070 + i).toString(),
    label: (2070 + i).toString()
  }))

  const nepaliMonths = {
    "01": "Baisakh",
    "02": "Jestha",
    "03": "Ashadh",
    "04": "Shrawan",
    "05": "Bhadra",
    "06": "Ashwin",
    "07": "Kartik",
    "08": "Mangsir",
    "09": "Poush",
    "10": "Magh",
    "11": "Falgun",
    "12": "Chaitra"
  }

  const monthOptions = Object.entries(nepaliMonths).map(([value, label]) => ({
    value,
    label: `${label} (${value})`
  }))

  const handlePreviousMonth = () => {
    const currentMonthIndex = parseInt(selectedMonth)
    const currentYearIndex = parseInt(selectedYear)

    if (currentMonthIndex === 1) {
      // If it's the first month, go to last month of previous year
      onMonthChange("12")
      onYearChange((currentYearIndex - 1).toString())
    } else {
      // Otherwise just decrease the month
      onMonthChange(String(currentMonthIndex - 1).padStart(2, "0"))
    }
  }

  const handleNextMonth = () => {
    const currentMonthIndex = parseInt(selectedMonth)
    const currentYearIndex = parseInt(selectedYear)

    if (currentMonthIndex === 12) {
      // If it's the last month, go to first month of next year
      onMonthChange("01")
      onYearChange((currentYearIndex + 1).toString())
    } else {
      // Otherwise just increase the month
      onMonthChange(String(currentMonthIndex + 1).padStart(2, "0"))
    }
  }

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-gap-3">
      <button
        onClick={handlePreviousMonth}
        className="plasmo-p-1 plasmo-rounded hover:plasmo-bg-gray-700 focus:plasmo-outline-none focus:plasmo-ring-2 plasmo-ring-blue-500"
        aria-label="Previous month">
        <ChevronLeft className="plasmo-w-4 plasmo-h-4 plasmo-text-gray-200" />
      </button>

      <div className="plasmo-w-24">
        <CustomSelect
          options={yearOptions}
          value={selectedYear}
          onChange={onYearChange}
          label="Year"
        />
      </div>
      <div className="plasmo-w-36">
        <CustomSelect
          options={monthOptions}
          value={selectedMonth}
          onChange={onMonthChange}
          label="Month"
        />
      </div>

      <button
        onClick={handleNextMonth}
        className="plasmo-p-1 plasmo-rounded hover:plasmo-bg-gray-700 focus:plasmo-outline-none focus:plasmo-ring-2 plasmo-ring-blue-500"
        aria-label="Next month">
        <ChevronRight className="plasmo-w-4 plasmo-h-4 plasmo-text-gray-200" />
      </button>
    </div>
  )
}

export default MonthYearSelect
