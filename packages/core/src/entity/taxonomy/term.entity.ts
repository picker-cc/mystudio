import {DeepPartial, ID} from '@picker-cc/common/lib/shared-types';
import {
    Collection,
    Embeddable,
    Embedded,
    Entity, Enum, Index, OneToOne,
    Property, Unique
} from '@mikro-orm/core';

import { SoftDeletable } from '../../common';
import { PickerMongoEntity } from '../base/mongo-base.entity';
import {Asset} from "../asset/asset.entity";
import { TaxonomyEnum } from '@picker-cc/common/lib/generated-types';
/**
 * 分类项
 */
@Entity()
@Index({properties: ['name', 'slug']})
@Unique({properties: ['name', 'slug']})
export class Term extends PickerMongoEntity implements SoftDeletable {
    constructor(input?: DeepPartial<Term>) {
        super(input);
    }
    @Property({ type: Date, nullable: true })
    deletedAt: Date;

    // 类别名称
    // @Embedded(() => Term, {array: true})
    // term: Term
    @Property()
    name: string;

    @Property()
    slug: string;

    // 分类法，category, link_category, post_tag
    // 指定了 term 属于什么分类模式，默认的分类模式有 “category”，“link_category” 和 “post_tag”。
    // @Property()
    @Enum(() => TaxonomyEnum)
    taxonomy: TaxonomyEnum;
    //
    // 描述
    @Property({nullable: true})
    description?: string;
    // 特色图
    // @Property({nullable: true})
    // @OneToOne(() => Asset)
    @Property({nullable: true})
    featured?: Asset;

    @Property({nullable: true})
    parent: ID;

    // 子内容数量统计
    @Property({ nullable: true})
    count?: number;
}
