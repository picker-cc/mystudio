/**
 * 用于将CalculatedColumnDefinitions存储到实体类的属性名。
 */
export const CALCULATED_PROPERTIES = '__calculatedProperties__';

/**
 * 可选元数据，用来告诉ListQueryBuilder在排序或过滤时如何处理计算的列。
 */
export interface CalculatedColumnQueryInstruction {
    relations?: string[];
    // query?: (qb: QueryBuilder<any>) => void;
    query?: (ab: any) => void;
    expression: string;
}

export interface CalculatedColumnDefinition {
    name: string | symbol;
    listQuery?: CalculatedColumnQueryInstruction;
}

/**
 * @description
 * 用于定义计算实体getter。装饰器简单地将一个“计算”的属性名数组附加到实体的原型上。
 * 然后{@link CalculatedPropertySubscriber}使用该数组将getter函数从原型转移到实体实例。
 */
export function Calculated(queryInstruction?: CalculatedColumnQueryInstruction): MethodDecorator {
    return (
        target: object & { [key: string]: any },
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ) => {
        const definition: CalculatedColumnDefinition = {
            name: propertyKey,
            listQuery: queryInstruction,
        };
        if (target[CALCULATED_PROPERTIES]) {
            if (
                !target[CALCULATED_PROPERTIES].map((p: CalculatedColumnDefinition) => p.name).includes(
                    definition.name,
                )
            ) {
                target[CALCULATED_PROPERTIES].push(definition);
            }
        } else {
            target[CALCULATED_PROPERTIES] = [ definition ];
        }
    };
}
