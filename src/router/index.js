/*
 * @Author: your name
 * @Date: 2021-01-02 12:35:33
 * @LastEditTime: 2021-01-03 20:02:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 路由总路线
 */
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/Login') },
  { path: '/404', component: () => import('@/views/404') },
  { path: '/401', component: () => import('@/views/401') },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      meta: { title: 'Dashboard', tag: 'new', icon: 'home' },
      component: () => import('@/views/dashboard/Dashboard')
    }]
  },
  {
    path: '/testDemo',
    component: Layout,
    redirect: '/testDemo/index',
    children: [{
      path: 'index',
      name: 'TestDemo',
      meta: { title: 'TestDemo', icon: 'tool' },
      component: () => import('@/views/testDemo/TestDemo')
    }]
  },
  {
    path: '/infos',
    component: Layout,
    redirect: '/infos/infoShow',
    name: 'Infos',
    meta: { title: 'Infos', icon: 'infos' },
    children: [
      {
        path: 'infoShow',
        name: 'InfoShow',
        meta: { title: 'InfoShow'},
        component: () => import('@/views/infos/infoShow/InfoShow')
      },
      {
        path: 'infoModify',
        name: 'InfoModify',
        meta: { title: 'InfoModify'},
        meta: { activeMenu: '/infos/infoModify', title: 'InfoModify' },
        component: () => import('@/views/infos/infoModify/InfoModify')
      },

    ]
  },
  // 404页必须放在最后 !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
