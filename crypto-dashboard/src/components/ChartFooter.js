import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { intervalOptions } from "../utils/helper";

const ChartFooter = ({ interval, setInterval, setIntervalOffset }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(intervalOptions[0]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedInterval(value);
    setInterval(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-end items-center md:mt-8 m-6">
      {/* Interval buttons */}
      <div className="flex items-center space-x-2 text-sm sm:text-md ">
        <div className="bg-slate-300/30 backdrop-blur-md rounded-xl shadow-lg p-2 flex items-center">
          <button
            className=" px-2 hover:scale-125"
            onClick={() => setIntervalOffset(-1)}
            aria-label={`Move chart ${interval} back`}
            title={`Move chart ${interval} back`}
          >
            <FaChevronLeft />
          </button>
          <div className="h-5 border-r-2 border-slate-400 mx-2" />
          <div className="relative" ref={dropdownRef}>
          <button
            className="bg-transparent pl-2 pr-9 cursor-pointer select-none flex 
            justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Show or hide dropdown menu to select number of items in one page"
            title="Show/Hide dropdown to select no. items per page"
          >
            {selectedInterval.name}
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
            >
              <FaChevronUp />
              <FaChevronDown />
            </div>
          </button>
          {isDropdownOpen && (
            <div
              className={`absolute bottom-full mb-4 bg-slate-300/30 backdrop-blur-md rounded-lg 
              shadow-lg z-10 w-16 transform transition-all duration-500`}
            >
              {intervalOptions.map((option) => (
                <button
                  key={option.id}
                  className={`px-4 py-2  ${
                    selectedInterval === option.id ? "font-bold" : ""
                  } cursor-pointer`}
                  onClick={() => handleSelect(option)}
                  aria-label={`Select ${option.name} items per page`}
                  title={`Select ${option.name} per page`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="h-5 border-r-2 border-slate-400 mx-2" />

          <button
            className="px-2 sm:hover:scale-125 hover:scale-110"
            onClick={() => setIntervalOffset(1)}
            aria-label={`Move chart ${interval} forward`}
            title={`Move chart ${interval} forward`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default ChartFooter;
