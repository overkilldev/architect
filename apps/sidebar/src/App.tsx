import "./App.css";
import { useEffect } from "react";

import Main from "./components/Main/Main";
import Providers from "containers/Providers/Providers";
import useGlobalsStore from "contexts/globals/globals.context";
import { useListenMessages } from "hooks/messages.hooks";

function App() {
  const message = useListenMessages();
  const setVsCode = useGlobalsStore(state => state.setVsCode);
  const setAccount = useGlobalsStore(state => state.setAccount);

  useEffect(() => {
    setVsCode(window.isVsCode ? window.acquireVsCodeApi() : null);
  }, [setVsCode]);

  useEffect(() => {
    if (!message) return;
    const { command } = message;
    if (command !== "sync") return;
    const { data } = message;
    setAccount(data);
  }, [setAccount, message]);

  return (
    <div className="App flex">
      <Providers>
        <Main />
      </Providers>
    </div>
  );
}

export default App;
