import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const estado = {
  token: null,
  usuarioLogado: {}
}

const mutations = {
  DEFINIR_USUARIO_LOGADO (state, {token, usuarioLogado}) {
    state.token = token
    state.usuarioLogado = usuarioLogado
  },
  DESLOGAR_USUARIO (state) {
    state.token = null
    state.usuarioLogado = {}
  }
}

const actions = {
  efetuarLogin ({commit}, usuarioLogado) {
    return new Promise((resolve, reject) => {
      http.post('/login', usuarioLogado)
        .then(response => {
          commit('DEFINIR_USUARIO_LOGADO', {
            token: response.data.access_token,
            usuarioLogado: response.data.user
          })
          resolve(response.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}

const getters = {
  usuarioEstaLogado: state => Boolean(state.token),
  usuarioResetado: state => {
    if (state.usuarioLogado.reset === 1) {
      return false
    } else {
      return true
    }
  },
  usuarioLogado: state => {
    return state.usuarioLogado
  }
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: estado,
  mutations,
  actions,
  plugins: [vuexLocal.plugin],
  getters
})
