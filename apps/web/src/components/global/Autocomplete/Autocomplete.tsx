import { Combobox } from "@headlessui/react";
import React, { useState, Fragment, forwardRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { AutocompleteProps as Props, OptionGroup } from "./Autocomplete.types";
import { Option } from "./Autocomplete.types";

const Autocomplete = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, options, lastOption: LastOption, inputProps, ...rest } = props;
  const { optionsProps, optionGroups, name, onOptionChange, ...rest2 } = rest;
  const { setValue, getValues } = useFormContext();
  const initialValue = getValues()[name] as string | undefined;
  const [query, setQuery] = useState("");
  const { height = 200 } = optionsProps ?? {};
  const optionClasses =
    "Autocomplete__option border-b border-stone-900 last:border-none";

  const chosenOptions = optionGroups ?? options ?? [];
  const flattenedOptions = chosenOptions.flatMap(item => {
    if ("value" in item) return item;
    return item.options;
  });
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(() =>
    flattenedOptions.find(item => item.value === initialValue)
  );

  const changeHandler = (option: Option) => {
    setValue(name, option.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    setSelectedOption(option);
  };

  const getFilteredOptions = () => {
    if (query === "") return chosenOptions;
    if (!chosenOptions.length) return [];
    if ("value" in chosenOptions[0]) {
      return (chosenOptions as Option[]).filter(option => {
        return option.label.toLowerCase().includes(query.toLowerCase());
      });
    }
    return (chosenOptions as OptionGroup[]).reduce((acc, group) => {
      return [
        ...acc,
        {
          ...group,
          options: group.options.filter(option => {
            return option.label.toLowerCase().includes(query.toLowerCase());
          })
        }
      ].filter(group => group.options.length);
    }, [] as OptionGroup[]);
  };

  useEffect(() => {
    if (!selectedOption) return;
    onOptionChange?.(selectedOption);
  }, [onOptionChange, selectedOption]);

  const renderOption = (option: Option, key: number) => {
    const { item, label } = option;
    return (
      <Combobox.Option className={optionClasses} key={key} value={option}>
        {({ active, selected }) => {
          return (
            <div
              className={`py-3 px-2 hover:bg-violet-500/30 ${
                !active && !selected ? "bg-black" : ""
              } ${active && !selected ? "bg-violet-500/30" : ""} ${
                selected ? "bg-violet-500" : ""
              }`}
            >
              <div className="text-white">{item ?? label}</div>
            </div>
          );
        }}
      </Combobox.Option>
    );
  };

  const renderOptionGroup = (optionGroup: OptionGroup, key: number) => {
    const { label, options } = optionGroup;
    return (
      <Fragment key={key}>
        <p className="text-violet-400 capitalize px-2 py-1 pl-3" key={key}>
          {label}
        </p>
        {options.map((option, index) => {
          return renderOption(option, index);
        })}
      </Fragment>
    );
  };

  const renderOptions = () => {
    return getFilteredOptions().map((option, index) => {
      if ("value" in option) return renderOption(option, index);
      return renderOptionGroup(option, index);
    });
  };

  return (
    <Combobox {...rest2} value={selectedOption} onChange={changeHandler}>
      <div className="pb-4 relative">
        <Combobox.Label className="inline-flex text-white pb-1">
          {label}
        </Combobox.Label>
        <Combobox.Input
          className="
          w-full p-2 rounded-md bg-black text-white
          focus:ring-2 focus:ring-violet-500/50 focus:outline outline-offset-[-1px] focus:outline-1 focus:outline-violet-500
          focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-violet-500
          disabled:ring-0 disabled:bg-gray-600 disabled:cursor-not-allowed
          "
          onChange={event => setQuery(event.target.value)}
          displayValue={(option: Option) => option?.label}
          {...inputProps}
          ref={ref}
        />
        <Combobox.Options
          className="Autocomplete__options absolute top-20 bg-black w-full shadow-md overflow-y-auto rounded-lg"
          style={{ maxHeight: height }}
        >
          {renderOptions()}

          {LastOption
            ? renderOption(LastOption, flattenedOptions.length)
            : null}
        </Combobox.Options>
      </div>
    </Combobox>
  );
});

Autocomplete.defaultProps = {};

export default Autocomplete;
