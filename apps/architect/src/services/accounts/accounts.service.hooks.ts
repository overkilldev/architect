import { useQuery } from "react-query";

import { fetchAccount } from "./accounts.service";

export const useFetchAccount = () => {
  // TODO: get user token from auth context
  const token = "my-github-auth-token";
  return useQuery(["account", token], () => fetchAccount(token), {
    enabled: !!token,
    onSuccess: data => {
      // TODO: post message to other apps
      console.log("account data", data);
    }
  });
};
