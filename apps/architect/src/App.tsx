import Layout from "components/Layout/Layout";
import Main from "components/Main/Main";
import Providers from "containers/Providers/Providers";

function App() {
  return (
    <div className="App text-center h-screen">
      <Providers>
        <Layout>
          <Main />
        </Layout>
      </Providers>
    </div>
  );
}

export default App;
