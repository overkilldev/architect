// Interfaces and types from component Textarea

import { TextareaHTMLAttributes } from "react";

// Component Props
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}
