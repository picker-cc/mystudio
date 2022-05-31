// import { Connection, OrderByCondition } from 'typeorm';
// import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
//
// import { escapeCalculatedColumnExpression, getColumnMetadata } from './connection-utils';
// import { AbstractBaseEntity } from '@libs/entity/base/mongo-base.entity';
// import { NullOptionals, SortParameter } from '@libs/common/types/common-types';
// import { Type } from '@mikro-orm/core';
// import { UserInputError } from '@libs/common/error/errors';
//
// /**
//  * Parses the provided SortParameter array against the metadata of the given entity, ensuring that only
//  * valid fields are being sorted against. The output assumes
//  * @param connection
//  * @param entity
//  * @param sortParams
//  */
// export function parseSortParams<T extends AbstractBaseEntity<any>>(
//     connection: Connection,
//     entity: Type<T>,
//     sortParams?: NullOptionals<SortParameter<T>> | null,
// ): OrderByCondition {
//     if (!sortParams || Object.keys(sortParams).length === 0) {
//         return {};
//     }
//     const { columns, translationColumns, alias } = getColumnMetadata(connection, entity);
//     const calculatedColumns = getCalculatedColumns(entity);
//     const output: OrderByCondition = {};
//     for (const [key, order] of Object.entries(sortParams)) {
//         const calculatedColumnDef = calculatedColumns.find(c => c.name === key);
//         if (columns.find(c => c.propertyName === key)) {
//             output[`${alias}.${key}`] = order as any;
//         } else if (translationColumns.find(c => c.propertyName === key)) {
//             output[`${alias}_translations.${key}`] = order as any;
//         } else if (calculatedColumnDef) {
//             const instruction = calculatedColumnDef.listQuery;
//             if (instruction) {
//                 output[escapeCalculatedColumnExpression(connection, instruction.expression)] = order as any;
//             }
//         } else {
//             throw new UserInputError('error.invalid-sort-field', {
//                 fieldName: key,
//                 validFields: [
//                     ...getValidSortFields([...columns, ...translationColumns]),
//                     ...calculatedColumns.map(c => c.name.toString()),
//                 ].join(', '),
//             });
//         }
//     }
//     return output;
// }
//
// function getValidSortFields(columns: ColumnMetadata[]): string[] {
//     return unique(columns.map(c => c.propertyName));
// }
