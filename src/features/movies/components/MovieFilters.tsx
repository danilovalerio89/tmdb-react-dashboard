import { HStack, Input, NativeSelect } from "@chakra-ui/react";
import { useGenres } from "@/features/movies/hooks/useGenres";
import type { MovieFilters as MovieFiltersType } from "@/features/movies/types/movie.types";

interface MovieFiltersProps {
  filters: MovieFiltersType;
  onChange: (next: Partial<MovieFiltersType>) => void;
}

export function MovieFilters({ filters, onChange }: MovieFiltersProps) {
  const { data: genres, isLoading: isLoadingGenres } = useGenres();

  return (
    <HStack gap="3" flexWrap="wrap">
      <Input
        placeholder="Buscar por título..."
        value={filters.query ?? ""}
        onChange={(e) => onChange({ query: e.target.value, page: 1 })}
        maxW="280px"
      />

      <NativeSelect.Root maxW="200px" disabled={isLoadingGenres}>
        <NativeSelect.Field
          value={filters.genreId ?? ""}
          onChange={(e) =>
            onChange({
              genreId: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            })
          }
        >
          <option value="">Todos os gêneros</option>
          {genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      <NativeSelect.Root maxW="220px">
        <NativeSelect.Field
          value={filters.sortBy}
          onChange={(e) =>
            onChange({
              sortBy: e.target.value as MovieFiltersType["sortBy"],
              page: 1,
            })
          }
        >
          <option value="popularity.desc">Mais populares</option>
          <option value="vote_average.desc">Melhor avaliados</option>
          <option value="release_date.desc">Mais recentes</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </HStack>
  );
}
