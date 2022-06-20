import gql from 'graphql-tag';

export const CONFIGURABLE_OPERATION_FRAGMENT = gql`
  fragment ConfigurableOperation on ConfigurableOperation {
    __typename
    args {
      name
      value
    }
    code
  }
`;

export const CONFIGURABLE_OPERATION_DEF_FRAGMENT = gql`
  fragment ConfigurableOperationDef on ConfigurableOperationDefinition {
    args {
      name
      type
      required
      defaultValue
      list
      ui
      label
    }
    code
    description
  }
`;

export const ERROR_RESULT_FRAGMENT = gql`
  fragment ErrorResult on ErrorResult {
    errorCode
    message
  }
`;

export const SUCCESS_RESULT_FRAGMENT = gql`
  fragment Success on Success {
    success
  }
`;
