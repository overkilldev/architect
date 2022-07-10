// Forms utility functions
import * as yup from "yup";

import { NodeFormValues } from "components/tree/NodeDrawer/NodeDrawer.types";
import type * as types from "types/forms.types";

export const isString = (options: types.IsStringOptions = {}) => {
  const { required = false, min = 1, max = 100 } = options;

  const rule = yup
    .string()
    .min(min, `Must have at least ${min} characters`)
    .max(max, `Must have a maximum of ${max} characters`);

  if (required) {
    return rule.required("Required field");
  } else {
    return rule.nullable().transform(value => (!!value ? value : null));
  }
};

export const isPathname = (options: types.IsPathnameOptions = {}) => {
  return isString({ ...options })
    .matches(/^[^/]+$/g, "Do not include / in the pathname")
    .matches(/^[^\s]+$/g, "Do not include whitespace in the pathname");
};

export const nodeFormSchema = yup
  .object()
  .shape<types.FormShape<NodeFormValues>>({
    pathname: isPathname({ required: true }),
    alias: isString({ max: 20 }),
    description: isString({ max: 500 })
  });
