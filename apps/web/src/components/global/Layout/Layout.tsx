import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LayoutProps as Props } from "./Layout.types";
import { useListenMessages } from "hooks/messages.hooks";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const Layout: React.FC<Props> = props => {
  const { children } = props;
  useFetchAccount();
  const navigate = useNavigate();
  const message = useListenMessages();

  console.log("web", message);

  useEffect(() => {
    if (!message) return;
    const { command } = message;
    if (command !== "open") return;
    const { fileId, type } = message;

    navigate(`/${type}/${fileId}`);
  }, [message, navigate]);

  return (
    <div className="Layout h-full bg-black text-white flex flex-col">
      {children}
    </div>
  );
};

Layout.defaultProps = {};

export default Layout;
