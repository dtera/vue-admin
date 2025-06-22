import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    defaultHomePath: '/prods/list',
    layout: 'header-nav',
    enablePreferences: false,
    authPageLayout: 'panel-center',
    defaultAvatar: 'https://avatars.githubusercontent.com/u/45172737?s=96&v=4',
  },
  sidebar: {
    collapsed: true,
  },
  tabbar: {
    enable: false,
  },
  widget: {
    lockScreen: false,
    notification: false,
    themeToggle: false,
    languageToggle: false,
    refresh: false,
  },
  copyright: {
    companyName: 'Tencent',
    date: '2025',
  },
  logo: {
    source: '/favicon_wechat.png',
  },
  theme: {
    mode: 'light',
    semiDarkHeader: true,
    builtinType: 'green',
    colorPrimary: 'hsl(127 91% 35%)',
  },
});
