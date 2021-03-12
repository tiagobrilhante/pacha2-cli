<template>
  <Guiche :oms="oms" :guiches="guiches"/>
</template>

<script>import Guiche from '../components/Guiche.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    Guiche
  },
  data () {
    return {
      guiches: [],
      oms: []
    }
  },
  mounted () {
    let self = this
    this.$http.get('guiches')
      .then(response => {
        self.guiches = response.data.data
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
