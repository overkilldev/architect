import React from "react";

import { ButtonProps as Props } from "./Button.types";

const Button: React.FC<Props> = props => {
  const { className, ...rest } = props;
  const classNames = `Button px-4 py-2 border rounded-lg bg-violet-500 text-white border-none hover:ring-2 ring-violet-500/50 transition-all ${className}`;
  return <button className={classNames} {...rest} />;
};

Button.defaultProps = {};

export default Button;
