import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import AppProducts from './components/AppProducts.vue'
import AppCart from './components/AppCart.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: AppProducts },
  { path: '/carrinho', component: AppCart }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
