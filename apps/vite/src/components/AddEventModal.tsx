import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { CalendarIcon, PlusIcon } from '@heroicons/react/20/solid';
import {
  Bars3BottomLeftIcon,
  MapPinIcon,
  PencilSquareIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCalendarList } from '@miti/query/calendar';
import { useCreateEvent } from '@miti/query/event';
import { CalendarEvent } from '@miti/types';

import colors from '../constants/colors';
import { apiBaseUrl } from '../helper/api';
import DropDown from './DropDown';
import NepaliDatePicker from './NepaliDatePicker';
import Spinner from './Spinner';

function getCombinedDateTime(date: Date, time: string) {
  const timeParts = time.split(':');
  date.setHours(parseInt(timeParts[0] ?? '', 10));
  date.setMinutes(parseInt(timeParts[1] ?? '', 10));
  return date.toISOString();
}

export type CalendarPayload = Partial<CalendarEvent> & { calendarId: string };

function AddEventModal({ startDate }: { startDate: Date }) {
  const [openModel, setOpenModel] = useState(false);
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(startDate);
  const [eventEndDate, setEventEndDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
  );
  const [selectedCalendar, setSelectedCalendar] = useState<string | number>('');

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries(['events']);
    setOpenModel(false);
  };

  const { mutateAsync, isPending } = useCreateEvent(apiBaseUrl, handleSuccess);

  const { data: calendarList, isLoading: isCalendarListLoading } =
    useCalendarList(apiBaseUrl);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!calendarList) return;
    setSelectedCalendar(calendarList[0]?.value || '');
  }, [calendarList]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startEndDates = isAllDayEvent
      ? {
          start: {
            date: new Date(eventStartDate.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0],
          },
          end: {
            date: new Date(eventEndDate.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0],
          },
        }
      : {
          start: {
            dateTime: getCombinedDateTime(
              startDate,
              e.currentTarget.startTime.value,
            ),
          },
          end: {
            dateTime: getCombinedDateTime(
              eventEndDate,
              e.currentTarget.endTime.value,
            ),
          },
        };

    const eventData = {
      ...startEndDates,
      summary: e.currentTarget.summary.value,
      location: e.currentTarget.location.value,
      description: e.currentTarget.description.value,
      colorId: e.currentTarget.colorId.value || null,
      calendarId: `${selectedCalendar}` || 'personal',
    };
    await mutateAsync(eventData);
  };
  if (!openModel)
    return (
      <button
        className="shadowfocus:outline-none fixed bottom-2 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-indigo-600  text-white md:bottom-5"
        onClick={() => setOpenModel(true)}
      >
        <PlusIcon className="m-3" />
      </button>
    );
  return (
    <div className="fixed inset-0 flex items-end bg-gray-900/50 md:items-center md:justify-center ">
      <div className="flex-end w-full rounded-t-lg bg-white px-4 pb-4 dark:bg-gray-800 md:w-2/3 md:rounded-b-lg lg:w-2/4">
        <div className="border-b py-6 text-center font-bold text-gray-900 dark:text-white">
          Create an Event
        </div>
        <div className="modal-body">
          <form onSubmit={handelSubmit}>
            <div className="py-4">
              <div className="my-2 flex w-full items-center gap-2">
                <span className="font-sans dark:text-white">All day</span>
                <Switch
                  checked={isAllDayEvent}
                  onChange={() => {
                    setIsAllDayEvent(!isAllDayEvent);
                    setEventStartDate(new Date(eventStartDate));
                    setEventEndDate(new Date(eventEndDate));
                  }}
                  className={`${
                    isAllDayEvent
                      ? 'border bg-indigo-600'
                      : 'border bg-gray-200 dark:bg-gray-800'
                  }  inline-flex h-6 w-11 items-center rounded-full transition-all duration-100 ease-linear`}
                >
                  <span className="sr-only">toggle all day event</span>
                  <span
                    className={`${
                      isAllDayEvent ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white ring-1 ring-gray-600`}
                  />
                </Switch>
              </div>
              <div className="my-2 flex w-full items-center gap-2 dark:text-white">
                <span>From: </span>
                <NepaliDatePicker
                  setDate={setEventStartDate}
                  date={eventStartDate}
                />
                {!isAllDayEvent && (
                  <input
                    required
                    type="time"
                    name="startTime"
                    className="rounded-md border p-1 dark:bg-gray-800"
                  />
                )}
              </div>
              <div className="my-2 flex w-full items-center gap-2 dark:text-white">
                <span>To:</span>
                <NepaliDatePicker
                  setDate={setEventEndDate}
                  date={eventEndDate}
                />
                {!isAllDayEvent && (
                  <input
                    required
                    type="time"
                    name="endTime"
                    className="rounded-md border p-1 dark:bg-gray-800"
                  />
                )}
              </div>
              <div className="my-2 flex w-full items-center gap-2 dark:text-white">
                <CalendarIcon className="h-6 w-6 dark:text-white" />
                {!isCalendarListLoading ? (
                  <DropDown
                    items={calendarList}
                    selected={selectedCalendar}
                    setSelected={setSelectedCalendar}
                    className="w-full text-start"
                  />
                ) : (
                  <Spinner />
                )}
              </div>
              <div className="my-2 flex w-full items-center gap-2">
                <PencilSquareIcon className="h-6 w-6 dark:text-white" />
                <input
                  type="text"
                  name="summary"
                  className="w-full flex-1 rounded-md border border-gray-400 px-2 py-1 outline-none focus:outline-indigo-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-200"
                  placeholder="summary"
                />
              </div>
              <div className="my-2 flex w-full items-center gap-2">
                <MapPinIcon className="h-6 w-6 dark:text-white" />
                <input
                  type="text"
                  name="location"
                  className="w-full flex-1 rounded-md border border-gray-400 px-2 py-1 outline-none focus:outline-indigo-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-200"
                  placeholder="location"
                />
              </div>
              <div className="my-2 flex w-full items-start gap-2">
                <Bars3BottomLeftIcon className="h-6 w-6 dark:text-white" />
                <textarea
                  name="description"
                  className="w-full flex-1 resize-none rounded-md border border-gray-400 px-2 py-1 outline-none focus:outline-indigo-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-200"
                  placeholder="description"
                />
              </div>
              <div className="my-2 flex w-full items-start gap-2">
                <SwatchIcon className="h-6 w-6 dark:text-white" />
                <div className="flex flex-wrap">
                  {Object.keys(colors).map((color, idx) => {
                    return (
                      <input
                        key={idx}
                        type="radio"
                        name="colorId"
                        value={color}
                        style={{
                          backgroundColor: colors[color],
                        }}
                        className={`m-1 h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-300 shadow-sm outline-none focus:outline-blue-600`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-4 ">
              <button
                className="shadowfocus:outline-none mt-8
                w-full rounded-md border border-indigo-600 border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-indigo-600 focus:ring-2  focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-200  "
                onClick={() => setOpenModel(false)}
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-progress disabled:bg-indigo-400"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEventModal;
