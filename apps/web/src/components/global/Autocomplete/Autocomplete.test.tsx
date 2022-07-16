import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import Autocomplete from "./Autocomplete";
import { render } from "setupTests";

describe("Autocomplete", () => {
  it("renders with default props", () => {
    const { result } = renderHook(() => useForm());

    render(
      <FormProvider {...result.current}>
        <Autocomplete options={[]} name="test" />
      </FormProvider>
    );
  });
});
