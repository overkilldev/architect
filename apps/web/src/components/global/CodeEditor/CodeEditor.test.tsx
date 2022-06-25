import React from "react";

import CodeEditor from "./CodeEditor";
import { render } from "setupTests";

describe("CodeEditor", () => {
  it("renders with default props", () => {
    render(<CodeEditor />);
  });
});
