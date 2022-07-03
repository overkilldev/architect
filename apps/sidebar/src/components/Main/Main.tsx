import React, { useEffect } from "react";

import Tab from "components/Tab/Tab";
import useGlobalsStore from "contexts/globals/globals.context";

const Main = () => {
  const vscode = useGlobalsStore(state => state.vscode);
  const account = useGlobalsStore(state => state.account);
  const { trees, templates, enhancedTemplates, enhancers } = account ?? {};

  // Init web view
  useEffect(() => {
    console.log("fire sidebar");
    if (!vscode) return;
    vscode.postMessage({
      command: "init",
      source: "sidebar"
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
      <Tab title="Templates">
        {templates?.map(template => (
          <p>{template.name}</p>
        ))}
      </Tab>
      <Tab title="Enhancers">
        {enhancers?.map(enhancer => (
          <p>{enhancer.name}</p>
        ))}
      </Tab>
      <Tab title="EnhancedTemplates">
        {enhancedTemplates?.map(enhancedTemplate => (
          <p>{enhancedTemplate.name}</p>
        ))}
      </Tab>
      <Tab title="Tree">
        {trees?.map(tree => (
          <p>{tree.name}</p>
        ))}
      </Tab>
    </div>
  );
};

export default Main;
