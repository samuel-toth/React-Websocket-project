import React, { useState } from "react";
import { sortCryptos, changeOrToggleSortConfig } from "../utils/helper";
import {
  FaListCheck,
  FaBookmark,
  FaRegBookmark,
  FaEye,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa6";

/**
 * Represents a table component for displaying cryptocurrency data. Features include
 * sorting by various columns, adding or removing cryptocurrencies from a watchlist,
 * and toggling their visibility on a chart.
 *
 * @component
 * @param {Object} props The component props.
 * @param {Array} props.cryptos An array of cryptocurrency objects to be displayed.
 * @param {Object} props.config Configuration settings for the table, including functions for sorting, toggling selection, and formatting prices.
 * @returns {JSX.Element} CryptoTable component.
 */
const CryptoTable = ({ cryptos, config }) => {
  // State for managing sort configuration with default set to rank in ascending order.
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "ascending",
    title: "Rank",
  });

  /**
   * Updates the sort configuration state based on user interaction. It either toggles the
   * direction of the current sort key or changes the sort key and resets the direction.
   *
   *
   * @param {string} key The key to sort by (e.g., "rank", "price").
   * @param {string} title The title of the sort key for display purposes.
   */
  const changeSortConfig = (key, name) => {
    setSortConfig(changeOrToggleSortConfig(sortConfig, key, name));
  };

  return (
    <div className="rounded-lg mt-4 flex-grow shadow-lg overflow-hidden">
      <table className="w-full table">
        <thead
          className="bg-slate-300 dark:bg-slate-600 lg:text-lg 
          sm:text-sm text-xs select-none"
        >
          <tr>
            <th
              className="text-left lg:p-4 sm:p-3 p-2 cursor-pointer w-1/12"
              onClick={() => changeSortConfig("rank", "Rank")}
              aria-label="Sort by rank"
              role="button"
              title="Sort by rank"
            >
              <div className="flex justify-center items-center">
                <span className="hidden sm:inline">Rank</span>
                {sortConfig.key === "rank" ? (
                  <span>
                    {sortConfig.direction === "ascending" ? (
                      <FaCaretUp className="flex" />
                    ) : (
                      <FaCaretDown className="flex" />
                    )}
                  </span>
                ) : (
                  <FaCaretUp className="text-slate-400" />
                )}
              </div>
            </th>
            <th
              className="text-left cursor-pointer w-4/12"
              onClick={() => changeSortConfig("name", "Name")}
              aria-label="Sort by name"
              role="button"
              title="Sort by name"
            >
              <div className="flex justify-start items-center">
                <span className={sortConfig.key === "name" ? "underline" : ""}>
                  Name
                </span>
                {sortConfig.key === "name" ? (
                  <span>
                    {sortConfig.direction === "ascending" ? (
                      <FaCaretUp className="flex" />
                    ) : (
                      <FaCaretDown className="flex" />
                    )}
                  </span>
                ) : (
                  <FaCaretUp className="text-slate-400" />
                )}
              </div>
            </th>
            <th
              className="text-left cursor-pointer w-2/12 hidden sm:table-cell"
              onClick={() => changeSortConfig("symbol", "Symbol")}
              aria-label="Sort by symbol"
              role="button"
              title="Sort by symbol"
            >
              <div className="flex justify-start items-center">
                <span
                  className={sortConfig.key === "symbol" ? "underline" : ""}
                >
                  Symbol
                </span>
                {sortConfig.key === "symbol" ? (
                  <span>
                    {sortConfig.direction === "ascending" ? (
                      <FaCaretUp className="flex" />
                    ) : (
                      <FaCaretDown className="flex" />
                    )}
                  </span>
                ) : (
                  <FaCaretUp className="text-slate-400" />
                )}
              </div>
            </th>
            <th
              className="text-right cursor-pointer sm:w-2/12 w-3/12"
              onClick={() => changeSortConfig("price", "Price")}
              aria-label="Sort by price"
              role="button"
              title="Sort by price"
            >
              <div className="flex justify-end items-center">
                {sortConfig.key === "price" ? (
                  <span>
                    {sortConfig.direction === "ascending" ? (
                      <FaCaretUp className="flex" />
                    ) : (
                      <FaCaretDown className="flex" />
                    )}
                  </span>
                ) : (
                  <FaCaretUp className="text-slate-400" />
                )}
                <span className={sortConfig.key === "price" ? "underline" : ""}>
                  Price
                </span>
              </div>
            </th>
            <th
              className="text-right cursor-pointer w-2/12"
              onClick={() => changeSortConfig("changePercent24Hr", "Change")}
              aria-label="Sort by 24h change"
              role="button"
              title="Sort by 24h change"
            >
              <div className="flex justify-end items-center">
                {sortConfig.key === "changePercent24Hr" ? (
                  <span>
                    {sortConfig.direction === "ascending" ? (
                      <FaCaretUp className="flex" />
                    ) : (
                      <FaCaretDown className="flex" />
                    )}
                  </span>
                ) : (
                  <FaCaretUp className="text-slate-400" />
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
            <th className="text-center w-1/12">
              <div className="flex justify-center items-center">
                {!config.isShowingWatchedCryptos ? (
                  <FaListCheck
                    className="text-slate-500 dark:text-slate-400 cursor-pointer"
                    role="button"
                    onClick={config.toggleAllCheckboxes}
                    aria-label="Add or remove all shown cryptocurrencies from watchlist table"
                    title="Add/Remove all shown cryptocurrencies from watchlist"
                  />
                ) : (
                  ""
                )}
              </div>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {sortCryptos(cryptos, sortConfig).map((crypto) => (
            <tr
              key={crypto.id}
              id={config.isShowingWatchedCryptos ? crypto.id + "w" : crypto.id}
              className="transition-colors sm:text-md lg:text-lg text-xs duration-300 bg-slate-100/30 backdrop-blur-md"
            >
              <td className="text-center sm:py-3 py-2">{crypto.rank}.</td>
              <td className="font-semibold">{crypto.name}</td>
              <td className="hidden sm:table-cell">{crypto.symbol}</td>
              <td className="text-right">
                {config.getCryptoPriceFormatted(crypto, false)}
              </td>
              <td
                className={`text-right ${
                  crypto.changePercent24Hr >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {crypto.changePercent24Hr.toFixed(2)}%
              </td>
              <td className="text-center">
                <div className="flex justify-center items-center space-x-2 px-2">
                  {crypto.isSelected ? (
                    <FaBookmark
                      className="text-indigo-400"
                      role="button"
                      onClick={() => config.toggleCryptoIsSelected(crypto.id)}
                      title={`Remove ${crypto.name} from watchlist`}
                      aria-label={`Remove ${crypto.name} from watchlist`}
                    />
                  ) : (
                    <FaRegBookmark
                      className="text-slate-400"
                      role="button"
                      onClick={() => config.toggleCryptoIsSelected(crypto.id)}
                      title={`Add ${crypto.name} to watchlist`}
                      aria-label={`Add ${crypto.name} to watchlist`}
                    />
                  )}
                  {config.isShowingWatchedCryptos && (
                    <FaEye
                      className={`${
                        crypto.isCharted ? "text-indigo-500 dark:text-indigo-400" : "text-slate-400"
                      } `}
                      role="button"
                      onClick={() => {
                        config.toggleWatchedCryptoIsCharted(crypto.id);
                      }}
                      title={`${crypto.isCharted ? "Hide" : "Show"} ${
                        crypto.name
                      } in chart`}
                      aria-label={`${crypto.isCharted ? "Hide" : "Show"} ${
                        crypto.name
                      } in chart`}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
