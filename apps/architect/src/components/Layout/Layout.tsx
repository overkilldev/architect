import React from "react";

import { LayoutProps as Props } from "./Layout.types";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const Layout: React.FC<Props> = props => {
  const { children } = props;
  useFetchAccount();

  return <div className="Layout h-full">{children}</div>;
};

Layout.defaultProps = {};

export default Layout;
