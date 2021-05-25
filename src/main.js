import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

import Home from './components/Home.vue'
import About from './components/About.vue'
import Basic from './components/Basic.vue'

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/basic', component: Basic }
  ]
})

Vue.use(VueRouter);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
