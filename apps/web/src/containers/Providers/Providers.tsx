import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

import { ProvidersProps as Props } from "./Providers.types";
import { queryClient } from "config/reactQuery.config";
import AuthProvider from "contexts/auth/auth.context";

const Providers: React.FC<Props> = props => {
  const Router = window.isVsCode ? MemoryRouter : BrowserRouter;

  return (
    <QueryClientProvider client={queryClient}>
      {/* {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null} */}
      <AuthProvider>
        <ChakraProvider>
          <Router>{props.children}</Router>
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

Providers.defaultProps = {};

export default Providers;
