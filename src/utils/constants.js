export const PER_PAGE_OPTIONS = [10, 25, 50, 100];

export const CURRENCY_OPTIONS = [
  { name: "US Dollar", symbol: "$", id: "usd" },
  { name: "Euro", symbol: "€", id: "euro" },
  { name: "Česká koruna", symbol: "Kč", id: "czech-republic-koruna" },
];

export const SORT_OPTIONS = [
  { name: "Rank", key: "rank" },
  { name: "Name", key: "name" },
  { name: "Symbol", key: "symbol" },
  { name: "Price", key: "price" },
  { name: "Change", key: "changePercent24Hr" },
];

export const INTERVAL_OPTIONS = [
  { id: "1m", name: "1m", millsecs: 60 * 1000, order: 1 },
  { id: "5m", name: "5m", millsecs: 5 * 60 * 1000, order: 2 },
  { id: "30m", name: "30m", millsecs: 30 * 60 * 1000, order: 3 },
  { id: "60m", name: "1h", millsecs: 60 * 60 * 1000, order: 4 },
  { id: "1d", name: "1d", millsecs: 24 * 60 * 60 * 1000, order: 5 },
  { id: "7d", name: "7d", millsecs: 7 * 24 * 60 * 60 * 1000, order: 6 },
  { id: "30d", name: "30d", millsecs: 30 * 24 * 60 * 60 * 1000, order: 7 },
];

export const TW_CLASSES = Object.freeze({
  GREEN_BG: "bg-green-200",
  DARK_GREEN_BG: "dark:bg-green-200/60",
  RED_BG: "bg-red-200",
  DARK_RED_BG: "dark:bg-red-200/60",
  SLATE_BG: "bg-slate-100/30",
  ANIMATE_HIGHLIGHT: "animate-highlight",
  TRANSITION: "transition-all",
  DURATION_500: "duration-500",
  DARK_MODE: "dark",
  SLATE_500_HEX: "#64748b",
  SLATE_400_HEX: "#94a3b8",
  SLATE_100_HEX: "#f1f5f9",
});

export const COINCAP_LIMIT = 1000;
