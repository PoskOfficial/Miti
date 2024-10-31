import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NepaliDate from 'nepali-datetime';
import { useParams } from 'react-router-dom';

import { useYearlyData } from '@miti/query/calendar';
import { CalendarData, CalendarEventsResult, Months } from '@miti/types';

import MonthCalendar from '../components/MonthCalendar';
import Spinner from '../components/Spinner';
import YearMonthPicker from '../components/YearMonthPicker';
import { fetchUserEvents } from '../helper/api';
import UpcomingEvents from './UpcomingEvents';

function Home() {
  const { BSYear, BSMonth, pageType = 'calendar' } = useParams();

  const validYearAndMonth = useMemo(() => {
    if (!BSYear || !BSMonth) return new NepaliDate();
    const year = parseInt(BSYear);
    const month = parseInt(BSMonth);
    const isValid = year >= 2075 && year <= 2082 && month >= 1 && month <= 12;

    if (isValid) return new NepaliDate(year, month - 1, 1);

    return new NepaliDate();
  }, [BSYear, BSMonth]);
  const [currentNepaliDate, setCurrentNepaliDate] =
    useState<NepaliDate>(validYearAndMonth);

  useEffect(() => {
    const fixedPageType = pageType === 'upcoming' ? 'upcoming' : 'calendar';
    // set params in url withour reloading
    history.replaceState(
      null,
      '',
      `/${fixedPageType}/${currentNepaliDate.getYear()}/${
        currentNepaliDate.getMonth() + 1
      }`,
    );
  }, [currentNepaliDate, pageType]);

  const { data: calendarData, isLoading } = useYearlyData(currentNepaliDate);
  const currentMonthInHumanForm = (currentNepaliDate.getMonth() + 1)
    .toString()
    .padStart(2, '0') as Months;

  const monthData = useMemo(() => {
    if (!calendarData) return [];
    return calendarData[currentMonthInHumanForm];
  }, [calendarData, currentMonthInHumanForm]);

  const { data: userEvents } = useQuery<CalendarEventsResult>({
    queryKey: [
      'events',
      currentNepaliDate.getYear(),
      currentNepaliDate.getMonth(),
    ],
    queryFn: () =>
      fetchUserEvents(
        // @ts-ignore
        monthData[0].AD_date.ad,
        // @ts-ignore
        monthData[monthData.length - 1].AD_date.ad,
      ),

    enabled: !!calendarData && !!monthData.length,
    networkMode: 'offlineFirst',
  });

  return (
    <>
      <div>
        <div className="mx-auto mt-1 max-w-lg text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <YearMonthPicker
            currentNepaliDate={currentNepaliDate}
            setCurrentNepaliDate={setCurrentNepaliDate}
          />
          {isLoading ? (
            <Spinner className="h-5 w-5 " />
          ) : pageType === 'upcoming' ? (
            <UpcomingEvents monthData={monthData} />
          ) : (
            <MonthCalendar monthData={monthData} userEvents={userEvents} />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
