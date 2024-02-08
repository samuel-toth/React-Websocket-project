import React, { useState, useEffect } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import CryptoTable from "./CryptoTable";
import PaginationFooter from "./PaginationFooter";
import CryptoGrid from "./CryptoGrid";
import CryptoChart from "./CryptoChart";

const Dashboard = () => {
  const [websocket, setWebsocket] = useState(null);

  const { cryptos, setCryptos, rate, addToChartData, showChart, currency } =
    useDashboard();

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
            addToChartData(newChartData);
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
  }, [cryptos]);

  return (
    <div className="lg:px-60 md:px-20 sm:px-10 px-24 pt-48 pb-10">
      <div className={`chart-container ${showChart ? "chart-visible" : ""}`}>
        <CryptoChart />
      </div>
      <div className={`table-container ${showChart ? "table-lowered" : ""}`}>
        <CryptoTable currency={currency} rate={rate} />
        <CryptoGrid currency={currency} rate={rate} />
        <PaginationFooter />
      </div>
    </div>
  );
};

export default Dashboard;
