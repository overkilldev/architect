// Forms utility functions
import * as yup from "yup";

import { NewNodeFormValues } from "components/tree/NodeDrawer/NodeDrawer.types";
import { FormShape } from "types/forms.types";

export const requiredString = yup
  .string()
  .required("Required field")
  .min(1, "Must have at least 3 characters")
  .max(100, "Must have a maximum of 50 characters");

export const newNodeFormSchema = yup
  .object()
  .shape<FormShape<NewNodeFormValues>>({
    label: requiredString
  });
