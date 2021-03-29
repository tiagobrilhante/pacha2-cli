<template>
  <PublicoAlvo :oms="oms" :tipos="tipos"/>
</template>

<script>import PublicoAlvo from '../components/PublicoAlvo'
import {mapGetters} from 'vuex'

export default {
  components: {
    PublicoAlvo
  },
  data () {
    return {
      tipos: [],
      oms: []
    }
  },
  mounted () {
    let self = this
    this.$http.get('publicoalvo/alltipos')
      .then(response => {
        self.tipos = response.data.data
      })
      .catch(erro => console.log(erro))

    this.$http.get('om/disponivel')
      .then(response => {
        self.oms = response.data
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
