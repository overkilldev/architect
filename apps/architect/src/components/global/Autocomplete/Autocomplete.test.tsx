import React from "react";

import Autocomplete from "./Autocomplete";
import { render } from "setupTests";

describe("Autocomplete", () => {
  it("renders with default props", () => {
    render(<Autocomplete options={[]} />);
  });
});
