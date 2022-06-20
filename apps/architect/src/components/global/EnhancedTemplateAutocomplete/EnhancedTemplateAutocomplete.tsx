import React from "react";
import { Link } from "react-router-dom";

import Autocomplete from "../Autocomplete/Autocomplete";
import { EnhancedTemplateAutocompleteProps as Props } from "./EnhancedTemplateAutocomplete.types";
import { genEnhancedTemplates } from "testing/builders/enhancedTemplates.builders";

// TODO: usar data del service
const enhancedTemplates = genEnhancedTemplates(25);

const EnhancedTemplateAutocomplete: React.FC<Props> = props => {
  return (
    <Autocomplete
      options={enhancedTemplates.map(template => template.name)}
      lastOption={
        <Link to="/new/enhanced-template">
          <div onClick={() => console.log("creating")}>Crear</div>
        </Link>
      }
      label="Enhanced template"
      inputProps={{ placeholder: "Choose or add a new template." }}
    />
  );
};

EnhancedTemplateAutocomplete.defaultProps = {};

export default EnhancedTemplateAutocomplete;
