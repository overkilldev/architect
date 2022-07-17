import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { EditorPageProps as Props } from "./EditorPage.types";
import Button from "components/global/Button/Button";
import CodeEditor from "components/global/CodeEditor/CodeEditor";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";
import { usePostTemplate } from "services/accounts/accounts.service.hooks";

const EditorPage: React.FC<Props> = props => {
  const { state } = useLocation();
  const { data: account } = useFetchAccount();
  const { mutateAsync: postTemplate } = usePostTemplate();
  const navigate = useNavigate();
  const selectedNode = useTreeStore(state =>
    state.selectedNode.get(state.activeTreeId)
  );

  const openDrawer = useGlobalsStore(state => state.nodeDrawer.onOpen);
  const initialState = useMemo(() => {
    if (!account || !state) return;
    if (state.type === "templates") {
      return account.templates.find(item => item.id === state.id)?.content;
    }
    throw new Error(`type ${state.type} is not handled`);
  }, [state, account]);
  const [content, setContent] = useState(initialState);

  const goBackToTree = useCallback(
    (open = true, state?: Record<string, any>) => {
      if (open) openDrawer();
      navigate("/workspace", { state });
    },
    [navigate, openDrawer]
  );

  const postTemplateHandler = async () => {
    if (!content) return;
    await postTemplate({
      //TODO: usar raw content aquí
      content,
      name: "New template"
    });
    goBackToTree(false);
  };

  const saveContentHandler = () => {
    goBackToTree(true, { rawContent: content, content });
  };

  useEffect(() => {
    if (state && selectedNode) return;
    goBackToTree(false);
  }, [goBackToTree, state, selectedNode]);

  return (
    <div className="EditorPage flex-column z-20">
      <header className="flex justify-between px-8 items-center h-[var(--navbar-height)]">
        <div className="flex items-center">
          <ArrowBackIcon
            w={6}
            h={6}
            onClick={() => goBackToTree()}
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-bold p-3">Template editor</h1>
        </div>
        <div>
          <Button onClick={postTemplateHandler} className="mr-2">
            New template
          </Button>
          <Button onClick={saveContentHandler} className="mr-2">
            Save content
          </Button>
        </div>
      </header>
      <div
        className="border-t-8 border-stone-900"
        style={{ height: "calc(100vh - var(--navbar-height))" }}
      >
        <CodeEditor
          initialState={initialState}
          extension={state?.extension}
          onChange={e => setContent(e.target.value)}
          key={state?.id}
        />
      </div>
    </div>
  );
};

EditorPage.defaultProps = {};

export default EditorPage;
