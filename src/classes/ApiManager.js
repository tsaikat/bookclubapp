let instance = null;

class ApiManager {
  constructor(baseURL, headers = { "Content-Type": "application/json" }) {
    if (!instance) {
      this.baseURL = baseURL;
      this.headers = headers;
      instance = this;
    }
    return instance;
  }

  async get(endpoint) {
    return fetch(this.baseURL + endpoint, {
      method: "GET",
      headers: this.headers,
    });
  }

  async post(endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async put(endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async delete(endpoint) {
    return fetch(this.baseURL + endpoint, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}

export default ApiManager;
