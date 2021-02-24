export const logoutMixin = {
  methods: {
    efetuarLogout () {
      this.$store.commit('DESLOGAR_USUARIO')
      this.$router.push({name: 'login'})
    }
  }
}
