// Interfaces and types from component Button

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

// Component Props
export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
