export interface Enhancer {
  id: string;
  name: string;
  snippets: Snippet[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Snippet {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
