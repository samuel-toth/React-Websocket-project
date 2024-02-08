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
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "ascending",
    title: "Rank",
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
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

  const changeSortConfig = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const flipSortDirection = () => {
    setSortConfig({
      ...sortConfig,
      direction:
        sortConfig.direction === "ascending" ? "descending" : "ascending",
    });
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
        setDarkMode,
        sortConfig,
        changeSortConfig,
        flipSortDirection,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
