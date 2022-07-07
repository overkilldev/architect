import React from "react";
import { Route, Routes } from "react-router-dom";

import { RouterProps as Props } from "./Router.types";
import EnhancedTemplatePage from "components/enhancedTemplate/EnhancedTemplatePage/EnhancedTemplatePage";
import TreePage from "components/tree/TreePage/TreePage";

const Router: React.FC<Props> = props => {
  return (
    <Routes>
      <Route path="/" element={<TreePage />} />
      <Route path="enhancedTemplates" element={<EnhancedTemplatePage />}>
        <Route path=":id" element={<EnhancedTemplatePage />} />
      </Route>
      <Route path="enhancers">
        <Route path=":id" element={<EnhancedTemplatePage />} />
      </Route>
      <Route path="templates">
        <Route path=":id" element={<EnhancedTemplatePage />} />
      </Route>
      <Route path="trees">
        <Route path=":id" element={<EnhancedTemplatePage />} />
      </Route>
    </Routes>
  );
};

Router.defaultProps = {};

export default Router;
