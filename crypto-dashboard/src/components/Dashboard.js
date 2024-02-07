import React, { useState, useEffect, useCallback } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import CryptoTable from "./CryptoTable";
import PaginationFooter from "./PaginationFooter";
import CryptoGrid from "./CryptoGrid";
import CryptoChart from "./CryptoChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [websocket, setWebsocket] = useState(null);
  let [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "ascending",
  });
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const {
    cryptos,
    setCryptos,
    rate,
    setRateToUSD,
    page,
    changePage,
    per_page,
    changePerPage,
    searchTerm,
    changeChartData,
    showChart,
    currency,
  } = useDashboard();

  const fetchRateToUSD = useCallback(async () => {
    if (currency !== "usd") {
      const response = await fetch(
        `https://api.coincap.io/v2/rates/${currency}`
      );
      const data = await response.json();
      setRateToUSD(data.data["rateUsd"]);
    } else {
      setRateToUSD(1);
    }
  }, [currency]);

  const fetchCryptos = useCallback(async () => {
    const response = await fetch(
      `https://api.coincap.io/v2/assets?limit=${per_page}&offset=${
        (page - 1) * per_page
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
    setLoading(false);
  }, [page, per_page]);

  useEffect(() => {
    if (!cryptos.some((crypto) => crypto.isSelected)) {
      return;
    }

    if (websocket) {
      websocket.close();
    }

    const ws = new WebSocket(
      "wss://ws.coincap.io/prices?assets=" +
        cryptos
          .filter((crypto) => crypto.isSelected)
          .map((crypto) => crypto.id)
          .join(",")
    );

    ws.onopen = () => {
      setWebsocket(ws);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updatedCryptos = cryptos.map((crypto) => {
        if (data[crypto.id]) {
          const newPrice = parseFloat(data[crypto.id]);
          const oldPrice = crypto.price;
          const priceIncreased = newPrice > oldPrice;
          const priceDecreased = newPrice < oldPrice;

          if (crypto.isSelected) {
            const newChartData = {
              id: crypto.id,
              name: crypto.name,
              date: Date.now(),
              percentageChange: ((newPrice - oldPrice) / oldPrice) * 100,
            };
            changeChartData(newChartData);
          }

          crypto.price = newPrice;
          crypto.animationClass = priceIncreased
            ? "bg-green-200 animate-highlight"
            : priceDecreased
            ? "bg-red-200 animate-highlight"
            : "";

          setTimeout(() => {
            crypto.animationClass =
              "transition-colors duration-1000 bg-slate-100/30 backdrop-blur-md";
            setCryptos([...cryptos]);
          }, 300);
        }
        return crypto;
      });

      setCryptos(updatedCryptos);
    };

    return () => {
      ws.close();
    };
  }, [changeChartData, cryptos]);

  useEffect(() => {
    fetchRateToUSD();
  }, [fetchRateToUSD]);

  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCryptos(cryptos);
    } else {
      const filtered = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCryptos(filtered);
    }
  }, [cryptos, searchTerm]);

  const toggleCryptoRefresh = (id) => {
    const updatedCryptos = cryptos.map((crypto) => {
      if (crypto.id === id) {
        crypto.isSelected = !crypto.isSelected;
      }
      return crypto;
    });
    setCryptos(updatedCryptos);
  };

  const toggleAllCheckboxes = () => {
    if (cryptos.every((crypto) => crypto.isSelected)) {
      const updatedCryptos = cryptos.map((crypto) => {
        crypto.isSelected = false;
        return crypto;
      });
      setCryptos(updatedCryptos);
    } else {
      const updatedCryptos = cryptos.map((crypto) => {
        crypto.isSelected = true;
        return crypto;
      });

      setCryptos(updatedCryptos);
    }
  };

  const sortCryptos = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    setCryptos((prevCryptos) => {
      let sortedCryptos = [...prevCryptos];
      sortedCryptos.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sortedCryptos;
    });
  };

  return (
    <div className="lg:px-40 md:px-20 sm:px-10 px-10 py-10">
      <div className={`chart-container ${showChart ? "chart-visible" : ""}`}>
        <CryptoChart />
      </div>

      <div className={`table-container ${showChart ? "table-lowered" : ""}`}>
        <CryptoTable
          cryptos={filteredCryptos}
          sortConfig={sortConfig}
          onSort={sortCryptos}
          currency={currency}
          toggleAllCheckboxes={toggleAllCheckboxes}
          handleRefreshCheckbox={toggleCryptoRefresh}
          rate={rate}
        />

        <CryptoGrid
          cryptos={filteredCryptos}
          sortConfig={sortConfig}
          onSort={sortCryptos}
          currency={currency}
          toggleAllCheckboxes={toggleAllCheckboxes}
          handleRefreshCheckbox={toggleCryptoRefresh}
          rate={rate}
        />
        <PaginationFooter
          page={page}
          per_page={per_page}
          handleItemsPerPageChange={changePerPage}
          handlePageChange={changePage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
