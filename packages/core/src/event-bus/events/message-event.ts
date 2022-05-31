import {PickerEvent} from '../picker-event';
import {RequestContext} from "../../api";

/**
 * @description
 * 当消息触发时
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class MessageEvent extends PickerEvent {
  constructor(
    public ctx: RequestContext,
    public type: 'remind',
  ) {
    super();
  }
}
