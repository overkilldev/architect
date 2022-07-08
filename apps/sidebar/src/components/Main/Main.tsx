import { FileTypes } from "@architect/types";
import React, { useEffect } from "react";

import Tab from "components/Tab/Tab";
import useGlobalsStore from "contexts/globals/globals.context";

const Main = () => {
  const vscode = useGlobalsStore(state => state.vscode);
  const account = useGlobalsStore(state => state.account);
  const { trees, templates, enhancedTemplates, enhancers } = account ?? {};

  // Init web view
  useEffect(() => {
    if (!vscode) return;
    console.log("fire sidebar");
    vscode.postMessage({
      command: "init",
      source: "sidebar"
    });
  }, [vscode]);

  const clickOptionHandler = (fileId: string, type: FileTypes) => {
    if (!vscode) return;
    vscode.postMessage({
      command: "open",
      source: "sidebar",
      forwardTo: "web",
      type,
      fileId
    });
  };

  const itemClasses = "py-1 px-3 cursor-pointer hover:bg-white/10";

  return (
    <div className="flex flex-col flex-1 border-r border-r-gray-600">
      <Tab title="Templates">
        {templates?.map(template => (
          <p
            className={itemClasses}
            onClick={() => clickOptionHandler(template.id, "templates")}
          >
            {template.name}
          </p>
        ))}
      </Tab>
      <Tab title="Enhancers">
        {enhancers?.map(enhancer => (
          <p
            className={itemClasses}
            onClick={() => clickOptionHandler(enhancer.id, "enhancers")}
          >
            {enhancer.name}
          </p>
        ))}
      </Tab>
      <Tab title="EnhancedTemplates">
        {enhancedTemplates?.map(enhancedTemplate => (
          <p
            className={itemClasses}
            onClick={() =>
              clickOptionHandler(enhancedTemplate.id, "enhancedTemplates")
            }
          >
            {enhancedTemplate.name}
          </p>
        ))}
      </Tab>
      <Tab title="Tree">
        {trees?.map(tree => (
          <p
            className={itemClasses}
            onClick={() => clickOptionHandler(tree.id, "trees")}
          >
            {tree.name}
          </p>
        ))}
      </Tab>
    </div>
  );
};

export default Main;
