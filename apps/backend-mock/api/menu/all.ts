import { eventHandler } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  // 代理到实际后端获取菜单数据
  try {
    const response = await fetch('http://localhost:8080/menu/all');
    const data = await response.json();
    if (data && data.code === 0 && data.data) {
      return useResponseSuccess(data.data);
    }
  } catch {
    // 后端不可用时返回空菜单
  }

  return useResponseSuccess([]);
});
