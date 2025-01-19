import React from "react"

const NepaliWeekdays = () => {
  const weekdays = ["आ", "सो", "मं", "बु", "बि", "शु", "श"]

  return (
    <div className="plasmo-bg-slate-900 plasmo-w-full plasmo-py-3">
      <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-px-4">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="plasmo-text-gray-300 plasmo-text-sm plasmo-font-hindi">
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NepaliWeekdays
