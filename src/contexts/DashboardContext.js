import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CURRENCY_OPTIONS,
  TW_CLASSES,
  COINCAP_LIMIT,
} from "../utils/constants";

/**
 * Context for the dashboard settings and state.
 * @type {React.Context}
 */
const DashboardContext = createContext();

/**
 * Provider component providing context for managing dashboard state and settings.
 *
 * @param {object} props The component props.
 * @param {React.ReactNode} props.children Child components that consume the context.
 * @returns {React.ReactElement} The provider component.
 */
export const DashboardProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  // State for storing the selected currency, default is USD.
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add(TW_CLASSES.DARK_MODE);
    } else {
      document.body.classList.remove(TW_CLASSES.DARK_MODE);
    }
  }, [darkMode]);

  const changeCurrentPage = (page) => {
    if (page > 0 && page * perPage <= COINCAP_LIMIT) {
      setPage(page);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DashboardContext.Provider
      value={{
        currency,
        setCurrency,
        perPage,
        setPerPage,
        page,
        changeCurrentPage,
        searchTerm,
        setSearchTerm,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

/**
 * Custom hook to consume the DashboardContext.
 *
 * @returns {Object} The context value, providing access to the dashboard state.
 */
export const useDashboard = () => {
  return useContext(DashboardContext);
};
