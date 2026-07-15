import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

interface LoaderProps {
  label?: string;
  fullHeight?: boolean;
}

export function Loader({
  label = "Carregando...",
  fullHeight = false,
}: LoaderProps) {
  return (
    <Center
      h={fullHeight ? "100vh" : "100%"}
      minH={fullHeight ? undefined : "200px"}
      w="100%"
    >
      <VStack gap="3">
        <Spinner size="lg" color="brand.500" borderWidth="3px" />
        <Text color="gray.500" fontSize="sm">
          {label}
        </Text>
      </VStack>
    </Center>
  );
}
