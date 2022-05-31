import {PickerEvent} from '../picker-event';
import {ServiceItem} from "../../entity/service-package/service-package.entity";

/**
 * @description
 * 当服务套餐中 Remind 事项建立、更新时触发
 * 目的是将这些事项添加到定时任务的 任务定义中
 * @docsCategory events
 * @docsPage Event Types
 */
export class ServiceItemEvent extends PickerEvent {
  constructor(
    public serviceItems: ServiceItem[],
    public type: 'created' | 'deleted',
  ) {
    super();
  }
}
