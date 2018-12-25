import Vue from 'vue'
import GlobalLayout from '@/layout/globalLayout'
import router from '@/router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@public/assets/styles/index.scss'
import store from './store/index'
import '@babel/polyfill'
import Viser from 'viser-vue' //图表库引入


import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element, {
  size: 'medium', // set element-ui default size
})
Vue.use(Viser);
Vue.config.productionTip = false
const Bus = new Vue()
new Vue({
  el: '#root',
  router,
  data:{
   Bus
  },
  store,
  components: { GlobalLayout },
  template: '<GlobalLayout/>'
})

if(module.hot) {
  module.hot.accept();

}
