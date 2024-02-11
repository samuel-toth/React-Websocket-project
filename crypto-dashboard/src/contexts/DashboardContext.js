import React, { createContext, useContext, useState, useEffect } from "react";
import { currencyOptions } from "../utils/helper";

const DashboardContext = createContext();

/**
 * DashboardProvider provides a context for managing dashboard state and settings.
 * 
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The rendered component.
 */
export const DashboardProvider = ({ children }) => {
  const LIMIT = 1000;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const changeCurrentPage = (page) => {
    if (page > 0 && page / perPage <= LIMIT) {
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

export const useDashboard = () => {
  return useContext(DashboardContext);
};
