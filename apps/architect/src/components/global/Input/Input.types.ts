// Interfaces and types from component Input

import { InputHTMLAttributes } from "react";

// Component Props
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
