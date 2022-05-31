import {DeepPartial, ID} from '@picker-cc/common/lib/shared-types';
import {
    Collection,
    Embeddable,
    Embedded,
    Entity, OneToOne,
    Property
} from '@mikro-orm/core';

import { SoftDeletable } from '../../common';
import { PickerMongoEntity } from '../base/mongo-base.entity';
import {Asset} from "../asset/asset.entity";
// import {TaxonomyEnum} from "@picker-cc/common/lib/generated-types";
@Entity()
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

    // 分类模式，category, link_category, post_tag
    // @Property()
    // taxonomy: TaxonomyEnum;
    //
    // 描述
    @Property()
    description?: string;
    // 特色图
    // @Property({nullable: true})
    @OneToOne(() => Asset)
    featured?: Asset;

    @Property({nullable: true})
    pid: ID;

    // 子内容数量统计
    @Property({ nullable: true})
    count?: number;
}
