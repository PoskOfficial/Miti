import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import NepaliDate from 'nepali-datetime';

import { availableYears } from '../constants/availableYears';
import { nepaliMonths } from '../constants/mahina';
import useLanguage from '../helper/useLanguage';
import { classNames } from '../helper/utils';
import DropDown from './DropDown';

const YearMonthPicker = ({
  currentNepaliDate,
  setCurrentNepaliDate,
}: {
  currentNepaliDate: NepaliDate;
  setCurrentNepaliDate: (date: NepaliDate) => void;
}) => {
  const { isNepaliLanguage } = useLanguage();
  const currentYear = currentNepaliDate.getYear();
  const currentMonth = currentNepaliDate.getMonth();

  const handleNextMonth = () => {
    if (currentMonth == 11) {
      setCurrentNepaliDate(new NepaliDate(currentYear + 1, 0, 1));
    } else {
      setCurrentNepaliDate(new NepaliDate(currentYear, currentMonth + 1, 1));
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth == 0) {
      setCurrentNepaliDate(new NepaliDate(currentYear - 1, 11, 1));
    } else {
      setCurrentNepaliDate(new NepaliDate(currentYear, currentMonth - 1, 1));
    }
  };
  return (
    <div className="flex items-center text-gray-900">
      <button
        type="button"
        disabled={currentMonth === 0 && currentYear === availableYears[0]?.en}
        className={classNames(
          'mx-3 flex flex-none items-center justify-center rounded-md  bg-indigo-600 p-1.5 text-white hover:bg-indigo-700  disabled:cursor-not-allowed disabled:bg-blue-600 disabled:text-white disabled:opacity-20 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:text-white',
        )}
        onClick={handlePrevMonth}
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex flex-auto items-center justify-center gap-4 font-mukta font-semibold">
        <DropDown
          selected={currentYear}
          setSelected={(selectedYear) =>
            setCurrentNepaliDate(
              new NepaliDate(selectedYear as number, currentMonth, 1),
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
        />
        <DropDown
          selected={currentMonth}
          setSelected={(selectedMonth) =>
            setCurrentNepaliDate(
              new NepaliDate(currentYear, selectedMonth as number, 1),
            )
          }
          items={nepaliMonths.map((month, index) => ({
            label: isNepaliLanguage ? month.np : month.en,
            value: index,
          }))}
        />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {nepaliMonths[currentMonth]?.ad}
      </p>

      <button
        type="button"
        disabled={
          currentMonth === 11 &&
          currentYear === availableYears[availableYears.length - 1]?.en
        }
        className={classNames(
          'mx-3 flex flex-none items-center justify-center rounded-md  bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:text-white disabled:opacity-20 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-600 ',
        )}
        onClick={handleNextMonth}
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default YearMonthPicker;
