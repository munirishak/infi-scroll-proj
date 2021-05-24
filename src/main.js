import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

import Home from './components/Home.vue'
import About from './components/About.vue'

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
})

Vue.use(VueRouter);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
