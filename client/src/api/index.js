import axios from "axios";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:4000",
  });
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.get["Content-Type"] = "application/json";
  return instance;
}

const api = createAxiosInstance();

export function getContacts(query = {}) {
  return api.get("/api/contacts?" + new URLSearchParams(query).toString());
}

export function addContact(body) {
  return api.post("/api/contacts", body);
}

export function editContact(body, id) {
  return api.put(`/api/contacts/${id}`, body);
}

export function getCompanies() {
  return api.get("/api/contacts/company");
}
