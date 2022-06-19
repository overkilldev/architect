import React from "react";

import Layout from "./Layout";
import { render } from "setupTests";

describe("Layout", () => {
  it("renders with default props", () => {
    render(
      <Layout>
        <div />
      </Layout>
    );
  });
});
