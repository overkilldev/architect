import React from "react";

import { ProvidersProps as Props } from "./Providers.types";

const Providers: React.FC<Props> = props => {
  return <div>{props.children}</div>;
};

Providers.defaultProps = {};

export default Providers;
