import { Dispatch, Fragment, useMemo, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid"
import { format } from "date-fns"

function Picker({
  date,
  data,
  title,
  setYYMMDD,
}: {
  date: string | undefined
  hasValueLabel?: boolean
  data: string[] | { value: string; label: string }[]
  title: string
  setYYMMDD: Dispatch<React.SetStateAction<Date>>
}) {
  const [query, setQuery] = useState("")
  const cleanedData = useMemo(() => {
    return data.map((item) => {
      if (typeof item === "string") {
        return { value: item, label: item }
      }
      return item
    })
  }, [data])
  const filtered = cleanedData.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className={`${title === "year" ? "w-24" : "w-20"}`}>
      <Combobox
        value={date}
        onChange={(value) => {
          setYYMMDD((prev) => {
            const newDate = new Date(prev)
            if (title === "year") {
              newDate.setFullYear(+value)
            }
            if (title === "month") {
              newDate.setMonth(+value)
            }
            if (title === "day") {
              newDate.setDate(+value)
            }
            return newDate
          })
        }}
      >
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-md border bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 dark:border-gray-400  sm:text-sm">
            <Combobox.Input
              className="w-full rounded-md border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-indigo-600 focus:ring-0 dark:bg-gray-800 dark:text-white"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="scrollbar-hide absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
              {filtered.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-white">
                  Nothing found.
                </div>
              ) : (
                filtered.map((item) => (
                  <Combobox.Option
                    key={item.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-2 ${
                        active
                          ? "bg-amber-100 text-amber-900"
                          : "text-gray-900 dark:text-white"
                      }`
                    }
                    value={item.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ml-2 text-sm ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.label}
                        </span>
                        {selected ? (
                          <span
                            className={
                              "absolute inset-y-0 left-0 flex items-center text-orange-600"
                            }
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

function EnglishDatePicker({
  setDate,
  date,
  minDate,
  maxDate,
}: {
  setDate: Dispatch<React.SetStateAction<Date>>
  date: Date
  minDate: string
  maxDate: string
}) {
  const monthData = [
    { value: "0", label: "January" },
    { value: "1", label: "February" },
    { value: "2", label: "March" },
    { value: "3", label: "April" },
    { value: "4", label: "May" },
    { value: "5", label: "June" },
    { value: "6", label: "July" },
    { value: "7", label: "August" },
    { value: "8", label: "September" },
    { value: "9", label: "October" },
    { value: "10", label: "November" },
    { value: "11", label: "December" },
  ]

  const minYear = new Date(minDate).getFullYear()
  const maxYear = new Date(maxDate).getFullYear()
  const yearData = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  ).map((year) => ({ value: year.toString(), label: year.toString() }))

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getDays = (year: number, month: number) => {
    const days = getDaysInMonth(year, month)
    const dayData = []
    for (let i = 1; i <= days; i += 1) {
      dayData.push({ value: i.toString(), label: i.toString() })
    }
    return dayData
  }

  return (
    <div className="flex items-center gap-2">
      <Picker
        date={date.getFullYear().toString()}
        data={yearData}
        title="year"
        setYYMMDD={setDate}
      />
      <Picker
        date={`${date.getMonth() + 1}`}
        data={monthData}
        hasValueLabel
        title="month"
        setYYMMDD={setDate}
      />
      <Picker
        date={date.getDate().toString()}
        data={getDays(date.getFullYear(), date.getMonth())}
        hasValueLabel
        title="day"
        setYYMMDD={setDate}
      />
    </div>
  )
}

export default EnglishDatePicker
