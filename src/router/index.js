import Vue from 'vue'
import VueRouter from 'vue-router'
import Usuarios from '../views/Usuarios.vue'
import Paineis from '../views/Paineis'
import Guiches from '../views/Guiches'
import Preferences from '../views/Preferences'
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
    path: '/panels',
    name: 'painéis',
    component: Paineis
  },
  {
    path: '/guiches',
    name: 'Guichês',
    component: Guiches
  },
  {
    path: '/preferences',
    name: 'Preferências',
    component: Preferences
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
