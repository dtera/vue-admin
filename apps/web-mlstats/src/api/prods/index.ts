import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取产品列表数据
 */
async function listData(
  params: Recordable<any>,
  reqPath: string = '/gift/search',
) {
  return requestClient.post<Array<object>>(`${reqPath}`, {
    ...params,
  });
}

export { listData };
