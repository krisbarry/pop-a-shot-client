import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      // path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      // path: '/scoreboard',
      name: 'scoreboard',
      component: () => import(/* webpackChunkName: "scoreboard" */ '@/views/Scoreboard.vue'),
    },
    {
      path: '/players',
      name: 'players',
      component: () => import(/* webpackChunkName: "players" */ '@/views/Players.vue'),
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import(/* webpackChunkName: "statistics" */ '@/views/Statistics.vue'),
    }
  ],
})
