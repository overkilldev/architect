import { EnhancedTemplate } from "@architect/types";
import faker from "faker";

export const buildEnhancedTemplate = (
  overrides: Partial<EnhancedTemplate> = {}
): EnhancedTemplate => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    content: faker.random.word(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    enhancersIds: [faker.random.word(), faker.random.word()], // TODO: add enhancers id
    templateId: faker.random.word(), // TODO: add template id
    ...overrides
  };
};

export const genEnhancedTemplates = (quantity?: number): EnhancedTemplate[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const enhancedTemplates = [];
  for (let i = 0; i < num; i++) {
    const enhancedTemplate = buildEnhancedTemplate();
    enhancedTemplates.push(enhancedTemplate);
  }
  return enhancedTemplates;
};
