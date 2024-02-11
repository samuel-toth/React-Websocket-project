import React, { useState, useEffect, useRef } from "react";
import {
  FaMoon,
  FaSun,
  FaMagnifyingGlass,
  FaChevronDown,
  FaChevronUp,
  FaArrowsRotate,
} from "react-icons/fa6";
import { CURRENCY_OPTIONS } from "../utils/constants";

/**
 * Sidebar component for the crypto dashboard with searchbar, dropdown for currency selection,
 * and buttons for toggling dark mode and refreshing data.
 *
 * @param {Object} props The component props.
 * @param {Function} props.setCurrency Function to set the selected currency.
 * @param {string} props.searchTerm The current search term for filtering cryptocurrencies.
 * @param {Function} props.setSearchTerm Function to set the search term.
 * @param {boolean} props.darkMode Flag indicating whether dark mode is enabled.
 * @param {Function} props.toggleDarkMode Function to toggle dark mode.
 * @param {Function} props.refreshData Function to refresh the cryptocurrency data.
 * @param {Function} props.regenerateColors Function to regenerate the colors for the cryptocurrencies.
 * @returns {JSX.Element} Sidebar component.
 */
const Sidebar = ({
  setCurrency,
  searchTerm,
  setSearchTerm,
  darkMode,
  toggleDarkMode,
  refreshData,
  regenerateColors,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [rotateReload, setRotateReload] = useState(false);
  const [isChartShowed, setIsChartShowed] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCurrencyChange = (currency) => {
    setCurrency(CURRENCY_OPTIONS.find((c) => c.id === currency));
    setIsSidebarOpen(false);
  };

  const handleReload = () => {
    refreshData();
    setRotateReload(true);
    setTimeout(() => setRotateReload(false), 1000);
  };

  const toggleCurrencyDropdown = () => {
    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };

  const handleRegenerateColors = () => {
    regenerateColors();
    setIsChartShowed(!isChartShowed);
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 sm:mt-20 mt-5 z-20 flex transition-transform duration-500 linear select-none ${
        isSidebarOpen
          ? "translate-x-0 sm:mr-10 z-50"
          : "translate-x-[calc(100%-3rem)] mr-8"
      }`}
    >
      {/* Pull tab */}
      <div
        className="w-25 h-full bg-slate-300/30 dark:bg-slate-500/50 backdrop-blur-lg rounded-l-2xl shadow-lg flex flex-col justify-start 
        items-center "
      >
        <button
          className="m-3 mr-4 rounded-full text-white cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Open/Close sidebar"
          aria-label="Open or close sidebar"
        >
          <img
            src={darkMode ? "/logo-dark.svg" : "/logo.svg"}
            alt="Crypta Logo"
            className="h-16 w-16 p-1"
            style={{
              transform: `rotate(${isSidebarOpen ? "-180" : "0"}deg)`,
              transition: "transform 0.5s ease-in-out",
            }}
          />
        </button>
      </div>

      {/* Sidebar content */}
      <div className="w-80 bg-slate-300/30 dark:bg-slate-500/50  backdrop-blur-lg shadow-lg p-4 rounded-b-2xl rounded-r-2xl overflow-auto">
        <div className="mt-8">
          <div className="flex items-center bg-slate-500 rounded-lg overflow-hidden">
            <FaMagnifyingGlass className="text-xl text-indigo-300 ml-3" />
            <input
              type="text"
              placeholder="Search for a cryptocurrency"
              aria-label="Searchbar for filtering cryptocurrencies by name"
              className="px-4 py-2 bg-transparent caret-indigo-200 rounded-lg text-slate-200
              placeholder:text-slate-300 focus:outline-none w-full focus:text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8">
          <button
            className="font-semibold mb-2 flex justify-between items-center cursor-pointer"
            onClick={toggleCurrencyDropdown}
            aria-label="Open or close preferred currency dropdown"
            title="Open/Close dropdown"
          >
            Currency{" "}
            {isCurrencyDropdownOpen ? (
              <FaChevronUp className="text-indigo-500 dark:text-indigo-400 ml-1" />
            ) : (
              <FaChevronDown className="text-indigo-500 dark:text-indigo-400 ml-1" />
            )}
          </button>
          <div
            className={`transition-all duration-200 ease-in-out ${
              isCurrencyDropdownOpen ? "max-h-96" : "max-h-0"
            } overflow-hidden`}
          >
            {CURRENCY_OPTIONS.map((currency) => (
              <button
                key={currency.name}
                className="px-4 py-2 block text-left w-full hover:text-indigo-500 dark:hover:text-indigo-300 focus:outline-none"
                onClick={() => handleCurrencyChange(currency.id)}
                title={`Show in ${currency.name}`}
                aria-label={`Show cryptocurrency prices in ${currency.name}`}
              >
                {currency.name} {currency.symbol}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <button
                className=" text-3xl hover:scale-110 transition-all duration-200"
                title="Show/Hide Chart"
                aria-label="Show or Hide Chart with data for watched cryptocurrencies"
                onClick={handleRegenerateColors}
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 30px 30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2"
                    y1="28"
                    x2="28"
                    y2="28"
                    stroke="currentColor"
                    strokeLinecap="round"
                    className="text-indigo-500 dark:text-indigo-400"
                    strokeWidth="4"
                  />
                  <line
                    x1="2"
                    y1="28"
                    x2="2"
                    y2="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    className="text-indigo-500 dark:text-indigo-400"
                    strokeWidth="4"
                  />
                  <path
                    d="M8,22 L14,14 L17,18 L26,4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="text-slate-400"
                    strokeWidth="3"
                  />
                  <path
                    d="M7,22 L14,14 L17,18 L26,4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className={`text-indigo-700 dark:text-indigo-400 ${
                      isChartShowed ? "show-chart-line" : "hide-chart-line"
                    }`}
                    strokeWidth="3"
                  />
                </svg>
              </button>
              <button
                onClick={handleReload}
                className={`text-3xl mx-3 text-indigo-500 dark:text-indigo-400 transform hover:scale-110 ${
                  rotateReload
                    ? " transform rotate-full transition-all duration-1000"
                    : ""
                }`}
                title="Refresh Data"
                aria-label="Refresh cryptocurrency data"
              >
                <FaArrowsRotate />
              </button>
            </div>
            <button
              onClick={toggleDarkMode}
              className="text-3xl relative hover:scale-105"
              title="Toggle color mode"
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              <FaSun
                className={`text-orange-400 absolute transition-all duration-500 ${
                  darkMode ? "opacity-0 rotate-180" : "opacity-100"
                }`}
              />
              <FaMoon
                className={`text-slate-400 transition-all duration-500 ${
                  !darkMode ? "opacity-0 -rotate-180" : "opacity-100"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
