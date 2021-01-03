import { resetFun } from '../../utils/tool'
/*
* \xa0 空格占位符号
* hidden:true 隐藏该条侧边栏页面
* */

const state = {
  /* 侧边栏目展示路由 */
  routes: [],
  /* 不在这里的路由会进入 404page */
  resetRoutes: []
}

const mutations = {
  UPDATA_ROUTES(state, routerData) {
    state.routes = routerData.router
  },
  RESET_ROUTES(state, routerData) {
    state.resetRoutes = resetFun(routerData.router)
  }
}

const actions = {
  addRoutes({ commit }, routerData) {
    commit('UPDATA_ROUTES', routerData)
    commit('RESET_ROUTES', routerData)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

/**
 * @Description: 路由样例
 * @Author: WenBo Wei
 * @Date: 2020/9/29
 */
/*
{
  path: '/shop',
    redirect: '/shop/goodsList',
  meta: { title: '商城管理', icon: 'user' },
  children: [
    {
      path: 'goodsList',
      meta: { title: '商品列表' }
    },
    {
      path: 'editGoods',
      meta: { title: '添加或编辑商品' },
      hidden: true
    },
    {
      path: 'evaluation',
      meta: { title: '评价管理' }
    }
  ]
}*/
