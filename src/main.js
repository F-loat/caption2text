import Vue from 'vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#474a4f',
    secondary: '#ff5252'
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
