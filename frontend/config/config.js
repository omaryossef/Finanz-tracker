let url;
if (process.env.NODE_ENV === "production") {
  url = "https://finanz-tracker-api.onrender.com";
} else {
  url = "http://localhost:3010";
}
export default url;
