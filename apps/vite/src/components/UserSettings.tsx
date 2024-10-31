import { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Cog6ToothIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { apiBaseUrl } from '../helper/api';
import { classNames } from '../helper/utils';
import { DarkModeContext } from './DarkModeProvider';

function LoginWithGoogle({ darkMode }: { darkMode: boolean }) {
  return darkMode ? (
    <img src="/icons/btn_google_signin_dark_normal_web@2x.png" />
  ) : (
    <img src="/icons/btn_google_signin_light_normal_web@2x.png" />
  );
}
const UserSettings = ({
  photoUrl,
  status,
}: {
  photoUrl?: string | null;
  status: string;
}) => {
  const { t, i18n } = useTranslation();
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  return (
    <Menu as="div" className="relative ml-3">
      <div className="flex items-center gap-1 rounded-full border p-0.5 shadow-sm dark:border-gray-400 ">
        {status != 'NOT_LOGGED_IN' && (
          <div className="relative ">
            <img
              className="h-8 w-8 rounded-full"
              src={
                photoUrl ||
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }
              alt="user image"
            />
            <span
              className={classNames(
                'absolute bottom-0 left-0 h-2 w-2 rounded-full bg-gray-500 ring-2 ring-white dark:ring-gray-300',
                status == 'LOGGED_IN' && 'bg-green-500',
                status == 'NOT_LOGGED_IN' && 'bg-orange-500',
              )}
            ></span>
          </div>
        )}
        <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <Cog6ToothIcon
            className="h-6 w-6 text-gray-600 dark:text-white"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
          {status != 'OFFLINE' && (
            <Menu.Item>
              {({ active }) => (
                <a
                  href={
                    status == 'NOT_LOGGED_IN'
                      ? `${apiBaseUrl}/auth/google?redirect=${window.location.origin}`
                      : `${apiBaseUrl}/auth/logout`
                  }
                  target="_self"
                  className={classNames(
                    active ? 'bg-gray-200 dark:bg-gray-800' : '',
                    'block cursor-pointer rounded-md text-sm text-gray-700 dark:text-white',
                  )}
                >
                  {status == 'NOT_LOGGED_IN' ? (
                    <LoginWithGoogle darkMode={darkMode} />
                  ) : (
                    <span className="block px-4 py-2">
                      {t('navbar.Sign_out')}
                    </span>
                  )}
                </a>
              )}
            </Menu.Item>
          )}

          <div className="flex items-center justify-between py-2">
            <div className="flex w-1/2 items-center justify-center border-r">
              <span className="sr-only">change language</span>

              {i18n.language == 'en' ? (
                <button onClick={() => i18n.changeLanguage('ne')}>
                  <img src="/icons/np.png" alt="Nepali" className="h-4" />
                </button>
              ) : (
                <button onClick={() => i18n.changeLanguage('en')}>
                  <img src="/icons/en.png" className="h-4" alt="English" />
                </button>
              )}
            </div>
            <div className="ml-auto flex w-1/2 items-center justify-center">
              {/* for future */}
              <button onClick={toggleDarkMode}>
                {!darkMode ? (
                  <MoonIcon className="h-6 dark:text-white" />
                ) : (
                  <SunIcon className="h-6 dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserSettings;
