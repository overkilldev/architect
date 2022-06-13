import "./App.css";
import Main from "./components/Main/Main";
import Providers from "containers/Providers/Providers";

function App() {
  return (
    <div className="App">
      <Providers>
        <Main />
      </Providers>
    </div>
  );
}

export default App;
