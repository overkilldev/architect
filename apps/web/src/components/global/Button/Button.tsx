import React from "react";

import { ButtonProps as Props } from "./Button.types";

const Button: React.FC<Props> = props => {
  const { className, type = "button", ...rest } = props;
  const classNames = `
    Button px-4 py-2 border rounded-lg bg-violet-500 text-white border-none
    hover:ring-2 ring-violet-500/50 transition-all
    disabled:ring-0 disabled:bg-gray-500 disabled:cursor-not-allowed
    ${className}
  `;
  return <button className={classNames} type={type} {...rest} />;
};

Button.defaultProps = {};

export default Button;
