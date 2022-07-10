// Interfaces and types from component Autocomplete
import { InputHTMLAttributes, ReactNode } from "react";

// Component Props
export interface AutocompleteProps {
  label?: string;
  options?: string[];
  optionGroups?: OptionGroup[];
  lastOption?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean | undefined;
  name?: string | undefined;
  nullable?: boolean | undefined;
  multiple?: boolean | undefined;
  optionsProps?: OptionsProps;
}

export interface OptionGroup {
  options: string[];
  label: string;
}

export interface OptionsProps {
  height?: number;
}
