import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';

const DarkModeContext = createContext();

export default function DarkModeContextProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(false, 'isDark');

  function toggleDarkMode() {
    setIsDark((curr) => !curr);
  }

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  }, [isDark]);

  return (
    <DarkModeContext.Provider
      value={{
        isDark,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error(
      "You're using context outside it provider. Please use inside"
    );

  return context;
}
