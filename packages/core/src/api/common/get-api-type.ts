import { GraphQLResolveInfo } from 'graphql';

/**
 * @description
 * 当前请求是通过哪个GraphQL api发出的。
 *
 * @docsCategory request
 */
export type ApiType = 'admin' | 'studio' | 'custom';

/**
 * 检查GraphQL "info" 解析器参数，以确定请求通过了哪个API。
 */
export function getApiType(info?: GraphQLResolveInfo): ApiType {
  const query = info && info.schema.getQueryType();
  if (query) {
    return !!query.getFields().administrators ? 'admin' : 'studio';

  }
  return 'custom';
}
