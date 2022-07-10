import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Autocomplete from "../Autocomplete/Autocomplete";
import Link from "../Link/Link";
import { ContentAutocompleteProps as Props } from "./ContentAutocomplete.types";
import { ContentOption } from "./ContentAutocomplete.types";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const ContentAutocomplete = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [selectedOption, setSelectedOption] = useState<ContentOption>();
    const { data: account } = useFetchAccount();
    const navigate = useNavigate();

    const navigateHandler = useCallback(
      (type: ContentOption["type"], id: string) => {
        navigate(`/${type}/${id}`, { state: { id, type } });
      },
      [navigate]
    );

    useEffect(() => {
      const { type, value } = selectedOption ?? {};
      if (!type || typeof value !== "string") return;
      if (type === "trees") return;
      navigateHandler(type, value);
    }, [navigateHandler, selectedOption]);

    if (!account) return null;

    const { templates, enhancedTemplates, trees } = account ?? {};

    const optionsGroups = [
      {
        label: "Templates",
        options: templates.map(template => ({
          label: template.name,
          value: template.id,
          type: "templates"
        }))
      },
      {
        label: "Enhanced templates",
        options: enhancedTemplates.map(template => ({
          label: template.name,
          value: template.id,
          type: "enhancedTemplates"
        }))
      },
      {
        label: "Trees",
        options: trees.map(tree => ({
          label: tree.name,
          value: tree.id,
          type: "trees"
        }))
      }
    ];

    const lastOption = {
      label: "Crear",
      value: "",
      item: (
        <Link to="/enhancedTemplates/">
          <div onClick={() => console.log("creating")}>Crear</div>
        </Link>
      )
    };

    return (
      <Autocomplete
        optionGroups={optionsGroups}
        lastOption={lastOption}
        label="Content"
        optionsProps={{ height: 500 }}
        onChange={setSelectedOption}
        value={selectedOption}
        {...props}
        inputProps={{
          placeholder: "Choose or create a template",
          ...props.inputProps
        }}
        ref={ref}
      />
    );
  }
);

ContentAutocomplete.defaultProps = {};

export default ContentAutocomplete;
