import React from "react";

const CryptoGrid = ({
  cryptos,
  sortConfig,
  onSort,
  currency,
  toggleAllCheckboxes,
  handleCheckboxChange,
  rate,
}) => {
  const getCurrencySymbol = () => {
    switch (currency) {
      case "usd":
        return "$";
      case "euro":
        return "€";
      case "czech-republic-koruna":
        return "Kč";
      default:
        return "";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-2 mb-5 lg:hidden">
      <div className="flex items-center grid-cols-2 grid-rows-1 md:col-span-3 col-span-2 justify-between">
        <div className="flex items-center">
        <select
          className="ml-2 border border-gray-300 rounded-md px-3 py-2"
          value={sortConfig.field}
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="rank">Rank</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <button
          className="ml-2 bg-transparent text-white py-1 rounded font-black"
          onClick={() => onSort(sortConfig.key)}
        >
          <span className="text-slate-400">
            {sortConfig.direction === "ascending" ? "↑" : "↓"}
          </span>
        </button>
        </div>
        <div className="flex items-center">
          All:
          <input
            type="checkbox"
            className="h-8 w-8 ml-2 accent-indigo-500"
            onChange={toggleAllCheckboxes}
            checked={cryptos.every((crypto) => crypto.isSelected)}
          />
        </div>
      </div>

      {cryptos.map((crypto) => (
        <div
          key={crypto.id}
          className={`${crypto.animationClass} rounded-lg px-3 pt-1 pb-4 shadow-lg grid grid-cols-2 grid-rows-3 items-center`}
        >
          <div className="col-span-2 row-span-1 flex justify-end">
            <input
              type="checkbox"
              className="form-checkbox accent-indigo-500"
              onChange={() => handleCheckboxChange(crypto.id)}
              checked={crypto.isSelected}
            />
          </div>
          <div className="col-span-2 row-span-1 flex flex-col justify-center min-w-0">
            <h2 className="text-2xl font-bold text-indigo-500 truncate">
              {crypto.name}
            </h2>
          </div>
          <div className="col-span-2 row-span-1 flex justify-between min-w-0 items-start">
            <p className="text-gray-600 text-sm truncate">{crypto.symbol}</p>
            <p className="text-2xl font-bold truncate ml-2">
              {getCurrencySymbol()} {(crypto.price / rate).toFixed(2)}
            </p>
          </div>
          <div className="col-span-2 row-span-2 text-gray-500 flex justify-end">
            {crypto.changePercent24Hr.toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoGrid;
