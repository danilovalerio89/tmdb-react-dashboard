import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import type { Movie } from "@/features/movies/types/movie.types";
import { MovieCard } from "@/features/movies/components/MovieCard";
import { Loader } from "@/components/ui/loader";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
}

export function MovieGrid({ movies, isLoading, isError }: MovieGridProps) {
  if (isLoading) {
    return <Loader label="Buscando filmes..." />;
  }

  if (isError) {
    return (
      <Center minH="200px">
        <Text color="red.500">Não foi possível carregar os filmes agora.</Text>
      </Center>
    );
  }

  if (movies.length === 0) {
    return (
      <Center minH="200px">
        <Text color="gray.500">Nenhum filme encontrado para esse filtro.</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap="4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
}
