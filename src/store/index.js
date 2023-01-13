import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menus';
import dictionary from './modules/dictionary'
import common from './modules/common'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    menus,
    dictionary,
    common
  }
})