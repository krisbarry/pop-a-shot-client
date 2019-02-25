import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Scoreboard from '@/views/Scoreboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      // path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/',
      // path: '/scoreboard',
      name: 'scoreboard',
      // route level code-splitting, this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "scoreboard" */ '@/views/Scoreboard.vue'),
    }
  ],
})
