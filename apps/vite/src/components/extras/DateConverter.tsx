import React, { useState } from 'react';

const bsYears = Array.from({ length: 100 }, (_, i) => 1975 + i); // Example range for B.S. years
const months = [
  'बैशाख',
  'जेठ',
  'आषाढ',
  'श्रावण',
  'भदौ',
  'असोज',
  'कार्तिक',
  'मंसिर',
  'पुष',
  'माघ',
  'फाल्गुन',
  'चैत',
];

const DateConverter: React.FC = () => {
  const [year, setYear] = useState<number>(2081);
  const [month, setMonth] = useState<string>('कार्तिक');
  const [day, setDay] = useState<number>(1);

  return (
    <div className="flex-1 rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">मिति परिवर्तन</h2>

      <div className="mb-4 flex justify-between">
        <div className="w-full p-2">
          <label className="mb-2 block">वि.सं.</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded border p-2"
          >
            {bsYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full p-2">
          <label className="mb-2 block">वि.सं.</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded border p-2"
          >
            {bsYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <div className="w-full p-2">
          <label className="mb-2 block">वि.सं.</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded border p-2"
          >
            {bsYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full p-2">
          <label className="mb-2 block">वि.सं.</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded border p-2"
          >
            {bsYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="w-full rounded bg-blue-500 py-2 text-white">
        परिवर्तन गर्नुहोस्
      </button>
    </div>
  );
};

export default DateConverter;
