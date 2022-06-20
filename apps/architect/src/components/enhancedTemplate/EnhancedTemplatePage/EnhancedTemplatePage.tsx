import React, { useCallback, useState } from "react";

import EnhancedTemplateDrawer from "../EnhancedTemplateDrawer/EnhancedTemplateDrawer";
import { EnhancedTemplatePageProps as Props } from "./EnhancedTemplatePage.types";
import CodeEditor from "components/global/CodeEditor/CodeEditor";

const EnhancedTemplatePage: React.FC<Props> = props => {
  const [drawerOpened, setDrawerOpened] = useState(true);

  const openHandler = useCallback(() => {
    setDrawerOpened(true);
  }, []);

  const closeHandler = useCallback(() => {
    setDrawerOpened(false);
  }, []);

  return (
    <div className="EnhancedTemplatePage flex-column">
      <h1 className="text-center">EnhancedTemplatePage</h1>
      <button className="text-center" onClick={openHandler}>
        Open
      </button>
      <CodeEditor />
      <EnhancedTemplateDrawer isOpen={drawerOpened} onClose={closeHandler} />
    </div>
  );
};

EnhancedTemplatePage.defaultProps = {};

export default EnhancedTemplatePage;
