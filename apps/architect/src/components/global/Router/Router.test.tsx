import React from "react";

import { render } from "setupTests";
import Router from "./Router";

describe("Router", () => {
  it("renders with default props", () => {
    render(<Router />);
  });
});
