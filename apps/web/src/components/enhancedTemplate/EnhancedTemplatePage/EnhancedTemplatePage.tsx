import React, { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import EnhancedTemplateDrawer from "../EnhancedTemplateDrawer/EnhancedTemplateDrawer";
import { EnhancedTemplatePageProps as Props } from "./EnhancedTemplatePage.types";
import CodeEditor from "components/global/CodeEditor/CodeEditor";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const EnhancedTemplatePage: React.FC<Props> = props => {
  const [drawerOpened, setDrawerOpened] = useState(true);
  const { state } = useLocation();
  const { data: account } = useFetchAccount();

  const initialState = useMemo(() => {
    if (!account || !state) return;
    if (state.type === "templates") {
      return account.templates.find(item => item.id === state.id)?.content;
    }
    if (state.type === "enhancedTemplates") {
      return account.enhancedTemplates.find(item => item.id === state.id)
        ?.content;
    }
    throw new Error(`type ${state.type} is not handled`);
  }, [state, account]);

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
      <CodeEditor initialState={initialState} key={state?.id} />
      <EnhancedTemplateDrawer isOpen={drawerOpened} onClose={closeHandler} />
    </div>
  );
};

EnhancedTemplatePage.defaultProps = {};

export default EnhancedTemplatePage;
