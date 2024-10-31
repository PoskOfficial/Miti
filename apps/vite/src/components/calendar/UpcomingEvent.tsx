import React from 'react';

import { classNames } from '../../helper/utils';

interface Event {
  date: string;
  day: string;
  title: string;
  daysLeft: number;
  fullDate: string;
}

const UpcomingEvent: React.FC<{ event: Event; isHoliday?: boolean }> = ({
  event,
  isHoliday,
}) => {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-2 ">
      <div
        className={classNames(
          'h-12 w-12 flex-row items-center justify-center rounded-lg text-center',
          isHoliday ? 'bg-red-50 text-red-500' : 'bg-gray-200 text-gray-700 ',
        )}
      >
        <p className="text-lg font-semibold">{event.date}</p>
        <p className="text-xs font-semibold">{event.day}</p>
      </div>
      <div className="flex-1">
        <span className="flex flex-row">
          <p
            className={classNames(
              'flex-1 text-left font-bold',
              isHoliday ? 'text-red-500' : 'text-gray-700',
            )}
          >
            {event.title}
          </p>
          <p className="rounded-xl bg-gray-100 px-1 py-[0.1rem] text-right text-xs text-gray-500">
            {event.daysLeft} दिन बाँकी
          </p>
        </span>
        <p className="text-xs text-gray-500">{event.fullDate}</p>
      </div>
    </div>
  );
};

export default UpcomingEvent;
