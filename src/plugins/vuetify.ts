import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
// import 'vuetify/src/stylus/app.styl' // DELETE "stylus" REFERENCES IN package.json

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#b00203',
    secondary: '#000'
  }
})
