### elpis PixelForge

企业级全栈框架

### model 配置

```javascript
{
 mode: "dashboard", // 模版类型，不同模版类型对应不一样的模版数据结构
 name: "", // 名称
 desc: "", // 描述
 icon: "", // icon
 homePage: "", // 首页
 // 头部菜单
 menu: [
   {
     key: "", // 菜单唯一描述
     name: "", // 菜单名称
     menuType: "", // 枚举值 :group / module
     // 当menuType ==group 时 ，可填
     subMenu: [
       {
         key: "", // 菜单唯一描述
         name: "", // 菜单名称
         menuType: "",
         moduleType: "",
         siderConfig: {
           menu: [...menu],
         },
         iframeConfig: {},
         customConfig: {},
         schemaConfig: {},
         ...menu, // group
         // 可递归menuItem
       },
     ],
     //menuType == module 可填
     moduleType: "", // 枚举值 ：sider/iframe/custom/schema

     // moduleType == sider
     siderConfig: {
       menu: [
         {
           key: "", // 菜单唯一描述
           name: "", // 菜单名称
           menuType: "",
           moduleType: "", // 枚举值 ：iframe/custom/schema
           iframeConfig: {},
           customConfig: {},
           schemaConfig: {},
           subMenu: [...menu], // group
           // 可递归menuItem
         },
       ],
     },
     iframeConfig: {},
     customConfig: {},
     schemaConfig: {
       api: "", // 数据源 遵循 RESTFUL规范
       schema: {
         // 板块数据结构
         type: "object",
         properties: {
           key: {
             ...schema, // 标准 schema 配置
             type: "", // 字段类型
             label: "", // 字段的中文名
             // 字段在table中的相关配置
             tableOption: {
               ...elTableColumnConfig, // el-table-column配置
               visible: true, // 默认true ,（false ，表示不在表单中显示）
             },
             // 字段在search-bar 中的配置
             searchOpion: {
               ...elementComponentConfig, // el-component 配置
               comType: "", // 配置组件类型 input/select/time
               default: "", // 默认值

               // comType==="select"
               enumList: [{ label: "", value: "" }],

               // comType==="dynamicSelect"
               api: "",
             },
             // 对应componentConfig
             createFormOption: {
               ...elementComponentConfig, // el-component 配置
               comType: "",
               visible: true,
               disabled: false,
               default: "", // 默认值
             },
             editFormOption: {
               ...elementComponentConfig, // el-component 配置
               comType: "",
               visible: true,
               disabled: false,
               default: "", // 默认值
             },
             detailPanel: {
               ...elementComponentConfig, // el-component 配置
             },
           },
         },
       },
       tableConfig: {
         headerButtons: [
           {
             label: "", // 按钮中文名
             eventKey: "", // 按钮事件名
             eventOption: {}, // 按钮事件具体配置
             ...elButtonConfig, // 标准el-button配置
           },
         ],
         rowButtons: [
           {
             label: "", // 按钮中文名
             eventKey: "", // 按钮事件名
             eventOption: {
               //   eventKey==='showComponent'
               comName: "",
               // eventKey === 'remove'
               params: {
                 // 为schema::-时，读取当前行实际值 ，否则为固定值
                 parmaKay: "schema::",
                 parmaKay: "xxxx",
               },
             }, // 按钮事件具体配置
             ...elButtonConfig, // 标准el-button配置
           },
         ],
       }, // table 相关配置
       searchConfig: {}, // search-bar 相关配置
       componentConfig: {
         createForm: {
           title: "", //表单标题
           saveBtnText: "", // 保存按钮文本
         },
         editForm: {
           mainKey: "", // 表单主键 获取表单信息
           title: "", //表单标题
           saveBtnText: "", // 保存按钮文本
         },
         detailPanel: {},
       }, // 模块组件
     },
   },
 ],
};
```

### 服务端启动

```javascript
const { serverStart } = require("@perfect-bl/elpis");
const app = serverStart({});
```

### 自定义服务端

- router-schema
- router
- controller
- service
- extend
- config

### 前端构建

```javascript
const { frontendBuild } = require("@perfect-bl/elpis");
frontendBuild(process.env._ENV); // 'local' | 'prod';
```

### 自定义页面扩展

太懒了，不想写