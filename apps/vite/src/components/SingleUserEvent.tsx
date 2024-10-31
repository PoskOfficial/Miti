import { useState } from 'react';

import { CalendarEvent } from '@miti/types';

import colors from '../constants/colors';
import { eventDuration } from '../helper/dates';
import useLanguage from '../helper/useLanguage';
import EventDetailsDialog from './EventDetailsDialog';

function SingleUserEvent({ event }: { event: CalendarEvent }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { isNepaliLanguage } = useLanguage();

  return (
    <div
      onClick={() => setModalOpen(true)}
      className="m-2 items-center rounded-sm border bg-white px-4 py-2 text-start shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    >
      {modalOpen && (
        <EventDetailsDialog
          modalOpen={modalOpen}
          event={event}
          onClose={() => setModalOpen(false)}
        />
      )}
      <h1 className="font-bold">{event.summary}</h1>
      <div className="flex items-center gap-2">
        <span
          className=" h-2 w-2 rounded-full"
          style={{
            backgroundColor: event.colorId ? colors[event.colorId] : '#475569',
          }}
        ></span>
        <p>{eventDuration(event, isNepaliLanguage)}</p>
      </div>
      <div className="text-right">
        <p className="mt-0 text-xs text-gray-500 dark:text-white">
          {event.calendarSummary}
        </p>
      </div>
    </div>
  );
}

export default SingleUserEvent;
