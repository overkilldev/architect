import React from "react";

import Autocomplete from "../Autocomplete/Autocomplete";
import Link from "../Link/Link";
import { ContentAutocompleteProps as Props } from "./ContentAutocomplete.types";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const ContentAutocomplete: React.FC<Props> = props => {
  const { data: account } = useFetchAccount();
  if (!account) return null;

  const { templates, enhancedTemplates, trees } = account ?? {};

  const optionsGroups = [
    {
      label: "Templates",
      options: templates.map(template => template.name)
    },
    {
      label: "Enhanced templates",
      options: enhancedTemplates.map(template => template.name)
    },
    {
      label: "Trees",
      options: trees.map(tree => tree.name)
    }
  ];

  return (
    <Autocomplete
      optionGroups={optionsGroups}
      lastOption={
        <Link to="/enhancedTemplates/">
          <div onClick={() => console.log("creating")}>Crear</div>
        </Link>
      }
      label="Content"
      inputProps={{ placeholder: "Choose or add a new template." }}
      optionsProps={{ height: 500 }}
    />
  );
};

ContentAutocomplete.defaultProps = {};

export default ContentAutocomplete;
