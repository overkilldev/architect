// Interfaces and types from component Autocomplete
import { InputHTMLAttributes, ReactNode } from "react";

// Component Props
export interface AutocompleteProps {
  label?: string;
  options: string[];
  lastOption?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean | undefined;
  name?: string | undefined;
  nullable?: boolean | undefined;
  multiple?: boolean | undefined;
  optionsProps?: OptionsProps;
}

export interface OptionsProps {
  height?: number;
}
