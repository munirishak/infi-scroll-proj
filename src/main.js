import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

import Home from './components/Home.vue'
import Basic from './components/Basic.vue'

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/basic', component: Basic }
  ],
  linkExactActiveClass: "bg-yellow-500" // active class for *exact* links.
})

Vue.use(VueRouter);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
