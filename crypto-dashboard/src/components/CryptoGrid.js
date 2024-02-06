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
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 ">
        {cryptos.map((crypto) => (
          <div
            key={crypto.id}
            className={`${crypto.animationClass} rounded-lg p-4 shadow-lg lg:hidden m-2` }
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{crypto.name}</h2>
                <p className="text-gray-600">{crypto.symbol}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {getCurrencySymbol()} {(crypto.price / rate).toFixed(2)}
                </p>
                <p className="text-lg">
                  {crypto.changePercent24Hr.toFixed(2)}%
                </p>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-rose-600"
                    onChange={() => handleCheckboxChange(crypto.id)}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
    </div>


  );
};

export default CryptoGrid;
