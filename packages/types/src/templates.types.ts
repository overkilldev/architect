import { Enhancer } from "./enhancers.types";

export interface Template {
  id: string;
  name: string;
  content: string;
  enhancersIds: Enhancer["id"][];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
