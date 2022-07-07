import React, { forwardRef, memo } from "react";

import { InputProps as Props } from "./Input.types";

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, errorMessage, ...rest } = props;

  const Wrapper = () => {
    if (label)
      return <label className="inline-flex text-white pb-1">{label}</label>;
    return <></>;
  };

  return (
    <div className="Input pb-4">
      <Wrapper />
      <input
        ref={ref}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        {...rest}
        className="
        w-full p-2 rounded-md bg-black text-white
        focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border focus:border-violet-500
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border focus-visible:border-violet-500
        "
      />
      {errorMessage ? (
        <span className="Input__error text-red-500 text-sm">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
});

Input.defaultProps = {};

export default memo(Input);
