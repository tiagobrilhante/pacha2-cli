import axios from 'axios'
import store from '@/store'

const http = axios.create({
  // baseURL: 'http://localhost:8000/api/',
  baseURL: 'http://pachaapi.12rm.eb.mil.br/api/',
  headers: {
    'Accept': 'application/json',
    'Content': 'application/json'
  }

})

http.interceptors.request.use(function (config) {
  const token = store.state.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, function (erro) {
  return Promise.reject(erro)
})

export default http
