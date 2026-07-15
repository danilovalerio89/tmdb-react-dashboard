import { toApiError } from "@/api/client";
import { toaster } from "@/components/ui/toaster";
import { fetchMovies } from "@/features/movies/api/movies.api";
import type { MovieFilters } from "@/features/movies/types/movie.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useMovies(filters: MovieFilters) {
  return useQuery({
    queryKey: ["moveis", filters],
    queryFn: () => fetchMovies(filters),
    placeholderData: keepPreviousData,
    meta: {
      onError: (error: unknown) => {
        const apiError = toApiError(error);
        toaster.create({
          title: "Erro ao buscar filmes",
          description: apiError.message,
          type: "error",
        });
      },
    },
  });
}
