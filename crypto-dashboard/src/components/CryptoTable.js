import React, { useState } from "react";
import { getCurrencySymbol } from "../utils/helper";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import {
  FaListCheck,
  FaBookmark,
  FaRegBookmark,
  FaEye,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa6";

const CryptoTable = ({ displayedCryptos, isShowingWatchedCryptos }) => {
  const { currency, sortConfig, changeSortConfig } = useDashboard();
  const {
    rate,
    toggleAllCheckboxes,
    toggleCryptoIsSelected,
    toggleWatchedCryptoIsCharted,
  } = useCryptoData();

  const [isTableVisible, setIsTableVisible] = useState(true);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <div className="rounded-lg m-2 flex-grow shadow-lg overflow-hidden">
      <table className="w-full table">
        <thead
          className="bg-slate-300 dark:bg-slate-600 lg:text-lg 
          sm:text-sm text-xs select-none"
        >
          <tr>
            <th
              className="text-left lg:p-4 sm:p-3 p-2 cursor-pointer w-1/12"
              onClick={() => changeSortConfig("rank")}
            >
              <div className="flex justify-center items-center">
                <span className={sortConfig.key === "rank" ? "underline" : ""}>
                  Rank
                </span>
                {sortConfig.key === "rank" && (
                  <span>
                    {sortConfig.direction === "ascending" ? (
                      <FaChevronUp className="flex" />
                    ) : (
                      <FaChevronDown className="flex" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="text-left cursor-pointer w-4/12"
              onClick={() => changeSortConfig("name")}
            >
              <div className="flex justify-start items-center">
                <span className={sortConfig.key === "name" ? "underline" : ""}>
                  Name
                </span>
                {sortConfig.key === "name" && (
                  <span className="">
                    {sortConfig.direction === "ascending" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="text-left cursor-pointer w-2/12 hidden sm:table-cell"
              onClick={() => changeSortConfig("symbol")}
            >
              <div className="flex justify-start items-center">
                <span
                  className={sortConfig.key === "symbol" ? "underline" : ""}
                >
                  Symbol
                </span>
                {sortConfig.key === "symbol" && (
                  <span className="">
                    {sortConfig.direction === "ascending" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="text-right cursor-pointer w-2/12"
              onClick={() => changeSortConfig("price")}
            >
              <div className="flex justify-end items-center">
                {sortConfig.key === "price" && (
                  <span className="">
                    {sortConfig.direction === "ascending" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                )}
                <span className={sortConfig.key === "price" ? "underline" : ""}>
                  Price
                </span>
              </div>
            </th>
            <th
              className="text-right cursor-pointer w-2/12"
              onClick={() => changeSortConfig("changePercent24Hr")}
            >
              <div className="flex justify-end items-center">
                {sortConfig.key === "changePercent24Hr" && (
                  <span className="">
                    {sortConfig.direction === "ascending" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                )}
                <span
                  className={
                    sortConfig.key === "changePercent24Hr" ? "underline" : ""
                  }
                >
                  Δ24h
                </span>
              </div>
            </th>
            <th className="text-right w-1/12">
              {!isShowingWatchedCryptos ?? (
                <FaListCheck
                  className={`${
                    displayedCryptos.every((crypto) => crypto.isSelected)
                      ? "text-indigo-500"
                      : "text-slate-400"
                  } `}
                  onClick={toggleAllCheckboxes}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedCryptos.map((crypto) => (
            <tr
              key={crypto.id}
              id={isShowingWatchedCryptos ? crypto.id + "w" : crypto.id}
              className="transition-colors sm:text-md lg:text-lg text-xs duration-500 bg-slate-100/30 backdrop-blur-md"
            >
              <td className="text-right sm:py-3 py-2">{crypto.rank}.</td>
              <td className="font-semibold sm:py-3 py-2">{crypto.name}</td>
              <td className="hidden sm:table-cell">{crypto.symbol}</td>
              <td className="text-right sm:py-3 py-2">
                {(crypto.price / rate).toFixed(2)} {getCurrencySymbol(currency)}
              </td>
              <td
                className={`text-right sm:py-3 py-2 ${
                  crypto.changePercent24Hr >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {crypto.changePercent24Hr.toFixed(2)}%
              </td>
              <td className="text-right flex justify-right items-center">
                {crypto.isSelected ? (
                  <FaBookmark
                    className="text-indigo-400"
                    onClick={() => toggleCryptoIsSelected(crypto.id)}
                  />
                ) : (
                  <FaRegBookmark
                    className="text-slate-400"
                    onClick={() => toggleCryptoIsSelected(crypto.id)}
                  />
                )}
                {isShowingWatchedCryptos && (
                  <div className="">
                    <FaEye
                      className={`${
                        crypto.isCharted ? "text-indigo-500" : "text-slate-400"
                      } `}
                      onClick={() => {
                        toggleWatchedCryptoIsCharted(crypto.id);
                      }}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
