import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useDashboard } from "./DashboardContext";
import { generateRandomColor, formatPrice } from "../utils/helper";
import { TW_CLASSES } from "../utils/constants";
import toast from "react-hot-toast";

/**
 * Context for managing cryptocurrency data.
 * @type {React.Context}
 */
const CryptoDataContext = createContext();

/**
 * Provider component that manages cryptocurrency data and user interactions.
 *
 * @param {object} props The component props.
 * @param {React.ReactNode} props.children Child components that consume the context.
 * @returns {React.ReactElement} The provider component.
 */
export const CryptoDataProvider = ({ children }) => {
  const { currency, searchTerm, page, perPage } = useDashboard();

  // State for storing raw crypto data from API.
  const [cryptos, setCryptos] = useState([]);
  // State for storing crypto data filtered by search term.
  const [displayedCryptos, setDisplayedCryptos] = useState([]);
  // State for storing user's watchlist of cryptos.
  const [watchedCryptos, setWatchedCryptos] = useState([]);
  // Conversion rate from selected currency to USD.
  const [rate, setRate] = useState(1);
  // WebSocket connection for real-time price updates.
  const [websocket, setWebsocket] = useState(null);
  const websocketRef = useRef(null);

  const fetchRateToUSD = useCallback(async () => {
    try {
      if (currency.id !== "usd") {
        const response = await fetch(
          `https://api.coincap.io/v2/rates/${currency.id}`
        );
        const data = await response.json();
        setRate(data.data["rateUsd"]);
      } else {
        setRate(1);
      }
    } catch (error) {
      toast.error(
        "Failed to load currency rate, please check your internet connection or try later"
      );
    }
  }, [currency]);

  const fetchCryptos = useCallback(async () => {
    try {
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
    } catch (error) {
      toast.error(
        "Failed to load cryptocurrencies, please check your internet connection or try later"
      );
    }
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

  useEffect(() => {
    if (!watchedCryptos.length) return;

    const url =
      "wss://ws.coincap.io/prices?assets=" +
      watchedCryptos.map((crypto) => crypto.id).join(",");

    if (websocketRef.current) websocketRef.current.close();

    const ws = new WebSocket(url);

    ws.onopen = () => {
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const updatedCryptos = watchedCryptos.map((crypto) => {
          if (data[crypto.id]) {
            const newPrice = parseFloat(data[crypto.id]);
            const oldPrice = crypto.price;
            const priceIncreased = newPrice > oldPrice;

            const newChartData = {
              date: Date.now(),
              percentageChange: ((newPrice - oldPrice) / oldPrice) * 100,
              price: newPrice,
            };
            addDataToCrypto(crypto.id, newChartData);
            crypto.price = newPrice;
            changeRowColor(crypto, priceIncreased);
          }
          return crypto;
        });

        setWatchedCryptos(updatedCryptos);
      } catch (error) {
        toast.error(
          "Failed to load latest prices, please check your internet connection or try later"
        );
      }
    };

    ws.onclose = () => {
      setWebsocket(null);
    };

    websocketRef.current = ws;

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    };
  }, [watchedCryptos]);

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

  const getCryptoPriceFormatted = (crypto, isOnWatchlist) => {
    if (isOnWatchlist) {
      crypto = watchedCryptos.find((c) => c.id === crypto.id);
      return crypto ? formatPrice(crypto.price, rate, currency.symbol) : "";
    } else {
      return formatPrice(crypto.price, rate, currency.symbol);
    }
  };

  const regenerateAllColors = () => {
    setWatchedCryptos((prevWatchedCryptos) =>
      prevWatchedCryptos.map((crypto) => ({
        ...crypto,
        color: generateRandomColor(),
      }))
    );
  };

  const changeRowColor = (crypto, priceIncreased) => {
    const rowElement = document.getElementById(crypto.id + "w");

    rowElement.classList.add(
      priceIncreased ? TW_CLASSES.GREEN_BG : TW_CLASSES.RED_BG
    );
    rowElement.classList.add(
      priceIncreased ? TW_CLASSES.DARK_GREEN_BG : TW_CLASSES.DARK_RED_BG
    );
    rowElement.classList.remove(TW_CLASSES.SLATE_BG);

    setTimeout(() => {
      rowElement.classList.remove(
        TW_CLASSES.GREEN_BG,
        TW_CLASSES.DARK_GREEN_BG,
        TW_CLASSES.RED_BG,
        TW_CLASSES.DARK_RED_BG
      );
      rowElement.classList.add(TW_CLASSES.SLATE_BG);
    }, 500);
  };

  const WatchlistTableConfig = {
    toggleCryptoIsSelected,
    toggleWatchedCryptoIsCharted,
    getCryptoPriceFormatted,
    isShowingWatchedCryptos: true,
  };

  const BrowseTableConfig = {
    toggleCryptoIsSelected,
    toggleAllCheckboxes,
    getCryptoPriceFormatted,
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
        WatchlistTableConfig,
        BrowseTableConfig,
        regenerateAllColors,
      }}
    >
      {children}
    </CryptoDataContext.Provider>
  );
};

/**
 * Custom hook to consume CryptoDataContext.
 *
 * @returns {object} The context value managing cryptocurrency data.
 */
export const useCryptoData = () => {
  return useContext(CryptoDataContext);
};
