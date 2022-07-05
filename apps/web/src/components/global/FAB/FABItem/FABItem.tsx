import React from "react";

import { FABItemProps as Props } from "./FABItem.types";

const FABItem: React.FC<Props> = props => {
  const { children, onClick, className } = props;

  return (
    <li
      className={`
        FABItem bg-stone-900 inline-block shadow-2xl rounded-lg px-4 py-2 cursor-pointer
        ring-violet-500/50 active:bg-violet-500
        hover:ring-2 ${className}
      `}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

FABItem.defaultProps = {};

export default FABItem;
