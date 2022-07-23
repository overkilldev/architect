import React from "react";

import NodeSider from "./NodeSider";
import { render } from "setupTests";

describe("NodeSider", () => {
  it("renders with default props", () => {
    render(
      <NodeSider>
        <div />
      </NodeSider>
    );
  });
});
