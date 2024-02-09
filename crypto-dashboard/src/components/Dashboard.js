import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";

import CryptoTable from "./CryptoTable";
import PaginationFooter from "./PaginationFooter";
import CryptoGrid from "./CryptoGrid";
import CryptoChart from "./CryptoChart";

const Dashboard = () => {
  const [websocket, setWebsocket] = useState(null);
  const { showChart, currency, page, changeCurrentPage, setPerPage } = useDashboard();
  const { watchedCryptos, displayedCryptos, setWatchedCryptos, rate, addToChartData } = useCryptoData();
  const websocketRef = useRef(null);

  useEffect(() => {
    if (!watchedCryptos.length) return;

    const url = "wss://ws.coincap.io/prices?assets=" + watchedCryptos.map((crypto) => crypto.id).join(",");

    if (websocketRef.current) {
      websocketRef.current.close();
    }

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
            const priceDecreased = newPrice < oldPrice;

            const newChartData = {
              id: crypto.id,
              name: crypto.name,
              date: Date.now(),
              percentageChange: ((newPrice - oldPrice) / oldPrice) * 100,
            };
            addToChartData(newChartData);

            crypto.price = newPrice;
            crypto.animationClass = priceIncreased
              ? "bg-green-200 animate-highlight"
              : priceDecreased
              ? "bg-red-200 animate-highlight"
              : "";

            setTimeout(() => {
              crypto.animationClass =
                "transition-colors duration-1000 bg-slate-100/30 backdrop-blur-md";
              setWatchedCryptos([...watchedCryptos]);
            }, 300);
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

  return (
    <div>
      <div className={`chart-container ${showChart ? "chart-visible" : ""}`}>
        <CryptoChart />
      </div>
      <div className={`table-container ${showChart ? "table-lowered" : ""}`}>
        <CryptoTable displayedCryptos={watchedCryptos} currency={currency} rate={rate} />
        <CryptoTable displayedCryptos={displayedCryptos} currency={currency} rate={rate} />
        <CryptoGrid currency={currency} rate={rate} />
        <PaginationFooter page={page} changeCurrentPage={changeCurrentPage} setPerPage={setPerPage} />
      </div>
    </div>
  );
};


export default Dashboard;
