import { HistoryEntryType } from '@vendure/common/lib/generated-types';
import { Column, Entity, ManyToOne, TableInheritance } from 'typeorm';

import { Administrator } from '../administrator/administrator.entity';
import { VendureEntity } from '../base/base.entity';

/**
 * @description
 * 包含与 {@link HistoryEntry} 实体相关的方法。
 * 历史记录是与特定客户或订单相关的操作的时间轴，记录了重要的事件，
 * 如创建、状态更改、注释等。
 *
 * @docsCategory entities
 */
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'discriminator' } })
export abstract class HistoryEntry extends VendureEntity {
    @ManyToOne(type => Administrator)
    administrator?: Administrator;

    @Column({ nullable: false, type: 'varchar' })
    readonly type: HistoryEntryType;

    @Column()
    isPublic: boolean;

    @Column('simple-json')
    data: any;
}
