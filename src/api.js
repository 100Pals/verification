import { API_URL, DISCORD_CLIENT_ID, MICROSOFT_CLIENT_ID } from "./constants";

export class APIError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
    this.message = message;
  }
}

class API {
  constructor() {
    this.token = this.getToken();
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  setToken(token) {
    this.token = token;
    window.localStorage.setItem("token", token);
  }

  removeToken() {
    this.token = null;
    window.localStorage.removeItem("token");
  }

  ensureAuthorized() {
    // Prevent unauthorized requests without a token
    if (!this.token) {
      throw new APIError(401, "Invalid authorization token.");
    }
  }

  async request(method, path, args = {}) {
    const headers = { "X-No-BigInt": "true" };

    if (this.token) {
      headers["Authorization"] = this.token;
    }

    if (args.json) {
      args.body = JSON.stringify(args.json);
    }

    const resp = await fetch(API_URL + path, { method, headers, ...args });

    if (!resp.ok) {
      let data;

      // Clean up old session if needed
      if (resp.status === 401) {
        this.removeToken();
      }

      try {
        data = await resp.json();
      } finally {
        const msg = data?.error;
        throw new APIError(resp.status, msg ?? "Failed to fetch resource.");
      }
    }

    try {
      return await resp.json();
    } catch {
      throw new APIError(resp.status, "Received malformed JSON response.");
    }
  }

  async login(code) {
    const json = { code, client_id: DISCORD_CLIENT_ID };
    const data = await this.request("POST", "/auth/login", { json });

    this.setToken(data.token);
  }

  async getUser() {
    this.ensureAuthorized();

    return this.request("GET", "/users/@me");
  }

  async createSteamConnection(data) {
    this.ensureAuthorized();

    return this.request("PUT", "/users/@me/connections/steam", { json: data });
  }

  async createXboxConnection(code) {
    this.ensureAuthorized();

    const json = { code, client_id: MICROSOFT_CLIENT_ID };
    return this.request("PUT", "/users/@me/connections/xbox", { json });
  }

  async logout() {
    this.ensureAuthorized();

    await this.request("POST", "/auth/logout");
    this.removeToken();
  }
}

export default new API();
