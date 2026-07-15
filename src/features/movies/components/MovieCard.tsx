import { Badge, Box, Image, Text, VStack } from "@chakra-ui/react";
import type { Movie } from "@/features/movies/types/movie.types";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w342";
const FALLBACK_POSTER = "https://placehold.co/342x513?text=Sem+Poster";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : FALLBACK_POSTER;

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      transition="transform 0.15s ease"
      _hover={{ transform: "translateY(-4px)", shadow: "md" }}
    >
      <Image
        src={posterUrl}
        alt={movie.title}
        w="100%"
        h="360px"
        objectFit="cover"
      />
      <VStack align="start" gap="1" p="3">
        <Text fontWeight="semibold" lineClamp={1}>
          {movie.title}
        </Text>
        <Badge colorPalette="brand">⭐ {movie.vote_average.toFixed(1)}</Badge>
        <Text fontSize="xs" color="gray.500">
          {movie.release_date || "Data desconhecida"}
        </Text>
      </VStack>
    </Box>
  );
}
