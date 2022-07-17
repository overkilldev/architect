import Prism from "prismjs";
import React, { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { KeyboardEvent } from "react";
import "prismjs/themes/prism-tomorrow.min.css";

import { getLineNumber } from "./CodeEditor.helpers";
import { CodeEditorProps as Props } from "./CodeEditor.types";

const CodeEditor: React.FC<Props> = props => {
  const { initialState, extension } = props;
  const ref = useRef<HTMLElement>(null);
  const [code, setCode] = useState(initialState ?? "");
  const [lineNumber, setLineNumber] = useState(() =>
    getLineNumber(initialState ?? "")
  );

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCode(value);
    setLineNumber(getLineNumber(value));
  };

  // Handle tab inside a textarea
  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    // @ts-ignore typings don't include selection
    const start = e.target.selectionStart;
    // @ts-ignore typings don't include selection
    const end = e.target.selectionEnd;
    // @ts-ignore typings don't include value
    const value = e.target.value;
    // @ts-ignore set textarea value to: text before caret + tab + text after caret
    e.target.value = value.substring(0, start) + "\t" + value.substring(end);
    // @ts-ignore put caret at right position again
    e.target.selectionStart = e.target.selectionEnd = start + 1;
    // @ts-ignore
    setCode(e.target.value);
  };

  useLayoutEffect(() => {
    if (!ref.current) return;
    Prism.highlightElement(ref.current);
  }, [initialState, extension, code]);

  return (
    <div className="CodeEditor flex w-full h-full py-4 bg-black">
      <aside>
        <ul className="flex flex-col">
          {Array(lineNumber)
            .fill(undefined)
            .map((_, index) => {
              return (
                <li
                  key={index}
                  className="font-mono pl-6 leading-6 text-stone-500 text-md text-center"
                >
                  {index + 1}
                </li>
              );
            })}
        </ul>
      </aside>
      <pre className="relative w-full h-full m-0">
        <textarea
          onChange={changeHandler}
          value={code}
          className="bg-black w-full h-full absolute z-0 top-0 left-0 focus:border-none focus:outline-none px-6 leading-6"
          onKeyDown={keyDownHandler}
        />
        <code
          ref={ref}
          className={`w-full h-full absolute z-1 top-0 left-0 pointer-events-none px-6 font-mono leading-6 language-${extension}`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

CodeEditor.defaultProps = {};

export default CodeEditor;
