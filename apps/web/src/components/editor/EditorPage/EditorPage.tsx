import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { EditorPageProps as Props } from "./EditorPage.types";
import Button from "components/global/Button/Button";
import CodeEditor from "components/global/CodeEditor/CodeEditor";
import useGlobalsStore from "contexts/globals/globals.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const EditorPage: React.FC<Props> = props => {
  const { state } = useLocation();
  const { data: account } = useFetchAccount();
  const navigate = useNavigate();
  const openDrawer = useGlobalsStore(state => state.nodeDrawer.onOpen);

  const initialState = useMemo(() => {
    if (!account || !state) return;
    if (state.type === "templates") {
      return account.templates.find(item => item.id === state.id)?.content;
    }
    throw new Error(`type ${state.type} is not handled`);
  }, [state, account]);

  const goBackToTree = useCallback(() => {
    openDrawer();
    navigate("/workspace");
  }, [navigate, openDrawer]);

  useEffect(() => {
    if (state) return;
    goBackToTree();
  }, [goBackToTree, state]);

  return (
    <div className="EditorPage flex-column z-20">
      <header className="flex justify-between px-8 items-center h-[var(--navbar-height)]">
        <div className="flex items-center">
          <ArrowBackIcon
            w={6}
            h={6}
            onClick={goBackToTree}
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-bold p-3">Template editor</h1>
        </div>
        <Button onClick={openDrawer}>Menu</Button>
      </header>
      <div
        className="border-t-8 border-stone-900"
        style={{ height: "calc(100vh - var(--navbar-height))" }}
      >
        <CodeEditor
          initialState={initialState}
          extension={state?.extension}
          key={state?.id}
        />
      </div>
    </div>
  );
};

EditorPage.defaultProps = {};

export default EditorPage;
