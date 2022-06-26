import React from "react";

import Link from "./Link";
import { render } from "setupTests";

describe("Link", () => {
  it("renders with default props", () => {
    render(<Link to="/" />);
  });
});
