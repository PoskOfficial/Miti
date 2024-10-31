import { useEffect, useMemo, useState } from 'react';
import NepaliDate from 'nepali-datetime';
import { Link } from 'react-router-dom';

import { useUser } from '@miti/query/user';
import type { CalendarEventsResult, DayData } from '@miti/types';

import colors from '../constants/colors';
import { apiBaseUrl } from '../helper/api';
import {
  getChandramaEnglish,
  getChandramaNepali,
  getTithiEnglish,
  getTithiNepali,
  relativeTimeFromDates,
} from '../helper/dates';
import nepaliNumber from '../helper/nepaliNumber';
import useLanguage from '../helper/useLanguage';
import { classNames } from '../helper/utils';
import AddEventModal from './AddEventModal';
import SingleUserEvent from './SingleUserEvent';

const getEventsOfSelectedDay = (events: CalendarEventsResult, day: Date) => {
  if (!events || !events.events.length) return [];

  return events.events.filter((event) => {
    const startDate = new Date(
      event.start.date || event.start.dateTime || day.toDateString(),
    );
    const endDate = new Date(
      event.end.date || event.end.dateTime || day.toDateString(),
    );
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    if (event.end.date) endDate.setDate(endDate.getDate() - 1);
    return startDate <= dayEnd && endDate >= dayStart;
  });
};

