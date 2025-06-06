declare const self: ServiceWorkerGlobalScope

interface PeriodicBackgroundSyncEvent extends ExtendableEvent {
  tag: string
}

import { ExpirationPlugin } from "workbox-expiration"
import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { CacheFirst, NetworkFirst } from "workbox-strategies"
import { CacheableResponsePlugin } from "workbox-cacheable-response"
import * as googleAnalytics from "workbox-google-analytics"
import NepaliDate from "nepali-datetime"

googleAnalytics.initialize()

const UPDATE_CHECK = "UPDATE_CHECK"
import { apiBaseUrl } from "../helper/api"

const checkForUpdates = async () => {
  const year = new NepaliDate().getYear()
  const month = new NepaliDate().getMonth()
  const yearData = await fetch(`/data/${year}-calendar.json`).then((res) =>
    res.json()
  )
  const currentMonthInHumanForm = (month + 1).toString().padStart(2, "0")
  const monthData = yearData[currentMonthInHumanForm]
  const startDate = monthData[0].AD_date.ad
  const endDate = monthData[monthData.length - 1].AD_date.ad
  await fetch(`${apiBaseUrl}/events?timeMin=${startDate}&timeMax=${endDate}`)
  Promise.resolve()
}
precacheAndRoute(self.__WB_MANIFEST || [])

registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new CacheFirst({
    cacheName: "google-fonts-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

registerRoute(
  /^https:\/\/fonts\.gstatic\.com\/.*/i,
  new CacheFirst({
    cacheName: "gstatic-fonts-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

// Add version number to help with cache busting
const VERSION = new Date().getTime()

// Modify the NetworkFirst strategy to include cache busting
registerRoute(
  /\/api\/.*/i,
  new NetworkFirst({
    cacheName: "events-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Increased cache entries
        maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days cache
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
  "GET"
)

self.addEventListener("install", (event) => {
  event.waitUntil(Promise.all([checkForUpdates(), self.skipWaiting()]))
})

self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([checkForUpdates(), self.clients.claim()]))
})

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.tag))
  event.notification.close()
})

self.addEventListener("periodicsync", (event: PeriodicBackgroundSyncEvent) => {
  if (event.tag === UPDATE_CHECK) {
    event.waitUntil(checkForUpdates())
  }
})

self.addEventListener("message", (event) => {
  if (event.data === UPDATE_CHECK) {
    event.waitUntil(checkForUpdates())
  }
})
