import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3",
  timeout: 10_000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export interface ApiError {
  message: string;
  status?: number;
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return {
      message:
        error.response?.data?.status_message ??
        error.message ??
        "Erro inesperado ao comunicar com a API.",
      status: error.response?.status,
    };
  }
  return { message: "Erro inesperado. Tente novamente." };
}
