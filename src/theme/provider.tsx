import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#eef4ff" },
          100: { value: "#d9e6ff" },
          500: { value: "#3b6ef6" },
          600: { value: "#2f58d1" },
          700: { value: "#2445a8" },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export function AppChakraProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
