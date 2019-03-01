import Vue from 'vue'
import Vuex from 'vuex'
import { game } from '@/store/game/index'
import { player } from '@/store/player/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '1.0.1'
  },
  modules: {
    game,
    player
  }
})
