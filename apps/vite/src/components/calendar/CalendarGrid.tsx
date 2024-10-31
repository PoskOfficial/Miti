import React from 'react';

const CalendarGrid: React.FC = () => {
  return (
    <div className="rounded-xl border border-indigo-200">
      <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="flex items-center justify-center border-r border-indigo-200 bg-indigo-50 py-3.5 text-sm font-medium text-indigo-600"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 rounded-b-xl">
        {Array(35)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="relative flex cursor-pointer border-b border-r border-indigo-200 bg-white p-3.5 transition-all duration-300 hover:bg-indigo-50 max-xl:min-h-[60px] xl:aspect-square"
            >
              <div className="flex w-full flex-col">
                <div className="flex flex-row justify-between">
                  <p className="text-xs text-gray-900">{index + 1}</p>
                  <p className="hidden text-xs text-gray-900 xl:block">
                    पूर्णिमा
                  </p>
                </div>
                <p className="my-auto line-clamp-1 flex w-full flex-1 items-center justify-center text-center text-xl font-semibold text-gray-900">
                  {index + 1}
                </p>
                <p className="hidden text-center text-xs text-gray-900 xl:block">
                  रमा एकादशी व्रत
                </p>
              </div>

              {index % 3 === 0 && (
                <div className="absolute bottom-1 z-10 h-max flex-row rounded p-1.5 xl:bg-emerald-50">
                  <p className="mb-px hidden whitespace-nowrap text-xs font-medium text-emerald-600 xl:block">
                    Developer Meetup
                  </p>
                  <p className="h-2 w-2 rounded-full bg-emerald-600 xl:hidden" />
                  <p className="mb-px hidden whitespace-nowrap text-xs font-medium text-emerald-600 xl:block">
                    Developer Meetup
                  </p>
                  <p className="h-2 w-2 rounded-full bg-emerald-600 xl:hidden" />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
