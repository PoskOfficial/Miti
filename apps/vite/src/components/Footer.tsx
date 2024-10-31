import { Link } from 'react-router-dom';

import Octocat from './Octocat';

const Footer = () => {
  return (
    <footer className="mt-10 border-t px-2 py-2 text-center dark:border-gray-700 dark:bg-gray-900 sm:px-6 lg:px-8 ">
      <div className="container mx-auto flex items-center justify-between text-black dark:text-white">
        <div className="flex items-center gap-2">
          <a href="https://github.com/PoskOfficial/Nepali-calendar-web">
            <Octocat className="h-5 w-5 fill-current text-black dark:text-white" />
          </a>
          <h1 className="hidden lg:block">Miti - The Nepali Calendar</h1>
        </div>
        <div>
          <ul className="flex gap-2 text-xs text-gray-700 dark:text-gray-400 lg:gap-4">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/google-api-disclosure">Google Api Disclosure</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
