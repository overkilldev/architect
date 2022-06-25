import React, { memo } from "react";

import { InputProps as Props } from "./Input.types";

const Input: React.FC<Props> = props => {
  const { label, ...rest } = props;

  const Wrapper = () => {
    if (label) return <label>{label}</label>;
    return <></>;
  };

  return (
    <div className="Input pb-4">
      <Wrapper />
      <input {...rest} className="w-full p-2 border rounded-md" />
    </div>
  );
};

Input.defaultProps = {};

export default memo(Input);
