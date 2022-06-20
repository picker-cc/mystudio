import {Embeddable, Index, Property} from "@mikro-orm/core";
import {Permission} from "@picker-cc/common/lib/generated-types";

@Embeddable()
export class UserRole {
    @Index()
    @Property()
    code: string;
    @Property()
    description: string;
    @Property()
    permissions: Permission[];
}

export class Customer {}
