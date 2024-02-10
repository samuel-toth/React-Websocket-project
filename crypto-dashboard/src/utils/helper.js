export const perPageOptions = [10, 20, 50, 100];

export const currencies = [
  { name: "US Dollar", symbol: "$", id: "usd" },
  { name: "Euro", symbol: "€", id: "euro" },
  { name: "Česká koruna", symbol: "Kč", id: "czech-republic-koruna" },
];

export const sortOptions = [
  { name: "Rank", key: "rank", columnalign: "center"},
  { name: "Name", key: "name", columnalign: "left"},
  { name: "Symbol", key: "symbol", columnalign: "left"},
  { name: "Price", key: "price", columnalign: "right"},
  { name: "Change", key: "changePercent24Hr", columnalign: "right"},
];

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

export const timeRanges = {
  "1m": 60 * 1000,
  "5m": 5 * 60 * 1000,
  "15m": 15 * 60 * 1000,
  "30m": 30 * 60 * 1000,
  "60m": 60 * 60 * 1000,
};

export const intervalMap = {
  "1m": 15 * 1000, // Every 15 seconds for 1 minute
  "5m": 30 * 1000, // Every 30 seconds for 5 minutes
  "15m": 1 * 60 * 1000, // Every 1 minute for 15 minutes
  "30m": 2 * 60 * 1000, // Every 2 minutes for 30 minutes
  "60m": 5 * 60 * 1000, // Every 5 minutes for 60 minutes
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
    return Math.round(tick);
  } else {
    return tick.toFixed(3);
  }
};
