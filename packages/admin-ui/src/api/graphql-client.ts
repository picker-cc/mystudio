import { createClient, defaultPlugins } from 'villus';
import { getToken } from '/@/utils/auth';
import { App } from 'vue';

function authPlugin({ opContext }) {
  opContext.headers.Authorization = 'Bearer ' + getToken();
}

export const client = createClient({
  url: 'http://localhost:5001/admin-api',
  use: [authPlugin, ...defaultPlugins()],
  // 不缓存请求数据
  cachePolicy: 'network-only',
});

export function setupGraphqlClient(app: App<Element>) {
  app.use(client);
}
