import { Enhancer } from "./enhancers.types";
import { Template } from "./templates.types";

export interface EnhancedTemplate {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  enhancersIds: Enhancer["id"][];
  templateId: Template["id"];
}
