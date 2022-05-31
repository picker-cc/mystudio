import { Entity, Property } from '@mikro-orm/core';
import { PickerMongoEntity } from '../base/mongo-base.entity';
import {DeepPartial} from "@picker-cc/common/lib/shared-types";
import {AssetType} from "@picker-cc/common/lib/generated-types";

/**
 * @description
 * 资产代表一个文件，如图像，它可以与某些其他实体相关联如产品。
 */
@Entity({
    tableName: 'assets'
})
export class Asset extends PickerMongoEntity {
  constructor(input?: DeepPartial<Asset>) {
    super(input);
  }

  // name 一般是唯一的英文 name 用于 path
  @Property() name: string;

  // 资产的文字说明标题，一般是给中文留的 name
  @Property() title: string;

  @Property() type: AssetType;

  @Property() mimeType: string;

  @Property({default: 0}) width: number;

  @Property({default: 0}) height: number;

  @Property() fileSize: number;

  @Property() source: string;

  @Property() preview: string;

  @Property({
      nullable: true
  })
  focalPoint?: { x: number; y: number };
}
