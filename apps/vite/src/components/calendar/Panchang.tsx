const PanchangTableRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex justify-between">
      <p className="font-semibold">{label}:</p>
      <p>{value}</p>
    </div>
  );
};

const PanchangSection = ({
  title,
  children,
  bgColor,
}: {
  title: string;
  children: React.ReactNode;
  bgColor: string;
}) => {
  return (
    <div className={`mb-8`}>
      <h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
      <div className={bgColor}>{children}</div>
    </div>
  );
};

const MuhuratItem = ({ name, time }: { name: string; time: string }) => {
  return (
    <li className="flex justify-between p-4 text-start text-red-600">
      <span>{name}</span>
      <span>{time}</span>
    </li>
  );
};
const Panchang = () => {
  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 flex items-center space-x-3">
        <h2 className="text-2xl font-bold text-gray-800">पञ्चाङ्ग</h2>
      </div>
      <div>
        <PanchangTableRow label="तारिख" value="October 17, 2024" />
        <PanchangTableRow label="सूर्योदय" value="०६:०६" />
        <PanchangTableRow label="चन्द्र राशि" value="१७:४३" />
        <PanchangTableRow label="नक्षत्र समाप्ति समय" value="१७:४३" />
        <PanchangTableRow label="प्रथम करण" value="भद्रा" />
        <PanchangTableRow label="ऋतु" value="शरद" />
        <PanchangTableRow label="करण १" value="भद्रा" />
        <PanchangTableRow label="पक्ष" value="आश्विन शुक्लपक्ष" />
        <PanchangTableRow label="सूर्यास्त" value="१७:३९" />
        <PanchangTableRow label="सूर्य राशि" value="तुला" />
        <PanchangTableRow label="योग" value="व्याघात" />
        <PanchangTableRow label="अयन" value="दक्षिणायण" />
        <PanchangTableRow label="तिथि" value="पूर्णिमा १७:२३ बजेसम्म" />
        <PanchangTableRow label="करण २" value="-" />
      </div>

      {/* Shubh Muhurat Section */}
      <PanchangSection
        title="आजको शुभ साइत / मुहूर्त"
        bgColor="bg-yellow-100 p-4 rounded-md text-start text-yellow-700"
      >
        व्यापार शुभारम्भ
      </PanchangSection>

      {/* Kala Muhurat Section */}
      <PanchangSection
        title="आजको काल / मुहूर्तम्"
        bgColor="bg-red-100 rounded-lg"
      >
        <ul className="divide-y divide-red-200">
          <MuhuratItem name="गुलिक काल" time="०८:५७ - १०:२३" />
          <MuhuratItem name="दूर मुहूर्तम्" time="०९:५५ - १०:४०" />
          <MuhuratItem name="दूर मुहूर्तम् २" time="१४:२८ - १५:४५" />
          <MuhuratItem name="राहू काल" time="१२:४४ - १३:४०" />
          <MuhuratItem name="अभिजीत मुहूर्त" time="११:२६ - १२:१२" />
          <MuhuratItem name="व्रज्याम काल" time="०६:०६ - ०७:३२" />
          <MuhuratItem name="यमगण्ड" time="०६:०६ - ०७:३२" />
        </ul>
      </PanchangSection>
    </div>
  );
};

export default Panchang;
