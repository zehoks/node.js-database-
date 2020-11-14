import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import dayjs from 'dayjs'
import store from '/store'
import axios from 'axios'

axios.defaults.baseURL

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('DD/MM/YYYY')
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
