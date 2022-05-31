import { format, addDays } from 'date-fns';
import {AbstractBaseEntity} from "../../../entity/base/mongo-base.entity";
import {FilterParameter, NullOptionals} from "../../../common/types/common-types";

export function parseFilterParams<T extends AbstractBaseEntity<T>>(
  filterParams?: NullOptionals<FilterParameter<T>> | null,
): any[] {
  if (!filterParams) {
    return [];
  }
  const output: any = {
    deletedAt: null
  };
  for (const [ key, operation ] of Object.entries(filterParams)) {
    if (operation) {
      for (const [ operator, operand ] of Object.entries(operation as object)) {
        switch (operator) {
          case 'eq':
            output[`${key}`] = { $eq: operand.toString() } ;
            break;
          case 'notEq':
            output[`${key}`] = { $ne: operand.toString() } ;
            break;
          case 'like':
            output[`${key}`] = { $re: operand.toString() } ;
            break;
          case 'in':
            output[`${key}`] = { $in: operand } ;
            break;
          case 'between':
            if (`${key}`.toString() === 'createdAt'
              || `${key}`.toString() === 'updatedAt'
              || `${key}`.toString() === 'mealTime'
              || `${key}`.toString() === 'date'
            ) {
              output[`${key}`] = { $gte: new Date(format(new Date(operand.start), 'yyyy-MM-dd')),
              $lt: new Date(format(addDays(new Date(operand.end), 1), 'yyyy-MM-dd')) } ;
              break;
            }
        }
      }
    }
  }
  return output;
}
