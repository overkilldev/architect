import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";

import Tree from "./Tree";
import { render } from "setupTests";

describe("Tree", () => {
  it("renders with default props", () => {
    render(
      <ReactFlowProvider>
        <Tree id="0" />
      </ReactFlowProvider>
    );
  });
});
