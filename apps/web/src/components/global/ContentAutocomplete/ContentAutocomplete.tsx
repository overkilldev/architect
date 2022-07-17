import React, { forwardRef, useCallback, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Autocomplete from "../Autocomplete/Autocomplete";
import Button from "../Button/Button";
import Link from "../Link/Link";
import { ContentAutocompleteProps as Props } from "./ContentAutocomplete.types";
import { ContentOption } from "./ContentAutocomplete.types";
import useGlobalsStore from "contexts/globals/globals.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const ContentAutocomplete = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<ContentOption>();
    const closeDrawer = useGlobalsStore(state => state.nodeDrawer.onClose);
    const { data: account } = useFetchAccount();
    const { setValue, control } = useFormContext();
    const { templates = [], trees = [] } = account ?? {};
    const name = props.name;
    const starterId = useWatch({ name, control });
    const pathname: string = useWatch({ name: "pathname", control }) ?? "";

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
            break;
          default:
            throw new Error(`type ${option.type} is not handled`);
        }
        setSelectedOption(option);
      },
      [setValue, templates]
    );

    const editContentHandler = () => {
      if (!selectedOption) return;
      const { value, type } = selectedOption;
      const extensionRaw = pathname.match(/\.[0-9a-z]+$/i)?.[0] ?? ".txt";
      const extension = extensionRaw.replace(".", "");
      const pathSegments = pathname.split("/");
      const filename = pathSegments[pathSegments.length - 1];
      navigate("editor", { state: { id: value, type, extension, filename } });
      closeDrawer();
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
            disabled={props.disabled}
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
