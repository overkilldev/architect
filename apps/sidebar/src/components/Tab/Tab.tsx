import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

import { TabProps as Props } from "./Tab.types";

const Tab: React.FC<Props> = props => {
  const { children, title } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`Tab flex flex-col ${isOpen ? "flex-1" : null}`}>
      <div
        className="focus:ring-2 ring-inset focus:ring-violet-500 cursor-pointer bg-stone-900 border border-gray-600 py-1 px-3 flex justify-between items-center focus:z-10 border-r-0"
        onClick={() => setIsOpen(prev => !prev)}
        tabIndex={1}
      >
        <h1 className="text-white">{title}</h1>
        <ChevronDownIcon
          className={`transition h-5 w-5 ${isOpen ? "rotate-180" : ""} `}
          fill="white"
        />
      </div>
      {isOpen ? <div className="flex-1 py-2">{children}</div> : null}
    </div>
  );
};

Tab.defaultProps = {};

export default Tab;
