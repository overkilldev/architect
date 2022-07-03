// Forms types and interfaces
import { AnySchema } from "yup";

export type FormShape<T> = Partial<Record<keyof T, AnySchema>>;
