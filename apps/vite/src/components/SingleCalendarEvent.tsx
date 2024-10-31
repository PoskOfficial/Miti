import NepaliDate from 'nepali-datetime';

import { Event } from '@miti/types';

import { relativeTimeFromDates } from '../helper/dates';
import nepaliNumber from '../helper/nepaliNumber';
import UseLanguage from '../helper/useLanguage';

function SingleCalendarEvent({
  date,
  events,
}: {
  date: NepaliDate;
  week_day: number;
  events: Event[];
}) {
  const { isNepaliLanguage } = UseLanguage();
  const nepaliEvents = isNepaliLanguage
    ? events.map((event) => event?.jds?.ne)
    : events.map((event) => event?.jds?.en);

  let eventsString = nepaliEvents.join(' / ');
  const isToday =
    new Date().toDateString() === date.getDateObject().toDateString();
  eventsString =
    isToday && eventsString.length === 0
      ? isNepaliLanguage
        ? 'कुनै घटना छैन'
        : 'No Event'
      : eventsString;
  return (
    <div className="relative">
      {eventsString.length > 0 && (
        <div className="flex max-w-[600px] border border-gray-400 py-3 pl-1 font-mukta dark:text-gray-100">
          <div className="min-w-[80px]  border-r pr-2">
            <h1 className="text-center font-semibold">
              {isNepaliLanguage
                ? nepaliNumber(`${date.getDate()}`)
                : date.getDate()}
            </h1>
            <h2 className="text-center">
              {date
                .getDateObject()
                .toLocaleDateString(isNepaliLanguage ? 'ne-NP' : 'en-US', {
                  weekday: 'long',
                })}
            </h2>
          </div>
          <div className=" events flex justify-between pl-3">
            <div>
              <h3 className="text-start text-sm">
                {date
                  .getDateObject()
                  .toLocaleDateString(isNepaliLanguage ? 'ne-NP' : 'en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
              </h3>
              <h1 className="py-1 text-start tracking-wider">{eventsString}</h1>
            </div>
            <h1 className="absolute right-2 text-end text-sm">
              {relativeTimeFromDates(date.getDateObject(), isNepaliLanguage)}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleCalendarEvent;
