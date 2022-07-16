import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import ContentAutocomplete from "./ContentAutocomplete";
import { render } from "setupTests";

describe("ContentAutocomplete", () => {
  it("renders with default props", () => {
    const { result } = renderHook(() => useForm());

    render(
      <FormProvider {...result.current}>
        <ContentAutocomplete name="test" />
      </FormProvider>
    );
  });
});
