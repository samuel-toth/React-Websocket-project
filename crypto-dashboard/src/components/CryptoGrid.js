import React from "react";
import { getCurrencySymbol } from "../utils/helper";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import { FaCheck } from "react-icons/fa6";
import GridHeader from "./GridHeader";

const CryptoGrid = () => {
  const { currency, sortConfig, changeSortConfig } = useDashboard();

  const {
    displayedCryptos,
    toggleCryptoIsSelected,
    rate,
    toggleAllCheckboxes,
  } = useCryptoData();

  return (
    <div className="grid sm:gap-6 gap-3 gap-y-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 lg:hidden md:hidden">
      <GridHeader
        sortConfig={sortConfig}
        changeSortConfig={changeSortConfig}
        toggleAllCheckboxes={toggleAllCheckboxes}
        allSelected={displayedCryptos.every((crypto) => crypto.isSelected)}
      />
      {displayedCryptos.map((crypto) => (
        <div
          key={crypto.id}
          className={`${crypto.animationClass} rounded-xl p-3 shadow-lg grid grid-cols-2 select-none`}
        >
          <div className="col-span-2 flex justify-end">
            <FaCheck
              className={` text-lg ${crypto.isSelected ? "" : ""} `}
              onClick={() => toggleCryptoIsSelected(crypto.id)}
            />
          </div>
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
  );
};

export default CryptoGrid;
