import { API_URL, CLIENT_ID } from "./constants";

export class APIError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
    this.message = message;
  }
}

class API {
  constructor() {
    this.token = window.localStorage.getItem("token");
  }

  async request(method, path, args) {
    const headers = { "X-No-BigInt": "true" };

    if (this.token) {
      headers["Authorization"] = this.token;
    }

    const resp = await fetch(API_URL + "/v3" + path, { method, headers, ...args });

    if (!resp.ok) {
      let data;

      // Clean up old session if needed
      if (resp.status === 401) {
        this.token = null;
        window.localStorage.removeItem("token");
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
    const body = JSON.stringify({ code, client_id: CLIENT_ID });
    const data = await this.request("POST", "/auth/login", { body });

    this.token = data.token;
    window.localStorage.setItem("token", data.token);
  }

  async getUser() {
    return this.request("GET", "/users/@me");
  }

  async createConnection(data) {
    const body = JSON.stringify(data);
    return this.request("POST", "/users/@me/connections", { body });
  }
}

export default new API();
