import React from "react";

import Textarea from "./Textarea";
import { render } from "setupTests";

describe("Textarea", () => {
  it("renders with default props", () => {
    render(<Textarea />);
  });
});
