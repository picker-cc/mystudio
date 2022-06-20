import gql from 'graphql-tag';

import {ERROR_RESULT_FRAGMENT, SUCCESS_RESULT_FRAGMENT} from './shared-definitions';

export const CURRENT_USER_FRAGMENT = gql`
  fragment CurrentUser on CurrentUser {
    id
    token
    permissions
  }
`;

export const ATTEMPT_LOGIN = gql`
  mutation AttemptLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...CurrentUser
      ...ErrorResult
    }
  }
  ${CURRENT_USER_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const UPDATE_ADMINISTRATOR_PASSWORD = gql`
  mutation UpdatAdministratorPassword($currentPassword: String!, $newPassword: String!) {
    updateAdministratorPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      ...ErrorResult
      ...Success
    }
  }
  ${SUCCESS_RESULT_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const LOG_OUT = gql`
  mutation LogOut {
    logout {
      success
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      ...CurrentUser
    }
  }
  ${CURRENT_USER_FRAGMENT}
`;
