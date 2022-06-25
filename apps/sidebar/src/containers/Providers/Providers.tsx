import React from "react";

import { ProvidersProps as Props } from "./Providers.types";
import GlobalsProvider from "contexts/globals/globals.context";

const Providers: React.FC<Props> = props => {
  return <GlobalsProvider>{props.children}</GlobalsProvider>;
};

Providers.defaultProps = {};

export default Providers;
