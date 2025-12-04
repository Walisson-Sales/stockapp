import axios from 'axios';

export const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env.PROD) {
    return "";
  }
  return "http://localhost:3000"; 
};

export const API_BASE_URL = getApiUrl();

// cria a instância do Axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// URLs dos endpoints
export const API_ENDPOINTS = {
  LOGIN: `/login`,
  PRODUTOS: `/produtos`,
};