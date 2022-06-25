import React from "react";

import { LayoutProps as Props } from "./Layout.types";
import { useListenMessages } from "hooks/messages.hooks";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const Layout: React.FC<Props> = props => {
  const { children } = props;
  useFetchAccount();
  const message = useListenMessages();

  console.log("web", message);

  return <div className="Layout h-full bg-zinc-800 text-white">{children}</div>;
};

Layout.defaultProps = {};

export default Layout;
