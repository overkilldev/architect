import React from "react";

import Sider from "./Sider";
import { render } from "setupTests";

describe("Sider", () => {
  it("renders with default props", () => {
    render(
      <Sider>
        <div />
      </Sider>
    );
  });
});
