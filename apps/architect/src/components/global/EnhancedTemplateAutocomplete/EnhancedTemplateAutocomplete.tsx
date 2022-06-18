import React from "react";

import Autocomplete from "../Autocomplete/Autocomplete";
import { EnhancedTemplateAutocompleteProps as Props } from "./EnhancedTemplateAutocomplete.types";
import { genEnhancedTemplates } from "builders";

const enhancedTemplates = genEnhancedTemplates(25);

const EnhancedTemplateAutocomplete: React.FC<Props> = props => {
  return (
    <Autocomplete
      options={enhancedTemplates.map(template => template.name)}
      lastOption={<div onClick={() => console.log("creating")}>Crear</div>}
      label="Enhanced template"
      inputProps={{ placeholder: "Choose or add a new template." }}
    />
  );
};

EnhancedTemplateAutocomplete.defaultProps = {};

export default EnhancedTemplateAutocomplete;
