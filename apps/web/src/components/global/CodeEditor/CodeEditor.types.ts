// Interfaces and types from component CodeEditor
import { ChangeEventHandler } from "react";

// Component Props
export interface CodeEditorProps {
  initialState?: string;
  extension?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}
