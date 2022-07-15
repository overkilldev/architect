/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAccountInput = {
  id?: string | null,
  name: string,
  lastName: string,
  email: string,
};

export type ModelAccountConditionInput = {
  name?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelAccountConditionInput | null > | null,
  or?: Array< ModelAccountConditionInput | null > | null,
  not?: ModelAccountConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Account = {
  __typename: "Account",
  id: string,
  name: string,
  lastName: string,
  email: string,
  enhancers?: ModelEnhancerConnection | null,
  templates?: ModelTemplateConnection | null,
  trees?: ModelTreeConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelEnhancerConnection = {
  __typename: "ModelEnhancerConnection",
  items:  Array<Enhancer | null >,
  nextToken?: string | null,
};

export type Enhancer = {
  __typename: "Enhancer",
  id: string,
  name: string,
  snippets: string,
  account?: Account | null,
  createdAt: string,
  updatedAt: string,
  accountEnhancersId: string,
};

export type ModelTemplateConnection = {
  __typename: "ModelTemplateConnection",
  items:  Array<Template | null >,
  nextToken?: string | null,
};

export type Template = {
  __typename: "Template",
  id: string,
  name: string,
  content: string,
  account?: Account | null,
  enhancersIds: Array< string | null >,
  createdAt: string,
  updatedAt: string,
  accountTemplatesId: string,
};

export type ModelTreeConnection = {
  __typename: "ModelTreeConnection",
  items:  Array<Tree | null >,
  nextToken?: string | null,
};

export type Tree = {
  __typename: "Tree",
  id: string,
  name: string,
  nodes: string,
  edges: string,
  account?: Account | null,
  createdAt: string,
  updatedAt: string,
  accountTreesId: string,
};

export type UpdateAccountInput = {
  id: string,
  name?: string | null,
  lastName?: string | null,
  email?: string | null,
};

export type DeleteAccountInput = {
  id: string,
};

export type CreateEnhancerInput = {
  id?: string | null,
  name: string,
  snippets: string,
  accountEnhancersId: string,
};

export type ModelEnhancerConditionInput = {
  name?: ModelStringInput | null,
  snippets?: ModelStringInput | null,
  and?: Array< ModelEnhancerConditionInput | null > | null,
  or?: Array< ModelEnhancerConditionInput | null > | null,
  not?: ModelEnhancerConditionInput | null,
  accountEnhancersId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateEnhancerInput = {
  id: string,
  name?: string | null,
  snippets?: string | null,
  accountEnhancersId?: string | null,
};

export type DeleteEnhancerInput = {
  id: string,
};

export type CreateTemplateInput = {
  id?: string | null,
  name: string,
  content: string,
  enhancersIds: Array< string | null >,
  accountTemplatesId: string,
};

export type ModelTemplateConditionInput = {
  name?: ModelStringInput | null,
  content?: ModelStringInput | null,
  enhancersIds?: ModelIDInput | null,
  and?: Array< ModelTemplateConditionInput | null > | null,
  or?: Array< ModelTemplateConditionInput | null > | null,
  not?: ModelTemplateConditionInput | null,
  accountTemplatesId?: ModelIDInput | null,
};

export type UpdateTemplateInput = {
  id: string,
  name?: string | null,
  content?: string | null,
  enhancersIds?: Array< string | null > | null,
  accountTemplatesId?: string | null,
};

export type DeleteTemplateInput = {
  id: string,
};

export type CreateTreeInput = {
  id?: string | null,
  name: string,
  nodes: string,
  edges: string,
  accountTreesId: string,
};

export type ModelTreeConditionInput = {
  name?: ModelStringInput | null,
  nodes?: ModelStringInput | null,
  edges?: ModelStringInput | null,
  and?: Array< ModelTreeConditionInput | null > | null,
  or?: Array< ModelTreeConditionInput | null > | null,
  not?: ModelTreeConditionInput | null,
  accountTreesId?: ModelIDInput | null,
};

export type UpdateTreeInput = {
  id: string,
  name?: string | null,
  nodes?: string | null,
  edges?: string | null,
  accountTreesId?: string | null,
};

export type DeleteTreeInput = {
  id: string,
};

export type ModelAccountFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelAccountFilterInput | null > | null,
  or?: Array< ModelAccountFilterInput | null > | null,
  not?: ModelAccountFilterInput | null,
};

export type ModelAccountConnection = {
  __typename: "ModelAccountConnection",
  items:  Array<Account | null >,
  nextToken?: string | null,
};

export type ModelEnhancerFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  snippets?: ModelStringInput | null,
  and?: Array< ModelEnhancerFilterInput | null > | null,
  or?: Array< ModelEnhancerFilterInput | null > | null,
  not?: ModelEnhancerFilterInput | null,
  accountEnhancersId?: ModelIDInput | null,
};

export type ModelTemplateFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  content?: ModelStringInput | null,
  enhancersIds?: ModelIDInput | null,
  and?: Array< ModelTemplateFilterInput | null > | null,
  or?: Array< ModelTemplateFilterInput | null > | null,
  not?: ModelTemplateFilterInput | null,
  accountTemplatesId?: ModelIDInput | null,
};

