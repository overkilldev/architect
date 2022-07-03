import { Enhancer, Snippet } from "@architect/types";
import faker from "faker";

export const buildEnhancer = (overrides: Partial<Enhancer> = {}): Enhancer => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    snippets: genSnippets(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genEnhancers = (quantity?: number): Enhancer[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const enhancers = [];
  for (let i = 0; i < num; i++) {
    const enhancer = buildEnhancer();
    enhancers.push(enhancer);
  }
  return enhancers;
};

export const buildSnippet = (overrides: Partial<Snippet> = {}): Snippet => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    content: faker.random.word(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genSnippets = (quantity?: number): Snippet[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const snippets = [];
  for (let i = 0; i < num; i++) {
    const snippet = buildSnippet();
    snippets.push(snippet);
  }
  return snippets;
};
