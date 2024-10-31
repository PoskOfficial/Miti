import NepaliDate from 'nepali-datetime';

import { DayData } from '@miti/types';

import SingleCalendarEvent from '../components/SingleCalendarEvent';

function UpcomingEvents({ monthData }: { monthData: DayData[] }) {
  return (
    <div className="lg:1/2 mb-4 mt-6 max-w-lg px-4">
      {monthData?.map((day) => {
        const { bs_year, bs_month, bs_day } = day.AD_date;
        const dayInNepaliDate = new NepaliDate(
          `${bs_year}-${bs_month}-${bs_day}`,
        );
        return (
          day.events?.length > 0 && (
            <SingleCalendarEvent
              key={day.ad}
              date={dayInNepaliDate}
              week_day={day.week_day}
              events={day.events}
            />
          )
        );
      })}
    </div>
  );
}

export default UpcomingEvents;
