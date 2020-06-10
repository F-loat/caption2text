import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
