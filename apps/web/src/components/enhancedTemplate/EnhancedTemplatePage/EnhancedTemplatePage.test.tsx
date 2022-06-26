import React from "react";

import EnhancedTemplatePage from "./EnhancedTemplatePage";
import { render } from "setupTests";

describe("EnhancedTemplatePage", () => {
  it("renders with default props", () => {
    render(<EnhancedTemplatePage />);
  });
});
