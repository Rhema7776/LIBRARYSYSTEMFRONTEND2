// One place for settings that change between "my laptop" and "the live site".

// Where the Django backend lives.
// - Live site (Vercel): no setting needed, it falls back to the PythonAnywhere address.
// - On your laptop: `yarn start` reads .env.development, which points to your local backend.
export const API_URL =
  process.env.REACT_APP_API_URL || "https://rhema1.pythonanywhere.com/api";

// One place for the currency, so every page shows money the same way.
export const CURRENCY = "₦";

export const formatMoney = (amount) =>
  `${CURRENCY}${Number(amount || 0).toLocaleString("en-NG")}`;
