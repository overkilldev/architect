import React, { useEffect, useCallback } from "react";

import Tab from "components/Tab/Tab";
import useGlobals from "contexts/globals/globals.hooks";

const Main = () => {
  const { vscode } = useGlobals();

  const clickHandler = useCallback(() => {
    if (!vscode) {
      console.log("clicked");
      return;
    }

    vscode.postMessage({
      command: "init"
    });
  }, [vscode]);

  useEffect(() => {
    clickHandler();
  }, [clickHandler]);

  return (
    <div className="flex flex-col flex-1">
      <button
        onClick={() => {
          vscode?.postMessage({ command: "log", source: "sidebar", data: 1 });
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
