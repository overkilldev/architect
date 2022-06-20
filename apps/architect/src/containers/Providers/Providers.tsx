import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import { ProvidersProps as Props } from "./Providers.types";
import { queryClient } from "config/reactQuery.config";
import GlobalsProvider from "contexts/globals/globals.context";

const Providers: React.FC<Props> = props => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      <GlobalsProvider>
        <ChakraProvider>
          <BrowserRouter>{props.children}</BrowserRouter>
        </ChakraProvider>
      </GlobalsProvider>
    </QueryClientProvider>
  );
};

Providers.defaultProps = {};

export default Providers;
