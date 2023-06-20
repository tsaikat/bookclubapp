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

  setToken(token) {
    this.headers["Authorization"] = 'Bearer ' + token;
  }

  async get(endpoint) {
    const res = await fetch(this.baseURL + endpoint, {
      method: "GET",
      headers: this.headers,
    });
    
    const data = await res.json();
    return {
      data: data,
      ok: res.ok,
      status: res.status
    }
  }

  async post(endpoint, body) {
    const res = await fetch(this.baseURL + endpoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    
    const data = await res.json();
    return {
      data: data,
      ok: res.ok,
      status: res.status
    }
  }

  async put(endpoint, body) {
    const res = await fetch(this.baseURL + endpoint, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return {
      data: data,
      ok: res.ok,
      status: res.status
    }
  }

  async delete(endpoint) {
    const res = await fetch(this.baseURL + endpoint, {
      method: "DELETE",
      headers: this.headers,
    });

    return {
      ok: res.ok,
      status: res.status
    }
  }
}

export default ApiManager;
