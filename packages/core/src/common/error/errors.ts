import {I18nError} from "../../i18n";
import {LogLevel} from "../../config";
import {coreEntitiesMap} from "../../entity/entities";
import {ID} from "@picker-cc/common/lib/shared-types";

/**
 * @description
 * 当遇到意外和异常情况时，应该抛出此错误。
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class InternalServerError extends I18nError {
  constructor(message: string, variables: { [key: string]: string | number } = {}) {
    super(message, variables, 'INTERNAL_SERVER_ERROR', LogLevel.Error);
  }
}

/**
 * @description
 * 当用户输入不符合预期时，应该抛出此错误。
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class UserInputError extends I18nError {
  constructor(message: string, variables: { [key: string]: string | number } = {}) {
    super(message, variables, 'USER_INPUT_ERROR', LogLevel.Warn);
  }
}

/**
 * @description
 * 当尝试不允许的操作时，应该抛出此错误。
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class IllegalOperationError extends I18nError {
  constructor(message: string, variables: { [key: string]: string | number } = {}) {
    super(message, variables, 'ILLEGAL_OPERATION', LogLevel.Warn);
  }
}

/**
 * @description
 * 当用户的身份验证凭证不匹配时，应该抛出此错误。
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class UnauthorizedError extends I18nError {
  constructor() {
    super('error.unauthorized', {}, 'UNAUTHORIZED', LogLevel.Info);
  }
}

/**
 * @description
 * 当用户试图访问超出其权限范围的资源时，应该抛出此错误。
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class ForbiddenError extends I18nError {
    constructor(logLevel: LogLevel = LogLevel.Error) {
        super('error.forbidden', {}, 'FORBIDDEN', logLevel);
    }
}

/**
 * @description
 * 当一个实体在数据库中找不到时，即给定的entityName (Product, User等)的实体不存在，该错误应该被抛出。
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class EntityNotFoundError extends I18nError {
  constructor(entityName: keyof typeof coreEntitiesMap, id: ID) {
    super('error.entity-with-id-not-found', { entityName, id }, 'ENTITY_NOT_FOUND', LogLevel.Warn);
  }
}
