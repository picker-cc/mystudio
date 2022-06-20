import {PickerEvent} from '../picker-event';
import {RequestContext} from "../../api";

/**
 * @description
 * 当尝试 “login” 登录时，将触发此事件。
 * `strategy` 表示尝试登录时应用的 AuthenticationStrategy 的名称，
 * 如果使用了"native"策略，则 `identifier`属性将可用。
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class AttemptedLoginEvent extends PickerEvent {
  constructor(public ctx: RequestContext, public strategy: string,  public identifier: string) {
    super();
  }
}
