export const IS_LOCAL = process.env.NODE_ENV === "development";

function getWindowURL() {
  const location = window.location;
  const port = IS_LOCAL ? ":1234" : "";

  return location.protocol + "//" + location.hostname + port;
}

export const API_URL = IS_LOCAL ? "http://localhost:8000/v3" : "https://api.mousey.app/v3";

export const LOCATION = getWindowURL();

export const DISCORD_CLIENT_ID = "222796593189879818";
export const MICROSOFT_CLIENT_ID = "432a893c-df7f-48d5-8f57-88d8e72a737f";
