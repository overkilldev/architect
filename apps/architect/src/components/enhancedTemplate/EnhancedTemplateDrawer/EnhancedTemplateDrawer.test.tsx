import React from "react";

import EnhancedTemplateDrawer from "./EnhancedTemplateDrawer";
import { render } from "setupTests";

describe("EnhancedTemplateDrawer", () => {
  it("renders with default props", () => {
    render(<EnhancedTemplateDrawer isOpen onClose={() => {}} />);
  });
});
