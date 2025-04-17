import MetalPriceCard from "./MetalPriceCard"
import fetchGoldSilverRates from "../../helper/bullions"

const MetalPrice = () => {
  const handleClick = async () => {
    const data = await fetchGoldSilverRates()
    console.log(data)
  }
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex-1">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        आजको सुन, चाँदीको दर
      </h2>
      <p className="text-sm text-gray-600 mb-6">
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
  )
}

export default MetalPrice
