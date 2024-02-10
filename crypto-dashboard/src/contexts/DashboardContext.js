import React, { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const LIMIT = 1000;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [currency, setCurrency] = useState("usd");
  const [searchTerm, setSearchTerm] = useState("");
  const [showChart, setShowChart] = useState(false);
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
        showChart,
        setShowChart,
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
