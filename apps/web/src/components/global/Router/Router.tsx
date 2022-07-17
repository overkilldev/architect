import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { RouterProps as Props } from "./Router.types";
import EditorPage from "components/editor/EditorPage/EditorPage";
import MainPage from "components/main/MainPage/MainPage";
import TreePage from "components/tree/TreePage/TreePage";

const Router: React.FC<Props> = props => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Navigate to="workspace" replace />} />
        <Route path="workspace" element={<TreePage />}>
          <Route path="editor" element={<EditorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

Router.defaultProps = {};

export default Router;
