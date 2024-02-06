import React, { useState } from "react";
import { useDashboard } from "../contexts/DashboardContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const { changeCurrency, changeSearchTerm, searchTerm } = useDashboard();

  const handleCurrencyChange = (e) => {
    changeCurrency(e.target.id);
    setIsCurrencyDropdownOpen(false);
  };

  const handleSearch = (e) => {
    changeSearchTerm(e.target.value);
  };

  return (
    <header className=" bg-slate-300 p-4 flex justify-between items-center">
      <h1 className="text-4xl font-bold text text-indigo-500" >Crypta</h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search for a cryptocurrency"
          className="px-4 py-2 bg-slate-500 rounded placeholder:text-slate-300 focus:outline-none focus:ring w-72 transition-colors duration-200 ease-in-out"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="px-4 py-2 font-semibold bg-slate-500 text-slate-300 rounded hover:bg-slate-600 hover:text-indigo-300  focus:outline-none focus:ring"
        >
          Menu
        </button>
        {isMenuOpen && (
          <div className="absolute z-10 right-0 w-48 py-2 mt-2 bg-white text-black rounded shadow-xl">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="px-4 py-2 text-left w-full  hover:font-semibold hover:text-indigo-500"
            >
              Currency
            </button>
            {isCurrencyDropdownOpen && (
              <div className="right-0 z-20 w-48 bg-gray-50 rounded">
                <button
                  id="usd"
                  className="px-4 py-2 text-left w-full  hover:text-indigo-500"
                  onClick={handleCurrencyChange}
                >
                  USD $
                </button>
                <button
                  id="euro"
                  className="px-4 py-2 text-left w-full hover:text-indigo-500 hover:font-semibold "
                  onClick={handleCurrencyChange}
                >
                  EUR €
                </button>
                <button
                  id="czech-republic-koruna"
                  className="px-4 py-2 hover:text-indigo-500"
                  onClick={handleCurrencyChange}
                >
                  CZK Kč
                </button>
              </div>
            )}
            <button className="px-4 py-2 text-left w-full hover:text-indigo-500 hover:font-semibold">
              Theme
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
