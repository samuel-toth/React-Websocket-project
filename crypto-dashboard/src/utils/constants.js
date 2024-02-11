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
  { id: "1m", name: "1m", millsecs: 60 * 1000 },
  { id: "5m", name: "5m", millsecs: 5 * 60 * 1000 },
  { id: "30m", name: "30m", millsecs: 30 * 60 * 1000 },
  { id: "60m", name: "1h", millsecs: 60 * 60 * 1000 },
  { id: "1d", name: "1d", millsecs: 24 * 60 * 60 * 1000 },
  { id: "7d", name: "7d", millsecs: 7 * 24 * 60 * 60 * 1000 },
  { id: "30d", name: "30d", millsecs: 30 * 24 * 60 * 60 * 1000 },
];


export const TW_CLASSES = Object.freeze({
    GREEN_BG: "bg-green-200",
    RED_BG: "bg-red-200",
    SLATE_BG: "bg-slate-100/30",
    ANIMATE_HIGHLIGHT: "animate-highlight",
    DARK_MODE: "dark",
});


