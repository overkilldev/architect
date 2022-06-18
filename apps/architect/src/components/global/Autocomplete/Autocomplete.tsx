import { Combobox } from "@headlessui/react";
import React, { ReactNode, useState } from "react";

import { AutocompleteProps as Props } from "./Autocomplete.types";

const Autocomplete: React.FC<Props> = props => {
  const { label, options, lastOption: LastOption, inputProps, ...rest } = props;
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const optionClasses = "border-b last:border-none";

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
      <li
        className={`py-3 px-2 ${active ? "bg-blue-100" : "bg-white"} ${
          selected ? "bg-blue-300" : "bg-white"
        }`}
      >
        {option}
      </li>
    );
  };

  return (
    <Combobox {...rest} value={selectedOption} onChange={setSelectedOption}>
      <div className="pb-4 relative">
        <Combobox.Label>{label}</Combobox.Label>
        <Combobox.Input
          className="w-full p-2 border rounded-md"
          onChange={event => setQuery(event.target.value)}
          {...inputProps}
        />
        <Combobox.Options className="absolute top-20 bg-white w-full shadow-md">
          {filteredOptions.map(option => (
            <Combobox.Option
              className={optionClasses}
              key={option}
              value={option}
            >
              {({ active, selected }) => renderOption(option, active, selected)}
            </Combobox.Option>
          ))}
          {LastOption ? (
            <Combobox.Option className={optionClasses} value="">
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
