import React from "react";

import Button from "./Button";
import { render } from "setupTests";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button />);
  });
});
