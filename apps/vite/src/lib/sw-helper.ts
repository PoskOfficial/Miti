const UPDATE_CHECK = "UPDATE_CHECK"

interface PeriodicSyncManager {
  register(tag: string, options?: { minInterval: number }): Promise<void>
}

declare global {
  interface ServiceWorkerRegistration {
    readonly periodicSync: PeriodicSyncManager
  }
}

export function initSW() {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").then((registration) => {
        // Check for updates once on load if we're online
        if (navigator.onLine) {
          registration.update()
        }
      })

      // Force reload when new service worker takes control
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload()
      })

      void navigator.serviceWorker.ready.then(async (registration) => {
        if ("periodicSync" in registration) {
          const status = await navigator.permissions.query({
            // @ts-expect-error periodicsync is not included in the default SW interface.
            name: "periodic-background-sync",
          })

          if (status.state === "granted") {
            await registration.periodicSync.register(UPDATE_CHECK, {
              minInterval: 60 * 60 * 1000, // Check every hour
            })
          }
        }

        // Check for updates when app becomes visible AND we're online
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState !== "hidden" && navigator.onLine) {
            navigator.serviceWorker.controller?.postMessage(UPDATE_CHECK)
            void registration.update()
          }
        })

        // Also check for updates when we come back online
        window.addEventListener("online", () => {
          navigator.serviceWorker.controller?.postMessage(UPDATE_CHECK)
          void registration.update()
        })
      })
    }
  })
}
