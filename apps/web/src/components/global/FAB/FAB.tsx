import { TriangleDownIcon } from "@chakra-ui/icons";
import { FC, useState } from "react";

import { IFAB } from "./FAB.types";
import FABItem from "./FABItem/FABItem";
import { FABItemProps } from "./FABItem/FABItem.types";
import Button from "components/global/Button/Button";

const FAB: IFAB = props => {
  const { children, className } = props;
  const [opened, setOpened] = useState(false);

  const toggleHandler = () => {
    setOpened(prev => !prev);
  };

  return (
    <div className={`FAB absolute bottom-8 right-8 z-10  ${className}`}>
      <Button
        onClick={toggleHandler}
        className="flex items-center justify-center w-16 h-16 ring-2 hover:ring-4 active:ring-1 rounded-full"
      >
        <TriangleDownIcon
          w={5}
          h={5}
          className={`transition-all ${opened ? "rotate-180" : ""}`}
        />
      </Button>
      {opened ? (
        <ul
          className="FAB__items absolute right-full bottom-full flex flex-col items-end"
          onClick={toggleHandler}
        >
          {children}
        </ul>
      ) : null}
    </div>
  );
};

FAB.defaultProps = {};

FAB.Item = FABItem as FC<FABItemProps>;

export default FAB;
