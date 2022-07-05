import {
    BooleanOperators,
    DateOperators,
    LogicalOperator,
    NumberOperators,
    StringOperators,
} from '@picker-cc/common/lib/generated-types';
import {Type} from '@picker-cc/common/lib/shared-types';
import {FilterQuery, FindOptions} from '@mikro-orm/core';
import {EntityManager} from '@mikro-orm/mongodb';
import {Injectable} from '@nestjs/common';
import {addDays, format} from 'date-fns';
import * as _ from 'lodash';

import {FilterParameter, ListQueryOptions, NullOptionals, UserInputError} from '../../../common';
import {PickerMongoEntity} from '../../../entity/base/mongo-base.entity';
import {RequestContext} from "../../../api/common/request-context";
import {ConfigService} from "../../../config";
import {ApiType} from "../../../api/common/get-api-type";

type AllOperators = StringOperators & BooleanOperators & NumberOperators & DateOperators;
type Operator = { [K in keyof AllOperators]-?: K }[keyof AllOperators];

/**
 * @description
 * 可以传递给ListQueryBuilder的 `build()` 方法的选项。
 *
 * @docsCategory data-access
 * @docsPage ListQueryBuilder
 */
export type ExtendedListQueryOptions<T extends PickerMongoEntity> = FindOptions<T> & {
    // populate: string[] | boolean,
    // findOptions?: FindOptions<T>,
    // populate?: string[] | boolean;
    // where?: FindOptions<T>;
    // orderBy?: FindOneOptions<T>;
    /**
     * @description
     * 当传递RequestContext时，查询将作为任何外部事务的一部分执行。
     */
    ctx?: RequestContext
    /**
     * @description
     * ListQueryBuilder的主要任务之一是基于给定实体的可用列自动生成筛选和排序查询。然而，有时也需要允许对关系的属性进行筛选/排序。
     * 在这种情况下，可以使用‘customPropertyMap’来定义‘选项’的属性。排序”或“选项。
     * 过滤器'，它不对应于当前实体的直接列，然后提供一个到要排序/过滤的相关属性的映射。
     *
     * 示例:我们希望允许排序/过滤和订单的`customerLastName`。
     * 实际的lastName属性不是Order表中的一列，它存在于Customer实体中，并且Order通过 `Order.Customer` 与Customer关联。
     * 因此，我们可以像这样定义customPropertyMap:
     *
     * ```ts
     * const qb = this.listQueryBuilder.build(Order, options, {
     *   relations: ['customer'],
     *   customPropertyMap: {
     *       customerLastName: 'customer.lastName',
     *   },
     * };
     * ```
     */
    customPropertyMap?: { [name: string]: string }
};

/**
 * @description
 * 这个helper类用于从返回{@link PaginatedList}类型的查询中获取数据库实体。
 * 这些查询都遵循相同的格式:
 ＊
 * 在GraphQL定义中，它们返回一个实现 `Node` 接口的类型，查询返回一个实现 `PaginatedList` 接口的类型:
 *
 * ```GraphQL
 * type BlogPost implements Node {
 *   id: ID!
 *   published: DataTime!
 *   title: String!
 *   body: String!
 * }
 *
 * type BlogPostList implements PaginatedList {
 *   items: [BlogPost!]!
 *   totalItems: Int!
 * }
 *
 * # 由 Picker 在运行时生成
 * input ProductListOptions
 *
 * extend type Query {
 *    blogPosts(options: BlogPostListOptions): BlogPostList!
 * }
 * ```
 * 当Picker bootstraps，它会找到`ProductListOptions`输入，因为它是使用在查询返回`PaginatedList` 类型，它知道它应该动态地生成这个输入。
 * 这意味着 `BlogPost` 类型的所有原始字段(即`published`、`title`和`body`)将为它们创建 `filter` 和 `sort` 输入，以及用于分页的 `skip` 和 `take`字段。
 *
 * 你的解析器函数看起来像这样：
 *
 * ```TypeScript
 * \@Resolver()
 * export class BlogPostResolver
 *   constructor(private blogPostService: BlogPostService) {}
 *
 *   \@Query()
 *   async blogPosts(
 *     \@Ctx() ctx: RequestContext,
 *     \@Args() args: any,
 *   ): Promise<PaginatedList<BlogPost>> {
 *     return this.blogPostService.findAll(ctx, args.options || undefined);
 *   }
 * }
 * ```
 *
 * 和相应的服务将使用 ListQueryBuilder:
 *
 * ```TypeScript
 * \@Injectable()
 * export class BlogPostService {
 *   constructor(private listQueryBuilder: ListQueryBuilder) {}
 *
 *   findAll(ctx: RequestContext, options?: ListQueryOptions<BlogPost>) {
 *     return this.listQueryBuilder
 *       .build(BlogPost, options)
 *       .getManyAndCount()
 *       .then(async ([items, totalItems]) => {
 *         return { items, totalItems };
 *       });
 *   }
 * }
 * ```
 *
 * @docsCategory data-access
 * @docsPage ListQueryBuilder
 * @docsWeight 0
 */
