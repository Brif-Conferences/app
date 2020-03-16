import Vue from 'vue'
import App from '@/App.vue'

import GSignInButton from 'vue-google-signin-button'

import store from '@/store' 
import router from '@/router'

Vue.config.productionTip = false

Vue.use(GSignInButton)
// Vue.use(VueRouter)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
