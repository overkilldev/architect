import { useQuery } from "react-query";

import { fetchAccount } from "./accounts.service";
import useGlobalsStore from "contexts/globals/globals.context";

export const useFetchAccount = () => {
  const vscode = useGlobalsStore(state => state.vscode);
  // TODO: get user token from auth context
  const token = "my-github-auth-token";

  return useQuery(["account", token], () => fetchAccount(token), {
    enabled: !!token,
    onSuccess: accountResponse => {
      const { data } = accountResponse;
      vscode?.postMessage({
        command: "sync",
        source: "web",
        data,
        forwardTo: "sidebar"
      });
    }
  });
};