@Injectable()
export class ListQueryBuilder {
    constructor(private connection: EntityManager, private configService: ConfigService) {
    }

    /**
     * 创建并配置一个 SelectQueryBuilder，用于返回实体的分页列表。
     */
    build<T extends PickerMongoEntity>(
        entity: Type<T>,
        options: ListQueryOptions<T> = {},
        extendedOptions: ExtendedListQueryOptions<T> = {},
        embeddeds?: any[any],
    ) {
        const apiType = extendedOptions.ctx?.apiType ?? 'product';

        const {take, skip} = this.parseTakeSkipParams(apiType, options);
        extendedOptions.limit = take
        extendedOptions.offset = skip

        const filter = parseFilterParams(this.connection, entity.name, options.filter, embeddeds);
        // const where = parseFilterParams(this.connection, entity.name, options.filter, embeddeds);
        let where = {}
        if (filter.length) {
            const filterOperator = options.filterOperator ?? LogicalOperator.AND;
            if (filterOperator === LogicalOperator.AND) {
                // filter.forEach(() => {})
                where = {
                    $and: filter
                }
            } else {
                where = {
                    $or: filter
                }
            }
        }
        return this.connection.findAndCount(
            entity,
            where,
            {
                ...extendedOptions
            }
        );
    }

    private parseTakeSkipParams(
        apiType: ApiType,
        options: ListQueryOptions<any>,
    ): { take: number; skip: number } {
        const {studioListQueryLimit, adminListQueryLimit} = this.configService.apiOptions;
        const takeLimit = apiType === 'admin' ? adminListQueryLimit : studioListQueryLimit;
        if (options.take && options.take > takeLimit) {
            throw new UserInputError('error.list-query-limit-exceeded', {limit: takeLimit});
        }
        const skip = Math.max(options.skip ?? 0, 0);
        // `take` must not be negative, and must not be greater than takeLimit
        // `take` 不能为负数，也不能大于 takeLimit
        let take = Math.min(Math.max(options.take ?? 0, 0), takeLimit) || takeLimit;
        if (options.skip !== undefined && options.take === undefined) {
            take = takeLimit;
        }
        return {take, skip};
    }

}

export function parseFilterParams<T extends PickerMongoEntity>(
    em: EntityManager,
    entity: string,
    filterParams?: NullOptionals<FilterParameter<T>> | null,
    embedded?: [ any ],
): Array<FilterQuery<T>> {
    if (!filterParams) {
        return [];
    }
    const output = [];
    // const entityProperty: EntityProperty[] = em.getMetadata().get(entity).props;
    // const filter = parseFilterParams(this.connection, entity, options.filter);
    for (let [ key, operation ] of Object.entries(filterParams)) {
        if (embedded) {
            const findEmbedded = _.findLast(embedded, key);
            if (findEmbedded) {
                key = findEmbedded[key];
            }
        }
        if (operation) {
            for (const [ operator, operand ] of Object.entries(operation as object)) {
                const condition = buildWhereCondition(operator, key, operand);
                output.push(condition);
            }
        }
    }
    return output;
}

function buildWhereCondition(operator: string, key: string, operand: any) {
    switch (operator) {
        case 'eq': {
            return {[`${key}`]: {$eq: operand}};
        }
        case 'notEq': {
            return {[`${key}`]: {$ne: operand}};
        }
        case 'like': {
            // return { [`${key}`]: { $re: new RegExp(`^${operand}`) } } as FilterQuery<T>;
            return {[`${key}`]: {$regex: new RegExp(`${operand}`)}};
        }
        case 'in': {
            return {[`${key}`]: {$in: operand}};
        }
        case 'between': {
            if (
                `${key}`.toString() === 'createdAt' ||
                `${key}`.toString() === 'updatedAt' ||
                `${key}`.toString() === 'mealTime' ||
                `${key}`.toString() === 'date'
            ) {
                return {
                    [`${key}`]: {
                        $gte: new Date(format(new Date(operand.start), 'yyyy-MM-dd')),
                        $lt: new Date(format(addDays(new Date(operand.end), 1), 'yyyy-MM-dd')),
                    },
                };
            }
        }
        // default: {
        //   return {};
        // }
        // return {[`${key}`]: {$get: operand}}
    }

}

/**
 * Converts a JS Date object to a string format recognized by all DB engines.
 * See https://github.com/vendure-ecommerce/vendure/issues/251
 */
function convertDate(input: Date | string | number): string | number {
    if (input instanceof Date) {
        // return DateUtils.mixedDateToUtcDatetimeString(input);
        return input.toISOString();
    }
    return input;
}
