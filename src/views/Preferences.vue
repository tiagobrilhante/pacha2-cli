<template>
  <Preference :oms="oms" :parametrosnormal="parametrosnormal" :parametrosprioridade="parametrosprio"/>
</template>

<script>import Preference from '../components/Preference.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    Preference
  },
  data () {
    return {
      parametrosnormal: [],
      parametrosprio: [],
      oms: []
    }
  },
  mounted () {
    let self = this
    this.$http.get('parametronormal')
      .then(response => {
        self.parametrosnormal = response.data.data
      })
      .catch(erro => console.log(erro))

    this.$http.get('parametroprioridade')
      .then(response => {
        self.parametrosprio = response.data.data
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
