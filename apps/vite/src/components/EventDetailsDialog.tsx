import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3BottomLeftIcon,
  ClockIcon,
  MapPinIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteEvent } from '@miti/query/event';
import { CalendarEvent } from '@miti/types';

import { apiBaseUrl } from '../helper/api';
import { eventDuration } from '../helper/dates';
import useLanguage from '../helper/useLanguage';
import Spinner from './Spinner';

export default function EventDetailsDialog({
  modalOpen,
  onClose,
  event,
}: {
  modalOpen: boolean;
  onClose: () => void;
  event: CalendarEvent;
}) {
  const { isNepaliLanguage, t } = useLanguage();

  const queryClient = useQueryClient();

  function closeModal() {
    onClose();
  }

  const handleSuccess = () => {
    queryClient.invalidateQueries(['events']);
    closeModal();
  };

  const { mutateAsync, isPending } = useDeleteEvent(apiBaseUrl, handleSuccess);

  return (
    <>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white pb-4 pl-6 pr-6 pt-4 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white "
                  >
                    <div className="flex items-center justify-between border-b py-3 text-center">
                      <div>
                        <h1 className="text-left font-medium">
                          {event.summary}
                        </h1>
                        {
                          <div className="time flex gap-3 text-left text-sm text-gray-500 dark:text-gray-200">
                            <ClockIcon className="h-5 w-5" />
                            <h1>{eventDuration(event, isNepaliLanguage)}</h1>
                          </div>
                        }
                      </div>

                      <XMarkIcon
                        onClick={onClose}
                        className="h-6 w-6 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
                      />
                    </div>
                  </Dialog.Title>
                  {event.description && (
                    <div className="mt-2 flex gap-2">
                      <Bars3BottomLeftIcon className="h-6 w-6 dark:text-white" />
                      <p className=" text-gray-500 dark:text-gray-200">
                        {event.description}
                      </p>
                    </div>
                  )}

                  <div className="mt-2">
                    <div>
                      {event.location && (
                        <div className="flex w-full items-center gap-2 py-1">
                          <MapPinIcon className="h-6 w-6 dark:text-white" />
                          <h1 className="text-gray-500 dark:text-gray-200">
                            {' '}
                            {event.location}
                          </h1>
                        </div>
                      )}
                    </div>
                    {(event.accessRole === 'owner' ||
                      event.accessRole === 'writer') && (
                      <button
                        disabled={isPending}
                        onClick={async () => {
                          await mutateAsync(event);
                          onClose();
                        }}
                        className="ml-auto flex max-w-[140px]  cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500  focus:ring-offset-2 disabled:bg-indigo-400"
                      >
                        <h1>
                          {isPending ? (
                            <Spinner className="h-5 w-5 fill-white" />
                          ) : (
                            t('homepage.Delete')
                          )}
                        </h1>
                        {!isPending && <TrashIcon className="h-5 w-5" />}
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
