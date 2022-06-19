// React query configurations
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // TODO: uncomment when Cypress is configured
      // retry: window.Cypress ? 1 : undefined
      retry: 1
    }
  }
});
