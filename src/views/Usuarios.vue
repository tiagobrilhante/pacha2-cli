<template>
  <Usuario :oms="oms" :usuarios="usuarios"/>
</template>

<script>import Usuario from '../components/Usuario.vue'

export default {
  components: {
    Usuario
  },
  data () {
    return {
      usuarios: [],
      oms: []
    }
  },
  mounted () {
    var self = this
    this.$http.get('users')
      .then(response => {
        self.usuarios = response.data.data
      })
      .catch(erro => console.log(erro))

    this.$http.get('om')
      .then(response => {
        self.oms = response.data.data
      })
      .catch(erro => console.log(erro))
  }
}
</script>

<style>

</style>
