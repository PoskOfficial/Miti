import Calendar from "~components/Calendar/Calendar"

import "~style.css"

import NepaliDate from "nepali-datetime"
import { useEffect } from "react"

import { getIconSrcByDay } from "~utils/icons"

function IndexPopup() {
  useEffect(() => {
    const today = new NepaliDate().getDate()
    console.log(chrome)
    chrome?.action?.setIcon({ path: getIconSrcByDay(today) })
  }, [])
  return (
    <div className="plasmo-h-full plasmo-w-[30rem] plasmo-overflow-hidden plasmo-bg-[#12151d] plasmo-pt-[0.15rem] plasmo-text-slate-100 plasmo-antialiased dark">
      <Calendar />
    </div>
  )
}

export default IndexPopup
