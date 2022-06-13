import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import { ProvidersProps as Props } from "./Providers.types";

const Providers: React.FC<Props> = props => {
  return <ChakraProvider>{props.children}</ChakraProvider>;
};

Providers.defaultProps = {};

export default Providers;
