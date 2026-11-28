module.exports = {
  name: '淘宝',
  desc: '淘宝电商系统',
  homepage: '',
  menu: [
    {
      key: 'order',
      name: '商品管理（拼多多）',
    },
    {
      key: 'client',
      name: '客户管理（拼多多）',
    },
    {
      key: 'data',
      name: '数据分析',
      menuType: 'module',
      moduleType: 'sider',
      siderConfig: {
        menu: [
          {
            key: 'analysis',
            name: '电商罗盘',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
              path: '/analysis',
            },
          },
          {
            key: 'sider-search',
            name: '信息查询',
            moduleType: 'iframe',
            iframeConfig: {
              path: '/analysis',
            },
          },
        ],
      },
    },
    {
      key: 'search',
      name: '信息查询',
      menuType: 'module',
      customConfig: {
        path: '/customer',
      },
    },
  ],
};
