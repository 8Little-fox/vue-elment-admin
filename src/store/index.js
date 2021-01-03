import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,

  plugins: [createPersistedState({
    storage: window.localStorage,
    reducer(vuex) {
      return {
        app: vuex.app,
        settings: vuex.settings,
        user: vuex.user,
        permission: vuex.permission
      }
    }
  })]
})

export default store
