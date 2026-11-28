module.exports = {
  model: 'dashboard',
  name: '课程系统',
  menu: [
    {
      key: ' video',
      name: '视频管理',
      menuType: 'module',
      moudule: 'custom',
      customConfig: {
        path: '/video',
      },
    },
    {
      key: 'customer',
      name: '用户管理',
      menuType: 'module',
      customConfig: {
        path: '/customer',
      },
    },
  ],
};
