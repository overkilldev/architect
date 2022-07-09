import { useQuery } from "react-query";

import { fetchAccount } from "./accounts.service";
import useGlobalsStore from "contexts/globals/globals.context";

export const useFetchAccount = () => {
  const vscode = useGlobalsStore(state => state.vscode);
  // TODO: get user token from auth context
  const token = "my-github-auth-token";

  return useQuery(["account", token], () => fetchAccount(token), {
    enabled: !!token,
    onSuccess: data => {
      const { trees } = data;
      const treesModified = trees.map(tree => {
        const nodesModified = tree.nodes.map(n => {
          // @ts-ignore must be delete to avoid issues with circular dependencies
          delete n.data.node;
          return n;
        });
        return {
          ...tree,
          nodes: nodesModified
        };
      });

      const enhancedData = {
        ...data,
        trees: treesModified
      };
      vscode?.postMessage({
        command: "sync",
        source: "web",
        data: enhancedData,
        forwardTo: "sidebar"
      });
    }
  });
};
