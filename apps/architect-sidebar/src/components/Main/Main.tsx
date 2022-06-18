import React from "react";

import Tab from "components/Tab/Tab";

const Main = () => {
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
