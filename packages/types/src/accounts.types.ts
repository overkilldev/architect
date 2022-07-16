import { Enhancer } from "./enhancers.types";
import { Template } from "./templates.types";
import { Tree } from "./trees.types";

export interface Account {
  id: string;
  name: string;
  lastName: string;
  email: string;
  enhancers: Enhancer[];
  templates: Template[];
  trees: Tree[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
