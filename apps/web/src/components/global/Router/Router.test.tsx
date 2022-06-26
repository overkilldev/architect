import React from "react";

import Router from "./Router";
import { render } from "setupTests";

describe("Router", () => {
  it("renders with default props", () => {
    render(<Router />);
  });
});
