import React from "react";
import { Route, Routes } from "react-router-dom";

import { RouterProps as Props } from "./Router.types";
import EnhancedTemplatePage from "components/enhancedTemplate/EnhancedTemplatePage/EnhancedTemplatePage";
import MainPage from "components/main/MainPage/MainPage";
import TreePage from "components/tree/TreePage/TreePage";

const Router: React.FC<Props> = props => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="workspace" element={<TreePage />}>
          <Route path="editor" element={<EnhancedTemplatePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

Router.defaultProps = {};

export default Router;
