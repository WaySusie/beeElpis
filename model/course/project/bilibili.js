module.exports = {
  name: 'B站课堂',
  desc: ' B站课程系统',
  homepage: '',
  menu: [
    {
      key: 'video',
      name: '视频管理（B站）',
    },
    {
      key: 'user',
      name: '用户管理（B站）',
    },
    {
      key: '课程资料',
      menuType: 'module',
      moduleType: 'sider',
      siderConfig: {
        menu: [
          {
            key: 'PDF',
            name: 'PDF',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
              path: '/todo',
            },
          },
          {
            key: 'excel',
            name: 'Excel',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
              path: '/todo',
            },
          },
          {
            key: 'ppt',
            name: 'PPT',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
              path: '/todo',
            },
          },
        ],
      },
    },
  ],
};
