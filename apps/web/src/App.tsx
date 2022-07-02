import { useEffect } from "react";

import Layout from "components/global/Layout/Layout";
import Router from "components/global/Router/Router";
import Providers from "containers/Providers/Providers";
import useGlobalsStore from "contexts/globals/globals.context";

function App() {
  const setVsCode = useGlobalsStore(state => state.setVsCode);

  useEffect(() => {
    setVsCode(window.isVsCode ? window.acquireVsCodeApi() : null);
  }, [setVsCode]);

  return (
    <div className="App h-screen">
      <Providers>
        <Layout>
          <Router />
        </Layout>
      </Providers>
    </div>
  );
}

export default App;
