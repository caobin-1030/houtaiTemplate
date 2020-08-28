import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import * as filters from './utils/filters'
import Fragment from 'vue-fragment'
import dayjs from 'dayjs'

Vue.prototype.$formatDate = dayjs

Vue.use(Fragment.Plugin)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const on = Vue.prototype.$on
Vue.prototype.$on = function (event, func) {
  let timer
  let newFunc = func
  if (event === 'click') {
    newFunc = function () {
      clearTimeout(timer)
      timer = setTimeout(function () {
        func.apply(this, arguments)
      }, 200)
    }
  }
  on.call(this, event, newFunc)
}

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
