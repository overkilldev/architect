// Interfaces and types from component ContentAutocomplete

import { AutocompleteProps } from "../Autocomplete/Autocomplete.types";
import { Option } from "../Autocomplete/Autocomplete.types";

// Component Props
export interface ContentAutocompleteProps extends AutocompleteProps {}

export interface ContentOption extends Option {
  type?: "templates" | "trees";
}
