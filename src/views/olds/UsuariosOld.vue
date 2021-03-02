<template>
  <div class="container">
    <h1>Usuários</h1>
    <div class="row">
      <Usuario :key="usuario.id" :usuario="usuario" v-for="usuario in usuarios"/>
    </div>
  </div>
</template>

<script>import Usuario from '@/components/UsuarioOld.vue'

export default {
  components: {
    Usuario
  },
  data () {
    return {
      usuarios: []
    }
  },
  mounted () {
    this.$http.get('users')
    // eslint-disable-next-line no-return-assign
      .then(response => this.usuarios = response.data.data)
      .catch(erro => console.log(erro))
  }
  /*
  beforeRouteEnter (to, from, next) {
    if (!this.$store.state.token) {
      next( { name: 'login' })
    }
    next()
  }

   */
}
</script>

<style>

</style>
