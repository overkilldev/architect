import Prism from "prismjs";
import React, { ChangeEvent, useMemo, useState } from "react";
import "prismjs/themes/prism-tomorrow.min.css";

import { CodeEditorProps as Props } from "./CodeEditor.types";

// const initialCode = `
//     const Prism = require('prismjs');
//     const loadLanguages = require('prismjs/components/');
//     loadLanguages(['haml']);

//     // The code snippet you want to highlight, as a string
//     const code = ["hi", "there", "reader!"];

//     // Returns a highlighted HTML string
//     const html = Prism.highlight(code, Prism.languages.haml, 'haml');
//   `;

const CodeEditor: React.FC<Props> = props => {
  const { initialState } = props;
  const [code, setCode] = useState(initialState ?? "");

  const html = useMemo(
    () => Prism.highlight(code, Prism.languages.javascript, "javascript"),
    [code]
  );

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className="CodeEditor flex-col w-full">
      <pre className="relative w-full h-screen">
        <textarea
          onChange={changeHandler}
          value={code}
          className="bg-black w-full h-full absolute z-0 top-0 left-0 focus:border-none focus:outline-none px-6 py-4"
        />
        <code
          dangerouslySetInnerHTML={{ __html: html }}
          className="w-full h-full absolute z-1 top-0 left-0 pointer-events-none px-6 py-4"
        />
      </pre>
    </div>
  );
};

CodeEditor.defaultProps = {};

export default CodeEditor;
