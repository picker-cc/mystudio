import { DeepPartial, ID } from '@picker-cc/common/lib/shared-types';
import { BaseEntity, Index, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

/**
 * @description
 * 所有 entities 继承此类
 * 这是所有实体继承的基类。
 * `id` 属性的类型由 {@link EntityIdStrategy}
 *
 * @docsCategory entities
 */
export abstract class PickerMongoEntity{
    protected constructor(input?: DeepPartial<PickerMongoEntity>) {
        if (input) {
            for (const [key, value] of Object.entries(input as any)) {
                (this as any)[key] = value;
            }
        }
    }

    // mongodb 专用
    @PrimaryKey()
    _id!: ObjectId;

    // 兼容查询
    @SerializedPrimaryKey()
    id!: ID;
    // @PrimaryKey()
    // id: string; // Number or String ID type

    @Property({
        type: Date,
    })
    createdAt = new Date();

    @Property({
        type: Date,
        onUpdate: () => new Date(),
    })
    @Index()
    updatedAt = new Date();
}
