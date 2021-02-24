import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const estado = {
  token: null,
  usuario: {}
}

const mutations = {
  DEFINIR_USUARIO_LOGADO (state, {token, usuario}) {
    state.token = token
    state.usuario = usuario
  },
  DESLOGAR_USUARIO (state) {
    state.token = null
    state.usuario = {}
  }
}

const actions = {
  efetuarLogin ({commit}, usuario) {
    return new Promise((resolve, reject) => {
      http.post('/login', usuario)
        .then(response => {
          commit('DEFINIR_USUARIO_LOGADO', {
            token: response.data.access_token,
            usuario: response.data.user
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
  usuarioEstaLogado: state => Boolean(state.token)
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
