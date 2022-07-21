import React, { forwardRef } from "react";

import { SocialButtonProps as Props } from "./SocialButton.types";

const SocialButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { icon, title, ...rest } = props;

  return (
    <button
      className="SocialButton rounded-lg border-[1px] border-white p-2 flex justify-around cursor-pointer"
      {...rest}
      ref={ref}
    >
      {icon}
      {title}
    </button>
  );
});

SocialButton.defaultProps = {};

export default SocialButton;
