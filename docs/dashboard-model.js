{
    mode: 'dashboard', // 模板类型，不同模板类型对应不一样的模板数据结构
    name: '', // 模板名称
    desc: '', // 模板描述
    icon: '', // 模板图标
    homePage: '', // 模板首页
    // 头部菜单
    menu: [
        {
            key: '', // 菜单唯一标识
            name: '', // 菜单名称
            menuType: '', // 菜单类型，枚举值，group / module
            // 当 menuType === group 时，可填
            subMenu: [
                {
                    // 可递归 menuItem
                },
                ...
            ],
            // 当 menuType === module 时，可填
            moduleType: '', // 模块类型，枚举值: sider/iframe/custom/schema

            // 当 moduleType === sider 时，可填
            siderConfig:{
                menu:[{
                    // 可递归的 menuItem （除 moduleType === sider ）
                }]
            },

            // 当 moduleType === iframe 时，可填
            iframeConfig:{},
            
            // 当 moduleType === custom 时，可填
            customConfig:{
                path: '',//自定义路由路径
            },
            
            // 当 moduleType === schema 时，可填
            schemaConfig:{
                api: '/api/user', // 数据源 API（遵循 RESTFUL 规范）
                schema: {//板块数据结构
                    type: 'object', // 数据类型
                    properties: {
                        key: {
                            ...schema,
                            label: '', // 字段的中文名
                        },
                        ...
                    }
                }, 
            }, 
            tableConfig:{ // table 相关配置
                
            },
            searchConfig:{ // search 相关配置
                
            },
            component: { // 模块组件

            },

        },
        ...
    ],

}