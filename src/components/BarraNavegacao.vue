<template>
    <v-app-bar
      app
      dark
      flat
    >
      <v-container class="py-0 fill-height">
        <v-toolbar-title>PaCha</v-toolbar-title>
        <v-spacer></v-spacer>
        <BarraNavegacaoQuandoLogado v-if="usuarioEstaLogado"/>
        <BarraNavegacaoQuandoDeslogado v-else/>
      </v-container>
    </v-app-bar>
</template>

<script>import BarraNavegacaoQuandoLogado from './BarraNavegacaoQuandoLogado'
import BarraNavegacaoQuandoDeslogado from './BarraNavegacaoQuandoDeslogado'
import {mapGetters} from 'vuex'

export default {

  components: {
    BarraNavegacaoQuandoLogado,
    BarraNavegacaoQuandoDeslogado
  },

  computed: {

    ...mapGetters(['usuarioEstaLogado'])

  }
}
</script>

<style>

</style>
