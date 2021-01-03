import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import store from './store/index'
import './filters'

import Vuemoment from 'vue-moment'

import AlertCmp from './components/Alert.vue'

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})

Vue.use(Vuemoment)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
