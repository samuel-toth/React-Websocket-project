import React, { useState } from "react";
import { sortCryptos, changeOrToggleSortConfig } from "../utils/helper";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import GridHeader from "./CryptoGridHeader";

/**
 * Displays a grid of cryptocurrency data with functionality to sort and
 * manage a watchlist. It includes a header for sorting and individual tiles
 * for each cryptocurrency that can be added to or removed from the watchlist.
 *
 * @component
 * @param {Object} props The component props.
 * @param {Array} props.cryptos Array of cryptocurrency objects to be displayed.
 * @param {Object} props.config Configuration options for the grid, including methods to toggle selection and format price data.
 * @returns {JSX.Element} CryptoGrid component.
 */
const CryptoGrid = ({ cryptos, config }) => {
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
  const changeSortConfig = (key, title) => {
    setSortConfig(changeOrToggleSortConfig(sortConfig, key, title));
  };

  return (
    <div className="mt-4 w-full">
      <GridHeader
        sortConfig={sortConfig}
        changeSortConfig={changeSortConfig}
        toggleAllCheckboxes={config.toggleAllCheckboxes}
      />
      <div className="grid sm:gap-6 gap-2 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 mt-4">
        {sortCryptos(cryptos, sortConfig).map((crypto) => (
          <div
            key={crypto.id}
            className="rounded-xl p-3 shadow-md grid grid-cols-2 select-none bg-slate-100 dark:bg-slate-600"
          >
            <button
              className="col-span-2 flex justify-end"
              aria-label="Add cryptocurrency to watchlist"
              title="Add to watchlist"
              onClick={() => config.toggleCryptoIsSelected(crypto.id)}
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
                {config.getCryptoPriceFormatted(crypto, false)}
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
