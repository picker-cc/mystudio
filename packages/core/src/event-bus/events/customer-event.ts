import {PickerEvent} from '../picker-event';
import {RequestContext} from "../../api";
import {User} from "../../entity/user/user.entity";

/**
 * @description
 * 当客户创建、更新时触发
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class CustomerEvent extends PickerEvent {
  constructor(
    public ctx: RequestContext,
    public type: 'created' | 'batchCreated' | 'updated' | 'deleted',
    public users: User[]
  ) {
    super();
  }
}
