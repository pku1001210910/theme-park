// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import { store } from './store'

import IoT from '@/components/IoT'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { appConfig } from './config'

Vue.use(BootstrapVue)
Vue.component('iot', IoT)
// Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false

// Custom settings for app
Vue.prototype.$appConfig = appConfig

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
