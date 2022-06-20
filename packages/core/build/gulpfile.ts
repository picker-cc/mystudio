// import { exec } from 'child_process';
// import fs from 'fs-extra';
import {dest, parallel, series, src, watch as gulpWatch} from 'gulp';
import path from 'path';

const SCHEMAS_GLOB = [ '../src/**/*.graphql' ];
// const SCHEMAS_GLOB = [ '../src/schema/**/*.graphql' ];
const MESSAGES_GLOB = [ '../src/i18n/messages/**/*' ];
const CONF_GLOB = [ '../src/service/model.conf' ]

function copySchemas() {
    return src(SCHEMAS_GLOB).pipe(dest('../dist'));
    // return src(SCHEMAS_GLOB).pipe(dest('../../../' + '/dist/apps/jy-server/schema'));
}

function copyConfigs() {
    return src(CONF_GLOB).pipe(dest('../dist/service'))
}

function copyI18nMessages() {
    return src(MESSAGES_GLOB).pipe(dest('../dist/i18n/messages'));
}

export const build = parallel(
    copySchemas,
    copyConfigs,
    // copyI18nMessages,
);

export function watch() {
    const watcher1 = gulpWatch(SCHEMAS_GLOB, copySchemas);
    const watcher2 = gulpWatch(MESSAGES_GLOB, copyI18nMessages);
    const watcher3 = gulpWatch(CONF_GLOB, copyConfigs)
    copyConfigs()
    return new Promise(resolve => {
    });
}
