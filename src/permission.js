import router from './router'
import store from './store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@u/tool/storage' // 从缓存中获取token
import { PAGETITLE } from '@/../my-config'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // 路由白名单

router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = PAGETITLE
  // 开始进度条
  NProgress.start()
  // 检测是否为有效路由
  if (store.state.permission.resetRoutes.length && !store.state.permission.resetRoutes.includes(to.path)) {
    next({ path: '/401', replace: true })
    NProgress.done()
  } else {
    next()
  }

  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，并且前往的页面是登陆页面，则重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    /* 判断是否为白名单*/
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 重定向到登录页面.
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
