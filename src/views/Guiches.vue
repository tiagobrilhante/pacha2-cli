<template>
  <Guiche :guiches="guiches" :oms="oms" :panels="panels" v-if="loading"/>
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
      panels: [],
      oms: [],
      loading: false
    }
  },
  async mounted () {
    await this.getInfo()
    this.loading = true
  },
  methods: {
    async getInfo () {
      try {
        let self = this
        await this.$http.get('guiches/load')
          .then(response => {
            self.guiches = response.data
          })
          .catch(erro => console.log(erro))

        await this.$http.get('panels/showpanel')
          .then(response => {
            self.panels = response.data
          })
          .catch(erro => console.log(erro))

        await this.$http.get('om/disponivel')
          .then(response => {
            self.oms = response.data
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {

    ...mapGetters(['usuarioLogado'])

  }
}
</script>

<style>

</style>
