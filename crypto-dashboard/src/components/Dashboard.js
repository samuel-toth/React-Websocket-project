import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import CryptoTable from "./CryptoTable";
import PaginationFooter from "./PaginationFooter";
import CryptoGrid from "./CryptoGrid";
import CryptoChart from "./CryptoChart";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Dashboard = () => {
  const [websocket, setWebsocket] = useState(null);
  const { showChart, currency, page, changeCurrentPage, setPerPage } =
    useDashboard();
  const {
    watchedCryptos,
    displayedCryptos,
    setWatchedCryptos,
    rate,
    addToChartData,
  } = useCryptoData();
  const websocketRef = useRef(null);
  const [isTableVisible, setIsTableVisible] = useState(true);

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
              id: crypto.id,
              name: crypto.name,
              date: Date.now(),
              percentageChange: ((newPrice - oldPrice) / oldPrice) * 100,
            };
            addToChartData(newChartData);

            crypto.price = newPrice;
            changeRowColor(crypto, priceIncreased);
          }
          return crypto;
        });

        setWatchedCryptos(updatedCryptos);
      } catch (error) {
        console.error("Error: ", error);
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

  const changeRowColor = (crypto, priceIncreased) => {
    const rowElement = document.getElementById(crypto.id + "w");
    rowElement.classList.add(priceIncreased ? "bg-green-200" : "bg-red-200");
    rowElement.classList.remove("bg-slate-100/30");

    setTimeout(() => {
      rowElement.classList.remove(
        "bg-green-200",
        "bg-red-200",
        "animate-highlight"
      );
      rowElement.classList.add("bg-slate-100/30");
    }, 500);
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <div>
      <div className={`chart-container ${showChart ? "chart-visible" : ""}`}>
        <CryptoChart />
      </div>
      <h2 className="sm:text-4xl text-2xl sm:mt-10 mt-8 px-2 sm:px-8  font-extralight drop-shadow-lg">
        Your Watchlist
      </h2>
      {watchedCryptos.length === 0 ? (
        <p className="text-lg px-2 sm:px-8 font-extralight drop-shadow-lg">
          Nothing here, please add any cryptocurrency to watchlist.
        </p>
      ) : (
        <CryptoTable
          displayedCryptos={watchedCryptos}
          currency={currency}
          rate={rate}
          isShowingWatchedCryptos={true}
        />
      )}
      <h2 className="sm:text-4xl text-2xl mt-16 px-2 sm:px-8 font-extralight drop-shadow-lg flex justify-between">
        Browse Cryptocurrencies
        <button
          onClick={toggleTableVisibility}
          className="cursor-pointer drop-shadow-lg"
          aria-label="Show or hide cryptocurrencies table"
          title="Show/Hide cryptocurrencies"
        >
          {isTableVisible ? <FaChevronUp className="text-2xl"/> : <FaChevronDown className="text-2xl"/>}
        </button>
      </h2>
      <div
        className={`table-container ${
          isTableVisible ? "table-visible" : "table-hidden"
        }`}
      >
        <div className="hidden lg:visible md:visible md:flex sm:hidden">
          <CryptoTable
            displayedCryptos={displayedCryptos}
            currency={currency}
            rate={rate}
          />
        </div>
        <div className="lg:hidden md:hidden">
          <CryptoGrid
            currency={currency}
            rate={rate}
            displayedCryptos={displayedCryptos}
          />
        </div>
        <PaginationFooter
          page={page}
          changeCurrentPage={changeCurrentPage}
          setPerPage={setPerPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
