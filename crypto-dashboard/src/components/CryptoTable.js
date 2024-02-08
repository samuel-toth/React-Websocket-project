import React from "react";
import { getCurrencySymbol } from "../utils/helper";
import { useDashboard } from "../contexts/DashboardContext";

const CryptoTable = () => {
  const {
    displayedCryptos,
    currency,
    rate,
    sortConfig,
    changeSortConfig,
    toggleAllCheckboxes,
    toggleCryptoIsSelected,
  } = useDashboard();

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1 lg:rounded-lg lg:shadow-lg overflow-hidden lg:my-5">
      <table className="w-full lg:table table-fixed hidden">
        <thead className="bg-slate-300 dark:bg-slate-600 transition-colors text-slate-700 dark:text-slate-400 duration-200">
          <tr>
            <th
              className="p-4 text-center font-bold cursor-pointer hover:text-indigo-500 transition-all w-1/12"
              onClick={() => changeSortConfig("rank")}
            >
              <span className={sortConfig.key === "rank" ? "underline" : ""}>
                Rank
              </span>
              {sortConfig.key === "rank" && (
                <span className="text-slate-400 dark:text-slate-500">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-left cursor-pointer hover:text-indigo-500 transition-all"
              onClick={() => changeSortConfig("name")}
            >
              <span className={sortConfig.key === "name" ? "underline" : ""}>
                Name
              </span>
              {sortConfig.key === "name" && (
                <span className="text-slate-400 dark:text-slate-500">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-left cursor-pointer hover:text-indigo-500 transition-all w-1/12"
              onClick={() => changeSortConfig("symbol")}
            >
              <span className={sortConfig.key === "symbol" ? "underline" : ""}>
                Symbol
              </span>
              {sortConfig.key === "symbol" && (
                <span className="text-slate-400 dark:text-slate-500">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-right cursor-pointer hover:text-indigo-500 transition-all"
              onClick={() => changeSortConfig("price")}
            >
              <span className={sortConfig.key === "price" ? "underline" : ""}>
                Price - {getCurrencySymbol(currency)}
              </span>
              {sortConfig.key === "price" && (
                <span className="text-slate-400 dark:text-slate-500">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-right cursor-pointer hover:text-indigo-500 transition-all w-1/12"
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
                <span className="text-slate-400 dark:text-slate-500">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th className="p-4 text-center transition-all w-1/12">
              <input
                type="checkbox"
                className="h-8 w-8 accent-indigo-500"
                onChange={toggleAllCheckboxes}
                checked={displayedCryptos.every((crypto) => crypto.isSelected)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedCryptos.map((crypto) => (
            <tr key={crypto.id} className={`${crypto.animationClass}`}>
              <td className="p-4 text-center text-slate-500 dark:text-slate-400">
                {crypto.rank}.
              </td>
              <td
                className={`p-4 ${
                  crypto.isSelected ? "text-indigo-500 font-bold text-xl" : ""
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
                <input
                  type="checkbox"
                  className=" h-8 w-8 accent-indigo-500 rounded-full hover:accent-indigo-200"
                  onChange={() => toggleCryptoIsSelected(crypto.id)}
                  checked={crypto.isSelected}
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
