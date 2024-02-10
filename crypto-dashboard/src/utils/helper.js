export const perPageOptions = [10, 20, 50, 100];

export const currencies = [
  { name: "US Dollar", symbol: "$", id: "usd" },
  { name: "Euro", symbol: "€", id: "euro" },
  { name: "Česká koruna", symbol: "Kč", id: "czech-republic-koruna" },
];

export const sortOptions = [
  { name: "Rank", key: "rank"},
  { name: "Name", key: "name"},
  { name: "Symbol", key: "symbol"},
  { name: "Price", key: "price"},
  { name: "Change", key: "changePercent24Hr"},
];

export const intervalOptions = [
  { id: "1m", name: "1m", millsecs: 60 * 1000},
  { id: "5m", name: "5m", milsecs: 5 * 60 * 1000},
  { id: "15m", name: "15m", millsecs: 15 * 60 * 1000},
  { id: "30m", name: "30m", millsecs: 30 * 60 * 1000},
  { id: "60m", name: "60m", millsecs: 60 * 60 * 1000},
];

export const sortCryptos = (cryptos, sortConfig) => {
  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  return sortedCryptos;
};

export const getCurrencySymbol = (currency) => {
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


export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("sk-SK")} ${date.toLocaleTimeString(
    "sk-SK"
  )}`;
};

export const formatXAxisTick = (tick) => {
  return new Date(tick).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatYAxisTick = (tick) => {
  if (tick >= 1 || tick <= -1 || tick === 0) {
    return Math.round(tick) + "%";
  } else {
    return tick.toFixed(3) + "%";
  }
};
