import {LanguageCode} from '@picker-cc/common/lib/generated-types';

import {DEFAULT_LANGUAGE_CODE} from '../../../common/constants';
import {InternalServerError} from '../../../common/error/errors';
import {UnwrappedArray} from '../../../common/types/common-types';
import {Translatable, Translated, Translation} from '../../../common/types/locale-types';
import {PickerMongoEntity} from "../../../entity/base/mongo-base.entity";

// prettier-ignore
export type TranslatableRelationsKeys<T> = {
    [K in keyof T]: T[K] extends string ? never :
        T[K] extends number ? never :
            T[K] extends boolean ? never :
                T[K] extends undefined ? never :
                    T[K] extends string[] ? never :
                        T[K] extends number[] ? never :
                            T[K] extends boolean[] ? never :
                                K extends 'translations' ? never :
                                    K extends 'customFields' ? never : K
}[keyof T];

// prettier-ignore
export type NestedTranslatableRelations<T> = {
    [K in TranslatableRelationsKeys<T>]: T[K] extends any[] ?
        [ K, TranslatableRelationsKeys<UnwrappedArray<T[K]>> ] :
        [ K, TranslatableRelationsKeys<T[K]> ]
};

// prettier-ignore
export type NestedTranslatableRelationKeys<T> = NestedTranslatableRelations<T>[keyof NestedTranslatableRelations<T>];

// prettier-ignore
export type DeepTranslatableRelations<T> = Array<TranslatableRelationsKeys<T> | NestedTranslatableRelationKeys<T>>;

/**
 * 通过从匹配的 Translation 实体拆箱翻译后的字符串，
 * 将可翻译实体转换为面向公众的实体。
 */
export function translateEntity<T extends Translatable & PickerMongoEntity>(
    translatable: T,
    languageCode: LanguageCode,
): Translated<T> {
    let translation: Translation<PickerMongoEntity> | undefined;
    if (translatable.translations) {
        translation = translatable.translations.find(t => t.languageCode === languageCode);
        if (!translation && languageCode !== DEFAULT_LANGUAGE_CODE) {
            translation = translatable.translations.find(t => t.languageCode === DEFAULT_LANGUAGE_CODE);
        }
        if (!translation) {
            // 如果找不到合适的翻译，就返回第一个，
            // 至少可以防止返回实体时出现 graphql 错误
            translation = translatable.translations[0];
        }
    }

    if (!translation) {
        throw new InternalServerError(`error.entity-has-no-translation-in-language`, {
            entityName: translatable.constructor.name,
            languageCode,
        });
    }

    const translated = {...(translatable as any)};
    Object.setPrototypeOf(translated, Object.getPrototypeOf(translatable));

    for (const [ key, value ] of Object.entries(translation)) {
        if (key === 'customFields') {
            if (!translated.customFields) {
                translated.customFields = {};
            }
            Object.assign(translated.customFields, value);
        } else if (key !== 'base' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
            translated[key] = value;
        }
    }
    return translated;
}

/**
 * 翻译实体及其深潜逃的可翻译属性。最多支持2级嵌套
 */
export function translateDeep<T extends Translatable & PickerMongoEntity>(
    translatable: T,
    languageCode: LanguageCode,
    translatableRelations: DeepTranslatableRelations<T> = [],
): Translated<T> {
    let translatedEntity: Translated<T>;
    try {
        translatedEntity = translateEntity(translatable, languageCode);
    } catch (e) {
        translatedEntity = translatable as any;
    }

    for (const path of translatableRelations) {
        let object: any;
        let property: string;
        let value: any;

        if (Array.isArray(path) && path.length === 2) {
            const [ path0, path1 ] = path as any;
            const valueLevel0 = (translatable as any)[path0];

            if (Array.isArray(valueLevel0)) {
                valueLevel0.forEach((nested1, index) => {
                    object = (translatedEntity as any)[path0][index];
                    property = path1;
                    object[property] = translateLeaf(object, property, languageCode);
                });
                property = '';
                object = null;
            } else {
                object = (translatedEntity as any)[path0];
                property = path1;
                value = translateLeaf(object, property, languageCode);
            }
        } else {
            object = translatedEntity;
            property = path as any;
            value = translateLeaf(object, property, languageCode);
        }

        if (object && property) {
            object[property] = value;
        }
    }

    return translatedEntity;
}

function translateLeaf(
    object: { [key: string]: any } | undefined,
    property: string,
    languageCode: LanguageCode,
): any {
    if (object && object[property]) {
        if (Array.isArray(object[property])) {
            return object[property].map((nested2: any) => translateEntity(nested2, languageCode));
        } else if (object[property]) {
            return translateEntity(object[property], languageCode);
        }
    }
}

export type TreeNode = { children: TreeNode[] } & Translatable & PickerMongoEntity;

/**
 * Translates a tree structure of Translatable entities
 * 翻译可翻译实体的树状结构。
 */
export function translateTree<T extends TreeNode>(
    node: T,
    languageCode: LanguageCode,
    translatableRelations: DeepTranslatableRelations<T> = [],
): Translated<T> {
    const output = translateDeep(node, languageCode, translatableRelations);
    if (Array.isArray(output.children)) {
        output.children = output.children.map(child =>
            translateTree(child as any, languageCode, translatableRelations as any),
        );
    }
    return output;
}
