<template>
  <Painel :oms="oms" :paineis="paineis"/>
</template>

<script>import Painel from '../components/Painel.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    Painel
  },
  data () {
    return {
      paineis: [],
      oms: []
    }
  },
  mounted () {
    let self = this
    this.$http.get('panels/load')
      .then(response => {
        self.paineis = response.data
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
