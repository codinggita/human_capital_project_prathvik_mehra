/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme as toggleThemeAction } from '../features/uiSlice';

// Create Theme Context with default values
const ThemeContext = createContext({
  themeMode: 'light',
  toggleTheme: () => {},
});

/**
 * ThemeContextProvider
 * Bridges Redux UI slice theme state to React Context.
 * Ensures the DOM class is correctly updated for Tailwind CSS selectors.
 */
export const ThemeContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.themeMode);

  // Dispatch toggle action in Redux
  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  // Sync theme mode to DOM document element class list (Tailwind support)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom Hook to consume the ThemeContext
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
export default ThemeContext;