export type ModelTreeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  nodes?: ModelStringInput | null,
  edges?: ModelStringInput | null,
  and?: Array< ModelTreeFilterInput | null > | null,
  or?: Array< ModelTreeFilterInput | null > | null,
  not?: ModelTreeFilterInput | null,
  accountTreesId?: ModelIDInput | null,
};

export type CreateAccountMutationVariables = {
  input: CreateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type CreateAccountMutation = {
  createAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    lastName: string,
    email: string,
    enhancers?:  {
      __typename: "ModelEnhancerConnection",
      items:  Array< {
        __typename: "Enhancer",
        id: string,
        name: string,
        snippets: string,
        createdAt: string,
        updatedAt: string,
        accountEnhancersId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    templates?:  {
      __typename: "ModelTemplateConnection",
      items:  Array< {
        __typename: "Template",
        id: string,
        name: string,
        content: string,
        enhancersIds: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        accountTemplatesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    trees?:  {
      __typename: "ModelTreeConnection",
      items:  Array< {
        __typename: "Tree",
        id: string,
        name: string,
        nodes: string,
        edges: string,
        createdAt: string,
        updatedAt: string,
        accountTreesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAccountMutationVariables = {
  input: UpdateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type UpdateAccountMutation = {
  updateAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    lastName: string,
    email: string,
    enhancers?:  {
      __typename: "ModelEnhancerConnection",
      items:  Array< {
        __typename: "Enhancer",
        id: string,
        name: string,
        snippets: string,
        createdAt: string,
        updatedAt: string,
        accountEnhancersId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    templates?:  {
      __typename: "ModelTemplateConnection",
      items:  Array< {
        __typename: "Template",
        id: string,
        name: string,
        content: string,
        enhancersIds: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        accountTemplatesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    trees?:  {
      __typename: "ModelTreeConnection",
      items:  Array< {
        __typename: "Tree",
        id: string,
        name: string,
        nodes: string,
        edges: string,
        createdAt: string,
        updatedAt: string,
        accountTreesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAccountMutationVariables = {
  input: DeleteAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type DeleteAccountMutation = {
  deleteAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    lastName: string,
    email: string,
    enhancers?:  {
      __typename: "ModelEnhancerConnection",
      items:  Array< {
        __typename: "Enhancer",
        id: string,
        name: string,
        snippets: string,
        createdAt: string,
        updatedAt: string,
        accountEnhancersId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    templates?:  {
      __typename: "ModelTemplateConnection",
      items:  Array< {
        __typename: "Template",
        id: string,
        name: string,
        content: string,
        enhancersIds: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        accountTemplatesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    trees?:  {
      __typename: "ModelTreeConnection",
      items:  Array< {
        __typename: "Tree",
        id: string,
        name: string,
        nodes: string,
        edges: string,
        createdAt: string,
        updatedAt: string,
        accountTreesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEnhancerMutationVariables = {
  input: CreateEnhancerInput,
  condition?: ModelEnhancerConditionInput | null,
};

export type CreateEnhancerMutation = {
  createEnhancer?:  {
    __typename: "Enhancer",
    id: string,
    name: string,
    snippets: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountEnhancersId: string,
  } | null,
};

export type UpdateEnhancerMutationVariables = {
  input: UpdateEnhancerInput,
  condition?: ModelEnhancerConditionInput | null,
};

export type UpdateEnhancerMutation = {
  updateEnhancer?:  {
    __typename: "Enhancer",
    id: string,
    name: string,
    snippets: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountEnhancersId: string,
  } | null,
};

export type DeleteEnhancerMutationVariables = {
  input: DeleteEnhancerInput,
  condition?: ModelEnhancerConditionInput | null,
};

export type DeleteEnhancerMutation = {
  deleteEnhancer?:  {
    __typename: "Enhancer",
    id: string,
    name: string,
    snippets: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountEnhancersId: string,
  } | null,
};

export type CreateTemplateMutationVariables = {
  input: CreateTemplateInput,
  condition?: ModelTemplateConditionInput | null,
};

export type CreateTemplateMutation = {
  createTemplate?:  {
    __typename: "Template",
    id: string,
    name: string,
    content: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    enhancersIds: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    accountTemplatesId: string,
  } | null,
};

export type UpdateTemplateMutationVariables = {
  input: UpdateTemplateInput,
  condition?: ModelTemplateConditionInput | null,
};

export type UpdateTemplateMutation = {
  updateTemplate?:  {
    __typename: "Template",
    id: string,
    name: string,
    content: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    enhancersIds: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    accountTemplatesId: string,
  } | null,
};

export type DeleteTemplateMutationVariables = {
  input: DeleteTemplateInput,
  condition?: ModelTemplateConditionInput | null,
};

export type DeleteTemplateMutation = {
  deleteTemplate?:  {
    __typename: "Template",
    id: string,
    name: string,
    content: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    enhancersIds: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    accountTemplatesId: string,
  } | null,
};

export type CreateTreeMutationVariables = {
  input: CreateTreeInput,
  condition?: ModelTreeConditionInput | null,
};

export type CreateTreeMutation = {
  createTree?:  {
    __typename: "Tree",
    id: string,
    name: string,
    nodes: string,
    edges: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountTreesId: string,
  } | null,
};

export type UpdateTreeMutationVariables = {
  input: UpdateTreeInput,
  condition?: ModelTreeConditionInput | null,
};

export type UpdateTreeMutation = {
  updateTree?:  {
    __typename: "Tree",
    id: string,
    name: string,
    nodes: string,
    edges: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountTreesId: string,
  } | null,
};

export type DeleteTreeMutationVariables = {
  input: DeleteTreeInput,
  condition?: ModelTreeConditionInput | null,
};

export type DeleteTreeMutation = {
  deleteTree?:  {
    __typename: "Tree",
    id: string,
    name: string,
    nodes: string,
    edges: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountTreesId: string,
  } | null,
};

export type GetAccountQueryVariables = {
  id: string,
};

export type GetAccountQuery = {
  getAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    lastName: string,
    email: string,
    enhancers?:  {
      __typename: "ModelEnhancerConnection",
      items:  Array< {
        __typename: "Enhancer",
        id: string,
        name: string,
        snippets: string,
        createdAt: string,
        updatedAt: string,
        accountEnhancersId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    templates?:  {
      __typename: "ModelTemplateConnection",
      items:  Array< {
        __typename: "Template",
        id: string,
        name: string,
        content: string,
        enhancersIds: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        accountTemplatesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    trees?:  {
      __typename: "ModelTreeConnection",
      items:  Array< {
        __typename: "Tree",
        id: string,
        name: string,
        nodes: string,
        edges: string,
        createdAt: string,
        updatedAt: string,
        accountTreesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAccountsQueryVariables = {
  filter?: ModelAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountsQuery = {
  listAccounts?:  {
    __typename: "ModelAccountConnection",
    items:  Array< {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEnhancerQueryVariables = {
  id: string,
};

export type GetEnhancerQuery = {
  getEnhancer?:  {
    __typename: "Enhancer",
    id: string,
    name: string,
    snippets: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountEnhancersId: string,
  } | null,
};

export type ListEnhancersQueryVariables = {
  filter?: ModelEnhancerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEnhancersQuery = {
  listEnhancers?:  {
    __typename: "ModelEnhancerConnection",
    items:  Array< {
      __typename: "Enhancer",
      id: string,
      name: string,
      snippets: string,
      account?:  {
        __typename: "Account",
        id: string,
        name: string,
        lastName: string,
        email: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      accountEnhancersId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTemplateQueryVariables = {
  id: string,
};

export type GetTemplateQuery = {
  getTemplate?:  {
    __typename: "Template",
    id: string,
    name: string,
    content: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    enhancersIds: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    accountTemplatesId: string,
  } | null,
};

export type ListTemplatesQueryVariables = {
  filter?: ModelTemplateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTemplatesQuery = {
  listTemplates?:  {
    __typename: "ModelTemplateConnection",
    items:  Array< {
      __typename: "Template",
      id: string,
      name: string,
      content: string,
      account?:  {
        __typename: "Account",
        id: string,
        name: string,
        lastName: string,
        email: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      enhancersIds: Array< string | null >,
      createdAt: string,
      updatedAt: string,
      accountTemplatesId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTreeQueryVariables = {
  id: string,
};

export type GetTreeQuery = {
  getTree?:  {
    __typename: "Tree",
    id: string,
    name: string,
    nodes: string,
    edges: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountTreesId: string,
  } | null,
};

export type ListTreesQueryVariables = {
  filter?: ModelTreeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTreesQuery = {
  listTrees?:  {
    __typename: "ModelTreeConnection",
    items:  Array< {
      __typename: "Tree",
      id: string,
      name: string,
      nodes: string,
      edges: string,
      account?:  {
        __typename: "Account",
        id: string,
        name: string,
        lastName: string,
        email: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      accountTreesId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAccountSubscription = {
  onCreateAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    lastName: string,
    email: string,
    enhancers?:  {
      __typename: "ModelEnhancerConnection",
      items:  Array< {
        __typename: "Enhancer",
        id: string,
        name: string,
        snippets: string,
        createdAt: string,
        updatedAt: string,
        accountEnhancersId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    templates?:  {
      __typename: "ModelTemplateConnection",
      items:  Array< {
        __typename: "Template",
        id: string,
        name: string,
        content: string,
        enhancersIds: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        accountTemplatesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    trees?:  {
      __typename: "ModelTreeConnection",
      items:  Array< {
        __typename: "Tree",
        id: string,
        name: string,
        nodes: string,
        edges: string,
        createdAt: string,
        updatedAt: string,
        accountTreesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAccountSubscription = {
  onUpdateAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    lastName: string,
    email: string,
    enhancers?:  {
      __typename: "ModelEnhancerConnection",
      items:  Array< {
        __typename: "Enhancer",
        id: string,
        name: string,
        snippets: string,
        createdAt: string,
        updatedAt: string,
        accountEnhancersId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    templates?:  {
      __typename: "ModelTemplateConnection",
      items:  Array< {
        __typename: "Template",
        id: string,
        name: string,
        content: string,
        enhancersIds: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        accountTemplatesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    trees?:  {
      __typename: "ModelTreeConnection",
      items:  Array< {
        __typename: "Tree",
        id: string,
        name: string,
        nodes: string,
        edges: string,
        createdAt: string,
        updatedAt: string,
        accountTreesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAccountSubscription = {
  onDeleteAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    lastName: string,
    email: string,
    enhancers?:  {
      __typename: "ModelEnhancerConnection",
      items:  Array< {
        __typename: "Enhancer",
        id: string,
        name: string,
        snippets: string,
        createdAt: string,
        updatedAt: string,
        accountEnhancersId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    templates?:  {
      __typename: "ModelTemplateConnection",
      items:  Array< {
        __typename: "Template",
        id: string,
        name: string,
        content: string,
        enhancersIds: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        accountTemplatesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    trees?:  {
      __typename: "ModelTreeConnection",
      items:  Array< {
        __typename: "Tree",
        id: string,
        name: string,
        nodes: string,
        edges: string,
        createdAt: string,
        updatedAt: string,
        accountTreesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEnhancerSubscription = {
  onCreateEnhancer?:  {
    __typename: "Enhancer",
    id: string,
    name: string,
    snippets: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountEnhancersId: string,
  } | null,
};

export type OnUpdateEnhancerSubscription = {
  onUpdateEnhancer?:  {
    __typename: "Enhancer",
    id: string,
    name: string,
    snippets: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountEnhancersId: string,
  } | null,
};

export type OnDeleteEnhancerSubscription = {
  onDeleteEnhancer?:  {
    __typename: "Enhancer",
    id: string,
    name: string,
    snippets: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountEnhancersId: string,
  } | null,
};

export type OnCreateTemplateSubscription = {
  onCreateTemplate?:  {
    __typename: "Template",
    id: string,
    name: string,
    content: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    enhancersIds: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    accountTemplatesId: string,
  } | null,
};

export type OnUpdateTemplateSubscription = {
  onUpdateTemplate?:  {
    __typename: "Template",
    id: string,
    name: string,
    content: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    enhancersIds: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    accountTemplatesId: string,
  } | null,
};

export type OnDeleteTemplateSubscription = {
  onDeleteTemplate?:  {
    __typename: "Template",
    id: string,
    name: string,
    content: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    enhancersIds: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    accountTemplatesId: string,
  } | null,
};

export type OnCreateTreeSubscription = {
  onCreateTree?:  {
    __typename: "Tree",
    id: string,
    name: string,
    nodes: string,
    edges: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountTreesId: string,
  } | null,
};

export type OnUpdateTreeSubscription = {
  onUpdateTree?:  {
    __typename: "Tree",
    id: string,
    name: string,
    nodes: string,
    edges: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountTreesId: string,
  } | null,
};

export type OnDeleteTreeSubscription = {
  onDeleteTree?:  {
    __typename: "Tree",
    id: string,
    name: string,
    nodes: string,
    edges: string,
    account?:  {
      __typename: "Account",
      id: string,
      name: string,
      lastName: string,
      email: string,
      enhancers?:  {
        __typename: "ModelEnhancerConnection",
        nextToken?: string | null,
      } | null,
      templates?:  {
        __typename: "ModelTemplateConnection",
        nextToken?: string | null,
      } | null,
      trees?:  {
        __typename: "ModelTreeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountTreesId: string,
  } | null,
};
