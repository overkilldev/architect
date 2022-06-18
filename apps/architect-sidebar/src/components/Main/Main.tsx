import React, { useEffect, useMemo, useCallback } from "react";

import Tab from "components/Tab/Tab";

const Main = () => {
  const vscode = useMemo(
    () => (window.isVsCode ? window.acquireVsCodeApi : null),
    []
  );
  const clickHandler = useCallback(() => {
    if (!vscode) {
      console.log("clicked");
      return;
    }

    vscode().postMessage({
      type: "callCommand"
    });
  }, [vscode]);

  useEffect(() => {
    clickHandler();
  }, [clickHandler]);

  return (
    <div className="flex flex-col flex-1">
      <Tab title="Templates">1</Tab>
      <Tab title="Enhancers">2</Tab>
      <Tab title="EnhancedTemplates">3</Tab>
      <Tab title="Tree">4</Tab>
    </div>
  );
};

export default Main;
