// tslint:disable
/** This file was generated by the graphql-errors-plugin, which is part of the "codegen" npm script. */

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export class ErrorResult {
  readonly __typename: string;
  readonly errorCode: string;
message: Scalars['String'];
}

export class AlreadyLoggedInError extends ErrorResult {
  readonly __typename = 'AlreadyLoggedInError';
  readonly errorCode = 'ALREADY_LOGGED_IN_ERROR' as any;
  readonly message = 'ALREADY_LOGGED_IN_ERROR';
  constructor(
  ) {
    super();
  }
}

export class EmailAddressConflictError extends ErrorResult {
  readonly __typename = 'EmailAddressConflictError';
  readonly errorCode = 'EMAIL_ADDRESS_CONFLICT_ERROR' as any;
  readonly message = 'EMAIL_ADDRESS_CONFLICT_ERROR';
  constructor(
  ) {
    super();
  }
}

export class IdentifierChangeTokenExpiredError extends ErrorResult {
  readonly __typename = 'IdentifierChangeTokenExpiredError';
  readonly errorCode = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR' as any;
  readonly message = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class IdentifierChangeTokenInvalidError extends ErrorResult {
  readonly __typename = 'IdentifierChangeTokenInvalidError';
  readonly errorCode = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR' as any;
  readonly message = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR';
  constructor(
  ) {
    super();
  }
}

export class InvalidCredentialsError extends ErrorResult {
  readonly __typename = 'InvalidCredentialsError';
  readonly errorCode = 'INVALID_CREDENTIALS_ERROR' as any;
  readonly message = 'INVALID_CREDENTIALS_ERROR';
  constructor(
    public authenticationError: Scalars['String'],
  ) {
    super();
  }
}

export class MimeTypeError extends ErrorResult {
  readonly __typename = 'MimeTypeError';
  readonly errorCode = 'MIME_TYPE_ERROR' as any;
  readonly message = 'MIME_TYPE_ERROR';
  constructor(
    public fileName: Scalars['String'],
    public mimeType: Scalars['String'],
  ) {
    super();
  }
}

export class MissingPasswordError extends ErrorResult {
  readonly __typename = 'MissingPasswordError';
  readonly errorCode = 'MISSING_PASSWORD_ERROR' as any;
  readonly message = 'MISSING_PASSWORD_ERROR';
  constructor(
  ) {
    super();
  }
}

export class NameConflictError extends ErrorResult {
  readonly __typename = 'NameConflictError';
  readonly errorCode = 'NAME_CONFLICT_ERROR' as any;
  readonly message = 'NAME_CONFLICT_ERROR';
  constructor(
  ) {
    super();
  }
}

export class NativeAuthStrategyError extends ErrorResult {
  readonly __typename = 'NativeAuthStrategyError';
  readonly errorCode = 'NATIVE_AUTH_STRATEGY_ERROR' as any;
  readonly message = 'NATIVE_AUTH_STRATEGY_ERROR';
  constructor(
  ) {
    super();
  }
}

export class NotVerifiedError extends ErrorResult {
  readonly __typename = 'NotVerifiedError';
  readonly errorCode = 'NOT_VERIFIED_ERROR' as any;
  readonly message = 'NOT_VERIFIED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordAlreadySetError extends ErrorResult {
  readonly __typename = 'PasswordAlreadySetError';
  readonly errorCode = 'PASSWORD_ALREADY_SET_ERROR' as any;
  readonly message = 'PASSWORD_ALREADY_SET_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordResetTokenExpiredError extends ErrorResult {
  readonly __typename = 'PasswordResetTokenExpiredError';
  readonly errorCode = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR' as any;
  readonly message = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordResetTokenInvalidError extends ErrorResult {
  readonly __typename = 'PasswordResetTokenInvalidError';
  readonly errorCode = 'PASSWORD_RESET_TOKEN_INVALID_ERROR' as any;
  readonly message = 'PASSWORD_RESET_TOKEN_INVALID_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordValidationError extends ErrorResult {
  readonly __typename = 'PasswordValidationError';
  readonly errorCode = 'PASSWORD_VALIDATION_ERROR' as any;
  readonly message = 'PASSWORD_VALIDATION_ERROR';
  constructor(
    public validationErrorMessage: Scalars['String'],
  ) {
    super();
  }
}

export class PhoneConflictError extends ErrorResult {
  readonly __typename = 'PhoneConflictError';
  readonly errorCode = 'PHONE_CONFLICT_ERROR' as any;
  readonly message = 'PHONE_CONFLICT_ERROR';
  constructor(
  ) {
    super();
  }
}

export class SlugConflictError extends ErrorResult {
  readonly __typename = 'SlugConflictError';
  readonly errorCode = 'SLUG_CONFLICT_ERROR' as any;
  readonly message = 'SLUG_CONFLICT_ERROR';
  constructor(
  ) {
    super();
  }
}

export class VerificationTokenExpiredError extends ErrorResult {
  readonly __typename = 'VerificationTokenExpiredError';
  readonly errorCode = 'VERIFICATION_TOKEN_EXPIRED_ERROR' as any;
  readonly message = 'VERIFICATION_TOKEN_EXPIRED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class VerificationTokenInvalidError extends ErrorResult {
  readonly __typename = 'VerificationTokenInvalidError';
  readonly errorCode = 'VERIFICATION_TOKEN_INVALID_ERROR' as any;
  readonly message = 'VERIFICATION_TOKEN_INVALID_ERROR';
  constructor(
  ) {
    super();
  }
}


const errorTypeNames = new Set(['AlreadyLoggedInError', 'EmailAddressConflictError', 'IdentifierChangeTokenExpiredError', 'IdentifierChangeTokenInvalidError', 'InvalidCredentialsError', 'MimeTypeError', 'MissingPasswordError', 'NameConflictError', 'NativeAuthStrategyError', 'NotVerifiedError', 'PasswordAlreadySetError', 'PasswordResetTokenExpiredError', 'PasswordResetTokenInvalidError', 'PasswordValidationError', 'PhoneConflictError', 'SlugConflictError', 'VerificationTokenExpiredError', 'VerificationTokenInvalidError']);
function isGraphQLError(input: any): input is import('@picker-cc/common/lib/generated-types').ErrorResult {
  return input instanceof ErrorResult || errorTypeNames.has(input.__typename);
}

export const adminErrorOperationTypeResolvers = {
  AuthenticationResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'CurrentUser';
    },
  },
  CreateAssetResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Asset';
    },
  },
  CreatePostResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Post';
    },
  },
  CreateTermResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Term';
    },
  },
  NativeAuthenticationResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'CurrentUser';
    },
  },
  UpdateAdministratorPasswordResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Success';
    },
  },
  UpdatePostResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Post';
    },
  },
  UpdateTermResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Term';
    },
  },
};