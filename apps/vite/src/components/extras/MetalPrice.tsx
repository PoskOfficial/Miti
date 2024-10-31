import React from 'react';

import fetchGoldSilverRates from '../../helper/bullions';
import MetalPriceCard from './MetalPriceCard';

const MetalPrice = () => {
  const handleClick = async () => {
    const data = await fetchGoldSilverRates();
    console.log(data);
  };
  return (
    <div className="flex-1 rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        आजको सुन, चाँदीको दर
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        कात्तिक ०४, २०८१ - 20 Oct, 2024
      </p>
      <MetalPriceCard
        metalName="छापावाल"
        metalImage="https://uxwing.com/wp-content/themes/uxwing/download/banking-finance/gold-icon.png"
        price={965000}
        unit="प्रति तोला"
      />
      <MetalPriceCard
        metalName="तेजाबी"
        metalImage="https://uxwing.com/wp-content/themes/uxwing/download/banking-finance/copper-bars-icon.png"
        price={0}
        unit="प्रति तोला"
      />
      <MetalPriceCard
        metalName="चाँदी"
        metalImage="https://uxwing.com/wp-content/themes/uxwing/download/banking-finance/silver-icon.png"
        price={2075}
        unit="प्रति तोला"
      />
      <button onClick={handleClick}>Log</button>
    </div>
  );
};

export default MetalPrice;
