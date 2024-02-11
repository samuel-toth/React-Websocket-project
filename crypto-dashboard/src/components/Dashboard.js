import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import CryptoTable from "./CryptoTable";
import PaginationFooter from "./PaginationButtons";
import CryptoGrid from "./CryptoGrid";
import CryptoChart from "./CryptoChart";
import CollapsibleView from "./CollapsibleView";

const Dashboard = () => {
  const [websocket, setWebsocket] = useState(null);
  const { page, changeCurrentPage, setPerPage } = useDashboard();
  const {
    watchedCryptos,
    displayedCryptos,
    setWatchedCryptos,
    rate,
    addDataToCrypto,
  } = useCryptoData();
  const websocketRef = useRef(null);

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
            crypto.formattedPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(crypto.price * rate);
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

  return (
    <div>
      <CollapsibleView
        title="Historical data"
        children={<CryptoChart watchedCryptos={watchedCryptos} />}
      />
      <CollapsibleView title="Your Watchlist">
        {watchedCryptos.length === 0 ? (
          <p className="text-lg px-2 sm:px-8 font-extralight drop-shadow-lg">
            Nothing here, please add any cryptocurrency to watchlist.
          </p>
        ) : (
          <CryptoTable
            displayedCryptos={watchedCryptos}
            isShowingWatchedCryptos={true}
          />
        )}
      </CollapsibleView>
      <CollapsibleView title="Browse Cryptocurrencies">
        <div className="hidden lg:visible md:visible md:flex sm:hidden">
          <CryptoTable displayedCryptos={displayedCryptos} />
        </div>
        <div className="lg:hidden md:hidden">
          <CryptoGrid displayedCryptos={displayedCryptos} />
        </div>
        <PaginationFooter
          page={page}
          changeCurrentPage={changeCurrentPage}
          setPerPage={setPerPage}
        />
      </CollapsibleView>
    </div>
  );
};

export default Dashboard;
