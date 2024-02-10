import React, { useState, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaListCheck } from "react-icons/fa6";
import { sortOptions } from "../utils/helper";

const GridHeader = ({
  sortConfig,
  changeSortConfig,
  toggleAllCheckboxes,
  allSelected,
  toggleDirection,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="flex md:col-span-3 sm:col-span-3 col-span-2 sm:text-xl text-lg justify-between mx-5 select-none">
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
            onClick={toggleDirection}
            title="Toggle sorting direction"
            aria-label="Toggle sorting direction"
          >
            {sortConfig.direction === "ascending" ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
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
          className={`text-md sm:text-lg mx-1 ${allSelected ? "" : ""} `}
          onClick={toggleAllCheckboxes}
          title="Add/Remove all cryptocurrencies from watchlist"
          aria-label="Button to add or remove all cryptocurrencies from watchlist"
        />
      </button>
    </div>
  );
};

export default GridHeader;
