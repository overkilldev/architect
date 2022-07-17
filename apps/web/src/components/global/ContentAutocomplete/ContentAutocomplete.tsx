import { forwardRef, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import Autocomplete from "../Autocomplete/Autocomplete";
import Button from "../Button/Button";
import Link from "../Link/Link";
import { ContentAutocompleteProps as Props } from "./ContentAutocomplete.types";
import { ContentOption } from "./ContentAutocomplete.types";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const ContentAutocomplete = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { onOptionChange, ...rest } = props;
    const { data: account } = useFetchAccount();
    const { setValue, control } = useFormContext();
    const { templates = [], trees = [] } = account ?? {};
    const starterId = useWatch({ name: props.name, control });

    const optionChangeHandler = useCallback(
      (option: ContentOption) => {
        if (!templates) return;
        switch (option.type) {
          case "templates": {
            const template = templates.find(
              item => item.id === option.value
            )?.content;
            setValue("content", template);
            setValue("contentRaw", template);
            break;
          }
          case "trees":
            // TODO: maybe nothing and later create a node type container
            break;
          default:
            throw new Error(`type ${option.type} is not handled`);
        }
        onOptionChange?.(option);
      },
      [onOptionChange, setValue, templates]
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
          {...rest}
          inputProps={{
            placeholder: "Choose or create a template",
            ...rest.inputProps
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
