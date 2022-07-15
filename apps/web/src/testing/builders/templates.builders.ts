import { Template } from "@architect/types";
import faker from "faker";

export const buildTemplate = (overrides: Partial<Template> = {}): Template => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    content: faker.random.word(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    enhancersIds: [],
    ...overrides
  };
};

export const genTemplates = (quantity?: number): Template[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const templates = [];
  for (let i = 0; i < num; i++) {
    const template = buildTemplate();
    templates.push(template);
  }
  return templates;
};
