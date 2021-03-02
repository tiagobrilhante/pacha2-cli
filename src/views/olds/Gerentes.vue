<template>
  <div class="container">
    <h1>Gerentes</h1>
    <div class="row">
      <Gerente :gerente="gerente" :key="gerente.numero" v-for="gerente in gerentes"/>
    </div>
  </div>
</template>

<script>import Gerente from '@/components/Gerente.vue'

export default {
  components: {
    Gerente
  },
  data () {
    return {
      gerentes: []
    }
  },
  mounted () {
    this.$http.get('gerentes')
    // eslint-disable-next-line no-return-assign
      .then(response => this.gerentes = response.data)
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
