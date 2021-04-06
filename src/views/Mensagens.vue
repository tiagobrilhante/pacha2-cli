<template>
  <Mensagem :mensagens="mensagens"/>
</template>

<script>import {mapGetters} from 'vuex'
import Mensagem from '../components/Mensagem'

export default {
  components: {
    Mensagem
  },
  data () {
    return {
      mensagens: []
    }
  },
  mounted () {
    let self = this
    this.$http.get('mensagens')
      .then(response => {
        self.mensagens = response.data.data
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
