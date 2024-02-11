import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { INTERVAL_OPTIONS } from "../utils/constants";

/**
 * Buttons for changing the interval of the chart and moving it forward or backward in time.
 *
 * @param {Object} props The component props.
 * @param {string} props.interval The current interval value.
 * @param {function} props.setInterval The function to set the interval value.
 * @param {function} props.setIntervalOffset The function to set the interval offset.
 * @returns {JSX.Element} CryptoChartButtons component.
 */
const CryptoChartButtons = ({ interval, setInterval, setIntervalOffset }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(INTERVAL_OPTIONS[0]);
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
    <div className="flex justify-end items-center md:mt-8 m-6 text-slate-500 dark:text-slate-400">
      {/* Interval buttons */}
      <div className="flex items-center space-x-2 text-sm sm:text-md ">
        <div className="bg-slate-300/30 backdrop-blur-md rounded-xl shadow-lg p-2 flex items-center">
          <button
            className=" px-2 sm:hover:scale-125 hover:scale-110"
            onClick={() => setIntervalOffset(-1)}
            aria-label={`Move chart ${interval} back`}
            title={`Move chart ${interval} back`}
          >
            <FaChevronLeft />
          </button>
          <div className="h-5 border-r-2 border-indigo-400 mx-2" />
          <div className="relative" ref={dropdownRef}>
            <button
              className="bg-transparent pl-2 pr-8 cursor-pointer select-none flex 
            justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Show or hide dropdown menu to select number of items in one page"
              title="Show/Hide dropdown to select no. items per page"
            >
              {selectedInterval.name}
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col 
            items-center space-y-[-0.45rem] hover:scale-110"
              >
                <FaChevronUp />
                <FaChevronDown />
              </div>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute bottom-full mb-4 bg-slate-300/30 dark:bg-slate-500/50 backdrop-blur-md rounded-lg 
              shadow-lg z-10 w-16"
              >
                {INTERVAL_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={`px-4 py-2  ${
                      selectedInterval.id === option.id ? "font-bold" : ""
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
          <div className="h-5 border-r-2 border-indigo-400  mx-2" />
          <button
            className="px-2 sm:hover:scale-125 hover:scale-110"
            onClick={() => setIntervalOffset(1)}
            aria-label={`Move chart ${interval.name} forward`}
            title={`Move chart ${interval.name} forward`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoChartButtons;
