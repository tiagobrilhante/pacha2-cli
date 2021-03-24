<template>
  <Preference :parametrosnormal="parametrosnormal" :parametrosprioridade="parametrosprio" v-if="loading"/>
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
      loading: false,
      oms: []
    }
  },

  async mounted () {
    await this.getInfo()
    this.loading = true
  },
  computed: {

    ...mapGetters(['usuarioLogado'])

  },
  methods: {
    async getInfo () {
      try {
        let self = this
        await this.$http.get('parametronormal')
          .then(response => {
            self.parametrosnormal = response.data.data
          })
          .catch(erro => console.log(erro))

        await this.$http.get('parametroprioridade')
          .then(response => {
            self.parametrosprio = response.data.data
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
