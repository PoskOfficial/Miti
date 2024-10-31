import React from 'react';

import CalendarGrid from '../components/calendar/CalendarGrid';
import CalendarHeader from '../components/calendar/CalendarHeader';
import EventList from '../components/calendar/EventList';
import Today from '../components/calendar/Today';
import Debugger from '../components/Debugger';
import CurrencyConverterCard from '../components/extras/CurrencyConverterCard';
import DateConverter from '../components/extras/DateConverter';
import MetalPrice from '../components/extras/MetalPrice';

const Calendar2 = () => {
  const events = [
    {
      date: '१२',
      day: 'सोम',
      title: 'रमा एकादशी व्रत',
      daysLeft: 8,
      fullDate: 'कार्तिक १२, २०८१ | Oct 28, 2024',
    },

    {
      date: '१२',
      day: 'सोम',
      title: 'रमा एकादशी व्रत',
      daysLeft: 8,
      fullDate: 'कार्तिक १२, २०८१ | Oct 28, 2024',
    },
    {
      date: '१२',
      day: 'सोम',
      title: 'रमा एकादशी व्रत',
      daysLeft: 8,
      fullDate: 'कार्तिक १२, २०८१ | Oct 28, 2024',
    },
    // Add more events as needed
  ];
  //   console.log(fetchGoldSilverRates())
  return (
    <section className="relative bg-stone-50 text-sm">
      <Debugger />
      <div className="relative w-full">
        <div className="mx-auto w-full px-2 py-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="order-2 flex flex-col flex-wrap gap-4 sm:order-1 md:flex-nowrap">
              <Today isHoliday={false} />
              <EventList events={events} title="आजको इभेन्टहरू" />
            </div>

            <div className="order-1 flex-1 rounded-2xl bg-gradient-to-b from-white/25 to-white px-2.5 py-5 max-xl:row-start-1 sm:order-2 sm:p-4 xl:bg-white">
              <CalendarHeader month="January" year="2024" />
              <CalendarGrid />
            </div>
            <div className="order-3 flex flex-col gap-4 ">
              <EventList events={events} title="आगामी इभेन्टहरु" />
              <EventList
                events={events}
                title="आगामी बिदाहरु"
                isHoliday={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <MetalPrice />
        <CurrencyConverterCard
          initialAmount={1}
          exchangeRate={134.21}
          fromCurrency="USD"
          toCurrency="NPR"
        />
        <DateConverter />
      </div>
    </section>
  );
};

export default Calendar2;
