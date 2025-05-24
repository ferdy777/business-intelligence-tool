import axios from "axios";
import { API_BASE_URL } from "@/constants";
export type { AxiosRequestConfig as RequestConfig } from "axios";

export const axiosConfig = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});