const isSameMonth = (date1: NepaliDate, date2: NepaliDate) => {
  return (
    date1.getYear() === date2.getYear() && date1.getMonth() === date2.getMonth()
  );
};
export default function MonthCalendar({
  monthData,
  userEvents,
}: {
  monthData: DayData[];
  userEvents?: CalendarEventsResult;
}) {
  const { t, isNepaliLanguage } = useLanguage();
  const { status } = useUser(apiBaseUrl);
  const today = useMemo(() => new NepaliDate(), []);
  // replace all dots with slash
  const firstDay = useMemo(() => {
    const { bs_year, bs_month, bs_day } = monthData[0]?.AD_date || {};
    return new NepaliDate(`${bs_year}-${bs_month}-${bs_day}`);
  }, [monthData]);

  const [selectedDay, setSelectedDay] = useState<NepaliDate>(
    isSameMonth(today, firstDay) ? today : firstDay,
  );

  const selectedDayData = useMemo(() => {
    const selectedDayIndex = selectedDay.getDate() - 1;
    return monthData[selectedDayIndex] as DayData;
  }, [selectedDay, monthData]);

  useEffect(() => {
    setSelectedDay(isSameMonth(today, firstDay) ? today : firstDay);
  }, [monthData, firstDay, today]);

  return (
    <>
      <div className="mt-6 grid grid-cols-7 text-xs leading-10 text-gray-500 dark:text-white">
        <div>{t('homepage.S')}</div>
        <div>{t('homepage.M')}</div>
        <div>{t('homepage.T')}</div>
        <div>{t('homepage.W')}</div>
        <div>{t('homepage.Th')}</div>
        <div>{t('homepage.F')}</div>
        <div>{t('homepage.Sa')}</div>
      </div>
      <div className="isolate mx-1 mt-2 grid auto-rows-cell grid-cols-7 gap-px overflow-hidden rounded-md bg-gray-200 font-sans text-sm shadow ring-1 ring-gray-200 dark:bg-gray-800 dark:text-white dark:ring-gray-600">
        {monthData.map((day, dayIdx) => {
          const { bs_year, bs_month, bs_day } = day.AD_date;
          const dayInNepaliDate = new NepaliDate(
            `${bs_year}-${bs_month}-${bs_day}`,
          );
          const isSelectedDay =
            selectedDay.format('YYYY/MM/DD') ===
            dayInNepaliDate.format('YYYY/MM/DD');
          const isToday = today.toString() === dayInNepaliDate.toString();
          return (
            <button
              key={day.day}
              type="button"
              onClick={() => {
                setSelectedDay(dayInNepaliDate);
              }}
              style={dayIdx === 0 ? { gridColumnStart: day.week_day + 1 } : {}}
              className={classNames(
                'p-1 font-mukta leading-3 hover:bg-gray-100 focus:z-10',
                (isSelectedDay || isToday) && 'font-semibold',
                isToday && 'bg-indigo-200 font-semibold text-indigo-600',
                !isSelectedDay && 'bg-white dark:bg-gray-900',
                isSelectedDay &&
                  ' bg-indigo-600  text-white hover:bg-indigo-700',
                isSelectedDay && 'bg-indigo-600',
                (day.events.find((event) => event.jds?.gh == '1') ||
                  day.week_day === 6) &&
                  'text-rose-600',
              )}
            >
              {!!userEvents?.events?.length &&
                Array.from(
                  new Set(
                    getEventsOfSelectedDay(
                      userEvents,
                      new Date(day.AD_date.ad),
                    ).map((event) => {
                      return event?.colorId || false;
                    }),
                  ),
                )?.map((color, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: color ? colors[color] : '#475569',
                    }}
                    className={classNames(
                      `mx-[1px] inline-block h-1 w-1 rounded-full`,
                    )}
                  ></span>
                ))}
              <time
                dateTime={day.AD_date.ad}
                className={classNames(
                  'mx-auto mt-0 flex items-center justify-center rounded-full pt-0 text-xl',
                )}
              >
                {isNepaliLanguage ? nepaliNumber(day.day) : day.day}
              </time>
              <span className="mx-auto my-0 mt-0 py-0 text-[9px] font-extralight">
                {dayInNepaliDate.getEnglishDate()}
              </span>
            </button>
          );
        })}
      </div>
      <div className="px-2">
        <Link
          type="button"
          to={`/upcoming`}
          className="mt-8 block w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {t('homepage.View_all_events')}
        </Link>
      </div>
      <div className="mx-2 mt-1 flex rounded-md border  bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white">
        <div className="flex-col">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-semibold dark:bg-gray-600 dark:text-gray-100">
            <h1>
              {isNepaliLanguage
                ? nepaliNumber(`${selectedDay.getDate()}`)
                : selectedDay.getDate()}
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            {selectedDay
              .getDateObject()
              .toLocaleDateString(isNepaliLanguage ? 'ne-NP' : 'en-US', {
                weekday: 'long',
              })}
          </p>
        </div>

        <div className="ml-4 grow text-left">
          <h2 className="font-semibold">
            {new Intl.DateTimeFormat(isNepaliLanguage ? 'ne-NP' : 'en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }).format(selectedDay.getDateObject())}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            {isNepaliLanguage
              ? `${getTithiNepali(selectedDayData.AD_date.tithi)},
              ${getChandramaNepali(selectedDayData.AD_date.chandrama)} •
              ${selectedDayData?.events
                .map((event) => event?.jds?.ne)
                .join(' | ')}`
              : `${getTithiEnglish(selectedDayData?.AD_date?.tithi)},
              ${getChandramaEnglish(selectedDayData?.AD_date?.chandrama)} •
              ${selectedDayData?.events
                .map((event) => event?.jds?.en)
                .join(' | ')}`}
          </p>
        </div>
        <div className="ml-10 flex-col text-end">
          <h1 className="mt-2 text-sm text-gray-500 dark:text-white">
            {relativeTimeFromDates(
              selectedDay.getDateObject(),
              isNepaliLanguage,
            )}
          </h1>
        </div>
      </div>
      {selectedDayData?.ad && status === 'LOGGED_IN' && (
        <AddEventModal startDate={selectedDay.getDateObject()} />
      )}
      {!!userEvents?.events?.length &&
        getEventsOfSelectedDay(userEvents, new Date(selectedDayData?.ad))?.map(
          (event) => <SingleUserEvent key={event.id} event={event} />,
        )}
    </>
  );
}
