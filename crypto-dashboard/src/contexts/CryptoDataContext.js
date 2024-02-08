import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDashboard } from "./DashboardContext";

const CryptoDataContext = createContext();

export const CryptoDataProvider = ({ children }) => {
  const { currency, searchTerm, page, perPage, sortConfig } = useDashboard();

  const [cryptos, setCryptos] = useState([]);
  const [displayedCryptos, setDisplayedCryptos] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  useEffect(() => {
    sortCryptos();
  }, [sortConfig]);

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
    fetchRateToUSD();
    fetchCryptos();
  }, [currency, page, perPage]);

  return (
    <CryptoDataContext.Provider
      value={{
        cryptos,
        setCryptos,
        displayedCryptos,
        chartData,
        rate,
        loading,
        error,
        toggleAllCheckboxes,
        toggleCryptoIsSelected,
        addToChartData,
      }}
    >
      {children}
    </CryptoDataContext.Provider>
  );
};

export const useCryptoData = () => {
  return useContext(CryptoDataContext);
};
