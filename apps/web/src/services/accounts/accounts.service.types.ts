// Accounts services types and interfaces

import { Account, Enhancer, Template } from "@architect/types";
import { Response } from "@architect/types";

export type AccountResponse = Response<Account>;

export type TemplateResponse = Response<Template>;

export interface TemplatePayload extends Pick<Template, "content" | "name"> {
  enhancersIds?: Enhancer["id"][];
}
