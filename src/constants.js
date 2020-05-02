function getWindowURL() {
  const location = window.location;
  const port = process.env.NODE_ENV === "development" ? ":1234" : "";

  return location.protocol + "//" + location.hostname + port;
}

export const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://api.mousey.app";
export const LOCATION = getWindowURL();
export const CLIENT_ID = "705917345985462274";
