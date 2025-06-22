import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace ProductApi {
  export interface Product {
    [key: string]: any;

    id: string;
    prodTitle: string;
    prodImgUrl: string;
    prodType: string;
    prodDetail: string;
    prodLlmPredNames: string;
  }
}

/**
 * 获取产品列表数据
 */
async function getProductList(params: Recordable<any>) {
  return requestClient.post<Array<ProductApi.Product>>('/all7b/search', {
    ...params,
  });
}

export { getProductList };
