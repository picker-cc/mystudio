import { PickerMongoEntity } from '../../entity/base/mongo-base.entity';

/**
 * @description
 * 这种类型允许使用带点符号的字符串对实体关系进行类型安全访问。
 * 它可以达到2级深度。
 *
 * @example
 * ```TypeScript
 * type T1 = EntityRelationPaths<Product>;
 * ```
 * 在上面的例子中，类型' T1 '将是' Product '实体的所有关系的字符串并集:
 *
 *  * `'featuredAsset'`
 *  * `'variants'`
 *  * `'variants.options'`
 *  * `'variants.featuredAsset'`
 *  * etc.
 *
 * @docsCategory Common
 */
export type EntityRelationPaths<T extends PickerMongoEntity> =
    | PathsToStringProps1<T>
    | Join<PathsToStringProps2<T>, '.'>
    | TripleDotPath;

export type EntityRelationKeys<T extends PickerMongoEntity> = {
    [K in Extract<keyof T, string>]: T[K] extends PickerMongoEntity
        ? K
        : T[K] extends PickerMongoEntity[]
        ? K
        : never;
}[Extract<keyof T, string>];

export type EntityRelations<T extends PickerMongoEntity> = {
    [K in EntityRelationKeys<T>]: T[K];
};

export type PathsToStringProps1<T extends PickerMongoEntity> = T extends string
    ? []
    : {
          [K in EntityRelationKeys<T>]: K;
      }[Extract<EntityRelationKeys<T>, string>];

export type PathsToStringProps2<T extends PickerMongoEntity> = T extends string
    ? never
    : {
          [K in EntityRelationKeys<T>]: T[K] extends PickerMongoEntity[]
              ? [K, PathsToStringProps1<T[K][number]>]
              : [K, PathsToStringProps1<T[K]>];
      }[Extract<EntityRelationKeys<T>, string>];

export type TripleDotPath = `${string}.${string}.${string}`;

// Based on https://stackoverflow.com/a/47058976/772859
export type Join<T extends Array<string | any>, D extends string> = T extends []
    ? never
    : T extends [infer F]
    ? F
    : // tslint:disable-next-line:no-shadowed-variable
    T extends [infer F, ...infer R]
    ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
    : string;
