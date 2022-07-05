// Forms types and interfaces
import { AnySchema } from "yup";

export type FormShape<T> = Partial<Record<keyof T, AnySchema>>;

export interface IsStringOptions {
  required?: boolean;
  min?: number;
  max?: number;
}

export interface IsPathnameOptions {
  required?: boolean;
}
