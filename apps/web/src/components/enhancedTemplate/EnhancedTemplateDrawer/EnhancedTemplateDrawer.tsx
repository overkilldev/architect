import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { EnhancedTemplateDrawerProps as Props } from "./EnhancedTemplateDrawer.types";
import Autocomplete from "components/global/Autocomplete/Autocomplete";
import Button from "components/global/Button/Button";
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
    <Drawer placement="right" size="sm" {...rest}>
      <h2 className="font-bold text-xl uppercase py-3">
        New enhanced template
      </h2>
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
          name="template"
          options={[]}
          inputProps={{
            placeholder: "Choose a template"
          }}
        />
        <Autocomplete
          label="Enhancers"
          name="enhancers"
          options={[]}
          inputProps={{
            placeholder: "Choose enhancers"
          }}
        />
        <Button type="submit">Save</Button>
      </form>
    </Drawer>
  );
};

EnhancedTemplateDrawer.defaultProps = {};

export default EnhancedTemplateDrawer;
