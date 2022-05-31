import { PickerEvent } from '../picker-event';
import {RequestContext} from "../../api";
import {Asset} from "../../entity/asset/asset.entity";

/**
 * @description
 * This event is fired whenever aa {@link Asset} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class AssetEvent extends PickerEvent {
  constructor(
    public ctx: RequestContext,
    public asset: Asset,
    public type: 'created' | 'updated' | 'deleted',
  ) {
    super();
  }
}
