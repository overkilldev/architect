import Layout from "components/global/Layout/Layout";
import Router from "components/global/Router/Router";
import Providers from "containers/Providers/Providers";

function App() {
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
