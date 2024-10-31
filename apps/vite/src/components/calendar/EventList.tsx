import React from 'react';

import UpcomingEvent from './UpcomingEvent';

interface Event {
  date: string;
  day: string;
  title: string;
  daysLeft: number;
  fullDate: string;
}

const EventList: React.FC<{
  events: Event[];
  isHoliday?: boolean;
  title?: string;
}> = ({ events, isHoliday, title }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-2 text-center text-xl font-bold text-gray-700">
        {title}
      </h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <UpcomingEvent key={index} event={event} isHoliday={isHoliday} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
