import { useState } from "react";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import { useMovies } from "@/features/movies/hooks/useMovies";
import { MovieGrid } from "@/features/movies/components/MovieGrid";
import { MovieFilters } from "@/features/movies/components/MovieFilters";
import { MoviePagination } from "@/features/movies/components/MoviePagination";
import type { MovieFilters as MovieFiltersType } from "@/features/movies/types/movie.types";

const DEFAULT_FILTERS: MovieFiltersType = {
  page: 1,
  sortBy: "popularity.desc",
};

export function DashboardPage() {
  const [filters, setFilters] = useState<MovieFiltersType>(DEFAULT_FILTERS);

  const { data, isLoading, isFetching, isError } = useMovies(filters);

  function updateFilters(next: Partial<MovieFiltersType>) {
    setFilters((prev) => ({ ...prev, ...next }));
  }

  return (
    <Container maxW="7xl" py="8">
      <VStack align="stretch" gap="6">
        <Box>
          <Heading size="lg" mb="1">
            Movie Dashboard
          </Heading>
          <Box color="gray.500" fontSize="sm">
            Catálogo de filmes com busca, filtros e paginação server-side (TMDB
            API)
          </Box>
        </Box>

        <MovieFilters filters={filters} onChange={updateFilters} />

        <MovieGrid
          movies={data?.results ?? []}
          isLoading={isLoading}
          isError={isError}
        />

        {data && data.total_pages > 1 && (
          <MoviePagination
            page={filters.page}
            totalPages={data.total_pages}
            onPageChange={(page) => updateFilters({ page })}
            isFetching={isFetching}
          />
        )}
      </VStack>
    </Container>
  );
}
