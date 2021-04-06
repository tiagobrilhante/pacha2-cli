import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import Vuelidate from 'vuelidate'
import http from './http'
import VueMask from 'di-vue-mask'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

import VueToastr from 'vue-toastr'

import VueConfirmDialog from 'vue-confirm-dialog'

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(Vuelidate)

Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultProgressBar: true,
  defaultCloseOnHover: true,
  clickClose: true
})

Vue.config.productionTip = false

Vue.use(VueMask)

Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
