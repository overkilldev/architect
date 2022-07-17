import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LayoutProps as Props } from "./Layout.types";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import { useListenMessages } from "hooks/messages.hooks";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const Layout: React.FC<Props> = props => {
  const { children } = props;
  const navigate = useNavigate();
  const message = useListenMessages();
  const addTree = useTreeStore(state => state.addTree);
  const treesIds = useTreeStore(state => state.treesIds);
  const setActiveTreeId = useTreeStore(state => state.setActiveTreeId);
  const vscode = useGlobalsStore(state => state.vscode);
  const { data: account } = useFetchAccount();

  useEffect(() => {
    if (!message || !account) return;
    const { command } = message;
    if (command !== "open") return;
    const { fileId, type } = message;
    if (type === "trees") {
      const tree = account.trees.find(tree => tree.id === fileId);
      if (!tree) throw new Error("Tree not found");
      if (treesIds.includes(tree.id)) {
        setActiveTreeId(tree.id);
      } else {
        const newTreeId = addTree(tree);
        setActiveTreeId(newTreeId);
      }
    } else navigate(`/workspace/editor`, { state: { type, id: fileId } });
  }, [message, navigate, addTree, account, setActiveTreeId, treesIds]);

  useEffect(() => {
    if (!account) return;
    vscode?.postMessage({
      command: "sync",
      source: "web",
      forwardTo: "sidebar",
      data: account
    });
  }, [account, vscode]);

  return (
    <div className="Layout h-full bg-black text-white flex flex-col">
      {children}
    </div>
  );
};

Layout.defaultProps = {};

export default Layout;
