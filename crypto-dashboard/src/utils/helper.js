export const perPageOptions = [10, 25, 50, 100];

export const currencyOptions = [
  { name: "US Dollar", symbol: "$", id: "usd" },
  { name: "Euro", symbol: "€", id: "euro" },
  { name: "Česká koruna", symbol: "Kč", id: "czech-republic-koruna" },
];

export const sortOptions = [
  { name: "Rank", key: "rank" },
  { name: "Name", key: "name" },
  { name: "Symbol", key: "symbol" },
  { name: "Price", key: "price" },
  { name: "Change", key: "changePercent24Hr" },
];

export const intervalOptions = [
  { id: "1m", name: "1m", millsecs: 60 * 1000 },
  { id: "5m", name: "5m", millsecs: 5 * 60 * 1000 },
  { id: "30m", name: "30m", millsecs: 30 * 60 * 1000 },
  { id: "60m", name: "1h", millsecs: 60 * 60 * 1000 },
  { id: "1d", name: "1d", millsecs: 24 * 60 * 60 * 1000 },
  { id: "7d", name: "7d", millsecs: 7 * 24 * 60 * 60 * 1000 },
  { id: "30d", name: "30d", millsecs: 30 * 24 * 60 * 60 * 1000 },
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

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("sk-SK")} ${date.toLocaleTimeString(
    "sk-SK"
  )}`;
};

export const formatPrice = (price, rate, currency) => {
  return (
    (price * rate >= 1 || price * rate === 0
      ? (price / rate).toFixed(2)
      : (price / rate).toFixed(3)) +
    " " +
    currency
  );
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

export const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${"0".repeat(6 - randomColor.length)}${randomColor}`;
};

export const roundTimeToNearestTenSeconds = (date) => {
  const msPerTenSeconds = 10000;
  const roundedTime =
    Math.floor(date / msPerTenSeconds) * msPerTenSeconds;
  return new Date(roundedTime);
};
