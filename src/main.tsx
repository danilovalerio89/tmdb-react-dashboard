import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AppChakraProvider } from "@/theme/provider";
import { AppToaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppChakraProvider>
        <App />
        <AppToaster />
      </AppChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>,
);
