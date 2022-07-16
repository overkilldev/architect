import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import EnhancedTemplateDrawer from "./EnhancedTemplateDrawer";
import { render } from "setupTests";

describe("EnhancedTemplateDrawer", () => {
  it("renders with default props", () => {
    const { result } = renderHook(() => useForm());

    render(
      <FormProvider {...result.current}>
        <EnhancedTemplateDrawer isOpen onClose={() => {}} />
      </FormProvider>
    );
  });
});
