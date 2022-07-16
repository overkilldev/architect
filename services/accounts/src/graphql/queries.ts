/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      name
      lastName
      email
      enhancers {
        items {
          id
          name
          snippets
          createdAt
          updatedAt
          accountEnhancersId
        }
        nextToken
      }
      templates {
        items {
          id
          name
          content
          enhancersIds
          createdAt
          updatedAt
          accountTemplatesId
        }
        nextToken
      }
      trees {
        items {
          id
          name
          nodes
          edges
          createdAt
          updatedAt
          accountTreesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        lastName
        email
        enhancers {
          nextToken
        }
        templates {
          nextToken
        }
        trees {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEnhancer = /* GraphQL */ `
  query GetEnhancer($id: ID!) {
    getEnhancer(id: $id) {
      id
      name
      snippets
      account {
        id
        name
        lastName
        email
        enhancers {
          nextToken
        }
        templates {
          nextToken
        }
        trees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      accountEnhancersId
    }
  }
`;
export const listEnhancers = /* GraphQL */ `
  query ListEnhancers(
    $filter: ModelEnhancerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnhancers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        snippets
        account {
          id
          name
          lastName
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        accountEnhancersId
      }
      nextToken
    }
  }
`;
export const getTemplate = /* GraphQL */ `
  query GetTemplate($id: ID!) {
    getTemplate(id: $id) {
      id
      name
      content
      account {
        id
        name
        lastName
        email
        enhancers {
          nextToken
        }
        templates {
          nextToken
        }
        trees {
          nextToken
        }
        createdAt
        updatedAt
      }
      enhancersIds
      createdAt
      updatedAt
      accountTemplatesId
    }
  }
`;
export const listTemplates = /* GraphQL */ `
  query ListTemplates(
    $filter: ModelTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        content
        account {
          id
          name
          lastName
          email
          createdAt
          updatedAt
        }
        enhancersIds
        createdAt
        updatedAt
        accountTemplatesId
      }
      nextToken
    }
  }
`;
export const getTree = /* GraphQL */ `
  query GetTree($id: ID!) {
    getTree(id: $id) {
      id
      name
      nodes
      edges
      account {
        id
        name
        lastName
        email
        enhancers {
          nextToken
        }
        templates {
          nextToken
        }
        trees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      accountTreesId
    }
  }
`;
export const listTrees = /* GraphQL */ `
  query ListTrees(
    $filter: ModelTreeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        nodes
        edges
        account {
          id
          name
          lastName
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        accountTreesId
      }
      nextToken
    }
  }
`;
