import Vue from 'vue'
import VueRouter from 'vue-router'
import Usuarios from '../views/Usuarios.vue'
import Paineis from '../views/Paineis'
import TipoAtendimento from '../views/TiposAtendimentos'
import PublicoAlvo from '../views/PublicosAlvos'
import Guiches from '../views/Guiches'
import Preferences from '../views/Preferences'
import Home from '../views/Home.vue'
import HomeChamador from '../views/HomeChamador.vue'
// import Reset from '../views/Reset.vue'
import Login from '../views/Login.vue'
import store from '@/store'
import Oms from '../views/Oms'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      admin: true
    }
  },
  {
    path: '*',
    component: Home,
    meta: {
      admin: true
    }
  },
  {
    path: '/chamadas',
    name: 'homeChamador',
    component: HomeChamador,
    meta: {
      chamador: true
    }
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
    component: Usuarios,
    meta: {
      admin: true
    }
  },
  {
    path: '/oms',
    name: 'oms',
    component: Oms,
    meta: {
      admin: true
    }
  },
  {
    path: '/panels',
    name: 'painéis',
    component: Paineis,
    meta: {
      admin: true
    }
  },
  {
    path: '/tiposatendimento',
    name: 'tipoatendimento',
    component: TipoAtendimento,
    meta: {
      admin: true
    }
  },
  {
    path: '/publicoalvo',
    name: 'publicoalvo',
    component: PublicoAlvo,
    meta: {
      admin: true
    }
  },
  {
    path: '/guiches',
    name: 'Guichês',
    component: Guiches,
    meta: {
      admin: true
    }
  },
  {
    path: '/preferences',
    name: 'Preferências',
    component: Preferences,
    meta: {
      chamador: true
    }
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
router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.publica && !store.state.token) {
    return next({path: '/login'})
  }
  if (routeTo.meta.admin && store.state.usuarioLogado.tipo === 'Chamador') {
    return next({path: '/chamadas'})
  } else if (routeTo.meta.chamador && store.state.usuarioLogado.tipo !== 'Chamador') {
    return next({path: '/'})
  }
  next()
})

export default router
