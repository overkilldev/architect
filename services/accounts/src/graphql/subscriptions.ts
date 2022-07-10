/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
          createdAt
          updatedAt
          accountTemplatesId
        }
        nextToken
      }
      enhancedTemplates {
        items {
          id
          name
          content
          enhancersIds
          templateId
          createdAt
          updatedAt
          accountEnhancedTemplatesId
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
          createdAt
          updatedAt
          accountTemplatesId
        }
        nextToken
      }
      enhancedTemplates {
        items {
          id
          name
          content
          enhancersIds
          templateId
          createdAt
          updatedAt
          accountEnhancedTemplatesId
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
          createdAt
          updatedAt
          accountTemplatesId
        }
        nextToken
      }
      enhancedTemplates {
        items {
          id
          name
          content
          enhancersIds
          templateId
          createdAt
          updatedAt
          accountEnhancedTemplatesId
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
export const onCreateEnhancer = /* GraphQL */ `
  subscription OnCreateEnhancer {
    onCreateEnhancer {
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
        enhancedTemplates {
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
export const onUpdateEnhancer = /* GraphQL */ `
  subscription OnUpdateEnhancer {
    onUpdateEnhancer {
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
        enhancedTemplates {
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
export const onDeleteEnhancer = /* GraphQL */ `
  subscription OnDeleteEnhancer {
    onDeleteEnhancer {
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
        enhancedTemplates {
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
export const onCreateTemplate = /* GraphQL */ `
  subscription OnCreateTemplate {
    onCreateTemplate {
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
        enhancedTemplates {
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
      accountTemplatesId
    }
  }
`;
export const onUpdateTemplate = /* GraphQL */ `
  subscription OnUpdateTemplate {
    onUpdateTemplate {
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
        enhancedTemplates {
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
      accountTemplatesId
    }
  }
`;
export const onDeleteTemplate = /* GraphQL */ `
  subscription OnDeleteTemplate {
    onDeleteTemplate {
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
        enhancedTemplates {
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
      accountTemplatesId
    }
  }
`;
export const onCreateEnhancedTemplate = /* GraphQL */ `
  subscription OnCreateEnhancedTemplate {
    onCreateEnhancedTemplate {
      id
      name
      content
      enhancersIds
      templateId
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
        enhancedTemplates {
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
      accountEnhancedTemplatesId
    }
  }
`;
export const onUpdateEnhancedTemplate = /* GraphQL */ `
  subscription OnUpdateEnhancedTemplate {
    onUpdateEnhancedTemplate {
      id
      name
      content
      enhancersIds
      templateId
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
        enhancedTemplates {
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
      accountEnhancedTemplatesId
    }
  }
`;
export const onDeleteEnhancedTemplate = /* GraphQL */ `
  subscription OnDeleteEnhancedTemplate {
    onDeleteEnhancedTemplate {
      id
      name
      content
      enhancersIds
      templateId
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
        enhancedTemplates {
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
      accountEnhancedTemplatesId
    }
  }
`;
export const onCreateTree = /* GraphQL */ `
  subscription OnCreateTree {
    onCreateTree {
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
        enhancedTemplates {
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
export const onUpdateTree = /* GraphQL */ `
  subscription OnUpdateTree {
    onUpdateTree {
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
        enhancedTemplates {
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
export const onDeleteTree = /* GraphQL */ `
  subscription OnDeleteTree {
    onDeleteTree {
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
        enhancedTemplates {
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
