import { Post } from "../../entity/posts/post.entity";
import {PickerEntityEvent} from "../picker-entity-event";
import {CreatePostInput, UpdatePostInput} from "@picker-cc/common/lib/generated-types";
import { ID } from "@picker-cc/common/lib/shared-types";
import {RequestContext} from "../../api";
type PostInputTypes = CreatePostInput | UpdatePostInput | ID;

/**
 * @description
 * 实体 {@link Post} 添加、修改、删除时触发事件
 * @docsCategory events
 * @docsPage Event Types
 */
export class PostEvent extends PickerEntityEvent<Post, PostInputTypes> {
    constructor(
        ctx: RequestContext,
        entity: Post,
        type: 'created' | 'updated' | 'deleted',
        input?: PostInputTypes,
    ) {
        super(entity, type, ctx, input);
    }

}
