import React, { useState } from 'react';

import { classNames } from '../../helper/utils';
import Panchang from './Panchang';

const Today = ({ isHoliday = true }: { isHoliday: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" flex-row items-center rounded-lg border bg-white p-4 shadow-md">
      {/* Top Section */}
      <div className="flex items-center space-x-4 rounded-lg">
        <div className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg bg-gray-200 text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-700">१२</p>
            <p className="text-sm font-semibold text-gray-700">सोम</p>
          </div>
        </div>
        <div className="flex-1">
          <span className="flex flex-row">
            <p className="flex-1 text-left text-2xl font-bold">कार्तिक, २०८१</p>
          </span>
          <p className="text-sm text-gray-600">तृतीया, कार्तिक कृष्णपक्ष</p>

          <p className="text-xs text-gray-500">ने.सं. ११४४, कौलागा</p>
        </div>
      </div>

      <div className="my-4 flex justify-between">
        <img
          src="https://img.icons8.com/color/48/000000/sunrise.png"
          alt="sunrise"
          className="h-6 w-6"
        />
        <p className="text-sm text-gray-600">सूर्योदय: १७:३९</p>

        <img
          src="https://img.icons8.com/color/48/000000/sunset.png"
          alt="sunrise"
          className="h-6 w-6"
        />
        <p className="text-sm text-gray-600">सूर्यास्त: १७:३९</p>
      </div>
      <div className="flex justify-end">
        <button
          className="flex-1 items-end rounded-lg text-end text-sm text-indigo-500 transition-all duration-300 hover:text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          आजको पंचांग <span className="text-xs">{isOpen ? '^' : '⌄'}</span>
        </button>
      </div>
      {isOpen && <Panchang />}
    </div>
  );
};

export default Today;
