import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const LIMIT = 1000;

  const [currency, setCurrency] = useState("usd");
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptos, setCryptos] = useState([]);
  const [displayedCryptos, setDisplayedCryptos] = useState([]);

  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [rate, setRate] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "ascending",
    title: "Rank",
  });

  useEffect(() => {
    fetchRateToUSD();
    fetchCryptos();
  }, [currency, page, perPage]);

  useEffect(() => {
    if (searchTerm === "") {
      setDisplayedCryptos(cryptos);
    } else {
      const filtered = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedCryptos(filtered);
    }
  }, [cryptos, searchTerm]);

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

  const addToChartData = (data) => {
    setChartData((prevChartData) => [...prevChartData, data]);
  };

  const toggleAllCheckboxes = () => {
    setCryptos((prevCryptos) =>
      prevCryptos.map((crypto) => ({
        ...crypto,
        isSelected: !prevCryptos.every((c) => c.isSelected),
      }))
    );
  };

  const toggleCryptoIsSelected = (id) => {
    const updatedCryptos = cryptos.map((crypto) => {
      if (crypto.id === id) {
        crypto.isSelected = !crypto.isSelected;
      }
      return crypto;
    });
    setCryptos(updatedCryptos);
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

  const sortCryptos = () => {
    const sortedCryptos = [...cryptos].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setCryptos(sortedCryptos);
  };

  const fetchRateToUSD = useCallback(async () => {
    if (currency !== "usd") {
      const response = await fetch(
        `https://api.coincap.io/v2/rates/${currency}`
      );
      const data = await response.json();
      setRate(data.data["rateUsd"]);
    } else {
      setRate(1);
    }
  }, [currency]);

  const fetchCryptos = useCallback(async () => {
    const response = await fetch(
      `https://api.coincap.io/v2/assets?limit=${perPage}&offset=${
        (page - 1) * perPage
      }`
    );
    const data = await response.json();
    const assets = data.data.map((asset) => ({
      ...asset,
      rank: parseInt(asset.rank),
      price: parseFloat(asset.priceUsd),
      changePercent24Hr: parseFloat(asset.changePercent24Hr),
      supply: parseFloat(asset.supply),
      marketCapUsd: parseFloat(asset.marketCapUsd),
      isSelected: false,
      animationClass:
        " bg-slate-100/30 backdrop-blur-md transition-colors duration-1000",
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    }));

    setCryptos(assets);
  }, [page, perPage]);

  useEffect(() => {
    sortCryptos();
  }, [sortConfig]);

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
        cryptos,
        setCryptos,
        chartData,
        addToChartData,
        showChart,
        setShowChart,
        rate,
        setRate,
        darkMode,
        setDarkMode,
        sortConfig,
        changeSortConfig,
        toggleAllCheckboxes,
        toggleCryptoIsSelected,
        flipSortDirection,
        fetchRateToUSD,
        fetchCryptos,
        displayedCryptos,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
