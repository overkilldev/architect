import React from "react";

import Tree from "./Tree";
import { render } from "setupTests";

describe("Tree", () => {
  it("renders with default props", () => {
    render(<Tree />);
  });
});
