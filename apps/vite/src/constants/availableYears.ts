import nepaliNumber from "../helper/nepaliNumber"

// Range of BS years the calendar can navigate to. The calendar feed
// (data.miti.bikram.io) publishes data up to MAX_YEAR; bump it when new
// years are added there.
const MIN_YEAR = 2075
const MAX_YEAR = 2090

const availableYears = Array.from(
  { length: MAX_YEAR - MIN_YEAR + 1 },
  (_, index) => {
    const en = MIN_YEAR + index
    return { en, np: nepaliNumber(en.toString()) }
  }
)

const isAvailableYear = (year: number) => year >= MIN_YEAR && year <= MAX_YEAR

export { availableYears, isAvailableYear, MIN_YEAR, MAX_YEAR }
