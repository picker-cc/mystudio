import {User} from '../user/user.entity';
import {Entity, Enum, OneToOne, Property} from '@mikro-orm/core';
import {PickerMongoEntity} from "../base/mongo-base.entity";
import {SoftDeletable} from "../../common";
import {DeepPartial, HasCustomFields} from "@picker-cc/common/lib/shared-types";
import {CustomAdministratorFields} from "../custom-entity-fields";

/**
 * @description
 * 可以访问admin ui的管理用户
 *
 * @docsCategory entities
 */
@Entity()
export class Administrator extends PickerMongoEntity implements SoftDeletable, HasCustomFields {
    constructor(input?: DeepPartial<Administrator>) {
        super(input);
    }

    @Property({type: Date, nullable: true})
    deletedAt: Date | null;

    @Property() name: string;

    @Property({unique: true})
    emailAddress: string;

    // @OneToOne((type) => User)
    // @OneToOne({ entity: () => User, orphanRemoval: false, primary: true, eager: true})
    @OneToOne({nullable: true })
    user: User;

    // @Property()
    // 管理员所属域
    @Enum({type: 'DomainEnum', nullable: true})
    domain?: String

    @Property({type: CustomAdministratorFields})
    customFields: CustomAdministratorFields;
}

