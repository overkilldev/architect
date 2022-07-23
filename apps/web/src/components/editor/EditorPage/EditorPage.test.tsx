import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import EditorPage from "./EditorPage";
import { render } from "setupTests";

describe("EditorPage", () => {
  it("renders with default props", () => {
    const { result } = renderHook(() => useForm());

    render(
      <FormProvider {...result.current}>
        <EditorPage />
      </FormProvider>
    );
  });
});
