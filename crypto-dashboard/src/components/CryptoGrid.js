import React from "react";
import { getCurrencySymbol } from "../utils/helper";
import { useDashboard } from "../contexts/DashboardContext";
import { FaCheck } from "react-icons/fa6";

import GridHeader from "./GridHeader";

const CryptoGrid = () => {
  const { toggleCryptoIsSelected, displayedCryptos, currency, rate } =
    useDashboard();

  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-2 mb-5 lg:hidden">
      <GridHeader />

      {displayedCryptos.map((crypto) => (
        <div
          key={crypto.id}
          className={`${crypto.animationClass} rounded-lg px-3 pt-1 pb-4 shadow-lg grid grid-cols-2 grid-rows-3 items-center z-0`}
        >
          <div className="col-span-2 row-span-1 flex justify-end">
            <FaCheck
              className={`text-indigo-500 text-2xl ${
                crypto.isSelected ? "text-indigo-500" : "text-slate-400"
              } `}
              onClick={() => toggleCryptoIsSelected(crypto.id)}
            />
          </div>
          <div className="col-span-2 row-span-1 flex flex-col justify-center min-w-0">
            <h2 className="text-2xl font-bold text-indigo-500 truncate">
              {crypto.name}
            </h2>
          </div>
          <div className="col-span-2 row-span-1 flex justify-between min-w-0 items-start">
            <p className="text-gray-600 text-sm truncate">{crypto.symbol}</p>
            <p className="text-2xl font-bold truncate ml-2">
              {getCurrencySymbol(currency)} {(crypto.price / rate).toFixed(2)}
            </p>
          </div>
          <div className="col-span-2 row-span-2 text-gray-500 flex justify-end">
            {crypto.changePercent24Hr.toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoGrid;
