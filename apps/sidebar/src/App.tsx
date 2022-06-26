import "./App.css";
import Main from "./components/Main/Main";
import Providers from "containers/Providers/Providers";
import { useListenMessages } from "hooks/messages.hooks";

function App() {
  const message = useListenMessages();

  console.log("sidebar", message);

  return (
    <div className="App flex">
      <Providers>
        <Main />
      </Providers>
    </div>
  );
}

export default App;
