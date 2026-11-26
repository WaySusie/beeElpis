import { createApp } from 'vue';

// 引入 Element UI
import ElementUI from 'element-plus';
// 引入全局样式
import 'element-plus/theme-chalk/index.css';

import './asserts/custom.css';

// 引入 pinia
import pinia from '$store';

// 引入路由
import { createRouter, createWebHashHistory } from 'vue-router';

/**
 * vue 页面主入口，用于启动 vue 应用
 * @params pageComponent vue 入口组件
 * @params routes 路由列表
 * @params libs 页面依赖的第三方包
 */
export default (pageComponent, { routes, libs }) => {
  const app = createApp(pageComponent);

  // 应用
  app.use(ElementUI);

  // 状态管理
  app.use(pinia);

  // 引入第三方包
  if (libs && libs.length) {
    for (let i = 0; i < libs.length; i++) {
      app.use(libs[i]);
    }
  }

  // 页面路由
  if (routes && routes.length) {
    const router = createRouter({
      history: createWebHashHistory(), // 使用 hash 模式
      routes: pageComponent.router.routes, // 路由配置
    });

    app.use(router);
    router.isReady().then(() => {
      // 路由准备就绪，挂载应用
      app.mount('#root');
    });
  } else {
    // 没有路由配置，直接挂载应用
    app.mount('#root');
  }
};
