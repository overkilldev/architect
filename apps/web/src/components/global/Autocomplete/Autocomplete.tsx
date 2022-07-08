import { Combobox } from "@headlessui/react";
import React, { ReactNode, useState } from "react";

import { AutocompleteProps as Props } from "./Autocomplete.types";

const Autocomplete: React.FC<Props> = props => {
  const { label, options, lastOption: LastOption, inputProps, ...rest } = props;
  const { optionsProps, ...rest2 } = rest;
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const { height = 200 } = optionsProps ?? {};
  const optionClasses =
    "Autocomplete__option border-b border-stone-900 last:border-none";

  const filteredOptions =
    query === ""
      ? options
      : options.filter(option => {
          return option.toLowerCase().includes(query.toLowerCase());
        });

  const renderOption = (
    option: ReactNode,
    active: boolean,
    selected: boolean
  ) => {
    return (
      <div
        className={`py-3 px-2 hover:bg-violet-500/30 ${
          active ? "bg-violet-500" : "bg-black"
        } ${selected ? "bg-violet-500" : "bg-black"}`}
      >
        <div className="text-white">{option}</div>
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
          {filteredOptions.map((option, index) => (
            <Combobox.Option
              className={optionClasses}
              key={index}
              value={option}
            >
              {({ active, selected }) => renderOption(option, active, selected)}
            </Combobox.Option>
          ))}
          {LastOption ? (
            <Combobox.Option
              key={options.length}
              className={optionClasses}
              value=""
            >
              {({ active, selected }) =>
                renderOption(LastOption, active, selected)
              }
            </Combobox.Option>
          ) : null}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

Autocomplete.defaultProps = {};

export default Autocomplete;
