/**
 * @description
 * 当用户请求重置密码电子邮件时触发此事件。
 *
 * @docsCategory events
 * @docsPage Event Types
 */
import {PickerEvent} from '../picker-event';
import {RequestContext} from "../../api";
import {User} from "../../entity/user/user.entity";

export class PasswordResetEvent extends PickerEvent {
    constructor(public ctx: RequestContext, public user: User) {
        super();
    }
}
