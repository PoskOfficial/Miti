import React, { useState } from 'react';

interface CurrencyConverterCardProps {
  initialAmount: number;
  exchangeRate: number;
  fromCurrency: string;
  toCurrency: string;
}

const CurrencyConverterCard: React.FC<CurrencyConverterCardProps> = ({
  initialAmount,
  exchangeRate,
  fromCurrency,
  toCurrency,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value) || 0);
  };

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return (
    <div className="flex-1 rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        मुद्रा रूपान्तरण
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        कात्तिक ०४, २०८१ - 20 Oct, 2024
      </p>

      <div className="mb-4">
        <label
          className="mb-1 block text-sm font-medium text-gray-600"
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="w-full rounded-md border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-600">
          From
        </label>
        <div className="relative">
          <select
            className="block w-full rounded-md border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
            defaultValue={fromCurrency}
          >
            <option value="USD">U.S Dollar</option>
            <option value="USD">U.S Dollar</option>
            <option value="USD">U.S Dollar</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <img src="/path-to-us-flag.png" alt="US flag" className="h-6 w-6" />
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Converted to
        </label>
        <div className="relative">
          <input
            type="text"
            value={convertedAmount}
            readOnly
            className="w-full rounded-md border bg-gray-50 px-3 py-2 text-gray-800"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <img
              src="/path-to-nepal-flag.png"
              alt="Nepal flag"
              className="h-6 w-6"
            />
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600">
          1 U.S. Dollar equals{' '}
          <span className="font-bold text-orange-500">
            {exchangeRate} Nepalese Rupee
          </span>
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverterCard;
