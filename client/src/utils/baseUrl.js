const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://insights-k5t9.onrender.com/api";

export default baseUrl;
