import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDashboard } from "./DashboardContext";
import { generateRandomColor, formatPrice } from "../utils/helper";

const CryptoDataContext = createContext();

/**
 * CryptoDataProvider provides a context for managing cryptocurrency data and watchlist.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The rendered component.
 */
export const CryptoDataProvider = ({ children }) => {
  const { currency, searchTerm, page, perPage } = useDashboard();

  const [cryptos, setCryptos] = useState([]);
  const [displayedCryptos, setDisplayedCryptos] = useState([]);
  const [watchedCryptos, setWatchedCryptos] = useState([]);
  const [rate, setRate] = useState(1);

  const fetchRateToUSD = useCallback(async () => {
    if (currency.id !== "usd") {
      const response = await fetch(
        `https://api.coincap.io/v2/rates/${currency.id}`
      );
      const data = await response.json();
      setRate(data.data["rateUsd"]);
    } else {
      setRate(1);
    }
  }, [currency]);

  const getCryptoPriceFormatted = (crypto, isOnWatchlist) => {
    if (isOnWatchlist) {
      crypto = watchedCryptos.find((c) => c.id === crypto.id);
      return crypto ? formatPrice(crypto.price, rate, currency.symbol) : "";
    } else {
      return formatPrice(crypto.price, rate, currency.symbol);
    }
  };

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
    }));

    setCryptos(assets);
  }, [page, perPage]);

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

  const refreshData = () => {
    fetchCryptos();
    fetchRateToUSD();
  };

  const addDataToCrypto = (crypto, data) => {
    setWatchedCryptos((prevWatchedCryptos) =>
      prevWatchedCryptos.map((watchedCrypto) => {
        if (watchedCrypto.id === crypto) {
          watchedCrypto.data.push(data);
        }
        return watchedCrypto;
      })
    );
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
      color: generateRandomColor(),
      changePercent24Hr: crypto.changePercent24Hr,
      data: [],
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
  };

  const toggleAllCheckboxes = () => {
    const updatedCryptos = displayedCryptos.map((crypto) => {
      const updatedCrypto = { ...crypto };
      updatedCrypto.isSelected = !updatedCrypto.isSelected;
      if (updatedCrypto.isSelected) {
        addCryptoToWatchlist(updatedCrypto);
      } else {
        removeCryptoFromWatchlist(updatedCrypto.id);
      }
      return updatedCrypto;
    });
    setCryptos(updatedCryptos);
  };

  const toggleCryptoIsSelected = (id) => {
    const updatedCryptos = displayedCryptos.map((crypto) => {
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

  return (
    <CryptoDataContext.Provider
      value={{
        cryptos,
        setCryptos,
        displayedCryptos,
        rate,
        toggleAllCheckboxes,
        toggleCryptoIsSelected,
        refreshData,
        watchedCryptos,
        setWatchedCryptos,
        toggleWatchedCryptoIsCharted,
        addDataToCrypto,
        getCryptoPriceFormatted,
      }}
    >
      {children}
    </CryptoDataContext.Provider>
  );
};

export const useCryptoData = () => {
  return useContext(CryptoDataContext);
};
