import { Dispatch, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface DropDownProps {
  selected: string | number;
  className?: string;
  setSelected: Dispatch<React.SetStateAction<string | number>>;
  items:
    | string[]
    | {
        label: string;
        value: string | number;
      }[];
}

const DropDown = ({
  selected,
  setSelected,
  items,
  className,
}: DropDownProps) => {
  const formattedItems = items.map((item) =>
    typeof item === 'string' ? { label: item, value: item } : item,
  );
  const selectedValue = formattedItems.find((item) => item.value === selected);
  return (
    <div className={className}>
      <Listbox value={selected} onChange={(value) => setSelected(value)}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-auto cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gray-800 dark:text-white sm:text-sm">
            <span className="block truncate">{selectedValue?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="scrollbar-hide absolute z-50 mt-1 max-h-60 w-auto overflow-auto rounded-md border bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600 dark:bg-gray-800 sm:text-sm">
              {formattedItems.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-4 ${
                      active
                        ? 'bg-amber-100 text-amber-900'
                        : 'text-gray-900 dark:text-white'
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DropDown;
