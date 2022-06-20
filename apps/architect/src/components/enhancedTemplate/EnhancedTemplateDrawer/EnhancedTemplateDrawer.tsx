import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { EnhancedTemplateDrawerProps as Props } from "./EnhancedTemplateDrawer.types";
import Autocomplete from "components/global/Autocomplete/Autocomplete";
import Drawer from "components/global/Drawer/Drawer";
import Input from "components/global/Input/Input";

const EnhancedTemplateDrawer: React.FC<Props> = props => {
  const { ...rest } = props;
  const [formName, setFormName] = useState("");

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset form
    setFormName("");
    rest.onClose();
  };

  return (
    <Drawer
      placement="right"
      header="New enhanced template"
      size="sm"
      {...rest}
    >
      <form onSubmit={submitHandler}>
        <Input
          placeholder="Enhanced template name"
          label="Name"
          value={formName}
          onChange={changeHandler}
          autoFocus
        />
        <Autocomplete
          label="Template"
          options={["Prism"]}
          inputProps={{
            placeholder: "Choose a template"
          }}
        />
        <Autocomplete
          label="Enhancers"
          options={[]}
          inputProps={{
            placeholder: "Choose enhancers"
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
        >
          Save
        </button>
      </form>
    </Drawer>
  );
};

EnhancedTemplateDrawer.defaultProps = {};

export default EnhancedTemplateDrawer;
