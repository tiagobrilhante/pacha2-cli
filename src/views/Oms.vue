<template>
  <Om :oms="oms" :paineis="paineis"/>
</template>

<script>import Painel from '../components/Painel.vue'
import {mapGetters} from 'vuex'
import Om from '../components/Om'

export default {
  components: {
    Om,
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
    this.$http.get('panels')
      .then(response => {
        self.paineis = response.data.data
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
