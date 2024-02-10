import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useCryptoData } from "../contexts/CryptoDataContext";
import {
  FaMoon,
  FaSun,
  FaMagnifyingGlass,
  FaChevronDown,
  FaChevronUp,
  FaArrowsRotate,
} from "react-icons/fa6";
import { currencies } from "../utils/helper";

function Header() {
  const {
    setCurrency,
    setSearchTerm,
    searchTerm,
    showChart,
    setShowChart,
    darkMode,
    toggleDarkMode,
  } = useDashboard();
  const { refreshData } = useCryptoData();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [rotateReload, setRotateReload] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
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

  const toggleShowChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 mt-20 flex transition-transform duration-500 linear select-none ${
        isSidebarOpen
          ? "translate-x-0 mr-10 z-50"
          : "translate-x-[calc(100%-3rem)] mr-8 z-10"
      }`}
    >
      {/* Pull tab */}
      <div
        className="w-25 h-full bg-slate-300/30 backdrop-blur-md rounded-l-2xl shadow-lg flex flex-col justify-start 
        items-center cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title="Open/Close Sidebar"
      >
        <button className="m-3 mr-4 rounded-full text-white">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-16 w-16 p-1"
            style={{
              transform: `rotate(${isSidebarOpen ? "-180" : "0"}deg)`,
              transition: "transform 0.5s ease-in-out",
            }}
          />
        </button>
      </div>

      {/* Sidebar content */}
      <div className="w-80 bg-slate-300/30 z-50 backdrop-blur-md shadow-lg p-4 rounded-b-2xl rounded-r-2xl overflow-auto">
        <div className="mt-8">
          <div className="flex items-center bg-slate-500 rounded-lg overflow-hidden">
            <FaMagnifyingGlass className="text-xl text-indigo-300 ml-3" />
            <input
              type="text"
              placeholder="Search for a cryptocurrency"
              className="px-4 py-2 bg-transparent caret-indigo-200 rounded-lg 
              placeholder:text-slate-300 focus:outline-none w-full focus:text-indigo-100 
              transition-colors duration-200 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8">
          <div
            className="font-semibold mb-2 flex justify-between items-center cursor-pointer"
            onClick={toggleCurrencyDropdown}
          >
            Currency{" "}
            {isCurrencyDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          <div
            className={`transition-all duration-200 ease-in-out ${
              isCurrencyDropdownOpen ? "max-h-96" : "max-h-0"
            } overflow-hidden`}
          >
            {currencies.map((currency) => (
              <button
                key={currency.name}
                className="px-4 py-2 block text-left w-full hover:text-indigo-500"
                onClick={() => handleCurrencyChange(currency.id)}
                title={`Show in ${currency.name}`}
              >
                {currency.name} {currency.symbol}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <button
                onClick={toggleShowChart}
                className=" text-3xl hover:scale-110 transition-all duration-200"
                title="Toggle Show/Hide Chart"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2"
                    y1="28"
                    x2="28"
                    y2="28"
                    stroke="currentColor"
                    strokeLinecap="round"
                    className="text-indigo-500"
                    strokeWidth="4"
                  />
                  <line
                    x1="2"
                    y1="28"
                    x2="2"
                    y2="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    className="text-indigo-500"
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
                    className={`text-indigo-800 dark:text-indigo-300 ${
                      showChart ? "show-chart-line" : "hide-chart-line"
                    }`}
                    strokeWidth="3"
                  />
                </svg>
              </button>
              <button
                onClick={handleReload}
                className={`text-3xl mx-3 text-indigo-500 transform hover:scale-110 ${
                  rotateReload
                    ? " transform rotate-full transition-all duration-1000"
                    : ""
                }`}
                title="Reload Data"
              >
                <FaArrowsRotate />
              </button>
            </div>
            <button
              onClick={toggleDarkMode}
              className="text-3xl relative hover:scale-105"
              title="Toggle Dark/Light Mode"
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
}

export default Header;
