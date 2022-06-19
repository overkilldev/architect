import faker from "faker";

import { genEnhancedTemplates } from "./enhancedTemplates.builders";
import { genEnhancers } from "./enhancers.builders";
import { genTemplates } from "./templates.builders";
import { genTrees } from "./trees.builders";
import { Account } from "types/accounts.types";

export const buildAccount = (overrides: Partial<Account> = {}): Account => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    templates: genTemplates(),
    enhancers: genEnhancers(),
    enhancedTemplates: genEnhancedTemplates(),
    trees: genTrees(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};
