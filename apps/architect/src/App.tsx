import "./App.css";
import UpdateNode from "./components/UpdateNode/UpdateNode";
import Providers from "containers/Providers/Providers";

function App() {
  return (
    <div className="App">
      <Providers>
        <UpdateNode />
      </Providers>
    </div>
  );
}

export default App;
