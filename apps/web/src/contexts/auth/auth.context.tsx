import { Hub, Auth } from "aws-amplify";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { AuthProviderProps as Props } from "./auth.context.types";
import { AuthProviderValue } from "./auth.context.types";

// @ts-ignore
export const AuthContext = createContext<AuthProviderValue>();

const AuthProvider: React.FC<Props> = props => {
  const [user, setUser] = useState();

  const getUser = useCallback(async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = Hub.listen(
      "auth",
      async ({ payload: { event, data } }) => {
        switch (event) {
          case "signIn":
          case "cognitoHostedUI": {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
            break;
          }
          case "signOut":
            setUser(undefined);
            break;
          case "signIn_failure":
          case "cognitoHostedUI_failure":
            console.log("Sign in failure", data);
            break;
        }
      }
    );

    return unsubscribe;
  }, [getUser]);

  useEffect(() => {
    (async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    })();
  }, [getUser]);

  const value: AuthProviderValue = useMemo(() => {
    return {
      user
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
