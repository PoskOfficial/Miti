import NepaliDate from "nepali-datetime"

import { getIconSrcByDay } from "~utils/icons"

chrome?.alarms?.create("updateIcon", { periodInMinutes: 5 })

const updateIcon = () => {
  const today = new NepaliDate().getDate()
  chrome?.action?.setIcon({ path: getIconSrcByDay(today) })
}

chrome?.alarms?.onAlarm?.addListener((alarm) => {
  console.log(alarm)
  if (alarm.name === "updateIcon") {
    updateIcon()
  }
})
chrome?.runtime?.onStartup?.addListener(() => {
  console.log("Browser opened - running startup function.")
  updateIcon()
})
