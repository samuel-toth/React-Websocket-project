import React from "react";
import { getCurrencySymbol } from "../utils/helper";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import { FaListCheck, FaCheck } from "react-icons/fa6";

const CryptoTable = ({displayedCryptos}) => {
  const {  currency, sortConfig, changeSortConfig } = useDashboard();

  const {
    rate,
    toggleAllCheckboxes,
    toggleCryptoIsSelected,
  } = useCryptoData();

  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <table className="w-full lg:table md:table hidden">
        <thead className="bg-slate-300 dark:bg-slate-600 select-none transition-colors dark:text-slate-400 duration-200">
          <tr>
            <th
              className="p-4 text-center font-bold cursor-pointer  transition-all w-1/12"
              onClick={() => changeSortConfig("rank")}
            >
              <span className={sortConfig.key === "rank" ? "underline" : ""}>
                Rank
              </span>
              {sortConfig.key === "rank" && (
                <span className="">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-left cursor-pointer  transition-all"
              onClick={() => changeSortConfig("name")}
            >
              <span className={sortConfig.key === "name" ? "underline" : ""}>
                Name
              </span>
              {sortConfig.key === "name" && (
                <span className="">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-left cursor-pointer  transition-all w-1/12"
              onClick={() => changeSortConfig("symbol")}
            >
              <span className={sortConfig.key === "symbol" ? "underline" : ""}>
                Symbol
              </span>
              {sortConfig.key === "symbol" && (
                <span className="">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-right cursor-pointer  transition-all"
              onClick={() => changeSortConfig("price")}
            >
              <span className={sortConfig.key === "price" ? "underline" : ""}>
                Price - {getCurrencySymbol(currency)}
              </span>
              {sortConfig.key === "price" && (
                <span className="">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-right cursor-pointer  transition-all w-1/12"
              onClick={() => changeSortConfig("changePercent24Hr")}
            >
              <span
                className={
                  sortConfig.key === "changePercent24Hr" ? "underline" : ""
                }
              >
                Δ24h
              </span>
              {sortConfig.key === "changePercent24Hr" && (
                <span className="">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th className="p-4 text-center transition-all w-1/12">
              <FaListCheck
                className={`text-2xl ${
                  displayedCryptos.every((crypto) => crypto.isSelected)
                    ? "text-indigo-500"
                    : "text-slate-400"
                } `}
                onClick={toggleAllCheckboxes}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedCryptos.map((crypto) => (
            <tr key={crypto.id} className={`${crypto.animationClass}`}>
              <td className="p-4 text-center ">
                {crypto.rank}.
              </td>
              <td
                className={`p-4 ${
                  crypto.isSelected ? "font-bold" : ""
                }`}
              >
                {crypto.name}
              </td>
              <td className="p-4">{crypto.symbol}</td>
              <td className="p-4 text-right">
                {(crypto.price / rate).toFixed(2)}
              </td>
              <td
                className={`p-4 text-right ${
                  crypto.changePercent24Hr >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {crypto.changePercent24Hr.toFixed(2)}%
              </td>
              <td className="p-4 text-center">
                <FaCheck
                  className={`text-xl ${
                    crypto.isSelected ? "text-indigo-500" : "text-slate-400"
                  } `}
                  onClick={() => toggleCryptoIsSelected(crypto.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
