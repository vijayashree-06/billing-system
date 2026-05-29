// src/utils/formatters.js

export const fmtCurrency = (n) =>
  "₹" + Number(n).toLocaleString("en-IN");

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });