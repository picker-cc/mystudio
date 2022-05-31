import {PickerEvent} from '../picker-event';
import {RequestContext} from "../../api";

/**
 * @description
 * 当用户通过 API `logout` mutation注销时，将触发此事件。
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class LogoutEvent extends PickerEvent {
  constructor(public ctx: RequestContext) {
    super();
  }
}
