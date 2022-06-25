import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

import { TabProps as Props } from "./Tab.types";

const Tab: React.FC<Props> = props => {
  const { children, title } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`Tab flex flex-col ${isOpen ? "flex-1" : null}`}>
      <div
        className="cursor-pointer border p-1 flex justify-between items-center"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <h1>{title}</h1>
        <ChevronDownIcon className={`h-5 w-5 ${isOpen ? "rotate-180" : ""} `} />
      </div>
      {isOpen ? <div className="flex-1 p-2">{children}</div> : null}
    </div>
  );
};

Tab.defaultProps = {};

export default Tab;
