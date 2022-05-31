import {PickerEvent} from '../picker-event';
import {RequestContext} from "../../api";
import {User} from "../../entity/user/user.entity";

/**
 * @description
 * 当用户通过 API `login` 成功登录时，将触发此事件。
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class LoginEvent extends PickerEvent {
  constructor(public ctx: RequestContext, public user: User) {
    super();
  }
}
