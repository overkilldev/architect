import React from "react";

import { LayoutProps as Props } from "./Layout.types";
import { useListenMessages } from "hooks/messages.hooks";

const Layout: React.FC<Props> = props => {
  const { children } = props;
  const message = useListenMessages();

  console.log("web", message);

  return (
    <div className="Layout h-full bg-black text-white flex flex-col">
      {children}
    </div>
  );
};

Layout.defaultProps = {};

export default Layout;
