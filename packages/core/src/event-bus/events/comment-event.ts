import { CommentType } from '@caixie/common/lib/generated-types';

import { RequestContext } from '../../api';
import { PickerEvent } from '../picker-event';

/**
 * @description
 * 评价或评论时触发
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class CommentEvent extends PickerEvent {
    constructor(
        public ctx: RequestContext,
        public toUser: string,
        public type: CommentType,
        public id: string,
    ) {
        super();
    }
}
