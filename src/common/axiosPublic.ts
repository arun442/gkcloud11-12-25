import axios from "axios";
import { baseUrl,leadBaseUrl } from "./constants";

export const axiosPublic = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosLead = axios.create({
  baseURL:leadBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosStu = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});