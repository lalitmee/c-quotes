import axios from "axios";

export const instance = axios.create({
  baseURL: "https://favqs.com/api/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});
