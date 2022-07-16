import React, { forwardRef, useCallback } from "react";
import { useFormContext } from "react-hook-form";

import Autocomplete from "../Autocomplete/Autocomplete";
import Button from "../Button/Button";
import Link from "../Link/Link";
import { ContentAutocompleteProps as Props } from "./ContentAutocomplete.types";
import { ContentOption } from "./ContentAutocomplete.types";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const ContentAutocomplete = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { data: account } = useFetchAccount();
    const { setValue, watch } = useFormContext();
    const { templates = [], trees = [] } = account ?? {};
    const starterId = watch(props.name);

    const optionChangeHandler = useCallback(
      (option: ContentOption) => {
        if (!templates) return;

        if (option.type === "templates") {
          const template = templates.find(
            item => item.id === option.value
          )?.content;
          setValue("content", template);
          setValue("contentRaw", template);
        }

        if (option.type === "trees") {
          // TODO: maybe nothing and later create a node type container
        }

        throw new Error(`type ${option.type} is not handled`);
      },
      [setValue, templates]
    );

    const editContentHandler = () => {
      // TODO: navigate to editor
    };

    if (!account) return null;

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
      <div className="relative">
        <Autocomplete
          optionGroups={optionsGroups}
          lastOption={lastOption}
          label="Template"
          optionsProps={{ height: 500 }}
          onOptionChange={optionChangeHandler}
          {...props}
          inputProps={{
            placeholder: "Choose or create a template",
            ...props.inputProps
          }}
          ref={ref}
        />
        {starterId ? (
          <Button
            onClick={editContentHandler}
            className="absolute bottom-0 right-0 mb-4 rounded-l-sm"
          >
            Edit
          </Button>
        ) : null}
      </div>
    );
  }
);

ContentAutocomplete.defaultProps = {};

export default ContentAutocomplete;
