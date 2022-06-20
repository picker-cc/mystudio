import { Permission } from "@picker-cc/common/lib/generated-types";
import { ID } from "@picker-cc/common/lib/shared-types";
import {unique} from "@picker-cc/common/lib/unique";
import { User } from "../../entity/user";

// export interface UserPermission {
    // id: ID;
    // permissions: Permission[];
// }
//
/**
 * 获取用户的角色权限
 * @param user
 */
export function getUserPermissions(user: User): Permission[] {
    let permissions = []
    for (const role of user.roles) {
        permissions = unique([
            ...role.permissions
        ])
    }
    return permissions
    // return {
    //     id: user.id,
        // permissions
    // }
}
