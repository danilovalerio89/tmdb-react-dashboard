import { Button, HStack, Text } from "@chakra-ui/react";

interface MoviePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}

export function MoviePagination({
  page,
  totalPages,
  onPageChange,
  isFetching,
}: MoviePaginationProps) {
  const safeTotalPages = Math.min(totalPages, 500); // limite da própria TMDB

  return (
    <HStack justify="center" gap="4" py="4">
      <Button
        variant="outline"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1 || isFetching}
      >
        Anterior
      </Button>
      <Text fontSize="sm" color="gray.600" minW="120px" textAlign="center">
        Página {page} de {safeTotalPages || 1}
      </Text>
      <Button
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= safeTotalPages || isFetching}
      >
        Próxima
      </Button>
    </HStack>
  );
}
