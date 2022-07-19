import React from "react";

import { SocialButtonProps as Props } from "./SocialButton.types";

const SocialButton: React.FC<Props> = props => {
  const { icon, title, ...rest } = props;

  return (
    <div
      className="SocialButton rounded-lg border-[1px] border-white p-2 flex justify-around cursor-pointer"
      {...rest}
    >
      {icon}
      {title}
    </div>
  );
};

SocialButton.defaultProps = {};

export default SocialButton;
