module.exports = {
  name: '淘宝',
  desc: '淘宝电商系统',
  homepage: '',
  menu: [
    {
      key: 'order',
      name: '订单管理',
      menuType: 'iframe',
      iframeConfig: {
        path: 'https://www.taobao.com',
      },
    },
    {
      key: 'operating',
      name: '运营活动',
      menuType: 'sider',
      siderConfig: {
        menu: [
          {
            key: 'coupon',
            name: '优惠券管理',
            menuType: 'module',
            customConfig: {
              path: '/ coupon',
            },
          },
          {
            key: ' limited',
            name: '限量购',
            menuType: 'module',
            customConfig: {
              path: '/ coupon',
            },
          },
          {
            key: 'festival',
            name: '节日活动',
            menuType: 'module',
            customConfig: {
              path: '/ coupon',
            },
          },
        ],
      },
    },
    {
      key: 'order',
      name: '订单管理',
      menuType: 'module',
      customConfig: {
        path: '/order',
      },
    },
    {
      key: 'client',
      name: '客户管理',
      menuType: 'module',
      customConfig: {
        path: '/customer',
      },
    },
  ],
};
