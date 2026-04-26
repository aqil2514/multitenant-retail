import { serverUrl } from "@/constants/urls";
import axios from "axios";

export const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    config.headers["x-user-timezone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return config;
});
