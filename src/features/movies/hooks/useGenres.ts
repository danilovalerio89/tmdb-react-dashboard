import { fetchGenres } from "@/features/movies/api/movies.api";
import { useQuery } from "@tanstack/react-query";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60, // 1 Hora
  });
}
