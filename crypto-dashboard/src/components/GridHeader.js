import React, { useState, useRef } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { FaChevronDown, FaChevronUp, FaListCheck } from "react-icons/fa6";
import { sortOptions } from "../utils/helper";

const GridHeader = () => {
  const {
    sortConfig,
    changeSortConfig,
    cryptos,
    toggleAllCheckboxes,
    flipSortDirection,
  } = useDashboard();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="flex z-50 items-center grid-cols-2 grid-rows-1 md:col-span-3 col-span-2 justify-between">
      <div className="relative bg-slate-300/30 backdrop-blur-sm rounded-xl text-xl shadow-lg p-2 flex items-center">
        <div className="relative" ref={dropdownRef}>
          <div
            className="bg-transparent text-slate-500 pl-2 pr-9 cursor-pointer select-none flex 
            justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOptions.find((option) => option.key === sortConfig.key).name}
           
          </div>
          <div
              className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
            >
              {sortConfig.direction === "ascending" ? (
                <FaChevronUp onClick={flipSortDirection} />
              ) : (
                <FaChevronDown onClick={flipSortDirection} />
              )}
            </div>
          {isDropdownOpen && (
            <div
              className={`absolute top-full mt-4 bg-slate-300/30 backdrop-blur-md rounded-lg shadow-lg 
                z-10 w-28 transform transition-all duration-500`}
            >
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 hover:text-indigo-400 text-slate-700 ${
                    sortConfig.key === option.key ? "font-bold" : ""
                  } cursor-pointer`}
                  onClick={() => changeSortConfig(option.key)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg flex items-center p-2">
        <FaListCheck
          className={`text-indigo-500 text-2xl ${
            cryptos.every((crypto) => crypto.isSelected)
              ? "text-indigo-500"
              : "text-slate-400"
          } `}
          onClick={toggleAllCheckboxes}
        />
      </div>
    </div>
  );
};

export default GridHeader;
