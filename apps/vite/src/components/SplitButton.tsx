import React from 'react';

import { classNames } from '../helper/utils';

const SplitButton = ({
  buttons,
  selectedView,
  setView,
}: {
  buttons: { id: string; children: React.ReactNode }[];
  selectedView: string;
  setView: (view: string) => void;
}) => {
  return (
    <div className="inline-flex rounded-md border-2 border-gray-200 bg-gray-200 text-sm leading-none text-gray-500">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={classNames(
            'inline-flex items-center rounded-md px-2 py-2 transition-colors duration-300 ease-in hover:text-blue-400 focus:text-blue-400 focus:outline-none',
            selectedView === button.id ? 'bg-white' : '',
          )}
          id={button.id}
          onClick={() => setView(button.id)}
        >
          {button.children}
        </button>
      ))}
    </div>
  );
};

export default SplitButton;
