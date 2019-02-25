import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify/lib'
// import 'vuetify/src/stylus/app.styl' // DELETE "stylus" REFERENCES IN package.json
import 'vuetify/dist/vuetify.min.css'

const theme = {
  primary: '#b00203'
}

Vue.use(Vuetify, { theme })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
