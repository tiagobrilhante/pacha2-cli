<template>
  <Usuario :oms="oms" :tipos="tipos" :usuarios="usuarios"/>
</template>

<script>import Usuario from '../components/Usuario.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    Usuario
  },
  data () {
    return {
      usuarios: [],
      oms: [],
      tipos: []
    }
  },
  mounted () {
    var self = this
    this.$http.get('users')
      .then(response => {
        self.usuarios = response.data.data
      })
      .catch(erro => console.log(erro))

    this.$http.get('om/disponivel')
      .then(response => {
        self.oms = response.data
      })
      .catch(erro => console.log(erro))

    this.$http.post('users/tiposdisponiveis', this.usuarioLogado.id)
      .then(response => {
        self.tipos = response.data
      })
      .catch(erro => console.log(erro))
  },
  computed: {

    ...mapGetters(['usuarioLogado'])

  }
}
</script>

<style>

</style>
