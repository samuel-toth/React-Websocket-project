import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  
  const [currency, setCurrency] = useState("usd");
  const [per_page, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const LIMIT = 1000;

  const [chartedCryptos, setChartedCryptos] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

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

  const changeSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const changeChartedCryptos = (cryptoId) => {

    if (chartedCryptos.includes(cryptoId)) {
      setChartedCryptos(chartedCryptos.filter((crypto) => crypto !== cryptoId));
    } else {
      setChartedCryptos(chartedCryptos.concat(cryptoId));
    }
  };

  const changeChartData = (data) => {
    setChartData(chartData.concat(data));
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
        searchTerm,
        changeSearchTerm,
        chartedCryptos,
        changeChartedCryptos,
        chartData,
        changeChartData,
        showChart,
        setShowChart,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
