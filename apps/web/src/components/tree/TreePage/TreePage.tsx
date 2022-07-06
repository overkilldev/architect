import { useState } from "react";

import Tree from "../Tree/Tree";

const colors = ["red", "blue", "yellow"];
const trees = [1, 2, 3];

const TreePage = () => {
  const [active, setActive] = useState(0);

  const dimensionsClasses = "h-full w-full";

  return (
    <div className={dimensionsClasses}>
      <div className="flex">
        {trees.map((tree, index) => {
          return (
            <div
              key={index}
              onClick={() => setActive(index)}
              className="p-4 cursor-pointer"
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className={dimensionsClasses}>
        {trees.map((tree, index) => {
          return (
            <div
              className={`absolute ${dimensionsClasses} ${
                index === active ? "z-20 visible" : "z-10 invisible"
              }`}
              key={index}
            >
              <Tree bg={colors[index]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreePage;
