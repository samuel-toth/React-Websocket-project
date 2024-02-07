import React from "react";

const CryptoTable = ({
  cryptos,
  sortConfig,
  onSort,
  currency,
  toggleAllCheckboxes,
  handleRefreshCheckbox,
  handleChartCheckbox,
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
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1 lg:rounded-lg lg:shadow-lg overflow-hidden lg:my-5">
      <table className="w-full lg:table table-fixed hidden z-30">
        <thead className="bg-slate-300">
          <tr>
            <th
              className="p-4 text-center font-bold cursor-pointer hover:text-indigo-500 transition-all w-1/12"
              onClick={() => onSort("rank")}
            >
              <span className={sortConfig.key === "rank" ? "underline" : ""}>
                Rank
              </span>
              {sortConfig.key === "rank" && (
                <span className="text-slate-400">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-left cursor-pointer hover:text-indigo-500 transition-all"
              onClick={() => onSort("name")}
            >
              <span className={sortConfig.key === "name" ? "underline" : ""}>
                Name
              </span>
              {sortConfig.key === "name" && (
                <span className="text-slate-400">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-left cursor-pointer hover:text-indigo-500 transition-all w-1/12"
              onClick={() => onSort("symbol")}
            >
              <span className={sortConfig.key === "symbol" ? "underline" : ""}>
                Symbol
              </span>
              {sortConfig.key === "symbol" && (
                <span className="text-slate-400">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-right cursor-pointer hover:text-indigo-500 transition-all"
              onClick={() => onSort("price")}
            >
              <span className={sortConfig.key === "price" ? "underline" : ""}>
                Price - {getCurrencySymbol()}
              </span>
              {sortConfig.key === "price" && (
                <span className="text-slate-400">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="p-4 text-right cursor-pointer hover:text-indigo-500 transition-all w-1/12"
              onClick={() => onSort("changePercent24Hr")}
            >
              <span
                className={
                  sortConfig.key === "changePercent24Hr" ? "underline" : ""
                }
              >
                Δ24h
              </span>
              {sortConfig.key === "changePercent24Hr" && (
                <span className="text-slate-400">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th className="p-4 text-center transition-all w-1/12">
              <input
                type="checkbox"
                className="h-8 w-8 accent-indigo-500"
                onChange={toggleAllCheckboxes}
                checked={cryptos.every((crypto) => crypto.isSelected)}
              />
            </th>
            <th className="p-4 text-center transition-all w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id} className={`${crypto.animationClass}`}>
              <td className="p-4 text-center text-slate-500 ">
                {crypto.rank}.
              </td>
              <td
                className={`p-4 ${
                  crypto.isSelected
                    ? "text-indigo-500 font-bold text-xl"
                    : ""
                }`}
              >
                {crypto.name}
              </td>
              <td className="p-4">{crypto.symbol}</td>
              <td className="p-4 text-right">
                {(crypto.price / rate).toFixed(2)}
              </td>
                <td className={`p-4 text-right ${crypto.changePercent24Hr >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.changePercent24Hr.toFixed(2)}%
              </td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  className=" h-8 w-8 accent-indigo-500 rounded-full hover:accent-indigo-200"
                  onChange={() => handleRefreshCheckbox(crypto.id)}
                  checked={crypto.isSelected}
                />
              </td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  className=" h-8 w-8 accent-indigo-500 rounded-full hover:accent-indigo-200"
                  onChange={() => handleChartCheckbox(crypto.id)}
                  checked={crypto.isCharted}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
