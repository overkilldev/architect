import React from "react";

import { ProvidersProps as Props } from "./Providers.types";

const Providers: React.FC<Props> = props => {
  return <>{props.children}</>;
};

Providers.defaultProps = {};

export default Providers;
