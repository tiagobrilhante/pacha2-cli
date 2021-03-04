import Vue from 'vue'
import VueRouter from 'vue-router'
import Usuarios from '../views/Usuarios.vue'
import Home from '../views/Home.vue'
// import Reset from '../views/Reset.vue'
import Login from '../views/Login.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/reset',
    name: 'reset',
    // component: Reset
    component: () => import(/* webpackChunkName: "Reset" */ '../views/Reset.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: Usuarios
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      publica: true
    }
  }

]
const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((routeTo, routeFrom, next) => { if (!routeTo.meta.publica && !store.state.token) { return next({ path: '/login' }) } next() })

export default router
