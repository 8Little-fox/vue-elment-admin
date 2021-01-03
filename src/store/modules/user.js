import { getToken, clearAll, setToken, setItem } from '@/utils/tool/storage'
import { constantRoutes } from '@/router'
import { ISROUTER } from '@/../my-config'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit, dispatch }, userInfo) {
    console.log('ISROUTER', ISROUTER)
    dispatch('user/resetToken', {}, { root: true })
    return new Promise(resolve => {
      let router = []
      if (ISROUTER) {
        router = [
          { path: '/login', hidden: true },
          { path: '/404', hidden: true },
          { path: '/401', hidden: true },
          {
            path: '/',
            children: [
              {
                path: 'dashboard',
                meta: { title: '首页', icon: 'home' }
              }
            ]
          },
          {
            path: '/testDemo',
            children: [
              {
                path: 'index',
                meta: { title: '测试', icon: 'tool' }
              }
            ]
          },
          {
            path: '/infos',
            children: [
              {
                path: 'index',
                meta: { title: '信息', icon: 'tool' }
              }
            ]
          },
          { path: '*', 'redirect': '/404', hidden: true }
        ]
      } else {
        router = constantRoutes
      }
      let token = userInfo.token
      commit('SET_TOKEN', token)
      setToken(token)
      setItem('userInfo', userInfo)
      setItem('secret', userInfo.secret)
      commit('SET_NAME', userInfo.name)
      commit('SET_AVATAR', 'http://twst.isart.me/upload_pic_1603854179000.png')
      dispatch('permission/addRoutes', { router: router }, { root: true })
      resolve()
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise(resolve => {
      clearAll() // 先删除令牌
      commit('RESET_STATE')
      resolve()
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      clearAll() // 必须先删除令牌
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

