import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const { currency, changeCurrency } = useDashboard();

  const handleCurrencyChange = (e) => {
    changeCurrency(e.target.id);
    setIsCurrencyDropdownOpen(false);
  }
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-extralight ">Crypto Dashboard</h1>
      <div className="relative">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring">
          Menu
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 w-48 py-2 mt-2 bg-white text-black rounded shadow-xl">
            <button onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)} className="px-4 py-2 text-left w-full hover:text-rose-600 hover:font-black transition-colors duration-200 ease-in-out">
              Currency
            </button>
            {isCurrencyDropdownOpen && (
              <div className="right-0 w-48 bg-gray-50 rounded">
                <button id="usd" className="px-4 py-2 text-left w-full hover:text-rose-600 hover:font-black transition-colors duration-200 ease-in-out" 
                    onClick={handleCurrencyChange}
                >USD $</button>
                <button id="eur" className="px-4 py-2 text-left w-full hover:text-rose-600 hover:font-black transition-colors duration-200 ease-in-out" onClick={handleCurrencyChange}>EUR €</button>
                <button id="czk" className="px-4 py-2 hover:text-rose-600 hover:font-black transition-colors duration-200 ease-in-out" onClick={handleCurrencyChange}>CZK Kč</button>
              </div>
            )}
            <button className="px-4 py-2 text-left w-full hover:text-rose-600 hover:font-black transition-colors duration-200 ease-in-out">Theme</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
