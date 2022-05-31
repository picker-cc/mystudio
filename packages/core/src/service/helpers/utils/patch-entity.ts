import {PickerMongoEntity} from "../../../entity/base/mongo-base.entity";

export type InputPatch<T> = { [K in keyof T]?: T[K] | null };

/**
 * 只要 Input 对象的值为否，则只更新指定的属性定义。但是可以传递空值，这将设置相应的实体字段为 "null"。
 * 因此，必须注意只对可为空的字段执行此操作。
 */
export function patchEntity<T extends PickerMongoEntity, I extends InputPatch<T>>(entity: T, input: I): T {
    for (const key of Object.keys(entity)) {
        const value = input[key as keyof T];
        if (key === 'customFields' && value) {
            patchEntity((entity as any)[key], value as any);
        } else if (value !== undefined && key !== 'id') {
            entity[key as keyof T] = value as any;
        }
    }
    return entity;
}
