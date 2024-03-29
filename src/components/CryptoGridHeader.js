import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown, FaCaretUp, FaListCheck } from "react-icons/fa6";
import { SORT_OPTIONS } from "../utils/constants";

/**
 * Grid header component with sorting options and button to add or remove
 * all cryptocurrencies from the watchlist.
 *
 * @param {Object} props The component props.
 * @param {Object} props.sortConfig The current sorting configuration.
 * @param {Function} props.changeSortConfig The function to change the sorting configuration.
 * @param {Function} props.toggleAllCheckboxes The function to toggle all checkboxes.
 * @returns {JSX.Element} CryptoGridHeader component.
 */
const CryptoGridHeader = ({
  sortConfig,
  changeSortConfig,
  toggleAllCheckboxes,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (key, title) => {
    changeSortConfig(key, title);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="flex md:col-span-3 md:mt-8 m-6 sm:col-span-3 col-span-2 sm:text-xl text-lg 
    justify-between select-none transition-none"
    >
      {/* Select all button */}
      <button className="bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg flex items-center p-2">
        <FaListCheck
          className="text-md sm:text-lg mx-1 text-slate-500 dark:text-slate-400 cursor-pointer"
          onClick={toggleAllCheckboxes}
          title="Add/Remove all cryptocurrencies from watchlist"
          aria-label="Button to add or remove all cryptocurrencies from watchlist"
        />
      </button>

      {/* Sorting button */}
      <div className=" bg-slate-300/30 backdrop-blur-sm rounded-xl text-sm sm:text-md w-24 shadow-lg p-2">
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-transparent pl-1 pr-8 cursor-pointer select-none 
            justify-between items-center text-slate-500 dark:text-slate-400"
            title="Show/Hide sorting options"
            aria-label="Show or hide dropdown menu with sorting options"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {SORT_OPTIONS.find((option) => option.key === sortConfig.key).name}
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
            onClick={() => handleSelect(sortConfig.key, sortConfig.title)}
            title="Toggle sorting direction"
            aria-label="Toggle sorting direction"
          >
            {sortConfig.direction === "ascending" ? (
              <FaCaretUp className="text-indigo-500 dark:text-indigo-400" />
            ) : (
              <FaCaretDown className="text-indigo-500 dark:text-indigo-400" />
            )}
          </button>
          {isDropdownOpen && (
            <div
              className={`absolute top-full mt-4 bg-slate-300/40 backdrop-blur-md rounded-lg shadow-lg 
                z-10 w-28 transform transition-all duration-500`}
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  className={`px-4 py-2 ${
                    sortConfig.key === option.key ? "font-bold" : ""
                  } cursor-pointer`}
                  onClick={() => handleSelect(option.key, option.title)}
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
    </div>
  );
};

export default CryptoGridHeader;
