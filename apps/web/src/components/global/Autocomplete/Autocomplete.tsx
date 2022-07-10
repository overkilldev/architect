import { Combobox } from "@headlessui/react";
import React, { ReactNode, useState } from "react";

import { AutocompleteProps as Props, OptionGroup } from "./Autocomplete.types";

const Autocomplete: React.FC<Props> = props => {
  const { label, options, lastOption: LastOption, inputProps, ...rest } = props;
  const { optionsProps, optionGroups, ...rest2 } = rest;
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const { height = 200 } = optionsProps ?? {};
  const optionClasses =
    "Autocomplete__option border-b border-stone-900 last:border-none";

  const chosenOptions = optionGroups ?? options ?? [];
  const flattenedOptions = chosenOptions.flatMap(item => {
    if (typeof item === "string") return item;
    return item.options;
  });

  const getFilteredOptions = () => {
    if (query === "") return chosenOptions;
    if (!chosenOptions.length) return [];
    if (typeof chosenOptions[0] === "string") {
      return (chosenOptions as string[]).filter(option => {
        return option.toLowerCase().includes(query.toLowerCase());
      });
    }
    return (chosenOptions as OptionGroup[]).reduce((acc, group) => {
      return [
        ...acc,
        {
          ...group,
          options: group.options.filter(option => {
            return option.toLowerCase().includes(query.toLowerCase());
          })
        }
      ].filter(group => group.options.length);
    }, [] as OptionGroup[]);
  };

  const renderOption = (option: ReactNode, key: number, value?: string) => {
    return (
      <Combobox.Option
        className={optionClasses}
        key={key}
        value={value ?? option}
      >
        {({ active, selected }) => (
          <div
            className={`py-3 px-2 hover:bg-violet-500/30 ${
              active ? "bg-violet-500" : "bg-black"
            } ${selected ? "bg-violet-500" : "bg-black"}`}
          >
            <div className="text-white">{option}</div>
          </div>
        )}
      </Combobox.Option>
    );
  };

  const renderOptionGroup = (optionGroup: OptionGroup, key: number) => {
    const { label, options } = optionGroup;
    return (
      <div key={key}>
        <p className="text-violet-400 capitalize px-2 py-1">{label}</p>
        <div className="px-2">
          {options.map((option, index) => {
            return renderOption(option, index);
          })}
        </div>
      </div>
    );
  };

  return (
    <Combobox {...rest2} value={selectedOption} onChange={setSelectedOption}>
      <div className="pb-4 relative">
        <Combobox.Label className="inline-flex text-white pb-1">
          {label}
        </Combobox.Label>
        <Combobox.Input
          className="
          w-full p-2 rounded-md bg-black text-white
          focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border focus:border-violet-500
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border focus-visible:border-violet-500
          "
          onChange={event => setQuery(event.target.value)}
          {...inputProps}
        />
        <Combobox.Options
          className="Autocomplete__options absolute top-20 bg-black w-full shadow-md overflow-y-auto rounded-lg"
          style={{ maxHeight: height }}
        >
          {getFilteredOptions().map((option, index) => {
            if (typeof option === "string") {
              return renderOption(option, index);
            }
            return renderOptionGroup(option, index);
          })}

          {LastOption
            ? renderOption(LastOption, flattenedOptions.length, "")
            : null}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

Autocomplete.defaultProps = {};

export default Autocomplete;
