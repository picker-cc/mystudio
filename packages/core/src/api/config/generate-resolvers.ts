// import { StockMovementType } from '@picker-cc/common/lib/generated-types';
// import { IFieldResolver, IResolvers } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars';
import { GraphQLUpload } from 'graphql-upload';

import { REQUEST_CONTEXT_KEY } from '../../common/constants';
// import {
//     adminErrorOperationTypeResolvers,
//     ErrorResult,
// } from '../../common/error/generated-graphql-admin-errors';
// import { shopErrorOperationTypeResolvers } from '../../common/error/generated-graphql-shop-errors';
import { Translatable } from '../../common/types/locale-types';
import { ConfigService } from '../../config/config.service';
// import { CustomFieldConfig, RelationCustomFieldConfig } from '../../config/custom-field/custom-field-types';
// import { CustomFieldRelationResolverService } from '../common/custom-field-relation-resolver.service';
import { ApiType } from '../common/get-api-type';
import { RequestContext } from '../common/request-context';
import {adminErrorOperationTypeResolvers} from "../../common/error/generated-graphql-admin-errors";
import {studioErrorOperationTypeResolvers} from "../../common/error/generated-graphql-studio-error";
// import {adminErrorOperationTypeResolvers} from "../../common/error/generated-graphql-admin-errors";

/**
 * @description
 * 生成额外的解析器需要的东西，如联合类型的 resolvers，
 * 自定义标量和 "relation"-type 的自定义字段
 */
export function generateResolvers(
    configService: ConfigService,
    // customFieldRelationResolverService: CustomFieldRelationResolverService,
    apiType: ApiType,
    schema: GraphQLSchema,
) {
    // Prevent `Type "Node" is missing a "resolveType" resolver.` warnings.
    // See https://github.com/apollographql/apollo-server/issues/1075
    const dummyResolveType = {
        __resolveType() {
            return null;
        },
    };

    const customFieldsConfigResolveType = {
        __resolveType(value: any) {
            switch (value.type) {
                case 'string':
                    return 'StringCustomFieldConfig';
                case 'localeString':
                    return 'LocaleStringCustomFieldConfig';
                case 'text':
                    return 'TextCustomFieldConfig';
                case 'int':
                    return 'IntCustomFieldConfig';
                case 'float':
                    return 'FloatCustomFieldConfig';
                case 'boolean':
                    return 'BooleanCustomFieldConfig';
                case 'datetime':
                    return 'DateTimeCustomFieldConfig';
                case 'relation':
                    return 'RelationCustomFieldConfig';
            }
        },
    };

    const commonResolvers = {
        JSON: GraphQLJSON,
        DateTime: GraphQLDateTime,
        Node: dummyResolveType,
        PaginatedList: dummyResolveType,
        Upload: (GraphQLUpload as any) || dummyResolveType,
        // SearchResultPrice: {
        //     __resolveType(value: any) {
        //         return value.hasOwnProperty('value') ? 'SinglePrice' : 'PriceRange';
        //     },
        // },
        // CustomFieldConfig: customFieldsConfigResolveType,
        // CustomField: customFieldsConfigResolveType,
    };

    const adminResolvers = {
        ...adminErrorOperationTypeResolvers,
        // ...productErrorOperationTypeResolvers,
    };
    const studioResolvers = {
        ...studioErrorOperationTypeResolvers
        // ...adminErrorOperationTypeResolvers,
        // ...productErrorOperationTypeResolvers,
    };
    // const resolvers =
    //     apiType === 'admin'
    // ? { ...commonResolvers, ...adminResolvers}
    // return {
    //     ...commonResolvers,
    //     ...adminResolvers,
    // }
    const resolvers =
        apiType === 'admin'
            ? {...commonResolvers, ...adminResolvers}
            : {...commonResolvers, ...studioResolvers}
    return resolvers
}
