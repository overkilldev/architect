import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import EnhancedTemplatePage from "./EnhancedTemplatePage";
import { render } from "setupTests";

describe("EnhancedTemplatePage", () => {
  it("renders with default props", () => {
    const { result } = renderHook(() => useForm());

    render(
      <FormProvider {...result.current}>
        <EnhancedTemplatePage />
      </FormProvider>
    );
  });
});
