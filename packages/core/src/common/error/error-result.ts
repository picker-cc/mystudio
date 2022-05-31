import {PickerMongoEntity} from "../../entity/base/mongo-base.entity";

export type GraphQLErrorResult = {
    errorCode: string;
    message: string;
}
/**
 * @description
 * *接受一个ErrorResult联合类型(即由一些 query/mutation 结果加上一个或多个ErrorResult类型组成的生成的联合类型)并返回一个由 _just_ ErrorResult类型组成的联合类型。
 * @example
 * ```typescript
 * type UpdateOrderItemsResult = Order | OrderModificationError | OrderLimitError | NegativeQuantityError;
 *
 * type T1 = JustErrorResults<UpdateOrderItemsResult>;
 * // T1 = OrderModificationError | OrderLimitError | NegativeQuantityError
 * ```
 */
export type JustErrorResults<T extends GraphQLErrorResult | U, U = any> = Exclude<
  T,
  T extends GraphQLErrorResult ? never : T
  >;

/**
 * @description
 * 用于构造一个TypeScript返回类型，在GraphQL模式中，
 * 返回一个由成功结果(例如Order)加上一个或多个ErrorResult类型组成的联合类型。
 *
 * 由于TypeScript实体与GraphQL类型的对应对象并不是一对一的，所以我们使用这个类型来替代它们。
 *
 * @example
 * ```typescript
 * type UpdateOrderItemsResult = Order | OrderModificationError | OrderLimitError | NegativeQuantityError;
 * type T1 = ErrorResultUnion<UpdateOrderItemsResult, PickerEntityOrder>;
 * // T1 = PickerEntityOrder | OrderModificationError | OrderLimitError | NegativeQuantityError;
 */
export type ErrorResultUnion<T extends GraphQLErrorResult | U, E extends PickerMongoEntity, U = any> =
  | JustErrorResults<T>
  | E;

/**
 * @description
 * 如果ErrorResultUnion实际上是ErrorResult类型，则返回true。
 */
export function isGraphQlErrorResult<T extends GraphQLErrorResult | U, U = any>(
  input: T,
): input is JustErrorResults<T>;
export function isGraphQlErrorResult<T, E extends PickerMongoEntity>(
  input: ErrorResultUnion<T, E>,
): input is JustErrorResults<ErrorResultUnion<T, E>> {
  return (
    input &&
    !!(
      ((input as unknown) as GraphQLErrorResult).errorCode &&
      ((input as unknown) as GraphQLErrorResult).message != null
    ) &&
    (input as any).__typename
  );
}

