/*
 * @Author: your name
 * @Date: 2021-01-02 12:35:33
 * @LastEditTime: 2021-01-03 19:07:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\my-config.js
 */
module.exports = {
  /* 页面上方的标题 */
  PAGETITLE: 'WebTemplate',
  /* 后端是否返回路由数据 */
  ISROUTER: false,
  /* 项目的版本号 */
  VERSION: '1.0.0',
  /* 项目是否加密 0 不加 1 加 */
  ENCRYPT: 1,
  /* 是否浮动内容区域的标题标题 请尽可能不修改 */
  FIXEDHEADER: true,
  /* 是否在边栏中显示logo */
  SIDEBARLOGO: true,
  /* 打包后是否屏蔽log */
  DEOPCONSOLE: true,
  /* 开发环境api地址 */
  DEVAPI: 'https://hxfl.tx2.qrqy.net/api/',
  /* 生产环境api地址 */
  PRODAPI: 'https://hxfl.tx2.qrqy.net/api/',
  /* 七牛空间地址 */
  QINIUSPACE: 'http://twst.isart.me/',
  /* 向内添加不需要滚动顶部组件的[页面,路由,name] */
  NOTGOPATH: ['GoodsList'],
  /* 路径别名，要保持ide的快捷跳转不会失效，请在修改或添加后也对应修改 jsconfig.json 中的路径别名 */
  PATHALIAS: {
    '@': 'src',
    '@c': 'src/components',
    '@l': 'src/layout',
    '@v': 'src/views',
    '@u': 'src/utils',
    '@img': 'src/assets'
  }
}
