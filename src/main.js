// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap3/dist/css/bootstrap.css'
import 'bootstrap3/dist/js/bootstrap.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import vuex from 'vuex'
import store from './store/store'

Vue.config.productionTip = false

Vue.prototype.axios = axios

Vue.use(vuex)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
