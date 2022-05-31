import { DeepPartial, ID } from '@picker-cc/common/lib/shared-types';
import {
    AfterCreate,
    BeforeCreate,
    BeforeDelete,
    BeforeUpdate,
    ChangeSetType,
    Entity,
    EntityName,
    EventArgs,
    EventSubscriber,
    FlushEventArgs,
    Index,
    Property,
    Subscriber,
    Unique,
    wrap,
} from '@mikro-orm/core';

import { PickerMongoEntity } from '../base/mongo-base.entity';

const pathSeparator = '#';
const pathSeparatorRegex = '[' + pathSeparator + ']';
// const updateChildPaths = (em: EntityManager, pathToReplace, replacementPath) => {
//   const childConditions = {
//     path: { $regex: '^' + pathToReplace + pathSeparatorRegex },
//   };
//
//   const childStream = tion.find(childConditions).stream();
// const child = em.find()
// const onStreamData = (childDoc, done) => {
//   const newChildPath =
//     replacementPath + childDoc.path.substr(pathToReplace.length);
//
//   self.collection
//     .updateMany({ _id: childDoc._id }, { $set: { path: newChildPath } })
//     .then(() => done());
// };
//
// };
/**
 * 客户文件目录
 */
@Entity()
export class FileDirectory extends PickerMongoEntity {
    constructor(input?: DeepPartial<FileDirectory>) {
        super(input);
    }

    @Index()
    // 目录名
    @Property()
    name: string;
    // 目录标识
    @Property()
    @Unique()
    slug: string;
    @Property()
    parent: ID;
    @Property()
    @Index()
    path: string;

    @Property({ persist: false })
    children: FileDirectory[];
    // 描述
    @Property()
    description: string;
    @Property()
    count: number;

    // @Property({ persist: false })
    // get level() {
    //   return `${this.firstName} ${this.lastName}`;
    // }

    @AfterCreate()
    async doAfterCreate(args) {
        // ...
        let path = '';
        if (this.parent) {
            const parentEntity = await args.em.findOne(FileDirectory, { id: this.parent });
            path = parentEntity.path + pathSeparator + this.id.toString();
        } else {
            path = this.id.toString();
        }
        await args.em.nativeUpdate(FileDirectory, { id: this.id }, { path });
    }

    @BeforeUpdate()
    async doBeforeUpdate(args) {
        const original = args.changeSet.originalEntity;
        const oldPath = original.path;
        const { parent } = args.changeSet.payload;
        if (parent) {
            // 新父目录
            if (parent !== original.parent) {
                const parentEntity = await args.em.findOne(FileDirectory, { id: this.parent });
                const newPath = parentEntity.path + pathSeparator + this.id.toString();
                this.path = newPath;

                const childConditions = {
                    path: { $regex: '^' + oldPath + pathSeparatorRegex },
                };
                const children = await args.em.find(FileDirectory, childConditions);

                if (children.length > 0) {
                    for (const child of children) {
                        const newChildPath = newPath + child.path.substr(oldPath.length);
                        await args.em.nativeUpdate(
                            FileDirectory.name,
                            {
                                id: child.id,
                            },
                            {
                                $set: {
                                    path: newChildPath,
                                },
                            },
                        );
                        // console.log(newChildPath)
                    }
                }
            } else {
                this.path = this.id.toString();
            }
        }
        // ...
    }

    @BeforeDelete()
    async doBeforeDelete(args) {
        // ...
        // let path = '';
        // if (this.parent) {
        //   const parentEntity = await args.em.findOne(FileDirectory, { id: this.parent });
        //   path = parentEntity.path + pathSeparator + this.id.toString();
        // } else {
        //   path = this.id.toString();
        // }
        // await args.em.nativeUpdate(FileDirectory, { id: this.id }, { path });
    }
}

@Subscriber()
export class FileDirectorySubscriber implements EventSubscriber {
    // async onFlush(args: FlushEventArgs): Promise<void> {
    //   const changeSets = args.uow.getChangeSets();
    //   const cs = changeSets.find(cs => cs.type === ChangeSetType.CREATE && cs.entity instanceof FooBar);
    //
    //   if (cs) {
    //     const baz = new FooBaz();
    //     baz.name = 'dynamic';
    //     cs.entity.baz = baz;
    //     args.uow.computeChangeSet(baz);
    //     args.uow.recomputeSingleChangeSet(cs.entity);
    //   }
    // }
    getSubscribedEntities(): Array<EntityName<FileDirectory>> {
        return [FileDirectory];
    }

    async beforeCreate(args: EventArgs<FileDirectory>): Promise<void> {
        // ...
        // console.log(args)
    }

    async afterCreate(args: EventArgs<FileDirectory>): Promise<void> {
        // ...
    }

    async afterUpdate(args: EventArgs<FileDirectory>): Promise<void> {
        // ...
    }

    async onFlush(args: FlushEventArgs): Promise<void> {
        // const changeSets = args.uow.getChangeSets();
        // const cs = changeSets.find(cs => cs.type === ChangeSetType.CREATE && cs.entity instanceof FileDirectory);
        // if (cs) {
        // const fileDirectory = new FileDirectory();
        // args.uow.computeChangeSet(fileDirectory);
        // console.log(fileDirectory)
        // console.log(cs.entity.id)
        // }
    }
}
