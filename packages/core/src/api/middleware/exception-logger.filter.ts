import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

import { Logger, LogLevel } from '../../config';
import { I18nError } from '../../i18n/i18n-error';
import { parseContext } from '../common/parse-context';

/**
 * 日志通过配置的 PickerLogger 抛出 i18errors
 */
export class ExceptionLoggerFilter implements ExceptionFilter {
    catch(exception: Error | HttpException | I18nError, host: ArgumentsHost) {
        const { req, res, info, isGraphQL } = parseContext(host);
        let message = '';
        let statusCode = 500;
        if (exception instanceof I18nError) {
            const { code, message: msg, logLevel } = exception;
            message = `${code || 'Error'}: ${msg}`;
            statusCode = this.errorCodeToStatusCode(code);

            switch (logLevel) {
                case LogLevel.Error:
                    Logger.error(
                        JSON.stringify({ message, variables: exception.variables }, null, 2),
                        undefined,
                        exception.stack,
                    );
                    break;
                case LogLevel.Warn:
                    Logger.warn(message);
                    break;
                case LogLevel.Info:
                    Logger.info(message);
                    break;
                case LogLevel.Debug:
                    Logger.debug(message);
                    break;
                case LogLevel.Verbose:
                    Logger.verbose(message);
                    break;
            }
            if (exception.stack) {
                Logger.debug(exception.stack);
            }
            if (isGraphQL) {
                return exception;
            }
        } else if (exception instanceof HttpException) {
            // 处理其他 Nestjs 错误
            statusCode = exception.getStatus();
            message = exception.message;
            if (statusCode === 404) {
                Logger.verbose(exception.message);
            } else {
                Logger.error(message, undefined, exception.stack);
            }
        } else {
            Logger.error(exception.message, undefined, exception.stack);
        }

/*        if (exception instanceof HttpException && req.path.startsWith('/' + HEALTH_CHECK_ROUTE)) {
            // Special case for the health check error, since we want to display the response only
            // so it matches the format of the success case.
            res.status(exception.getStatus()).send(exception.getResponse());
        } else if (!isGraphQL) {
            // In the GraphQL context, we can let the error pass
            // through to the next layer, where Apollo Server will
            // return a response for us. But when in the REST context,
            // we must explicitly send the response, otherwise the server
            // will hang.
            res.status(statusCode).json({
                statusCode,
                message,
                timestamp: new Date().toISOString(),
                path: req.url,
            });
        }*/
        // 在GraphQL上下文中，我们可以让错误传递到下一层，
        // 在那里Apollo Server将为我们返回一个响应。
        // 但是在REST上下文中，我们必须显式地发送响应，否则服务器将挂起。
        if (!isGraphQL) {
            res.status(statusCode).json({
                statusCode,
                message,
                timestamp: new Date().toISOString(),
                path: req.url,
            })
        }
    }

    /**
     * 对于给定的 I18nError.code，返回相应的 HTTP 状态代码
     */
    private errorCodeToStatusCode(errorCode: string | undefined): number {
        switch (errorCode) {
            case 'FORBIDDEN':
                return 403;
            case 'UNAUTHORIZED':
                return 401;
            case 'USER_INPUT_ERROR':
            case 'ILLEGAL_OPERATION':
                return 400;
            default:
                return 500;
        }
    }
}
