const UPDATE_CHECK = 'UPDATE_CHECK';

interface PeriodicSyncManager {
  register(tag: string, options?: { minInterval: number }): Promise<void>;
}

declare global {
  interface ServiceWorkerRegistration {
    readonly periodicSync: PeriodicSyncManager;
  }
}

export function initSW() {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/sw.js');

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      }

      void navigator.serviceWorker.ready.then(async (registration) => {
        if ('periodicSync' in registration) {
          const status = await navigator.permissions.query({
            // @ts-expect-error periodicsync is not included in the default SW interface.
            name: 'periodic-background-sync',
          });

          if (status.state === 'granted') {
            await registration.periodicSync.register(UPDATE_CHECK, {
              minInterval: 60 * 60 * 1000,
            });
          }
        }

        if (window.matchMedia('(display-mode: standalone)').matches) {
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState !== 'hidden') {
              navigator.serviceWorker.controller?.postMessage(UPDATE_CHECK);
              void registration.update();
            }
          });
        }
      });
    }
  });
}
