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
    console.log("fire sidebar");
    if (!vscode) return;
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
          <p
            className="p-1 cursor-pointer hover:bg-white/[0.1]"
            onClick={() => clickOptionHandler(template.id, "templates")}
          >
            {template.name}
          </p>
        ))}
      </Tab>
      <Tab title="Enhancers">
        {enhancers?.map(enhancer => (
          <p
            className="p-1 cursor-pointer hover:bg-white/[0.1]"
            onClick={() => clickOptionHandler(enhancer.id, "enhancers")}
          >
            {enhancer.name}
          </p>
        ))}
      </Tab>
      <Tab title="EnhancedTemplates">
        {enhancedTemplates?.map(enhancedTemplate => (
          <p
            className="p-1 cursor-pointer hover:bg-white/[0.1]"
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
            className="p-1 cursor-pointer hover:bg-white/[0.1]"
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
