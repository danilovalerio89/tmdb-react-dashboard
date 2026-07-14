import { apiClient } from "@/api/client";
import type {
  Genre,
  MovieFilters,
  PaginatedMovies,
} from "@/features/movies/types/movie.types";

export async function fetchMovies(
  filters: MovieFilters,
): Promise<PaginatedMovies> {
  const { page, genreId, sortBy, query } = filters;

  if (query && query.trim().length > 0) {
    const { data } = await apiClient.get<PaginatedMovies>("/search/movie", {
      params: { page, query, include_adult: false, language: "pt-BR" },
    });
    return data;
  }
  const { data } = await apiClient.get<PaginatedMovies>("/discover/movie", {
    params: {
      page,
      sortBy: sortBy,
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  return data;
}

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await apiClient.get<{ genres: Genre[] }>(
    "/genre/movie/list",
    {
      params: { language: "pt-BR" },
    },
  );
  return data.genres;
}
