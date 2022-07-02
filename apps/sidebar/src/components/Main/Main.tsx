import React, { useEffect } from "react";

import Tab from "components/Tab/Tab";
import useGlobalsStore from "contexts/globals/globals.hooks";

const Main = () => {
  const { vscode } = useGlobalsStore();

  // Init web view
  useEffect(() => {
    console.log("fire");
    if (!vscode) return;
    vscode.postMessage({
      command: "init"
    });
  }, [vscode]);

  return (
    <div className="flex flex-col flex-1">
      <button
        onClick={() => {
          vscode?.postMessage({
            command: "log",
            source: "sidebar",
            data: 1,
            forwardTo: "all"
          });
        }}
      >
        send message
      </button>
      <Tab title="Templates">1</Tab>
      <Tab title="Enhancers">2</Tab>
      <Tab title="EnhancedTemplates">3</Tab>
      <Tab title="Tree">4</Tab>
    </div>
  );
};

export default Main;
