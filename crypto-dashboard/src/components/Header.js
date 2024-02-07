import React, { useState } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import {
  FaChevronRight,
  FaMoon,
  FaSun,
  FaMagnifyingGlass,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Pridané pre ukážku

  const {
    changeCurrency,
    changeSearchTerm,
    searchTerm,
    showChart,
    setShowChart,
  } = useDashboard();

  const handleCurrencyChange = (currency) => {
    changeCurrency(currency);
    setIsSidebarOpen(false);
  };

  const toggleCurrencyDropdown = () => {
    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleShowChart = () => {
    setShowChart(!showChart);
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-4xl font-bold text-indigo-500 cursor-pointer  pt-6 pl-10"
        >
          Crypta
        </button>
      </header>
      <div
        className={`fixed top-0 right-0 mt-10 z-50 transition-all duration-200 ease-in-out max-w-96 ${
          isSidebarOpen ? "translate-x-0 mr-8" : "translate-x-full"
        } bg-slate-200/30 shadow-xl w-80 p-4 rounded-lg backdrop-blur-md overflow-hidden`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-xl font-semibold cursor-pointer  hover:text-indigo-500"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="mt-8">
          <div className="flex items-center bg-slate-500 rounded-lg overflow-hidden">
            <FaMagnifyingGlass className="text-xl text-indigo-300 ml-3" />
            <input
              type="text"
              placeholder="Search for a cryptocurrency"
              className="px-4 py-2 bg-transparent caret-indigo-200 rounded-lg placeholder:text-slate-300 focus:outline-none w-full focus:text-indigo-100 transition-colors duration-200 ease-in-out"
              value={searchTerm}
              onChange={(e) => changeSearchTerm(e.target.value)}
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
            <button
              className="px-4 py-2 block text-left w-full hover:text-indigo-500"
              onClick={() => handleCurrencyChange("usd")}
            >
              USD $
            </button>
            <button
              className="px-4 py-2 block text-left w-full hover:text-indigo-500"
              onClick={() => handleCurrencyChange("euro")}
            >
              EUR €
            </button>
            <button
              className="px-4 py-2 block text-left w-full hover:text-indigo-500"
              onClick={() => handleCurrencyChange("czech-republic-koruna")}
            >
              CZK Kč
            </button>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={toggleShowChart}
              className="icon-button text-3xl hover:scale-110 transition-all duration-200"
              title="Toggle Chart"
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
                  d="M7,23 L14,14 L17,18 L26,4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={`text-indigo-300 ${
                    showChart ? "show-chart-line" : "hide-chart-line"
                  }`}
                  strokeWidth="3"
                />
              </svg>
            </button>
            <button
              onClick={() => toggleDarkMode()}
              className="icon-button text-3xl relative hover:scale-110"
              title="Toggle Dark/Light Mode"
            >
              <FaSun
                className={`text-orange-400 absolute transition-all duration-500 ${
                  darkMode ? "opacity-0 rotate-180" : "opacity-100"
                }`}
              />
              <FaMoon
                className={`text-sky-600 transition-all duration-500 ${
                  !darkMode ? "opacity-0 -rotate-180" : "opacity-100"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
