import React, { createContext, useEffect, useState } from 'react';

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create a context for Dark Mode
export const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: true,
  toggleDarkMode: () => {
    return;
  },
});
const darkModeLocalStorageKey = 'Miti_dark';

// Create a Dark Mode provider component
export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem(darkModeLocalStorageKey) === 'true',
  );

  useEffect(() => {
    localStorage.setItem(darkModeLocalStorageKey, `${darkMode}`);
    document.body.classList.toggle('bg-gray-800', darkMode);
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
