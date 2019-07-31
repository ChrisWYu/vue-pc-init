// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  // 使用模拟数据, 只是开发时使用, 如果不是开发时, 设置为false
  useMock: true
}

export default new Vuex.Store({
  state
})