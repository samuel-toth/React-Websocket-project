import React, { useState, useRef } from "react";
import { FaCaretDown, FaCaretUp, FaListCheck } from "react-icons/fa6";
import { sortOptions } from "../utils/helper";

/**
 * Grid header component with sorting options and button to add
 * all shown cryptocurrencies to watchlist.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.sortConfig - The current sorting configuration.
 * @param {Function} props.changeSortConfig - The function to change the sorting configuration.
 * @param {Function} props.toggleAllCheckboxes - The function to toggle all checkboxes.
 * @returns {JSX.Element} The rendered CryptoGridHeader component.
 */
const CryptoGridHeader = ({
  sortConfig,
  changeSortConfig,
  toggleAllCheckboxes,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="flex md:col-span-3 md:mt-8 m-6 sm:col-span-3 col-span-2 sm:text-xl text-lg justify-between select-none">
      {/* Sorting button */}
      <div className=" bg-slate-300/30 backdrop-blur-sm rounded-xl text-sm sm:text-md w-24 shadow-lg p-2">
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-transparent pl-1 pr-8 cursor-pointer select-none 
            justify-between items-center"
            title="Show/Hide sorting options"
            aria-label="Show or hide dropdown menu with sorting options"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOptions.find((option) => option.key === sortConfig.key).name}
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
            onClick={() => changeSortConfig(sortConfig.key, sortConfig.title)}
            title="Toggle sorting direction"
            aria-label="Toggle sorting direction"
          >
            {sortConfig.direction === "ascending" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )}
          </button>
          {isDropdownOpen && (
            <div
              className={`absolute top-full mt-4 bg-slate-300/40 backdrop-blur-md rounded-lg shadow-lg 
                z-10 w-28 transform transition-all duration-500`}
            >
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  className={`px-4 py-2 ${
                    sortConfig.key === option.key ? "font-bold" : ""
                  } cursor-pointer`}
                  onClick={() => changeSortConfig(option.key, option.title)}
                  title={`Sort by ${option.name}`}
                  aria-label={`Sort cryptocurrencies by ${option.name} ${sortConfig.direction}`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Select all button */}
      <button className="bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg flex items-center p-2">
        <FaListCheck
          className="text-md sm:text-lg mx-1"
          onClick={toggleAllCheckboxes}
          title="Add/Remove all cryptocurrencies from watchlist"
          aria-label="Button to add or remove all cryptocurrencies from watchlist"
        />
      </button>
    </div>
  );
};

export default CryptoGridHeader;
