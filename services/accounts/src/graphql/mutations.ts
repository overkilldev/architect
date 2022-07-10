/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
export const createEnhancer = /* GraphQL */ `
  mutation CreateEnhancer(
    $input: CreateEnhancerInput!
    $condition: ModelEnhancerConditionInput
  ) {
    createEnhancer(input: $input, condition: $condition) {
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
export const updateEnhancer = /* GraphQL */ `
  mutation UpdateEnhancer(
    $input: UpdateEnhancerInput!
    $condition: ModelEnhancerConditionInput
  ) {
    updateEnhancer(input: $input, condition: $condition) {
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
export const deleteEnhancer = /* GraphQL */ `
  mutation DeleteEnhancer(
    $input: DeleteEnhancerInput!
    $condition: ModelEnhancerConditionInput
  ) {
    deleteEnhancer(input: $input, condition: $condition) {
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
export const createTemplate = /* GraphQL */ `
  mutation CreateTemplate(
    $input: CreateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    createTemplate(input: $input, condition: $condition) {
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
export const updateTemplate = /* GraphQL */ `
  mutation UpdateTemplate(
    $input: UpdateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    updateTemplate(input: $input, condition: $condition) {
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
export const deleteTemplate = /* GraphQL */ `
  mutation DeleteTemplate(
    $input: DeleteTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    deleteTemplate(input: $input, condition: $condition) {
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
export const createEnhancedTemplate = /* GraphQL */ `
  mutation CreateEnhancedTemplate(
    $input: CreateEnhancedTemplateInput!
    $condition: ModelEnhancedTemplateConditionInput
  ) {
    createEnhancedTemplate(input: $input, condition: $condition) {
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
export const updateEnhancedTemplate = /* GraphQL */ `
  mutation UpdateEnhancedTemplate(
    $input: UpdateEnhancedTemplateInput!
    $condition: ModelEnhancedTemplateConditionInput
  ) {
    updateEnhancedTemplate(input: $input, condition: $condition) {
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
export const deleteEnhancedTemplate = /* GraphQL */ `
  mutation DeleteEnhancedTemplate(
    $input: DeleteEnhancedTemplateInput!
    $condition: ModelEnhancedTemplateConditionInput
  ) {
    deleteEnhancedTemplate(input: $input, condition: $condition) {
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
export const createTree = /* GraphQL */ `
  mutation CreateTree(
    $input: CreateTreeInput!
    $condition: ModelTreeConditionInput
  ) {
    createTree(input: $input, condition: $condition) {
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
export const updateTree = /* GraphQL */ `
  mutation UpdateTree(
    $input: UpdateTreeInput!
    $condition: ModelTreeConditionInput
  ) {
    updateTree(input: $input, condition: $condition) {
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
export const deleteTree = /* GraphQL */ `
  mutation DeleteTree(
    $input: DeleteTreeInput!
    $condition: ModelTreeConditionInput
  ) {
    deleteTree(input: $input, condition: $condition) {
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
