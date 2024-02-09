import React, { useState, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaListCheck } from "react-icons/fa6";
import { sortOptions } from "../utils/helper";

const GridHeader = ({sortConfig, changeSortConfig, toggleAllCheckboxes, allSelected}) => {


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="flex z-30 md:col-span-3 sm:col-span-3 col-span-2 sm:text-xl text-lg justify-between mx-5 select-none">
      {/* Sorting button */}
      <div className=" bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg lg:p-2 sm:p-2 p-1">
        <div className="relative" ref={dropdownRef}>
          <div
            className="bg-transparent pl-2 pr-9 cursor-pointer select-none 
            justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOptions.find((option) => option.key === sortConfig.key).name}
          </div>
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
          >
            {sortConfig.direction === "ascending" ? (
              <FaChevronUp onClick={changeSortConfig} />
            ) : (
              <FaChevronDown onClick={changeSortConfig} />
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
                  className={`px-4 py-2 ${
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
      {/* Select all button */}
      <div className="bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg flex items-center sm:p-2 p-1">
        <FaListCheck
          className={` sm:text-xl text-lg mx-1 ${
            allSelected
              ? ""
              : ""
          } `}
          onClick={toggleAllCheckboxes}
        />
      </div>
    </div>
  );
};

export default GridHeader;
