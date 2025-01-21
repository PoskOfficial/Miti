import React, { useCallback } from "react"

const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true

const useNavigatorOnLine = (): Boolean => {
  const [status, setStatus] = React.useState(getOnLineStatus())

  const setOnline = () => useCallback(() => setStatus(true), [])
  const setOffline = () => useCallback(() => setStatus(false), [])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    window.addEventListener("online", setOnline)
    window.addEventListener("offline", setOffline)

    return () => {
      window.removeEventListener("online", setOnline)
      window.removeEventListener("offline", setOffline)
    }
  }, [])

  return status
}

export default useNavigatorOnLine
