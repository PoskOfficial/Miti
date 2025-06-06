import { cn } from "@/lib/utils"
import { NewCalendarData } from "@miti/types"
import NepaliDate from "nepali-datetime"
import { Calendar, Clock, Moon, Sun, Star, Wind, Earth } from "lucide-react"

export const PanchangTableRow = ({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) => {
  return (
    <div className="flex items-center px-5 justify-between py-3">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
        )}
        <p className="font-medium text-gray-700 dark:text-gray-300">{label}:</p>
      </div>
      <p className="text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  )
}

const PanchangSection = ({
  title,
  children,
  classes,
  icon,
}: {
  title: string
  children: React.ReactNode
  classes?: string
  icon?: React.ReactNode
}) => {
  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-4">
        {icon && (
          <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
        )}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <div
        className={cn(
          "rounded-xl border border-gray-200 dark:border-gray-700",
          classes
        )}
      >
        {children}
      </div>
    </div>
  )
}

const MuhuratItem = ({ name, time }: { name: string; time?: string }) => {
  return (
    <li className="flex justify-between p-4 text-black dark:text-white text-start hover:bg-opacity-70 transition-colors">
      <span className="font-medium">{name}</span>
      <span className="text-gray-700 dark:text-gray-300">{time}</span>
    </li>
  )
}

const Panchang = ({ data }: { data: NewCalendarData }) => {
  return (
    <div className="max-w-2xl my-5 mx-auto bg-whiterounded-xl">
      <div className="flex items-center gap-2 mb-4">
        {
          <span className="text-indigo-600 dark:text-indigo-400">
            <Earth />
          </span>
        }
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          पञ्चाङ्ग
        </h3>
      </div>

      <div className="bg-gradient-to-br divide-y divide-orange-100 dark:divide-orange-900/20 from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 py-2 rounded-xl border border-orange-100 dark:border-orange-900/20 mb-6">
        <PanchangTableRow
          label="तारिख"
          value={new NepaliDate(data.calendarInfo.dates.bs.full.en ?? "")
            .getDateObject()
            .toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          icon={<Calendar size={18} />}
        />

        <PanchangTableRow
          label="चन्द्र राशि"
          value={data.panchangaDetails?.chandraRashi.time.np ?? "-"}
          icon={<Moon size={18} />}
        />
        <PanchangTableRow
          label="सूर्य राशि"
          value={data.panchangaDetails?.suryaRashi.np ?? "-"}
          icon={<Sun size={18} />}
        />
        <PanchangTableRow
          label="ऋतु"
          value={data.hrituDetails?.title.np ?? "-"}
          icon={<Wind size={18} />}
        />
        <PanchangTableRow
          label="नक्षत्र समाप्ति समय"
          value="१७:४३"
          icon={<Star size={18} />}
        />
        <PanchangTableRow
          label="करण १"
          value={data.panchangaDetails?.karans.first.np ?? "-"}
        />
        <PanchangTableRow
          label="करण २"
          value={data.panchangaDetails?.karans.second.np ?? "-"}
        />
        <PanchangTableRow
          label="पक्ष"
          value={data.panchangaDetails?.pakshya.np ?? "-"}
        />
        <PanchangTableRow
          label="योग"
          value={data.panchangaDetails?.yog.np ?? "-"}
        />
        <PanchangTableRow
          label="तिथि"
          value={
            (data.tithiDetails?.title.np ?? "-") +
            (data.tithiDetails?.display.np ?? "-")
          }
        />
      </div>
      <PanchangSection title="शुभ साइत / मुहूर्त" icon={<Sun size={20} />}>
        <ul
          className={cn(
            "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl divide-y divide-orange-100 dark:divide-orange-900/20 overflow-hidden",
            data.auspiciousMoments.sahits.length === 0 && "p-4"
          )}
        >
          {data.auspiciousMoments.sahits.length > 0 ? (
            data.auspiciousMoments.sahits.map((sahit, index) => (
              <MuhuratItem key={index} name={sahit.title.np ?? ""} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center italic">
              आज शुभ साइत / मुहूर्त छैन।
            </p>
          )}
        </ul>
      </PanchangSection>

      <PanchangSection title="काल / मुहूर्तम्" icon={<Clock size={20} />}>
        <ul
          className={cn(
            "divide-y divide-emerald-100 dark:divide-emerald-900/20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl overflow-hidden",
            data.auspiciousMoments.muhurats.length === 0 && "p-4"
          )}
        >
          {data.auspiciousMoments.muhurats.length > 0 ? (
            data.auspiciousMoments.muhurats.map((muhurat, index) => (
              <MuhuratItem
                key={index}
                name={muhurat.periodName ?? ""}
                time={muhurat.duration ?? ""}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center italic">
              आज काल / मुहूर्तम् छैन।
            </p>
          )}
        </ul>
      </PanchangSection>
    </div>
  )
}

export default Panchang
