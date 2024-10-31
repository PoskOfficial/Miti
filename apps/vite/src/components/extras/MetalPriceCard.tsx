import React from 'react';

interface MetalPriceCardProps {
  metalName: string;
  metalImage: string;
  price: number;
  unit: string;
}

const MetalPriceCard: React.FC<MetalPriceCardProps> = ({
  metalName,
  metalImage,
  price,
  unit,
}) => {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-none">
      <div className="flex items-center">
        <img src={metalImage} alt={metalName} className="mr-3 h-10 w-10" />
        <div>
          <p className="font-semibold text-gray-700">{metalName}</p>
          <p className="text-sm text-gray-500">{unit}</p>
        </div>
      </div>
      <div>
        <p className="font-bold text-gray-800">
          {price === 0 ? 'रू ०' : `रू ${price.toLocaleString()}`}
        </p>
      </div>
    </div>
  );
};

export default MetalPriceCard;
