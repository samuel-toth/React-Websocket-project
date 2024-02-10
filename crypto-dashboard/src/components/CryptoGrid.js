import React, { useState } from "react";
import { getCurrencySymbol, sortCryptos } from "../utils/helper";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import GridHeader from "./GridHeader";

const CryptoGrid = ({ displayedCryptos }) => {
  const { currency, toggleDirection } = useDashboard();
  const { toggleCryptoIsSelected, rate, toggleAllCheckboxes } = useCryptoData();

  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "ascending",
    title: "Rank",
  });

  const changeSortConfig = (key, title) => {
    if (sortConfig.key === key) {
      setSortConfig({
        ...sortConfig,
        direction:
          sortConfig.direction === "ascending" ? "descending" : "ascending",
      });
    } else {
      setSortConfig({
        key,
        direction: "ascending",
        title: title,
      });
    }
  };

  return (
    <div className="mt-4 w-full">
      <GridHeader
        sortConfig={sortConfig}
        changeSortConfig={changeSortConfig}
        toggleAllCheckboxes={toggleAllCheckboxes}
        allSelected={displayedCryptos.every((crypto) => crypto.isSelected)}
        toggleDirection={toggleDirection}
      />
      <div className="grid sm:gap-6 gap-2 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 mt-4">
        {sortCryptos(displayedCryptos, sortConfig).map((crypto) => (
          <div
            key={crypto.id}
            className={`${crypto.animationClass} rounded-xl p-3 shadow-md grid grid-cols-2 select-none`}
          >
            <button
              className="col-span-2 flex justify-end"
              aria-label="Add cryptocurrency to watchlist"
              title="Add to watchlist"
              onClick={() => toggleCryptoIsSelected(crypto.id)}
            >
              {crypto.isSelected ? (
                <FaBookmark className="text-lg text-indigo-400" />
              ) : (
                <FaRegBookmark className="text-lg text-slate-400" />
              )}
            </button>
            <div className="col-span-2 flex-col justify-center">
              <h2 className="text-xl font-bold  truncate">{crypto.name}</h2>
            </div>
            <div className="col-span-2 flex justify-end">
              <p className="text-xl font-bold truncate ml-2 ">
                {getCurrencySymbol(currency)} {(crypto.price / rate).toFixed(2)}
              </p>
            </div>
            <div className="col-span-2 flex justify-between">
              <p>{crypto.symbol}</p>
              <p
                className={`${
                  crypto.changePercent24Hr >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {crypto.changePercent24Hr.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoGrid;
