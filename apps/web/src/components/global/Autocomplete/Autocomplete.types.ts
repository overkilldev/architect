// Interfaces and types from component Autocomplete
import { InputHTMLAttributes, ReactNode } from "react";

// Component Props
export interface AutocompleteProps {
  label?: string;
  options?: Option[];
  optionGroups?: OptionGroup[];
  lastOption?: Option;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean | undefined;
  name?: string | undefined;
  nullable?: boolean | undefined;
  multiple?: boolean | undefined;
  optionsProps?: OptionsProps;
  value?: Option;
  onChange?: (value: Option) => void;
}

export interface Option {
  label: string;
  value: string | number | boolean;
  item?: ReactNode;
}

export interface OptionGroup {
  options: Option[];
  label: string;
}

export interface OptionsProps {
  height?: number;
}
