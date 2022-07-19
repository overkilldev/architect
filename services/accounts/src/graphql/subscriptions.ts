/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($owner: String) {
    onCreateAccount(owner: $owner) {
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
          owner
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
          owner
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
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($owner: String) {
    onUpdateAccount(owner: $owner) {
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
          owner
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
          owner
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
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($owner: String) {
    onDeleteAccount(owner: $owner) {
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
          owner
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
          owner
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
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateEnhancer = /* GraphQL */ `
  subscription OnCreateEnhancer($owner: String) {
    onCreateEnhancer(owner: $owner) {
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
        owner
      }
      createdAt
      updatedAt
      accountEnhancersId
      owner
    }
  }
`;
export const onUpdateEnhancer = /* GraphQL */ `
  subscription OnUpdateEnhancer($owner: String) {
    onUpdateEnhancer(owner: $owner) {
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
        owner
      }
      createdAt
      updatedAt
      accountEnhancersId
      owner
    }
  }
`;
export const onDeleteEnhancer = /* GraphQL */ `
  subscription OnDeleteEnhancer($owner: String) {
    onDeleteEnhancer(owner: $owner) {
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
        owner
      }
      createdAt
      updatedAt
      accountEnhancersId
      owner
    }
  }
`;
export const onCreateTemplate = /* GraphQL */ `
  subscription OnCreateTemplate($owner: String) {
    onCreateTemplate(owner: $owner) {
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
        owner
      }
      enhancersIds
      createdAt
      updatedAt
      accountTemplatesId
      owner
    }
  }
`;
export const onUpdateTemplate = /* GraphQL */ `
  subscription OnUpdateTemplate($owner: String) {
    onUpdateTemplate(owner: $owner) {
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
        owner
      }
      enhancersIds
      createdAt
      updatedAt
      accountTemplatesId
      owner
    }
  }
`;
export const onDeleteTemplate = /* GraphQL */ `
  subscription OnDeleteTemplate($owner: String) {
    onDeleteTemplate(owner: $owner) {
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
        owner
      }
      enhancersIds
      createdAt
      updatedAt
      accountTemplatesId
      owner
    }
  }
`;
export const onCreateTree = /* GraphQL */ `
  subscription OnCreateTree($owner: String) {
    onCreateTree(owner: $owner) {
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
        owner
      }
      createdAt
      updatedAt
      accountTreesId
      owner
    }
  }
`;
export const onUpdateTree = /* GraphQL */ `
  subscription OnUpdateTree($owner: String) {
    onUpdateTree(owner: $owner) {
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
        owner
      }
      createdAt
      updatedAt
      accountTreesId
      owner
    }
  }
`;
export const onDeleteTree = /* GraphQL */ `
  subscription OnDeleteTree($owner: String) {
    onDeleteTree(owner: $owner) {
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
        owner
      }
      createdAt
      updatedAt
      accountTreesId
      owner
    }
  }
`;
