
## 原始模板地址

- [Gitee](https://panjiachen.gitee.io/vue-element-admin/) 此网站提供了很多好组件

## 项目的启动
```bash
1.git clone 

2.npm i

3.npm run dev

4.npm run build:prod / npm run build:stage

测试账号
    账号+密码 13111111111 Aa123456 
    手机号+验证码 暂未开通
```
## 目录结构
```
├─public // 文件资源
│      index.html
│      qrqry_logo.png
│
├─my-config.js // 域名，标题，项目版本号，路径映射 以及一些常规配置
│
│      
└─src
    │  App.vue
    │  main.js // 入口
    │  permission.js // 全局(路由)守卫
    │  
    ├─api
    │      api.js // 接口api的文件
    │      index.js // 封装并导出全部api异步函数
    │      
    ├─assets // 静态资源文件
    │  └─404_images
    │          404.png
    │          404_cloud.png
    │          boy_404.gif
    │          
    ├─components // 全局公共组件 公共组件的文件名使用大驼峰，文件名为index
    │  ├─Breadcrumb
    │  │      index.vue
    │  │      
    │  ├─Hamburger
    │  │      index.vue
    │  │      
    │  └─SvgIcon
    │          index.vue
    │          
    ├─icons // 侧边栏的svg
    │  │  index.js
    │  │  svgo.yml
    │  │  
    │  └─svg
    │          eye-open.svg
    │          eye.svg
    │          
    ├─layout // 侧边栏组件
    │  │  index.vue
    │  │  
    │  ├─components
    │  │  │  AppMain.vue
    │  │  │  index.js
    │  │  │  Navbar.vue
    │  │  │  
    │  │  └─Sidebar
    │  │          FixiOSBug.js
    │  │          index.vue
    │  │          Item.vue
    │  │          Link.vue
    │  │          Logo.vue
    │  │          SidebarItem.vue
    │  │          
    │  └─mixin
    │          ResizeHandler.js
    │          
    ├─plugins // 接入到main.js 以减轻main.js中的数据过多 
    │      directive.js // 全局自定义指令
    │      filters.js // 全局自定义管道过滤
    │      index.js 
    │      
    ├─router
    │      index.js // router的配置文件
    │      
    ├─store // Vuex
    │  │  getters.js
    │  │  index.js
    │  │  
    │  └─modules // vuex的模块
    │          app.js // 侧边栏的收缩
    │          permission.js // 左侧侧边栏的显示配置， 
    │                           需要在router中有过配置，
    │                           当有权限的需求时可与后端沟通进行动态展示侧边栏的显示 
    │          settings.js // 侧边栏的LOGO与内容区域Header的fixed
    │          user.js // 用户的信息 tip: 头像， token
    │          
    ├─styles // 全局公共样式，不要动
    │  │  element-ui.scss  
    │  │  global.scss // 请阅读此文件 如果无需求样式 请去同级project/index.scss中配置 
    │  │  index.scss 
    │  │  mixin.scss
    │  │  sidebar.scss
    │  │  transition.scss
    │  │  variables.scss
    │  │  
    │  └─project // 请配置关于当前项目的全局样式
    │          icon.scss
    │          index.scss
    │          
    ├─utils  // 全局公共方法 如有添加请去tool中添加
    │  │  index.js
    │  │  validate.js
    │  │  
    │  ├─request // 请求拦截器的封装
    │  │      index.js
    │  │      requestDataHandler.js // 请求拦截器
    │  │      responseDataHandler.js // 响应拦截器
    │  │      
    │  └─tool //  可使用 $tool 使用 详细使用方法可进入 plugins/index中查看
    │          index.js
    │          method.js // 常用
    │          storage.js // 缓存
    │          time.js // 时间
    │          
    └─views // 页面资源
        │  404.vue
        │  
        └─staff // 请使此规则建目录 组件或页面请用驼峰并首字母大写
          │  welfare.vue
          │  
          └─staffList
              │  StaffList.vue
              │  
              └─components
                      AddStaff.vue
```
