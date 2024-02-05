import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [per_page, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const LIMIT = 1000;

  const changeCurrency = (cur) => {
    setCurrency(cur);
  };

  const changePerPage = (per_page) => {
    setPerPage(per_page);
  };

  const changePage = (page) => {
    if (page > 0 && page / per_page <= LIMIT) {
      setPage(page);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        currency,
        changeCurrency,
        per_page,
        changePerPage,
        page,
        changePage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
