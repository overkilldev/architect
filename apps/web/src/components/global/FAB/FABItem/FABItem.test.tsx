import React from "react";

import FABItem from "./FABItem";
import { render } from "setupTests";

describe("FABItem", () => {
  it("renders with default props", () => {
    render(<FABItem onClick={() => ""}>Text</FABItem>);
  });
});
