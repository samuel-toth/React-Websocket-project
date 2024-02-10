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
  const [watchedCryptos, setWatchedCryptos] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      isSelected: watchedCryptos.some((crypto) => crypto.id === asset.id),
      color: generateRandomColor(),
    }));

    setCryptos(assets);
  }, [page, perPage]);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${"0".repeat(6 - randomColor.length)}${randomColor}`;
  };

  const refreshData = () => {
    fetchCryptos();
    fetchRateToUSD();
  };

  const addToChartData = (data) => {
    setChartData((prevChartData) => [...prevChartData, data]);
  };

  const addCryptoToWatchlist = (crypto) => {
    const newCrypto = {
      id: crypto.id,
      name: crypto.name,
      price: crypto.price,
      rank: crypto.rank,
      symbol: crypto.symbol,
      isSelected: true,
      isCharted: false,
      color: crypto.color,
      changePercent24Hr: crypto.changePercent24Hr,
    };

    setWatchedCryptos((prevWatchedCryptos) => [
      ...prevWatchedCryptos,
      newCrypto,
    ]);
  };

  const removeCryptoFromWatchlist = (id) => {
    setWatchedCryptos((prevWatchedCryptos) =>
      prevWatchedCryptos.filter((crypto) => crypto.id !== id)
    );

    setCryptos((prevCryptos) =>
      prevCryptos.map((crypto) => {
        if (crypto.id === id) {
          return { ...crypto, isSelected: false };
        }
        return crypto;
      })
    );

    setChartData((prevChartData) =>
      prevChartData.filter((crypto) => crypto.id !== id)
    );
  };

  const toggleAllCheckboxes = (state) => {
    const updatedCryptos = cryptos.map((crypto) => {
      crypto.isSelected = state;
      if (state) {
        setWatchedCryptos(cryptos);
      } else {
        setWatchedCryptos([]);
      }
      return crypto;
    });
    setCryptos(updatedCryptos);
  };

  const toggleCryptoIsSelected = (id) => {
    const updatedCryptos = cryptos.map((crypto) => {
      if (crypto.id === id) {
        const updatedCrypto = { ...crypto };
        updatedCrypto.isSelected = !updatedCrypto.isSelected;
        if (updatedCrypto.isSelected) {
          addCryptoToWatchlist(updatedCrypto);
        } else {
          removeCryptoFromWatchlist(id);
        }
        return updatedCrypto;
      }
      return crypto;
    });
    setCryptos(updatedCryptos);
  };

  const toggleWatchedCryptoIsCharted = (id) => {
    const updatedWatchedCryptos = watchedCryptos.map((crypto) => {
      if (crypto.id === id) {
        const updatedCrypto = { ...crypto };
        updatedCrypto.isCharted = !updatedCrypto.isCharted;
        return updatedCrypto;
      }
      return crypto;
    });
    setWatchedCryptos(updatedWatchedCryptos);
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
        refreshData,
        watchedCryptos,
        setWatchedCryptos,
        toggleWatchedCryptoIsCharted,
      }}
    >
      {children}
    </CryptoDataContext.Provider>
  );
};

export const useCryptoData = () => {
  return useContext(CryptoDataContext);
};
