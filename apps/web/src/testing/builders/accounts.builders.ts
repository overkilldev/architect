import { Account } from "@architect/types";
import faker from "faker";

import { genEnhancers } from "./enhancers.builders";
import { genTemplates } from "./templates.builders";
import { genTrees } from "./trees.builders";

export const buildAccount = (overrides: Partial<Account> = {}): Account => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    templates: genTemplates(),
    enhancers: genEnhancers(),
    trees: genTrees(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};
