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
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
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
  const roundedTime = Math.floor(date / msPerTenSeconds) * msPerTenSeconds;
  return new Date(roundedTime);
};

export const changeOrToggleSortConfig = (sortConfig, key, title) => {
  if (sortConfig.key === key) {
    return {
      key,
      direction:
        sortConfig.direction === "ascending" ? "descending" : "ascending",
      title,
    };
  } else {
    return {
      key,
      direction: "ascending",
      title,
    };
  }
};
