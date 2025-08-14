import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * async api to list data
 */
async function listData(params: Recordable<any>, reqPath: string) {
  return requestClient.post<Array<object>>(`${reqPath}`, {
    ...params,
  });
}

export { listData };
