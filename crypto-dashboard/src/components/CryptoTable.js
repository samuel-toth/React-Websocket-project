import React from "react";

const CryptoTable = ({
  cryptos,
  sortConfig,
  onSort,
  getCurrencySymbol,
  toggleAllCheckboxes,
  handleCheckboxChange,
}) => {
  return (
    <table className="w-full lg:table hidden">
      <thead className="bg-gray-200 uppercase">
        <tr>
          <th
            className="p-4 text-center font-bold cursor-pointer"
            onClick={() => onSort("rank")}
          >
            Rank{" "}
            {sortConfig.key === "rank" && (
              <span className="text-blue-500 font-thin">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="p-4 text-left font-bold cursor-pointer"
            onClick={() => onSort("name")}
          >
            Name{" "}
            {sortConfig.key === "name" && (
              <span className="text-blue-500 font-thin">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="p-4 text-left font-bold cursor-pointer"
            onClick={() => onSort("symbol")}
          >
            Symbol{" "}
            {sortConfig.key === "symbol" && (
              <span className="text-blue-500 font-thin">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="p-4 text-right font-bold cursor-pointer"
            onClick={() => onSort("price")}
          >
            Price{" "}
            {sortConfig.key === "price" && (
              <span className="text-blue-500 font-thin">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th
            className="p-4 text-right font-bold cursor-pointer"
            onClick={() => onSort("changePercent24Hr")}
          >
            Change (24hr){" "}
            {sortConfig.key === "changePercent24Hr" && (
              <span className="text-blue-500 font-thin">
                {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th className="p-4 text-right font-bold ">
            <input
              type="checkbox"
              className="form-checkbox text-rose-600"
              onChange={toggleAllCheckboxes}
              checked={cryptos.every((crypto) => crypto.isSelected)}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {cryptos.map((crypto) => (
          <tr key={crypto.id} className={`${crypto.animationClass}`}>
            <td className="p-4 text-center">{crypto.rank}.</td>
            <td
              className={`p-4 ${
                crypto.isSelected ? "text-blue-700 font-bold" : ""
              }`}
            >
              {crypto.name}
            </td>
            <td className="p-4">{crypto.symbol}</td>
            <td className="p-4 text-right">
              {getCurrencySymbol()} {crypto.price.toFixed(2)}
            </td>
            <td className="p-4 text-right">
              {crypto.changePercent24Hr.toFixed(2)}%
            </td>
            <td className="p-4 text-right">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-rose-600"
                  onChange={() => handleCheckboxChange(crypto.id)}
                  checked={crypto.isSelected}
                />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;
