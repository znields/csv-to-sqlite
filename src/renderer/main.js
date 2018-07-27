import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import firstline from 'firstline'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

store.$firstline = firstline
store.$sqlite3 = require('sqlite3').verbose()
store.$csv = require('fast-csv')
store.$fs = require('fs')

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
